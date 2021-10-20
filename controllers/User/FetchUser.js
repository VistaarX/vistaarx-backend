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

    res.set("Content-Type", "image/png");

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.fetchRecommandedUsers = async (req, res) => {
  try {
    const users = await User.find()
      .where("_id")
      .ne(req.userId)
      .populate("connections");

    const usersData = users.map((user) => {
      return FilterUserData(user);
    });
    res.status(200).json({ users: usersData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("connections");
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const userData = FilterUserData(user);

    const connections = user.connections.map((connection) => {
      return {
        ...FilterUserData(connection),
      };
    });

    userData.connections = connections;
    const notifications = await Notification.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    let notifData = notifications.map((notif) => {
      return {
        id: notif.id,
        body: notif.body,
        createdAt: notif.createdAt,
      };
    });

    res.status(200).json({ user: userData, notifications: notifData });
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
