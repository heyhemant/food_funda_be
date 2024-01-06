const mongoose = require('mongoose');

const authOTPSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    identifier: {
        type: String,
        required: true
    },
    expiryTime: {
        type: Date,
        required: true
    }
});

const AuthOTPModel = mongoose.model('AuthOTP', authOTPSchema);

module.exports = AuthOTPModel;
