const app=require("./app");
const http = require("http");
const server = http.createServer(app);
const { PORT } = require("./config");

const io = require("socket.io")(server);
app.use((req, res, next) => {
  io.req = req;
  req.io = io;
  next();
});
require("./socket")(io);

server.listen(PORT, () => console.log(`server started on port ${PORT}`));
