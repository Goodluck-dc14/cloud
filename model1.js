const mongoose = require("mongoose");
const Artiste = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      default: false,
    },
    order: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    price: {
      type: String,
      default: " price",
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("music", Artiste);
