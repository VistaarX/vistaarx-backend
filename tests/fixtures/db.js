const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Product = require("../../models/Product");
const Order = require("../../models/Order");
const Post = require("../../models/Post");
const bcrypt = require("bcrypt");
const JWT_SECRET="testsecret";

const userOneId = new mongoose.Types.ObjectId();
const test_pass = "test"
const userOne = {
  _id: userOneId,
  name: "Test1",
  email: "test1@vistaarx.com",
  password: test_pass,
  phone_num: "8181818181",
  jwtToken: [jwt.sign({ _id: userOneId }, JWT_SECRET)],
  posts: [],
  connections: [],
  //company_profile: "",
  orders: [],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "Test2",
  email: "test2@vistaarx.com",
  password: test_pass,
  phone_num: "8282828282",
  jwtToken: [jwt.sign({ _id: userTwoId }, JWT_SECRET)],
  posts: [],
  connections: [],
  //company_profile: "",
  orders: [],
};

const profileOne = {
  _id: new mongoose.Types.ObjectId(),
  name: "Profile1",
  logo: "logo_url",
  owners: [userOne._id],
  code: "1212",
  products: [],
  orders: [],
  views: [userOne._id],
  /* manu: "",
  distributor: "",
  retailer: "", */
};

const productOne = {
  _id: new mongoose.Types.ObjectId(),
  image: "image_url",
  product_name: "Product",
  price: 2000,
  profile: profileOne._id,
};

const orderOne={
  from:userOne._id,
  to:profileOne._id,
  product:productOne._id
}

const postOne={
  user:userTwo._id,
  content:"Hello Test",
  image:"image_url",
  likes:[userOne._id]
}


const userId = new mongoose.Types.ObjectId();
const fullFledgedUser={
  _id: userId,
  name: "USERTEST",
  email: "usertest@vistaarx.com",
  password: test_pass,
  phone_num: "7676767676",
  jwtToken: [jwt.sign({ _id: userId }, JWT_SECRET)],
  posts: [],
  connections: [userOne._id, userTwo._id],
  company_profile: profileOne._id,
  orders: [],
}

const populate_setup_database = async () => {
  await User.deleteMany();
  await Profile.deleteMany();
  await Product.deleteMany();
  await Order.deleteMany();
  await Post.deleteMany();
  userOne.password=await bcrypt.hash(userOne.password, 8)
  await new User(userOne).save();
  userTwo.password=await bcrypt.hash(userTwo.password, 8)
  await new User(userTwo).save();
  fullFledgedUser.password=await bcrypt.hash(fullFledgedUser.password, 8)
  await new User(fullFledgedUser).save();
  await new Profile(profileOne).save();
  await new Product(productOne).save();
  await new Order(orderOne).save();
  await new Post(postOne).save();
};

module.exports = {
  userOne,
  fullFledgedUser,
  orderOne,
  userOneId,
  productOne,
  profileOne,
  test_pass,
  postOne,
  populate_setup_database,
};
