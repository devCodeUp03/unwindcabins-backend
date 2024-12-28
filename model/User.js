const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    // required: true,
  },
  gender: {
    type: String,
    // required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  usertype: {
    type: String
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
