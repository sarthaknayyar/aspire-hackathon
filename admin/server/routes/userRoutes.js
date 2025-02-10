const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Department Login (Mock Login)
router.post('/login', async (req, res) => {
    const { email } = req.body;

    const departmentMapping = {
        "agriculture@gmail.com": "Agriculture",
        "labour@gmail.com": "Labour",
        "railway@gmail.com": "Railway",
        "money@gmail.com": "Finance",
        "labourer@gmail.com": "Labourer"
    };

    if (departmentMapping[email]) {
        return res.json({ email, department: departmentMapping[email] });
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
});

module.exports = router;
