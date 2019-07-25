const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const userQuestionSchema = new mongoose.Schema({
  answer: Number,
  user: {type: mongoose.Schema.ObjectId, ref: 'User'},
  question: {type: mongoose.Schema.ObjectId, ref: 'Question'}
});

async function autopopulate(userQuestions) {
  for (let userQuestion of userQuestions) {
    await userQuestion.populate('question').execPopulate();
  }
}




userQuestionSchema.post('insertMany', autopopulate);

module.exports = mongoose.model('UserQuestion', userQuestionSchema);
