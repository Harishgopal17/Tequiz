const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
    default: 'defaultProfile.jpg',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  recentActivity: [
    {
      quizName: String,
      date: { type: Date, default: Date.now },
      score: Number,
    },
  ],
  completedQuizzes: [
    {
      quizName: String,
      date: { type: Date, default: Date.now },
      score: Number,
    },
  ],
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified otherwise it return
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

userSchema.post('findOne', function (doc, next) {
  if (!doc) {
    return next();
  }

  const quizzesAttempted = doc.completedQuizzes.length;
  const totalPoints = doc.completedQuizzes.reduce(
    (sum, quiz) => sum + quiz.score,
    0
  );
  const averageScore =
    quizzesAttempted > 0 ? Math.round(totalPoints / quizzesAttempted) : 0;

  // Transforming the document
  doc.transformed = {
    name: doc.name,
    email: doc.email,
    photo: doc.photo,
    stats: {
      quizzesAttempted,
      totalPoints,
      averageScore,
    },
    recentActivity: doc.recentActivity.map((activity) => ({
      quizName: activity.quizName,
      date: new Date(activity.date).toISOString().split('T')[0], // Format date
      score: activity.score,
    })),
    completedQuizzes: doc.completedQuizzes.map((quiz) => ({
      quizName: quiz.quizName,
      date: new Date(quiz.date).toISOString().split('T')[0], // Format date
      score: quiz.score,
    })),
  };

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
