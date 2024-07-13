const { body } = require('express-validator');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
module.exports = [body('email').normalizeEmail().isEmail().withMessage('please enter a valid mail').custom(async (data, { req }) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return Promise.reject('there is no such a mail');
    }
    return true;
}),
body('password').trim().custom(async (data, { req }) => {
    const user = await User.findOne({ email: req.body.email });
    if(!user)
        throw new Error('invalid email');
    const match = await bcryptjs.compare(req.body.password, user.password);
    if (!match)
        return Promise.reject('invalid passowrd');
    return true;
})]