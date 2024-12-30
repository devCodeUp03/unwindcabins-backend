const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const BookSchema = new Schema({
  cabinId: {
    type: ObjectId,
    required: true,
  }, //id of the cabin
  rate: {
    type: Number,
    required: true,
  },
  cabinName: {
    type: String,
    required: true,
  },
  travellers: {
    type: Number,
    required: true,
  },
  checkin: {
    type: Date,
    required: true,
  },
  checkout: {
    type: Date,
    required: true,
  },
  bookedBy: {
    type: ObjectId,
    required: true,
  },
});
const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
