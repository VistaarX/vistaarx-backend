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

    active: {
      type: Boolean,
      default: false,
    },
    socketId: {
      type: String,
      default: "",
    },
    jwtToken: [String],

    location: {
      type: Object,
    },
    education: {
      type: String,
      trim: true,
    },

    connections: [{ type: Schema.Types.ObjectId, ref: "User" }],

    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "orders",
      },
    ],
  },

  { timestamps: true }
);

UserSchema.index({ name: "text", email: "text" });
module.exports = mongoose.model("User", UserSchema);
