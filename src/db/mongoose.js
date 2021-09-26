const mongoose = require("mongoose");

const con = mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo Database connect successfuly");
  })
  .catch((err) => {
    console.log(err);
  });
