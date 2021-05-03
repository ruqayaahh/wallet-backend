const registrationSchema = {
  firstname: {
    notEmpty: true,
    errorMessage: 'Firstname field cannot be blank',
  },
  lastname: {
    notEmpty: true,
    errorMessage: 'Lastname field cannot be blank',
  },
  dob: {
    isDate: true,
    notEmpty: true,
    errorMessage: 'Invalid date of birth input',
  },
  gender: {
    notEmpty: true,
    errorMessage: 'Gender field cannot be blank',
  },
  email: {
    isEmail: true,
    errorMessage: 'Invalid email address',
    normalizeEmail: true,
    notEmpty: true,
  },
  phone: {
    notEmpty: true,
    errorMessage: 'Phone number cannot be empty',
  },
  password: {
    isStrongPassword: {
      minLength: 8,
      minLowerCase: 1,
      minUpperCase: 1,
      minNumbers: 1,
    },
    errorMessage: 'Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number',
  },
};

export default registrationSchema;
