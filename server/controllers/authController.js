const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

const signinToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signinToken(newUser._id);

  try {
    await sendEmail({
      email: req.body.email,
      subject: 'Welcome to TeQuiz - Your Account Details',
      message: `Dear ${req.body.name},

Thank you for signing up with TeQuiz! We're thrilled to have you on board.

Here are your login credentials:

User ID: ${req.body.email}
Password: ${req.body.password}

Please keep this information safe and secure. You can log in to your account by visiting our website: https://tequiz.netlify.app.

We hope you enjoy exploring quizzes, learning, and challenging yourself on TeQuiz. If you have any questions, feel free to reach out to our support team.

Thank you for choosing TeQuiz to make learning fun and engaging.

Warm regards,
The TeQuiz Team
`,
    });
  } catch (err) {
    return next(
      new AppError(
        'There was an error sending the email. Please try again later.',
        500
      )
    );
  }

  res.status(201).json({
    status: 'success',
    token: token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = new AppError('Please provide email and password', 400);
    return next(err);
  }

  const user = await User.findOne({ email: email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    const err = new AppError('Incorrect email or password', 401);
    return next(err);
  }

  const token = signinToken(user.id);

  res.status(200).json({
    status: 'success',
    token: token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    const err = new AppError(
      'Your are not logged in!, please log in to get access',
      401
    );
    return next(err);
  }

  // 2) Verification token

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.AuthenticateUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});
