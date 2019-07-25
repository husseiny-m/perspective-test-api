const mongoose = require('mongoose');
const HTTPStatus = require('http-status');
const User = mongoose.model('User');
const UserQuestion = mongoose.model('UserQuestion');

exports.createAnswers = async (req, res) => {
  // 1. Create User with Mail
  const user = await new User({email: req.body.email}).save();

  // 2. Create UserQuestion(s)
  const userAnswers = req.body.answers.map((userAnswer) => {
    return {
      user: user.id,
      question: userAnswer.questionId,
      answer: userAnswer.answer
    };
  });
  const userQuestions = await UserQuestion.insertMany(userAnswers);

  // 3. Calculate final test result
  const testResult = calculateTestResult(userQuestions);

  // 4. Update User Table with test result
  const updatedUser = await User.findOneAndUpdate({ _id: user.id }, {testResult}, {
    new: true,
    runValidators: true
  }).exec();

  res.status(HTTPStatus.OK).json({email: user.email, result:testResult});
};

function calculateTestResult(userQuestions) {
  const dimensions = {E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0};

  // as 4 value will be neutral then it will be neglected and its weight is 0
  // so our weights will be -3, -2, -1, 0, 1, 2, 3 instead of 1, 2, 3, 4, 5, 6, 7
  // and that can be done via this equation => weight = value - 4
  userQuestions.forEach(userQuestion => {
    dimensions[userQuestion.question.meaning] += userQuestion.answer - 4;
  });
  let testResult = '';
  testResult+= dimensions.E >= dimensions.I ? 'E' : 'I';
  testResult+= dimensions.S >= dimensions.N ? 'S' : 'N';
  testResult+= dimensions.T >= dimensions.F ? 'T' : 'F';
  testResult+= dimensions.J >= dimensions.P ? 'J' : 'P';

  return testResult;
}
