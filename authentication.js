const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authentication = (req,res, next) =>{
    try {
        const token = req.cookies.authToken;
        if(!token) return res.json({status: 401, message:"Unauthorized user !!"});
        jwt.verify(token, process.env.JWT_SECRET,(err, decodedPayload) => {
            if (err) return res.status(403).json({ message: "Invalid token" });
            req.user = decodedPayload; 
            next();
        })
    } catch (error) {
        console.log(error);
    }
   
};

module.exports = authentication;