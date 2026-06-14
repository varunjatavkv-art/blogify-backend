const { Router } = require("express");
const USER = require("../models/user");
const router = Router();
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
router.post("/signup", async (req,res) => {
    const { fullName, email, password } = req.body;
    
    try {
      
        const singleUser = await USER.create({
            fullName,
            email,
            password
        });
        res.json({status: 201, message: "A new user created Successfully !!"});

    } catch (error) {
        res.json({status: 500, message: "Error in creation of a new user:", error});
    }
});

router.post("/signin", async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await USER.findOne({email});
        if(!user) return res.json({status: 404, message: "Invalid Credentials"});
        const isValidPassword = bcrypt.compare(password, user.password);
        if(!isValidPassword) return res.json({status: 400, message: "Invalid Password"});

        req.user = user;
        const payload = {
            id: user._id,
            user_name: user.fullName,
            role: user.role,
            profile: user.userProfileImg
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET, {expiresIn: '1h'});

        res.cookie('authToken', token);
        res.json({status: 200, message: "Login Successfully!!" , payload: payload})
    } catch (error) {
        res.json({status: 500, message: "Error in login:", error});
    }
});

router.post('/logout', (req,res) => {
    try {
        res.clearCookie();
        res.send({status: 200, message: "User Logged out successfully!!"});
    } catch (error) {
        res.json({status: 500, message: "Error in logout:", error});
    }
})
module.exports = router;