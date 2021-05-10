/* eslint-disable max-len */
import dotenv from 'dotenv';
import { checkSchema } from 'express-validator';
import validator from '../middlewares/user';
import registrationSchema from '../validation/user';
import { saveOTP, findOTP } from '../services/user';
import { checkIfOtpExists, transporter } from '../utils/helpers';
import User from '../models/user';
// import User from '../models/user';

dotenv.config();

export const validate = (req, res) => {
  try {
    validator(checkSchema(registrationSchema));
    return res.status(200).json({
      status: 'Success',
      success: 'true',
      message: 'Registration successfull',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      success: 'false',
      message: 'Something went wrong',
    });
  }
};
export const emailMakeup = (options) => new Promise((resolve) => {
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log('Sending mail failed');
      console.log(err);
      resolve('failing silently');
    } else {
      console.log(info);
      console.log('Mail Sent Successfully');
      resolve('Mail Sent Successfully');
    }
  });
});

export const verifyOtp = async (req, res) => {
  const email = req.body.email ? req.body.email : req.query.email;
  console.log(email);
  try {
    const otp = await checkIfOtpExists();
    console.log(otp);
    await saveOTP(email, otp);
    const options = {
      from: `"Wallet" <${process.env.EMAIL}>`,
      to: email,
      subject: 'Welcome to Wallet! Confirm Your Registration with OTP',
      text: `You're on your way! Let's authenticate your email address. To authenticate, please use the following One Time Password (OTP):${otp} Do not share this OTP with anyone. Amazon takes your account security very seriously. Amazon Customer Service will never ask you to disclose or verify your Amazon password, OTP, credit card, or banking account number. If you receive a suspicious email with a link to update your account information, do not click on the link—instead, report the email to Amazon for investigation.`,
      html: `<h3>You're on your way! Let's authenticate your email address through OTP.</h3>
    <p>To authenticate, please use the following One Time Password (OTP): <br><br> <b>${otp}</b> <br><br> Do not share this OTP with anyone. Wallet takes your account security very seriously. Wallet Customer Service will never ask you to disclose or verify your Wallet password, OTP, credit card, or banking account number. If you receive a suspicious email with a link to update your account information, do not click on the link-instead, report the email to Wallet for investigation. <br><br> We hope to see you again soon</p> <a href="http://localhost:3000/otp?email=${email}">Verify Email</a>`,
    };
    const userData = {
      email, otp,
    };
    console.log(userData);
    // const token = convertDataToToken(userData);

    await emailMakeup(options);
    return res.status(200).json({
      status: 'Success',
      message: 'Please check your mail to verify your OTP.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something is not making the email send successfully',
    });
  }
};

export const updateOtpOnTimeout = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);
  try {
    await saveOTP(email, otp);
    return res.status(200).json({
      status: 'Success',
      message: 'OTP updated successfully',
      data: otp,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Something is not making the otp update successfully',
      data: error,
    });
  }
};

export const getOTP = async (req, res) => {
  // const { token } = req.headers;
  const { email } = req.body;
  try {
    const otp = await findOTP(email);
    // console.log(otp);
    return res.status(200).json({
      status: 'Success',
      message: 'OTP retrieved successfully',
      data: otp,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Something is not making otp retrieval successful',
      data: error,
    });
  }
};

export const updateVerifyUser = async (req, res) => {
  const { otp } = req;
  const { email } = req;
  console.log('>>>>>>', otp);
  try {
    await User.findOneAndUpdate({ email }, { verified: true }, {
      returnOriginal: false,
    });
    return res.status(200).json({
      status: 'Success',
      message: 'User account verified',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Something isn\'t right',
    });
  }
};
