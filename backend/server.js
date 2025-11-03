// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const userRouter = require("./routers/user");
const grievanceRouter = require("./routers/grievance");


const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const ASSEMBLYAI_API_KEY = "a061aaa6edaa40de90cfb01749a457ef";
const BASE_URL = "https://api.assemblyai.com/v2";
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash"; // change if you want lite
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const API_KEY = "AIzaSyCKL_Fd7JsZDkpq8qthSxVoq4ZaO0A07rc";



if (!MONGO_URI) {
  console.error("MONGO_URI is not set. Exiting.");
  process.exit(1);
}

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: true, // consider restricting to your frontend origin in production
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Multer memory storage (for GridFS)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDFs allowed'), false);
  }
});
const uploadVoice = multer({ storage });

// GridFS bucket variable (initialized after DB connect)
let bucket = null;

// Helper: Promise for upload finish
function waitForStreamFinish(stream) {
  return new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

/**
 * Upload endpoint: stores file into GridFS and returns filename & fileId
 * Expects multipart/form-data with field "file"
 */
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!bucket) {
      return res.status(503).json({ error: "Storage not ready. Try again shortly." });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Use a unique filename to avoid collisions
    const filename = `${Date.now()}-${req.file.originalname}`;

    const uploadStream = bucket.openUploadStream(filename, {
      contentType: req.file.mimetype
    });

    // write and close
    uploadStream.end(req.file.buffer);

    await waitForStreamFinish(uploadStream);

    return res.status(201).json({
      message: "File uploaded successfully",
      filename,
      fileId: uploadStream.id.toString()
    });
  } catch (err) {
    console.error("❌ Upload error:", err);
    return res.status(500).json({ error: "File upload failed", details: err.message });
  }
});

/**
 * Retrieve file by filename (inline view)
 */
app.get("/file/:filename", async (req, res) => {
  try {
    if (!bucket) return res.status(503).json({ error: "Storage not ready" });

    const file = await mongoose.connection.db.collection("uploads.files").findOne({ filename: req.params.filename });
    if (!file) return res.status(404).json({ error: "File not found" });

    res.set("Content-Type", file.contentType || "application/pdf");
    res.set("Content-Disposition", `inline; filename="${file.filename}"`);

    const downloadStream = bucket.openDownloadStream(file._id);
    downloadStream.pipe(res);
  } catch (err) {
    console.error("❌ Error retrieving file:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Download endpoint (attachment)
 */
app.get("/download/:filename", async (req, res) => {
  try {
    if (!bucket) return res.status(503).json({ error: "Storage not ready" });

    const file = await mongoose.connection.db.collection("uploads.files").findOne({ filename: req.params.filename });
    if (!file) return res.status(404).json({ error: "File not found" });

    res.set("Content-Type", file.contentType || "application/pdf");
    res.set("Content-Disposition", `attachment; filename="${file.filename}"`);

    const downloadStream = bucket.openDownloadStream(file._id);
    downloadStream.pipe(res);
    console.log("📥 File sent for download:", req.params.filename);
  } catch (err) {
    console.error("❌ Error downloading file:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});




// Upload audio from frontend → AssemblyAI
app.post("/api/transcribe", uploadVoice.single("audio"), async (req, res) => {
    try {
      if (!req.file || !req.file.buffer) {
        return res.status(400).json({ error: "No audio file uploaded" });
      }
  
      const audioBuffer = req.file.buffer;
  
      // 1) Upload raw audio bytes to AssemblyAI
      const uploadResponse = await axios.post(
        `${BASE_URL}/upload`,
        audioBuffer,
        {
          headers: {
            authorization: ASSEMBLYAI_API_KEY,
            "content-type": "application/octet-stream",
            "transfer-encoding": "chunked"
          },
          // allow large uploads
          maxContentLength: Infinity,
          maxBodyLength: Infinity
        }
      );
  
      const audioUrl = uploadResponse.data.upload_url;
      if (!audioUrl) throw new Error("Upload did not return upload_url");
  
      // 2) Request transcription
      const transcriptResponse = await axios.post(
        `${BASE_URL}/transcript`,
        {
          audio_url: audioUrl,
          language_code: "hi" // set your language (hi = Hindi)
        },
        {
          headers: { authorization: ASSEMBLYAI_API_KEY }
        }
      );
  
      const transcriptId = transcriptResponse.data.id;
      if (!transcriptId) throw new Error("Transcript request failed to return id");
  
      // 3) Poll until completed (simple polling loop)
      let transcriptText = "";
      while (true) {
        const poll = await axios.get(`${BASE_URL}/transcript/${transcriptId}`, {
          headers: { authorization: ASSEMBLYAI_API_KEY }
        });
  
        if (poll.data.status === "completed") {
          transcriptText = poll.data.text || "";
          break;
        } else if (poll.data.status === "error") {
          throw new Error(poll.data.error || "Transcription failed");
        }
  
        // wait 2-3s before next poll
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
  
      return res.json({ text: transcriptText });
    } catch (err) {
      console.error("Backend AssemblyAI Error:", err?.response?.data || err.message || err);
      return res.status(500).json({ error: err.message || "Internal error" });
    }
  });




  app.post("/api/gemini/generate", async (req, res) => {
    try {
      const prompt = req.body.prompt;
      if (!prompt) return res.status(400).json({ error: "Missing prompt" });
  
      const r = await axios.post(
        API_URL,
        { contents: [{ parts: [{ text: prompt }] }] },
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY,
          },
          timeout: 60000,
        }
      );
  
      return res.json(r.data);
    } catch (err) {
      console.error("Gemini proxy error:", err?.response?.data || err.message);
      const status = err?.response?.status || 500;
      return res.status(status).json({ error: "Gemini request failed", details: err?.response?.data || err.message });
    }
  });
  

// Root health check
app.get("/", (req, res) => res.send("✅ E-JanSamvad backend is running successfully!"));

// Mount other routers (they rely on mongoose connection but can be mounted now)
app.use("/user", userRouter);
app.use("/grievance", grievanceRouter);

// Start server AFTER MongoDB connects and bucket is created
async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Initialize GridFSBucket using mongoose's native db
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: "uploads" });
    console.log("✅ Mongo connected & GridFS bucket initialized.");

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

start();
