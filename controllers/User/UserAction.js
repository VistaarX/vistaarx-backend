const User = require("../../models/User");
const ConnectionRequest = require("../../models/connectionRequest");
const FilterUserData = require("../../utils/FilterUserData");
const Notification = require("../../models/Notification");
const CreateNotification = require("../../utils/CreateNotification");

exports.sendConnectionRequest = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.userId == req.params.userId) {
      return res
        .status(400)
        .json({ error: "You cannot send connection request to yourself" });
    }

    if (user.connections.includes(req.userId)) {
      return res.status(400).json({ error: "Already Connections" });
    }

    const connectionRequest = await ConnectionRequest.findOne({
      sender: req.userId,
      receiver: req.params.userId,
    });

    if (connectionRequest) {
      return res.status(400).json({ error: "Connection Request already send" });
    }

    const newConnectionRequest = new ConnectionRequest({
      sender: req.userId,
      receiver: req.params.userId,
    });

    const save = await newConnectionRequest.save();

    const connection = await ConnectionRequest.findById(save.id).populate(
      "receiver"
    );

    const chunkData = {
      id: connection.id,
      user: FilterUserData(connection.receiver),
    };

    res
      .status(200)
      .json({ message: "Connection Request Sended", connection: chunkData });

    const sender = await ConnectionRequest.findById(save.id).populate("sender");
    let notification = await CreateNotification({
      user: req.params.userId,
      body: `${sender.sender.name} has send you connection request`,
    });
    const senderData = {
      id: sender.id,
      user: FilterUserData(sender.sender),
    };

    if (user.socketId) {
      req.io
        .to(user.socketId)
        .emit("connection-request-status", { sender: senderData });
      req.io.to(user.socketId).emit("Notification", { data: notification });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.acceptConnectionRequest = async (req, res) => {
  try {
    const connectionsRequest = await ConnectionRequest.findById(
      req.params.requestId
    );
    if (!connectionsRequest) {
      return res
        .status(404)
        .json({ error: "Request already accepted or not sended yet" });
    }

    const sender = await User.findById(connectionsRequest.sender);
    if (sender.connections.includes(connectionsRequest.receiver)) {
      return res
        .status(400)
        .json({ error: "already in your connection lists" });
    }
    sender.connections.push(req.userId);
    await sender.save();

    const currentUser = await User.findById(req.userId);
    if (currentUser.connections.includes(connectionsRequest.sender)) {
      return res.status(400).json({ error: "already  connection " });
    }
    currentUser.connections.push(connectionsRequest.sender);
    await currentUser.save();

    const chunkData = FilterUserData(sender);

    await ConnectionRequest.deleteOne({ _id: req.params.requestId });
    res
      .status(200)
      .json({ message: "Connection Request Accepted", user: chunkData });

    let notification = await CreateNotification({
      user: sender.id,
      body: `${currentUser.name} has accepted your connection request`,
    });
    if (sender.socketId) {
      let currentUserData = FilterUserData(currentUser);
      req.io.to(sender.socketId).emit("connection-request-accept-status", {
        user: currentUserData,
        request_id: req.params.requestId,
      });
      req.io.to(sender.socketId).emit("Notification", { data: notification });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.cancelSendedConnectionRequest = async (req, res) => {
  try {
    const connectionsRequest = await ConnectionRequest.findById(
      req.params.requestId
    ).populate("receiver");
    if (!connectionsRequest) {
      return res
        .status(404)
        .json({ error: "Request already cenceled or not sended yet" });
    }
    await ConnectionRequest.deleteOne({ _id: req.params.requestId });

    res.status(200).json({ message: "Connection Request Canceled" });
    if (connectionsRequest.receiver.socketId) {
      req.io
        .to(connectionsRequest.receiver.socketId)
        .emit("sended-connection-request-cancel", {
          requestId: req.params.requestId,
        });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.declineConnectionRequest = async (req, res) => {
  try {
    const connectionsRequest = await ConnectionRequest.findById(
      req.params.requestId
    ).populate("sender");
    if (!connectionsRequest) {
      return res
        .status(404)
        .json({ error: "Request already declined or not sended yet" });
    }
    await ConnectionRequest.deleteOne({ _id: req.params.requestId });

    res.status(200).json({ message: "Connection Request Declined" });
    if (connectionsRequest.sender.socketId) {
      req.io
        .to(connectionsRequest.sender.socketId)
        .emit("received-connection-request-decline", {
          requestId: req.params.requestId,
        });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.updateProfilePic = async (req, res) => {
  const { profile_url } = req.body;
  try {
    const user = await User.findById(req.userId);
    user.profile_pic = profile_url;
    await user.save();

    const getUser = await User.findById(req.userId).populate("connections");
    const userData = FilterUserData(getUser);

    const connections = getUser.connections.map((connection) => {
      return {
        ...FilterUserData(connection),
      };
    });

    userData.connections = connections;
    res.status(200).json({ message: "profile image updated", user: userData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (req.params.input === "name") {
      user.name = req.body.name;
    }
    if (req.params.input === "email") {
      user.email = req.body.email;
    }

    await user.save();
    res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.clearNotification = async (req, res) => {
  try {
    await Notification.deleteMany({ user: req.userId });
    res.status(200).json({ message: "Notification Cleared Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
