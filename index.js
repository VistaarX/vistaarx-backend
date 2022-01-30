const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const UserRoutes = require("./routes/User");
const AuthRoutes = require("./routes/Auth");
const PostRoutes = require("./routes/Post");
const ProfileRoutes = require("./routes/Profile");

const { PORT, MONGODB_URI } = require("./config");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  io.req = req;
  req.io = io;
  next();
});

app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/profile", ProfileRoutes);

require("./socket")(io);
console.log(MONGODB_URI)
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("database connected");
    server.listen(PORT, () => console.log(`server started on port ${PORT}`));
  })
  .catch((err) => console.log(err));
