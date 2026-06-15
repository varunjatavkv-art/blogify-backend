const { Router } = require("express");
const BLOG = require("../models/blog");
const multer  = require('multer');
const authentication = require('../authentication');

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


router.post("/create_blog",authentication, upload.single('blogImage'), async(req,res) => {
    try {
        const { filename : blogImage } = req.file;
        const { blogTitle, blogDescription } = req.body;
        const author = req.user.id;
     
        
        const blog = await BLOG.create({
            blogImage,
            blogTitle,
            blogDescription,
            author
        });
        res.json({status: 201, message: "A new blog is created Successfully !!"});
    } catch (error) {
        console.log(error);
        
        res.send({status: 500, message: "Error in creating a blog:", error})
    }
});

module.exports = router;