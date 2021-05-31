/* eslint-disable max-len */
import dotenv from 'dotenv';
import https from 'https';
// import paystack from 'paystack';
// import axios from 'axios';
import { checkSchema } from 'express-validator';
import { validator } from '../middlewares/user';
import { registrationSchema, loginSchema } from '../validation/user';
import { saveOTP } from '../services/user';
import { checkIfOtpExists, transporter } from '../utils/helpers';
import User from '../models/user';
// import User from '../models/user';

dotenv.config();

export const validateRegister = (req, res) => {
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

// export const makeTransaction = () => {
//   try {
//     paystack.transactions.list({ perPage: 20 })
//       .then((body) => {
//         console.log(body);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const makeTransaction = (req) => {
  const params = JSON.stringify(req.body);
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  };
  const reqq = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      // res.status(200).json({
      //   success: true,
      //   message: 'Successful',
      //   data: JSON.parse(data),
      // });
      // res.send(JSON.parse(data));
      req.paystackRespone = JSON.parse(data);
      console.log(req.paystackRespone);
    });
  }).on('error', (error) => {
    console.error(error);
  });
  reqq.write(params);
  reqq.end();
};

export const madeTrans = (req) => {
  console.log(req);
};
export const validateLogin = (req, res) => {
  try {
    validator(checkSchema(loginSchema));
  } catch (error) {
    console.log(error);
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
    // const userData = {
    //   email, otp,
    // };
    // console.log(userData);
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
  try {
    const otp = await checkIfOtpExists();
    await saveOTP(email, otp);
    return res.status(200).json({
      status: 'Success',
      message: 'OTP updated successfully',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Something is not making the otp update successfully',
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
