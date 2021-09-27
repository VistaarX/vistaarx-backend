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

const mongoose = require("mongoose");

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

  product_category:{
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

  target_areas:{
      type: String,
  }

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
