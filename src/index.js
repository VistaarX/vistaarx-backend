const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/userRoutes.js");
//const postRouter = require("./routers/postRoutes.js");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(userRouter);
//app.use(postRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const User = require("./models/userModel.js");
