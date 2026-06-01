const { Router } = require("express");
const USER = require("../models/user");
const router = Router();

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
        res.json({status: 500, message: "Error in creation of a new user", error});
    }
});
module.exports = router;