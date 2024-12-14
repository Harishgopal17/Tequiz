const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const sendEmail = require('./../utils/email');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.submitForm = catchAsync(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!email || !name || !message) {
    const err = new AppError('Please provide email, name and message', 400);
    return next(err);
  }

  try {
    await sendEmail({
      email: process.env.EMAIL_ID,
      subject: 'Message from Tequiz',
      message: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    res.status(200).json({
      status: 'success',
      message: 'Message sent successfully!',
    });
  } catch (err) {
    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500
      )
    );
  }
});

exports.updateUserActivity = catchAsync(async (req, res, next) => {
  // Create error if user POSTs password datd
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update. please use /updateMyPassword',
        400
      )
    );
  }

  //Filtered out unwanted field names that are allowed to be updated
  const { recentActivity, completedQuizzes } = req.body;

  // Find the user
  const user = await User.findById(req.user.id);

  // Update recentActivity (FIFO - Keep only 2 entries)
  if (recentActivity) {
    user.recentActivity.push(recentActivity); // Add new data to recentActivity
    if (user.recentActivity.length > 2) {
      user.recentActivity.shift(); // Remove the oldest entry if more than 2
    }
  }

  // Update completedQuizzes (Append new entries)
  if (completedQuizzes) {
    user.completedQuizzes.push(completedQuizzes); // Append new data
  }

  // Save the user
  await user.save();

  res.status(200).json({
    status: 'success',
    mes: 'dummy',
    data: {
      user,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id });

  res.status(200).json({
    user: user.transformed || user,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update. please use /updateMyPassword',
        400
      )
    );
  }

  // 2)Filtered out unwanted field names that are alowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email', 'photo');

  // 3)Update user password
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
