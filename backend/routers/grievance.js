const express = require("express");
const Grievance = require("../models/grievance");
const { checkLogin } = require("../middlewares/auth");
const authMiddleware = require('../middlewares/authcheck');
const axios = require("axios");


const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const API_KEY = process.env.GEMINI_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_CHAT_MODEL = process.env.GROQ_CHAT_MODEL || "llama-3.1-8b-instant";
const GROQ_CHAT_URL = `https://api.groq.com/openai/v1/chat/completions`;

const router = express.Router();

// Create Grievance
router.post("/", authMiddleware, async (req, res) => {
    try {
      // console.log("Incoming create-grievance request body:", req.body);
      const username = req.user.name;
      const email = req.user.email;
  
      // Normalize isSpam robustly (handles boolean, string "true", number 1, etc.)
      const rawIsSpam = req.body.isSpam;
      const isSpam = rawIsSpam === true || rawIsSpam === "true" || rawIsSpam === 1 || rawIsSpam === "1";
  
      const grievanceData = {
        complainantName: username,
        complainantEmail: email,
        department: req.body.department,
        description: req.body.description,
        fileName: req.body.fileName,
        isSpam: !!isSpam,
        // If spam, set status so admins immediately see it (optional)
        currentStatus: isSpam ? "Under Review" : (req.body.currentStatus || undefined)
      };
  
      const grievance = new Grievance(grievanceData);
      console.log("Grievance object to save:", grievance);
  
      const newGrievance = await grievance.save();
  
      console.log("Saved grievance:", newGrievance);
      return res.status(201).json(newGrievance);
    } catch (err) {
      console.error("Error creating grievance:", err);
      return res.status(400).json({ error: err.message });
    }
  });
  

// Fetch All Grievances
router.get("/", authMiddleware, async (req, res) => {
    try {
        const useremail = req.user.email;
        const grievances = await Grievance.find({ complainantEmail: useremail });
        res.json(grievances);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch a Single Grievance by Code
router.get("/grievanceCode/:grievanceCode", async (req, res) => {
    try {
        const grievance = await Grievance.findOne({ grievanceCode: req.params.grievanceCode });
        if (!grievance) return res.status(404).json({ message: "Grievancevv not found" });
        res.json(grievance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Grievance Status
router.put("/grievanceCode/:grievanceCode", async (req, res) => {
    try {
        const { currentStatus, aiResolved } = req.body; // Extract both fields

        if (!currentStatus) {
            return res.status(400).json({ message: "currentStatus is required" });
        }

        const updateFields = { currentStatus }; // Initialize update object

        // ✅ Update `aiResolved` only if it is provided in the request
        if (aiResolved !== undefined) {
            updateFields.aiResolved = aiResolved;
        }

        const grievance = await Grievance.findOneAndUpdate(
            { grievanceCode: req.params.grievanceCode },
            { $set: updateFields }, // Update only provided fields
            { new: true }
        );

        if (!grievance) {
            return res.status(404).json({ message: "Grievance not found" });
        }

        res.json(grievance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.get("/allGrievances", async (req, res) => {
    // console.log("hi");
    try {
        // const useremail = req.user.user.email;
        // console.log("grievancehi");
        const grievances = await Grievance.find({});
        res.json(grievances);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/spam-check", async (req, res) => {
  console.log("groq spam-check request body:", req.body);
  try {
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ error: "Missing text" });

    // Prompt: ask for strict JSON response only
    const prompt = `You are a classifier that checks whether a user-submitted complaint is likely SPAM (e.g., gibberish, advertisements, repeated/irrelevant links, non-complaint promotional content).
Answer ONLY with valid JSON, nothing else, in this exact format:
{"spam": true|false, "score": 0.00-1.00, "reason": "<single-sentence justification>"}

Complaint:
"""${text.replace(/"/g, '\\"')}"""`;

    // Use Groq instead of Gemini
    const groqResponse = await axios.post(
      GROQ_CHAT_URL,
      {
        model: GROQ_CHAT_MODEL,
        messages: [
          {
            role: "system",
            content: "You are a spam detection system. Respond only with valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3, // Lower temperature for more consistent JSON output
        response_format: { type: "json_object" } // Request JSON mode (if supported)
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 60000
      }
    );

    // Extract model text from Groq response
    const modelText = groqResponse.data.choices[0]?.message?.content || null;

    if (!modelText) {
      return res.status(502).json({ error: "No model response" });
    }

    // Try parse JSON — model should return plain JSON
    let parsed;
    try {
      // Trim surrounding whitespace and possible code fences
      const cleaned = modelText.replace(/^[\s`]*|[\s`]*$/g, "");
      // find first { ... } substring if noise exists
      const m = cleaned.match(/\{[\s\S]*\}/);
      parsed = m ? JSON.parse(m[0]) : JSON.parse(cleaned);
    } catch (err) {
      console.error("Failed to parse JSON from model:", modelText);
      // fallback: return not-spam but include raw model text for debugging
      return res.status(200).json({ 
        spam: false, 
        score: 0, 
        reason: "unable to parse model output", 
        raw: modelText 
      });
    }

    // Normalize fields & clamp score
    const spam = !!parsed.spam;
    const score = Math.max(0, Math.min(1, Number(parsed.score) || 0));
    const reason = (parsed.reason || "").toString();

    return res.json({ spam, score, reason, raw: modelText });
  } catch (err) {
    console.error("Spam-check error:", err?.response?.data || err.message || err);
    const status = err?.response?.status || 500;
    return res.status(status).json({ 
      error: "Spam-check failed", 
      details: err?.response?.data || err.message 
    });
  }
});


module.exports = router;