// server.js
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const pdfParse = require("pdf-parse");

// ===== Routers =====
const userRouter = require("./routers/user");
const grievanceRouter = require("./routers/grievance");

// ===== App / Env =====
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ===== Third-party keys =====
const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY || "a061aaa6edaa40de90cfb01749a457ef";
const AAI_BASE = "https://api.assemblyai.com/v2";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyCKL_Fd7JsZDkpq8qthSxVoq4ZaO0A07rc";

// ===== Jina AI for Embeddings =====
const JINA_API_KEY = process.env.JINA_API_KEY;
const JINA_EMBEDDING_URL = "https://api.jina.ai/v1/embeddings";
const JINA_EMBEDDING_MODEL = "jina-embeddings-v2-base-en";

// ===== Groq for Chat =====
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_CHAT_MODEL = "llama-3.1-8b-instant";

// ===== Pinecone Client (Modern SDK) =====
const { Pinecone } = require("@pinecone-database/pinecone");
let pineconeIndex = null;
let pineconeReady = false;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX || "";

// ===== Guards =====
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not set. Exiting.");
  process.exit(1);
}

// ===== Middleware =====
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// ===== Multer (memory) =====
const memoryStorage = multer.memoryStorage();

// For PDF upload (RAG)
const uploadPdf = multer({
  storage: memoryStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed"), false);
  }
}).single("pdf_files");

// For general file upload (GridFS)
const uploadFile = multer({ storage: memoryStorage }).single("file");

// For voice upload (AssemblyAI)
const uploadVoice = multer({ storage: memoryStorage }).single("audio");

// ===== GridFS =====
let bucket = null;

