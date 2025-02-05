const jwt = require('jsonwebtoken');
const secretkey = "sarthak";
function checkLogin(req,res,next){
    try{
        if(!req.cookies){
            console.log("No cookie found");
            return next();
        }
        console.log("Cookie found");
        const token = req.cookies?.token;
        const user = jwt.verify(token, secretkey);
        req.user = user;
        next();  
    }catch(err){
        res.status(401).json({message : "Authentication failed"});
    }    
}

module.exports = {checkLogin};