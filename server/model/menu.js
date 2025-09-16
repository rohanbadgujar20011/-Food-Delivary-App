const mongoose = require("mongoose");
const { Schema } = mongoose; // Destructuring Schema from mongoose

const menuSchema = new Schema({
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true, // It should be "required" not "require"
  },
});

module.exports = mongoose.model("Menu", menuSchema);
