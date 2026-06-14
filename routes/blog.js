const { Router } = require("express");
const BLOG = require("../models/blog");
const multer  = require('multer');

const storage = multer.diskStorage({destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
},
 filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
 }
);

const upload = multer({ storage: storage })

const router = Router();


router.post("/create_blog", async(req,res) => {
    try {
        console.log("user",req.user);
        const { blogTitle, blogDescription } = req.body;
        const author = req.user._id;
     
        
        const blog = await BLOG.create({
            blogTitle,
            blogDescription,
            author
        });
        res.json({status: 201, message: "A new user created Successfully !!"});
    } catch (error) {
        console.log(error);
        
        res.json({status: 500, message: "Error in creating a blog:", error})
    }
});

module.exports = router;