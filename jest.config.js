require('dotenv').config()
module.exports={
  testEnvironment:"node",
  MONGODB_TEST_URI: process.env.MONGODB_TEST_URI,
}