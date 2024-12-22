const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  cabins: [
    {
      _id: ObjectId, //id of the cabin
      rate: {
        type: Number,
        required: true,
      },
      place: {
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
    },
  ],  
  bookedBy: {
    type: ObjectId,
    required: true,
  },
});
const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
