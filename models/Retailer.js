const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const retailSchema = new mongoose.Schema({
  profile: { type: Schema.Types.ObjectId, ref: "Profile" },

  turnover: {
    type: String,
    required: true,
    trim: true,
  },

  gst: {
    type: String,
  },

  product_category: {
    type: String,
  },

  year: {
    type: String,
  },

  trademark: {
    type: String,
  },

  legal_status: {
    type: String,
  },

  main_markets: {
    type: String,
  },

  number: {
    type: String,
  },

  address: {
    type: String,
  },

  about: {
    type: String,
  },
});
module.exports = model("Retailer", retailSchema);
