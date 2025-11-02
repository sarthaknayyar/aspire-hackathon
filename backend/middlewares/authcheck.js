// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        // console.log("hi1");
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }
    
    try {
        // console.log("hi2");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        // console.log("hi3");
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user; // attach user to request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid', error });
    }
};

module.exports = authMiddleware;