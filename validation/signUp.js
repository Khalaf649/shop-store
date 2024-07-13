const { body } = require('express-validator');
const User = require('../models/user');

module.exports = [
  body('email').normalizeEmail()
    .isEmail().withMessage('Please enter a valid email address')
    .custom(async (value, { req }) => {
      const userDoc = await User.findOne({ email: value });
      if (userDoc) {
        throw new Error('The email address is already registered');
      }
      else
        return true;
    }),

  body('password').trim()
    .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
    .isAlphanumeric().withMessage('Password must contain only numbers and letters'),

  body('confirmPassword').trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('The two passwords do not match');
      }
      else
      return true;
    })
];
