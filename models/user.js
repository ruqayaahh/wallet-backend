// const user = {
//   firstname: 'Ruqayaah',
//   lastname: 'Sabitu',
//   dob: '1992-01-14',
//   email: 'aderinolaruqayaah@gmail.com',
//   phone: '+2348189706105',
//   password: 'Happy@50',
//   gender: 'male',
// };

// console.log(user);

// password: a capital letter, a special character, a number and not less than 8 characterctcs.
// firstname, lastname: text only with (' and -) allowed.
// phone: based on country.

import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    // match: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
  },
  password: {
    type: String,
    required: true,
    match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%#*?&.,/+-_])[A-Za-z\d@$!%#*?&.,/+-_]{8,}$/,
  },
  gender: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
}, {
  collection: 'users',
});

const User = mongoose.model('User', userSchema);
export default User;
