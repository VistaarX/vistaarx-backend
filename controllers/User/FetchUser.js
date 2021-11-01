const User = require("../../models/User");
const Notification = require("../../models/Notification");
const ConnectionRequest = require("../../models/connectionRequest");
const FilterUserData = require("../../utils/FilterUserData");
const Manu = require("../../models/Manu");
const Product = require("../../models/Product");
const Profile = require("../../models/Profile");
const FilterManuData = require("../../utils/FilterManuData");
const Order = require("../../models/Order");

exports.fetchUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    console.log(user);

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.fetchRecommandedUsers = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const recommended_users = await User.find({
      $and: [{ _id: { $ne: user } }, { _id: { $nin: user.connections } }],
    });

    // .where("_id")
    // .ne(req.userId)

    res.status(200).json({ recommended_users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("connections");

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.fetchIncommingConnectionRequest = async (req, res) => {
  try {
    const connections = await ConnectionRequest.find({
      $and: [{ isAccepted: false }, { receiver: req.userId }],
    }).populate("sender");

    console.log(connections);

    res.status(200).json({ connections });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.fetchSendedConnectionRequest = async (req, res) => {
  try {
    const connections = await ConnectionRequest.find({
      $and: [{ isAccepted: false }, { sender: req.userId }],
    }).populate("receiver");
    const connectionsData = connections.map((connection) => {
      return {
        id: connection.id,
        user: FilterUserData(connection.receiver),
      };
    });

    res.status(200).json({ connections: connectionsData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const users = await User.find({
      name: { $regex: req.query.name, $options: "i" },
    }).populate("connections");

    const usersData = users.map((user) => FilterUserData(user));

    res.status(200).json({ users: usersData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getuserorders = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    console.log(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
