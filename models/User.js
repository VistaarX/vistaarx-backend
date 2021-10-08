const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    profile_pic: {
      type: String,
    },

    active: {
      type: Boolean,
      default: false,
    },
    socketId: {
      type: String,
      default: "",
    },
    jwtToken: [String],

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    connections: [{ type: Schema.Types.ObjectId, ref: "User" }],

    company_profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },

    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },

  { timestamps: true }
);

UserSchema.index({ name: "text", email: "text" });
module.exports = mongoose.model("User", UserSchema);
