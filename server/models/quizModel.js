const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctOption: String,
  points: Number,
});

exports.HtmlQuiz = mongoose.model('HtmlQuiz', quizSchema);
exports.CssQuiz = mongoose.model('CssQuiz', quizSchema);
exports.JavascriptQuiz = mongoose.model('JavascriptQuiz', quizSchema);
exports.ReactQuiz = mongoose.model('ReactQuiz', quizSchema);
exports.NodejsQuiz = mongoose.model('NodejsQuiz', quizSchema);
exports.JavaQuiz = mongoose.model('JavaQuiz', quizSchema);
exports.PythonQuiz = mongoose.model('PythonQuiz', quizSchema);
exports.PhpQuiz = mongoose.model('PhpQuiz', quizSchema);
exports.SqlQuiz = mongoose.model('SqlQuiz', quizSchema);
exports.LinuxQuiz = mongoose.model('LinuxQuiz', quizSchema);
exports.AiQuiz = mongoose.model('AiQuiz', quizSchema);
exports.SeoQuiz = mongoose.model('SeoQuiz', quizSchema);
