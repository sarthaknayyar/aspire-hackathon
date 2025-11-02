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

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

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
const storage = multer.memoryStorage();
const upload = multer({ storage });

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