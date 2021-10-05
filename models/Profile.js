const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  logo: {
    type: String,
  },

  owners: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});
module.exports = model("Profile", profileSchema);
