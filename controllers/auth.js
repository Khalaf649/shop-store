const User = require('../models/user');
const Cart = require('../models/cart');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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
exports.getReset = async (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0)
        message = message[0];
    else
        message = null;
    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        error: message

    })
}
exports.postReset = async (req, res, next) => {
    try {
        const token = await crypto.randomBytes(32).toString('hex');
        const user=await User.findOne({email:req.body.email});
        if(!user)
        {
            req.flash('error','no email with that');
            return res.redirect('/reset');
        }
        user.resetToken=token;
        user.resetTokenExpiryDate=Date.now()+3600*1000;
        await user.save();
        console.log(token);
        const resetLink = `http://localhost:3000/reset-password/${token}`;
        const mailOptions = {
            from: 'abdlrhmankhalaf566@gmail.com',
            to: user.email,
            subject: 'Welcome to Our Shop!',
            text: `Click on the following link to reset your password: ${resetLink}`

        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    catch (err) {
        console.log(err.message)
    }
    res.redirect('/shop')
}


exports.getNewPassword = async (req, res, next) => {
    try {
        let message = req.flash('error');
        if (message.length > 0) {
            message = message[0];
        } else {
            message = null;
        }

        const token = req.params.token;

        // Find user with the matching reset token and ensure it is not expired
        const user = await User.findOne({ resetToken: token, resetTokenExpiryDate: { $gt: Date.now() } });
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/login');
        }

        // Render the new password page
        res.render('auth/new-password', {
            path: '/new-password',
            pageTitle: 'New Password',
            error: message,
            userId: user._id.toString(),
            PasswordToken:token
        });
    } catch (err) {
        console.error(err);
        req.flash('error', 'An error occurred. Please try again later.');
        res.redirect('/login');
    }
};
exports.postNewPassword = async (req, res, next) => {
    const UserId = req.body.UserId;
    const password = req.body.password;
    const PasswordToken = req.body.PasswordToken;

    try {
        // Find user by ID and validate reset token and expiry date
        const user = await User.findOne({
            _id: UserId,
            resetToken: PasswordToken,
            resetTokenExpiryDate: { $gt: Date.now() }
        });

        if (!user) {
            req.flash('error', 'Invalid or expired reset token. Please try again.');
            return res.redirect('/login');
        }
        console.log(user);

        // Hash the new password
        const hashedPassword = await bcryptjs.hash(password, 12);

        // Update user's password and clear reset token data
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiryDate = null;
        await user.save();

        req.flash('success', 'Password has been reset successfully. You can now log in with your new password.');
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        req.flash('error', 'An error occurred. Please try again later.');
        res.redirect('/login');
    }
};


