const Restaurant = require("../../models/restaurant_schema");
const AuthOTPModel = require("../models/auth_otp");
const jwt = require("jsonwebtoken");

//TODO: Hemant add DTL template in Textlocal first
// var validOptions = { apikey: 'NTA1MTMzMzM3NTc1NDY0YTQyNDY3NTM5Mzk0YjcwMzA=' };
// const textlocal = require('textlocal')(validOptions);
const otpGenerator = require("otp-generator");

async function generateAndSendOtp(req, res) {
  const otp = otpGenerator.generate(6);
  console.log(`OTP Generated  ${otp}`);
  const message = `Your SMS message here ${otp}`;
  if (!req.body || !req.body.phone_number) {
    return res.status(400).json({ message: "Please Enter Phone Number" });
  }
  //TODO: Hemat add DTL template in Textlocal first
  // const url = 'https://api.textlocal.in/send/?';
  // const params = {
  //     apikey : 'Mzc2OTY5Mzg0MjczNTQ1MjZkNzc2YTZmMzQ3ODQ3MzU=',
  //     numbers: '918094820068',
  //     sender : 'TXTLCL',
  //     message: message,
  // };

  try {
    // const response = await fetch(url, {
    //     method: 'POST',
    //     body: new URLSearchParams(params),
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    // });
    // const data = await response.json();

    const authOtpModel = new AuthOTPModel({
      otp: otp,
      identifier: `+91${req.body.phone_number}`,
      expiryTime: new Date(Date.now() + 2 * 60 * 1000),
    });
    await authOtpModel.save();
    res.send({ message: "OTP Sent", otp: otp }); //TODO: Hemant remove otp from response
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}
// Handler for user registration
async function registerRestro(req, res) {
  try {
    const body = req.body;
    if (
      !body ||
      !body.restaurant_name ||
      !body.email ||
      !body.password ||
      !body.phone_number ||
      !body.address ||
      !body.city ||
      !body.state ||
      !body.pincode ||
      !body.latitude ||
      !body.longitude
    ) {
      return res.status(400).json({ message: "Please Provide All Details" });
    }
    const isExistingUser = await Restaurant.findOne({
      phone_number: `+91${body.phone_number}`,
    });
    if (isExistingUser) {
      return res.status(400).json({ message: "Mobile Number Already Registered" });
    }
    const restaurant = new Restaurant({
      restaurant_name: body.restaurant_name,
        email: body.email,
        password: body.password,
        phone_number: `+91${body.phone_number}`,
        address: body.address,
        city: body.city,
        state: body.state,
        pincode: body.pincode,
        location: {
            latitude: body.latitude,
            longitude: body.longitude,
        }
      });
    await restaurant.save();
    return res.status(200).json({ message: "Restaurant Registered" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

// Handler for OTP verification
async function verifyOTP(req, res) {
  const body = req.body;
  if (!body || !body.phone_number) {
    return res
      .status(400)
      .json({ message: "Please try again after some time" });
  }
  if (!body.otp) {
    return res.status(400).json({ message: "Please Enter OTP" });
  }
  const otp = await AuthOTPModel.findOne({
    identifier: `+91${body.phone_number}`,
    otp: body.otp,
  });
  if (!otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  await AuthOTPModel.deleteOne({
    identifier: `+91${body.phone_number}`,
    otp: body.otp,
  });
  if (otp.expiryTime < Date.now()) {
    return res.status(400).json({ message: "OTP Expired" });
  }
  const isExistingUser = await Restaurant.findOne({
    phone_number: `+91${body.phone_number}`,
  });
  console.log(isExistingUser);
  if(isExistingUser){
    const token = jwt.sign(
      { id: isExistingUser._id },
      process.env.JWT_SECRET
    );
    console.log(token);
    return res.status(200).json({ message: "OTP Verified", token: token });
  }
  
  return res.status(200).json({ message: "OTP Verified" });
}

// Handler for user logout
async function logoutUser(req, res) {
  // TODO: Implement user logout logic
}

// Export the handlers
module.exports = {
  registerRestro,
  verifyOTP,
  generateAndSendOtp,
  // logoutUser,
};
