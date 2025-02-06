const express = require("express");
const Grievance = require("../models/grievance");

const router = express.Router();

// Create Grievance
router.post("/", async (req, res) => {
  try {
    const newGrievance = new Grievance(req.body);
    await newGrievance.save();
    res.status(201).json(newGrievance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch All Grievances
router.get("/", async (req, res) => {
  try {
    const grievances = await Grievance.find();
    res.json(grievances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch a Single Grievance by Code
router.get("/:grievanceCode", async (req, res) => {
  try {
    const grievance = await Grievance.findOne({ grievanceCode: req.params.grievanceCode });
    if (!grievance) return res.status(404).json({ message: "Grievance not found" });
    res.json(grievance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Grievance Status
router.put("/:grievanceCode", async (req, res) => {
  try {
    const grievance = await Grievance.findOneAndUpdate(
      { grievanceCode: req.params.grievanceCode },
      { $set: req.body },
      { new: true }
    );
    if (!grievance) return res.status(404).json({ message: "Grievance not found" });
    res.json(grievance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
