const mongoose = require('mongoose');
const HTTPStatus = require('http-status');
const Question = mongoose.model('Question');


exports.getQuestions = async (req, res) => {
  const questions = await Question.find();
  res.status(HTTPStatus.OK).json({questions});
};
