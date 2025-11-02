const express = require("express");
const Grievance = require("../models/grievance");
const { checkLogin } = require("../middlewares/auth");
const authMiddleware = require('../middlewares/authcheck');

const router = express.Router();

// Create Grievance
router.post("/", authMiddleware, async (req, res) => {
    console.log(req.user);
    const username = req.user.name;
    const email = req.user.email;
    const { department, description } = req.body;
    const grievance = new Grievance({
        complainantName: username,
        complainantEmail: email,
        department,
        description,
        fileName: req.body.fileName,
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
})

module.exports = router;