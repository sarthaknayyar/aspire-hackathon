const jwt = require('jsonwebtoken');
const secretkey = "sarthak";

function checkLogin(req, res, next) {
    try {
        if (!req.cookies.token) {
            console.log("No token found");
            return res.status(401).json({ message: "No authentication token found" });
        }

        console.log("Token found:", req.cookies.token);
        const token = req.cookies.token;

        const user = jwt.verify(token, secretkey);
        req.user = user;
        console.log("User:", user);
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(401).json({ message: "Authentication failed" });
    }
}

module.exports = { checkLogin };
