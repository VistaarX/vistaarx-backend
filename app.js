const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const UserRoutes = require("./routes/User");
const AuthRoutes = require("./routes/Auth");
const PostRoutes = require("./routes/Post");
const ProfileRoutes = require("./routes/Profile");

app.use(cors());
app.use(express.json());

app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/profile", ProfileRoutes);

const { MONGODB_URI } = require("./config");
const { MONGODB_TEST_URI } = require("./jest.config");
var MONGODB="";
// https://stackoverflow.com/questions/53394550/string-comparison-not-working-in-javascript-when-comparing-an-environment-variab
if(process.env.NODE_ENV){
  if(JSON.stringify(process.env.NODE_ENV.trim())===JSON.stringify("development")){
    MONGODB=MONGODB_URI;
  }
  else if(JSON.stringify(process.env.NODE_ENV.trim())===JSON.stringify("test")){
    MONGODB=MONGODB_TEST_URI;
  }
}
else{
  // todo, replace with the real production database
  MONGODB=MONGODB_URI;
}

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("database connected");
    console.log(process.env.NODE_ENV+"\n"+MONGODB);
  })
  .catch((err) => console.log(err));

module.exports = app;
