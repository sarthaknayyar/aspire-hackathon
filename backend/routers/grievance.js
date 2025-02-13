const express = require("express");
const Grievance = require("../models/grievance");
const { checkLogin } = require("../middlewares/auth");

const router = express.Router();

// Create Grievance
router.post("/", checkLogin, async (req, res) => {
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
        const { currentStatus } = req.body; // Extract only the currentStatus field

        if (!currentStatus) {
            return res.status(400).json({ message: "currentStatus is required" });
        }

        const grievance = await Grievance.findOneAndUpdate(
            { grievanceCode: req.params.grievanceCode },
            { $set: { currentStatus } }, // Only update currentStatus
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
