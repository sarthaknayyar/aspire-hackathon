require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { connectDB } = require("./connection");
const mongouri = process.env.MONGO_URI;
const userRouter = require("./routers/user");
const grievanceRouter = require("./routers/grievance");
const cookieParser = require("cookie-parser");
const { MongoClient, GridFSBucket } = require("mongodb");
const multer = require("multer");
const axios = require("axios");

// Initialize Express
const storage = multer.memoryStorage();
const upload = multer({ storage });


const ASSEMBLYAI_API_KEY = "a061aaa6edaa40de90cfb01749a457ef";
const BASE_URL = "https://api.assemblyai.com/v2";
const app = express();
const PORT = process.env.PORT || 5000;
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash"; // change if you want lite
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const API_KEY = "AIzaSyCKL_Fd7JsZDkpq8qthSxVoq4ZaO0A07rc";



// Middleware
app.use(cookieParser());
app.use(cors({
    origin : true,
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
connectDB(mongouri);

let bucket;
mongoose.connection.once("open", () => {
    bucket = new GridFSBucket(mongoose.connection.db, { bucketName: "uploads" });
    console.log("✅ GridFSBucket initialized!");
});

// Configure Multer (Memory Storage for direct GridFS upload)

// Upload audio from frontend → AssemblyAI
app.post("/api/transcribe", upload.single("audio"), async (req, res) => {
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
  



// 📌 **Upload File (POST /upload)**
app.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const uploadStream = bucket.openUploadStream(req.file.originalname);
        uploadStream.end(req.file.buffer);

        uploadStream.on("finish", () => {
            console.log("✅ File uploaded:", req.file.originalname);
            res.status(201).json({ message: "File uploaded successfully", filename: req.file.originalname });
        });

        uploadStream.on("error", (err) => {
            console.error("❌ Upload error:", err);
            res.status(500).json({ error: "File upload failed" });
        });
    } catch (err) {
        console.error("❌ Error uploading file:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 📌 **Retrieve and Open File (GET /file/:filename)**
app.get("/file/:filename", async (req, res) => {
    try {
        console.log("🔍 Searching for file:", req.params.filename);
        const file = await mongoose.connection.db.collection("uploads.files").findOne({ filename: req.params.filename });
        if (!file) {
            return res.status(404).json({ error: "File not found" });
        }

        res.set("Content-Type", "application/pdf");
        res.set("Content-Disposition", `inline; filename="${file.filename}"`);

        const downloadStream = bucket.openDownloadStream(file._id);
        downloadStream.pipe(res);
    } catch (err) {
        console.error("❌ Error retrieving file:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 📌 **Download File as Attachment (GET /download/:filename)**
app.get("/download/:filename", async (req, res) => {
    try {
        const file = await mongoose.connection.db.collection("uploads.files").findOne({ filename: req.params.filename });
        if (!file) {
            return res.status(404).json({ error: "File not found" });
        }

        res.set("Content-Type", "application/pdf");
        res.set("Content-Disposition", `attachment; filename="${file.filename}"`);

        const downloadStream = bucket.openDownloadStream(file._id);
        downloadStream.pipe(res);
        console.log("📥 File sent for download:", req.params.filename);
    } catch (err) {
        console.error("❌ Error downloading file:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Routes
app.use("/user", userRouter);
app.use("/grievance", grievanceRouter);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));