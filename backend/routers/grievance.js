const express = require("express");
const Grievance = require("../models/grievance");
const { checkLogin } = require("../middlewares/auth");

const router = express.Router();

// Create Grievance
router.post("/", checkLogin,  async (req, res) => {
  const username = req.user.user.name;
  const email = req.user.user.email;
  const { department, description } = req.body;
  const grievance = new Grievance({
    complainantName: username,
    complainantEmail: email,
    department,
    description,
  });
  console.log(grievance);
  console.log(req.body);
  try {
    const newGrievance = await grievance.save();
    res.status(201).json(newGrievance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

});

// Fetch All Grievances
router.get("/", checkLogin, async (req, res) => {
  try {
    const useremail = req.user.user.email;
    const grievances = await Grievance.find({ complainantEmail: useremail });
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
