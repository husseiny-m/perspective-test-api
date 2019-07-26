const mongoose = require('mongoose');
const HTTPStatus = require('http-status');
const Question = mongoose.model('Question');

exports.getQuestions = async (req, res) => {
  const questions = await Question.find().sort({_id :'asc'});
  res.status(HTTPStatus.OK).json(questions);
};
