import { validationResult } from 'express-validator';

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
