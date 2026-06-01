const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const userRouter = require("./routes/user.js");
const ConnectMongoDB = require("./db_con/db_connection");
const PORT = process.env.PORT;


dotenv.config();
const app = express();

app.use(express.json()); 

path.resolve("public");

ConnectMongoDB(process.env.MONGO_URI);
app.get("/", (req,res) => {
  res.end("<h1>Hello World</h1>")
});
app.use("/user", userRouter);
app.listen(PORT, () => {
    console.log(`Server is running on PORT : `, PORT);
})