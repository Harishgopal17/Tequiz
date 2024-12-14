const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const {
  HtmlQuiz,
  CssQuiz,
  JavascriptQuiz,
  ReactQuiz,
  NodejsQuiz,
  JavaQuiz,
  PythonQuiz,
  PhpQuiz,
  SqlQuiz,
  LinuxQuiz,
  AiQuiz,
  SeoQuiz,
} = require('./../models/quizModel');

const quizModels = {
  HtmlQuiz,
  CssQuiz,
  JavascriptQuiz,
  ReactQuiz,
  NodejsQuiz,
  JavaQuiz,
  PythonQuiz,
  PhpQuiz,
  SqlQuiz,
  LinuxQuiz,
  AiQuiz,
  SeoQuiz,
};

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    // Generate random index b/w 0 and i
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // Swap the elements at i and randomIndex
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
  return arr;
}

exports.getQuiz = catchAsync(async (req, res, next) => {
  const { quiz } = req.params;

  // Find the model dynamically
  const QuizModel = quizModels[quiz];

  if (!QuizModel) {
    return next(new AppError(`Quiz model "${quiz}" not found!`, 404));
  }

  const questions = await QuizModel.find();

  res.status(200).json({
    status: 'success',
    results: questions.length,
    data: {
      questions: questions,
    },
  });
});

exports.getAllQuiz = catchAsync(async (req, res, next) => {
  const quizModels = [
    HtmlQuiz,
    CssQuiz,
    JavascriptQuiz,
    ReactQuiz,
    NodejsQuiz,
    JavaQuiz,
    PythonQuiz,
    PhpQuiz,
    SqlQuiz,
    LinuxQuiz,
    AiQuiz,
    SeoQuiz,
  ];

  const outres = await Promise.all(
    quizModels.map((model) => model.find({}, { __v: 0 }))
  );
  const results = outres.flat();
  const shuffledQuestions = shuffleArray(results);

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  if (req.query.page) {
    const numofQuestions = shuffledQuestions.length;
    if (startIndex >= numofQuestions)
      return next(new AppError(`This page does not exist`, 404));
  }

  const paginatedQuestions = shuffledQuestions.slice(startIndex, endIndex);

  res.status(200).json({
    status: 'success',
    results: paginatedQuestions.length,
    data: {
      questions: paginatedQuestions,
    },
  });
});
