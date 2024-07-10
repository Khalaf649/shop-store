const User = require('../models/user');
const Cart = require('../models/cart');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abdlrhmankhalaf566@gmail.com',
        pass: 'rbrx leti prdz qcuy'
    }
});

exports.getLogIn = (req, res, next) => {
    let message = req.flash('Error');
    if (message.length > 0)
        message = message[0];
    else
        message = null;
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        error: message
    });
}

exports.getSignUp = async (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0)
        message = message[0];
    else
        message = null;
    res.render('auth/signup', {
        pageTitle: 'SignUp',
        path: '/SignUp',
        error: message
    });
}

exports.postSignUp = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const userDoc = await User.findOne({ email: email });
    if (userDoc) {
        req.flash('error', 'Email is already used');
        return res.redirect('/signup');
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = new User({
        email: email,
        password: hashedPassword
    });
    await user.save();

    const cart = new Cart({
        items: [],
        TotalPrice: 0,
        TotalQuantity: 0,
        User: {
            email: email,
            id: user._id
        }
    });
    await cart.save();

    // Send welcome email
    const mailOptions = {
        from: 'abdlrhmankhalaf566@gmail.com',
        to: email,
        subject: 'Welcome to Our Shop!',
        text: 'Thank you for signing up!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.redirect('/shop');
}

// Handle login POST request
exports.postLogIn = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const userDoc = await User.findOne({ email: email });
    if (!userDoc) {
        req.flash('Error', 'Invalid email or password');
        return res.redirect('/login');
    }

    const match = await bcryptjs.compare(password, userDoc.password);
    if (match) {
        req.session.isAuthenticated = 1;
        req.session.user = userDoc;
        await req.session.save();
        res.redirect('/shop');
    } else {
        res.redirect('/login');
    }
}

// Handle logout POST request
exports.postLogOut = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/shop'); // Redirect to shop page after logout
    });
}
