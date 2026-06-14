const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    blogImage: {
        type: String,
        required: true
    },
    blogTitle: {
        type: String,
        required: true
    },
    blogDescription: {
        type: String,
        required: true
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    likedBy: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }]
}, {
    timestamps: true
});

const BLOG = mongoose.model("Blog", blogSchema);
module.exports = BLOG;