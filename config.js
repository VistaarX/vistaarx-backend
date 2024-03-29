require('dotenv').config()
module.exports = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET || "itssecret",
  JWT_EXP: process.env.JWT_EXPIRE || "10h",
};
