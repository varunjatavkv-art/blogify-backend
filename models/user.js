const mongoose = require("mongoose");
const bcrypt  = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userProfileImg: {
        type: String,
        required: true,
        default: "/public/user.png"
    },
    role: {
        type: String,
        enum: ['0', '1'],
        default: '0',
        comment: "0 - USER, 1- ADMIN"
    }
}, { timestamps: true });

userSchema.pre("save", async function(next) {
    try {
        const user = this;
        if(!user.isModified("password")) return next;
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password,salt);
        this.password = hashedPassword;
        next;
    } catch (error) {
        next;
    }
   
})

const USER = mongoose.model("User", userSchema);
module.exports = USER;