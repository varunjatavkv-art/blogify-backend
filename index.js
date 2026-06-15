const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const userRouter = require("./routes/user.js");
const blogRouter = require("./routes/blog.js");
const ConnectMongoDB = require("./db_con/db_connection");
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT;


dotenv.config();
const app = express();

app.use(express.json()); 
app.use(cookieParser());
app.use(express.static(__dirname + '/uploads'));
path.resolve("public");

ConnectMongoDB(process.env.MONGO_URI);

app.use("/user", userRouter);

app.use('/blog', blogRouter);
app.listen(PORT, () => {
    console.log(`Server is running on PORT : `, PORT);
})