const express = require("express");
const User = require("../models/userModel");

const usercontroller = {
  createUser: async (req, res) => {
    const user = new User(req.body);

    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (e) {
      res.status(400).send(e);
    }
  },

  //login
  login: async (req, res) => {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (e) {
      res.status(400).send();
    }
  },

  //logout
  logout: async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
      });
      await req.user.save();

      res.send();
    } catch (e) {
      res.status(500).send();
    }
  },

  connectionreq: async (req, res) => {
    if (req.user.connections.includes(req.body.id)) {
      res.status(403).json("already connected");
    } else if (req.user._id == req.body.id) {
      res.status(403).json("you cant connect yourself");
    } else {
      try {
        const user = await User.findById(req.body.id);

        if (!user.pending.includes(req.user.id)) {
          await user.updateOne({ $push: { pending: req.user.id } });

          res.status(200).json("connection request sent");
        } else {
          await user.updateOne({ $pull: { pending: req.user.id } });

          res.status(403).json("connection request cancelled");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    }
  },

  accept: async (req, res) => {
    try {
      const user = await User.findById(req.body.id);

      if (!user) {
        return res.status(404).send("User does not exists");
      } else if (!req.user.pending.includes(req.body.id)) {
        return res.status(403).send("User is not in pending list");
      } else if (req.user.connections.includes(req.body.id)) {
        return res.status(200).send("You are already connected");
      } else {
        req.user.connections.push(user);
        user.connections.push(req.user);
        req.user.pending.splice(req.body.id.indexOf(), 1);
        user.save();
        req.user.save();
        return res.status(200).send(`You and ${user.name} are now connected`);
      }
    } catch (err) {
      res.status(500).json(err);

      console.log(err);
    }
  },

  decline: async (req, res) => {
    try {
      const user = await User.findById(req.body.id);
      if (!user) {
        return res.status(404).send("User does not exists");
      }

      if (!req.user.pending.includes(user._id)) {
        return res.status(403).send("User not in pending list");
      }

      let index = req.user.pending.indexOf(req.body.id);
      req.user.pending.splice(index, 1);
      await req.user.save();
      res.send("Connection declined");
    } catch (e) {
      res.status(500).send(e);
    }
  },
};

module.exports = usercontroller;
