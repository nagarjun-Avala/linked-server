require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

const http = require("http").createServer(app);

//Routes
app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/posts", require("./routes/postRouter"));
app.use("/api/user", require("./routes/userRouter"));

mongoose
  .connect(process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: "true",
  })
  .then(() => console.log("Connected to mongoDB!"));

const port = process.env.PORT || 8000;

http.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/api/`);
});
