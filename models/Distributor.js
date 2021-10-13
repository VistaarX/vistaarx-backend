const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const distSchema = new mongoose.Schema({
  profile: { type: Schema.Types.ObjectId, ref: "Profile" },

  turnover: {
    type: String,

    trim: true,
  },

  gst: {
    type: String,
    required: true,
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

  areas_of_supply: {
    type: String,
  },

  email: {
    type: String,
    unique: true,
  },

  address: {
    type: String,
  },

  about: {
    type: String,
  },
});
module.exports = model("Distributor", distSchema);
