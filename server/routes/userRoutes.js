const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/submit-form', userController.submitForm);

router.post(
  '/validatetoken',
  authController.protect,
  authController.AuthenticateUser
);

router.get('/getUser', authController.protect, userController.getUser);

router.patch(
  '/update-user-activity',
  authController.protect,
  userController.updateUserActivity
);

router.patch('/updateMe', authController.protect, userController.updateMe);

module.exports = router;
