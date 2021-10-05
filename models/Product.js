const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const productSchema = new mongoose.Schema({
  image: {
    type: String,
  },

  product_name: {
    type: String,
  },

  price: {
    type: Number,
  },
});

module.exports = model("Product", productSchema);
