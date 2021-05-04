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
  created_at: {
    type: Date,
    default: Date.now(),
  },
}, {
  collection: 'users',
});

const User = mongoose.model('User', userSchema);

export default User;
