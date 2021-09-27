const mongoose = require("mongoose");

const manuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  gst: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  turnover: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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

const manu = mongoose.model("Manufacturer", manuSchema);
module.exports = manu;

const distSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  gst: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  product_category: {
    type: String,
  },

  turnover: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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

  target_areas: {
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

const dist = mongoose.model("Distributor", distSchema);
module.exports = dist;

const retailerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  gst: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  turnover: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  product_category: {
    type: String,
  },

  year: {
    type: String,
  },

  address: {
    type: String,
  },

  about: {
    type: String,
  },
});

const retailer = mongoose.model("Retailer", retailerSchema);
module.exports = retailer;
