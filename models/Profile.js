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

  code: {
    type: Number,
  },

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],

  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  views: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  manu: {
    type: Schema.Types.ObjectId,
    ref: "Manu",
  },
  distributor: {
    type: Schema.Types.ObjectId,
    ref: "Distributor",
  },
  retailer: {
    type: Schema.Types.ObjectId,
    ref: "Retailer",
  },
});

module.exports = model("Profile", profileSchema);
