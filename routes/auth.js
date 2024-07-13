const express = require('express');
const path = require('path');
const authController = require('../controllers/auth');
const router = express.Router();
const signUpValidator=require('../validation/signUp');
const signInValidator=require('../validation/signIn');
// GET route for displaying the login form
router.get('/login', authController.getLogIn);

// POST route for handling login form submission
router.post('/login', signInValidator,authController.postLogIn);
router.post('/logout',authController.postLogOut)
router.post('/signup',signUpValidator,authController.postSignUp)
router.get('/signup',authController.getSignUp);
router.get('/reset',authController.getReset);
router.post('/Reset',authController.postReset);
router.get('/reset-password/:token',authController.getNewPassword);
router.post('/new-password',authController.postNewPassword);
// GET route for handling logout


module.exports = router;
