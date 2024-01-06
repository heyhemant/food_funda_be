const express = require('express');
const { generateAndSendOtp, registerRestro, verifyOTP} = require('../controllers/auth_controller');
const authRouter = express.Router();

// Define your auth routes here
// authRouter.post('/login', login);

authRouter.post('/register-restro', registerRestro);

authRouter.get('/generate-otp', generateAndSendOtp);

authRouter.post('/validate-otp', verifyOTP);

module.exports = authRouter;
