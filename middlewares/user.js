import { validationResult } from 'express-validator';
import User from '../models/user';
import { hashPassword } from '../utils/helpers';
// import { getUserByEmail } from '../services/user';

export const validator = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (errors.array().length === 0) {
    return next();
  }
  const errorsArray = errors.array();
  errorsArray.map((error) => console.log(error.msg));
  return res.status(400).json({
    status: 'Fail',
    message: 'Something went wrong',
    errors: errors.array(),
  });
};

export const checkExistingUser = async (req, res, next) => {
  console.log('>>>>>||||<<<<<<<', req.body);
  const { email } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (user) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Email already exists.',
    });
  }
  return next();
};

export const saveUser = async (req, res, next) => {
  const hashedPassword = hashPassword(req.body.password);
  req.body = { ...req.body, password: hashedPassword };
  const {
    firstname, lastname, dob, email, phone, password, gender,
  } = req.body;
  console.log(req.body);
  try {
    const user = new User({
      name: {
        firstname,
        lastname,
      },
      dob,
      email,
      phone,
      password,
      gender,
    });
    console.log(user);
    await user.save();
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: error,
    });
  }
};

export const verifyUserOtp = async (req, res, next) => {
  const { payload } = req.body;
  try {
    const email = payload[0];
    const otp = payload[1];
    const user = await User.findOne({ email, otp });
    if (!user) {
      return res.status(400).json({
        status: 'Fail',
        message: 'Invalid verification code',
      });
    }
    req.otp = otp;
    req.email = email;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

// export const checkIfUserExists = async (req, res, next) => {
//   const { email } = req.body;
//   const user =
// }
