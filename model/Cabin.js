const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CabinSchema = new Schema({
  image: {
    type: String,
  },
  placeName: {
    type: String,
    required: true,
  },
  cabinName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Cabin = mongoose.model("Cabin", CabinSchema);

module.exports = Cabin;
