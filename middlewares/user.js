import { validationResult } from 'express-validator';
import User from '../models/user';
import { hashPassword } from '../utils/helpers';

const validator = (validations) => async (req, res, next) => {
  console.log(req.body);
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

export default validator;

export const checkExistingUser = async (req, res, next) => {
  const { email } = req.body;
  await User.find({ email }, (error, user) => {
    if (error) {
      return res.status(500).json({
        message: 'Something went wrong',
        data: error,
      });
    } if (user.length) {
      console.log(user);
      return res.status(400).json({
        message: 'Email already exists',
      });
    }
    return next();
  });
};

export const saveUser = async (req, res, next) => {
  const hashedPassword = hashPassword(req.body.password);
  req.body = { ...req.body, password: hashedPassword };
  const {
    firstname,
    lastname,
    dob,
    email,
    phone,
    password,
    gender,
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
  const { otp } = req.body;
  const { email } = req.query;
  try {
    const user = await User.findOne({ email, otp });
    console.log('>>>>>>>>', user);
    if (!user) {
      return res.status(400).json({
        status: 'Fail',
        message: 'Invalid verification code',
      });
    }
    req.otp = otp;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};
