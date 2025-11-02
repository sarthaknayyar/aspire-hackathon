const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { setUser, getUser } = require('../authservice');
const { checkLogin } = require('../middlewares/auth');
const authMiddleware = require('../middlewares/authcheck');
const jwt = require('jsonwebtoken');



router.get('/userInfo', authMiddleware,  async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            console.log('User not found');
            console.log(userId);
            return res.status(403).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user info', error });
    }
})

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
        state: req.body.state, 
        pincode: req.body.pincode
    });
        // console.log(user);

        user.save().then((data)=>{
           return res.status(200).json(data);
        }).catch((error)=>{
           return res.status(400).json(error);
        });
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        // Return token and user (without password)
        const { password: _, ...userData } = user.toObject();

        res.status(200).json({
            message: 'Login successful',
            token,
            user: userData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error logging in', error });
    }
});

router.get("/validate", (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
  
    try {
      const user = getUser(token); // jwt.verify
      res.status(200).json({ user });
      console.log(user);
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  });
  

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

router.put("/profileUpdate", authMiddleware, async (req, res) => {
    try {
      const userId = req.user._id;
      const { name, gender, state, city, pincode, address, mobile } = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, gender, state, city, pincode, address, phone: mobile },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        console.log("User not found!");
        return res.status(404).json({ message: "User not found" });
      }
  
      // create a new token (ensure setUser returns a token string)
      const token = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
  
      // Prepare sanitized user object (remove password)
      const { password: _, ...userData } = updatedUser.toObject();
  
      console.log("Updated User:", userData);
      return res.status(200).json({
        message: "Profile updated successfully",
        user: userData,
        token, // <- return token so frontend can store in localStorage
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  });
  



router.get("/username", checkLogin, async (req, res)=>{
    const user = req.user.user;
    // console.log("hi"+user);
    if(!user){
        return res.json({message: "User not found"});
    }
    return res.json(user);
})

router.get('/allusers/contact', async (req, res)=>{
    const users = await User.find({});
    return res.json(users);
})

module.exports = router;