function waitForStreamFinish(stream) {
  return new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

/* =========================
   Upload / Download (GridFS)
   ========================= */

app.post("/upload", (req, res) => {
  uploadFile(req, res, async (multerErr) => {
    try {
      if (multerErr) {
        console.error("Multer error:", multerErr);
        return res.status(400).json({ error: multerErr.message || "File upload failed" });
      }
      if (!bucket) return res.status(503).json({ error: "Storage not ready" });
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      const filename = `${Date.now()}-${req.file.originalname}`;
      const uploadStream = bucket.openUploadStream(filename, {
        contentType: req.file.mimetype
      });
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
});

app.get("/file/:filename", async (req, res) => {
  try {
    if (!bucket) return res.status(503).json({ error: "Storage not ready" });
    const file = await mongoose.connection.db
      .collection("uploads.files")
      .findOne({ filename: req.params.filename });
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

app.get("/download/:filename", async (req, res) => {
  try {
    if (!bucket) return res.status(503).json({ error: "Storage not ready" });
    const file = await mongoose.connection.db
      .collection("uploads.files")
      .findOne({ filename: req.params.filename });
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

/* =========================
   AssemblyAI Transcription
   ========================= */

app.post("/api/transcribe", (req, res) => {
  uploadVoice(req, res, async (multerErr) => {
    try {
      if (multerErr) {
        console.error("Multer error:", multerErr);
        return res.status(400).json({ error: multerErr.message || "Audio upload failed" });
      }
      if (!req.file || !req.file.buffer) {
        return res.status(400).json({ error: "No audio file uploaded" });
      }

      const audioBuffer = req.file.buffer;

      const uploadResponse = await axios.post(`${AAI_BASE}/upload`, audioBuffer, {
        headers: {
          authorization: ASSEMBLYAI_API_KEY,
          "content-type": "application/octet-stream",
          "transfer-encoding": "chunked"
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      });

      const audioUrl = uploadResponse.data.upload_url;
      if (!audioUrl) throw new Error("Upload did not return upload_url");

      const transcriptResponse = await axios.post(
        `${AAI_BASE}/transcript`,
        { audio_url: audioUrl, language_code: "hi" },
        { headers: { authorization: ASSEMBLYAI_API_KEY } }
      );

      const transcriptId = transcriptResponse.data.id;
      if (!transcriptId) throw new Error("Transcript request did not return id");

      let transcriptText = "";
      while (true) {
        const poll = await axios.get(`${AAI_BASE}/transcript/${transcriptId}`, {
          headers: { authorization: ASSEMBLYAI_API_KEY }
        });
        if (poll.data.status === "completed") {
          transcriptText = poll.data.text || "";
          break;
        } else if (poll.data.status === "error") {
          throw new Error(poll.data.error || "Transcription failed");
        }
        await new Promise((r) => setTimeout(r, 3000));
      }

      return res.json({ text: transcriptText });
    } catch (err) {
      console.error("Backend AssemblyAI Error:", err?.response?.data || err.message || err);
      return res.status(500).json({ error: err.message || "Internal error" });
    }
  });
});

/* =========================
   Gemini Proxy
   ========================= */
   app.post("/api/gemini/generate", async (req, res) => {
    try {
      const { prompt } = req.body || {};
      if (!prompt) return res.status(400).json({ error: "Missing prompt" });
  
      // Use Groq instead of Gemini
      const groqResponse = await axios.post(
        GROQ_CHAT_URL,
        {
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }]
        },
        {
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );
  
      const answer = groqResponse.data.choices[0]?.message?.content || "No response";
      
      // Return in a Gemini-compatible format
      return res.json({
        candidates: [{
          content: {
            parts: [{ text: answer }]
          }
        }]
      });
    } catch (err) {
      console.error("Groq proxy error:", err?.response?.data || err.message);
      return res.status(500).json({ error: "Request failed" });
    }
  });
  

/* =========================
   RAG Helpers (Jina/Groq/Pinecone)
   ========================= */

function chunkText(text, chunkSize = 1000, overlap = 200) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(text.length, start + chunkSize);
    const chunk = text.slice(start, end).trim();
    if (chunk.length) chunks.push(chunk);
    start += chunkSize - overlap;
  }
  return chunks;
}

// --- Jina Embedding Function ---
async function createJinaEmbeddings(texts) {
  const response = await axios.post(
    JINA_EMBEDDING_URL,
    {
      input: texts,
      model: JINA_EMBEDDING_MODEL
    },
    {
      headers: {
        Authorization: `Bearer ${JINA_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );
  return response.data.data.map((item) => item.embedding);
}

// --- Pinecone Helpers (Modern SDK) ---
async function pineconeUpsert(vectors) {
  await pineconeIndex.upsert(vectors);
}

async function pineconeQuery(vector, topK = 4) {
  const result = await pineconeIndex.query({
    vector,
    topK,
    includeMetadata: true
  });
  return result.matches || [];
}

/* =========================
   RAG Endpoints (Jina + Groq)
   ========================= */

   app.post("/init_rag", (req, res) => {
    uploadPdf(req, res, async (multerErr) => {
      try {
        if (multerErr) return res.status(400).json({ error: multerErr.message });
        if (!req.file) return res.status(400).json({ error: "No PDF uploaded." });
  
        console.log(`📄 Processing PDF: ${req.file.originalname}`);
        const data = await pdfParse(req.file.buffer);
        const text = (data.text || "").trim();
        if (!text || text.length < 50) {
          return res.status(400).json({ error: "PDF has insufficient text." });
        }
  
        const chunks = chunkText(text);
        console.log(`✅ Extracted ${text.length} chars, created ${chunks.length} chunks.`);
  
        const embeddings = await createJinaEmbeddings(chunks);
  
        const vectors = embeddings.map((emb, i) => ({
          id: `doc-${Date.now()}-${i}`,
          values: emb,
          metadata: { text: chunks[i], chunkIndex: i, source: req.file.originalname }
        }));
  
        if (!pineconeReady) return res.status(503).json({ error: "Vector DB not ready." });
        
        // ✅ CLEAR OLD DATA: Delete all vectors before uploading new PDF
        console.log("🗑️ Clearing previous PDF data from Pinecone...");
        try {
          await pineconeIndex.deleteAll();
          console.log("✅ Old data cleared successfully");
          
          // ✅ ADD DELAY to ensure cleanup completes
          await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
          
        } catch (deleteErr) {
          console.warn("⚠️ Could not clear old data:", deleteErr.message);
        }
        
        console.log("🔍 Attempting to upsert", vectors.length, "vectors");
        console.log("🔍 First vector dimension:", vectors[0].values.length);
        
        await pineconeUpsert(vectors);
  
        console.log(`✅ Indexed ${vectors.length} vectors to Pinecone via Jina AI.`);
        return res.json({ ok: true, inserted: vectors.length });
      } catch (err) {
        console.error("init_rag error:", err);
        return res.status(500).json({ error: "RAG initialization failed." });
      }
    });
  });
  
app.post("/ask_question", async (req, res) => {
  try {
    const { query } = req.body || {};
    if (!query) return res.status(400).json({ error: "Missing query" });

    // 1. Create query embedding with Jina AI
    const qEmbedding = (await createJinaEmbeddings([query]))[0];

    // 2. Query Pinecone
    if (!pineconeReady) return res.status(503).json({ error: "Vector DB not ready." });
    const matches = await pineconeQuery(qEmbedding, 4);
    const context = matches.map((m) => m.metadata?.text || "").join("\n\n---\n\n");

    // 3. Generate answer with Groq
    const prompt = `Using the following context, answer the question.
Context:
${context}

Question: ${query}

Answer:`;

    const groqResponse = await axios.post(
      GROQ_CHAT_URL,
      {
        model: GROQ_CHAT_MODEL,
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const answer = groqResponse.data.choices[0]?.message?.content || "No answer produced.";

    return res.json({
      answer,
      sources: matches.map((m) => ({ id: m.id, score: m.score, snippet: m.metadata?.text || "" }))
    });
  } catch (err) {
    console.error("ask_question error:", err.response ? err.response.data : err.message);
    return res.status(500).json({ error: "Failed to get answer from AI." });
  }
});

/* =========================
   Other Routers & Health
   ========================= */

app.use("/user", userRouter);
app.use("/grievance", grievanceRouter);

app.get("/", (_req, res) => res.send("✅ E-JanSamvad backend is running successfully!"));

/* =========================
   Start
   ========================= */

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: "uploads" });
    console.log("✅ Mongo connected & GridFS bucket initialized.");

    if (PINECONE_API_KEY && PINECONE_INDEX_NAME) {
      try {
        const pc = new Pinecone({ apiKey: PINECONE_API_KEY });
        pineconeIndex = pc.index(PINECONE_INDEX_NAME);
        pineconeReady = true;
        console.log("✅ Pinecone initialized successfully");
      } catch (err) {
        pineconeReady = false;
        console.error("❌ Failed to initialize Pinecone:", err);
      }
    }

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();


