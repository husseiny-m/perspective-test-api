const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const questionSchema = new mongoose.Schema({
  text: String,
  dimension: String,
  direction: String,
  meaning: String,
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

module.exports = mongoose.model('Question', questionSchema);