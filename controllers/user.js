import { checkSchema } from 'express-validator';
// eslint-disable-next-line import/extensions
import validator from '../middlewares/user.js';
// eslint-disable-next-line import/extensions
import registrationSchema from '../validation/user.js';
// eslint-disable-next-line import/extensions
// import validator from '../middlewares/user.js';

const validate = (req, res) => {
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

export default validate;
