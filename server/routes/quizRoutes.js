const express = require('express');
const quizController = require('./../controllers/quizController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.get('/', authController.protect, quizController.getAllQuiz);
router.get('/:quiz', authController.protect, quizController.getQuiz);

module.exports = router;
