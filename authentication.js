const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authentication = (req,res) =>{
    try {
        const token = req.cookies.authToken;
        if(!token) return res.json({status: 401, message:"No token provided!!"});
        jwt.verify(token, process.env.JWT_SECRET,(err, decodedPayload) => {
            if (err) return res.status(403).json({ message: "Invalid token" });
            req.user = decodedPayload; 
            
            next();
        })
    } catch (error) {
        res.json({status: 500, message: "Error in authenticating a token:", error});
    }
   
}