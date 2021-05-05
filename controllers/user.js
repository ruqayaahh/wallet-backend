import { checkSchema } from 'express-validator';
import validator from '../middlewares/user';
import registrationSchema from '../validation/user';
import User from '../models/user';
import { hashPassword } from '../utils/helpers';

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

// export default validate;

export const saveUser = async (req, res) => {
  console.log(req.body);
  const data = req.body;
  const encryptedPassword = hashPassword(data.password);
  req.body = { ...data, password: encryptedPassword };
  const {
    firstname,
    lastname,
    dob,
    email,
    phone,
    password,
    gender,
  } = req.body;
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
    return res.status(200).json({
      status: 'Success',
      success: 'true',
      message: 'Registration successfull',
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      success: 'false',
      message: 'Something went wrong',
    });
  }
};
