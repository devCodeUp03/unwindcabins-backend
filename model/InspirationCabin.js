const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InspirationCabinSchema = new Schema({
  image: {
    type: String,
  },
  wish: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

const InspirationCabin = mongoose.model(
  "InspirationCabin",
  InspirationCabinSchema
);

module.exports = InspirationCabin;
