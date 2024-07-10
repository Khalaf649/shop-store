const express = require('express');
const path = require('path');
const authController = require('../controllers/auth');
const router = express.Router();

// GET route for displaying the login form
router.get('/login', authController.getLogIn);

// POST route for handling login form submission
router.post('/login', authController.postLogIn);
router.post('/logout',authController.postLogOut)
router.post('/signup',authController.postSignUp)
router.get('/signup',authController.getSignUp)
// GET route for handling logout


module.exports = router;
