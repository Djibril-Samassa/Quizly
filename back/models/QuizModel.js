const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  about: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: {
    type: Array,
    required: true,
  },
  creator_id: {
    type: String,
    required: true
  }
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
