const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },

  { timestamps: true }
);

module.exports = model("Order", orderSchema);
