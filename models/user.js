const mongoose = require('mongoose');
const Schema = mongoose.Schema
//user
/*
name=>String
email=>String
*/
const userSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: {
        type: String,
    },
    resetTokenExpiryDate: {
        type: Date,
    }

})

module.exports = mongoose.model('User', userSchema);