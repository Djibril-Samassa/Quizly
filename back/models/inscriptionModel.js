const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    required: true,
    type: String,
  },
  lastname: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
  },
  username: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
