const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { setUser, getUser } = require('../authservice');



router.post('/signup', async (req, res)=>{
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create
       ({ name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        gender: req.body.gender,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state
    });
        // console.log(user);

        user.save().then((data)=>{
           return res.status(200).json(data);
        }).catch((error)=>{
           return res.status(400).json(error);
        });
})

router.post('/login', async (req, res)=>{
    const email = req.body.email;
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if(!validPassword){
        return res.json({message: "Invalid Password"});
    }
    const token =  setUser(user);
    res.cookie("token", token, {
        httpOnly: false,  // MUST be false for frontend JavaScript to access it
        secure: true,  // MUST be true in production with HTTPS
        sameSite: "None", // Allow cross-site access
        path: "/" // Make it accessible site-wide
    });
    
    return res.status(200).json({token});
})

router.get('/token/:token', async (req, res)=>{
    const token = req.params.token;
    const user = getUser(token);
    // console.log(user.user);
    return res.json(user.user);
})

router.get("/logout", async (req, res)=>{
    res.clearCookie("token", {
        httpOnly: true, // Ensure this matches your original cookie settings
        secure: true,
        sameSite: "None",
        path: "/"
    });
    res.status(200).json({ message: "Logged out successfully" });
})

// router.get("/username/:username", async (req, res)=>{
//     const username = req.params.username;
//     const user = await User.findOne({username: username});
//     // console.log("hi"+user);
//     if(!user){
//         return res.json({message: "User not found"});
//     }
//     return res.json(user);
// })

// router.get('/allusers/contact', async (req, res)=>{
//     const users = await User.find({});
//     return res.json(users);
// })

module.exports = router;