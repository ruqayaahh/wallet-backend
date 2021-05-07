import User from '../models/user';

export const saveOTP = async (email, otp) => {
  const user = await User.findOneAndUpdate({ email }, { otp }, {
    returnOriginal: false,
  });
  console.log(user);
};

export const findOTP = async (email) => {
  const user = await User.findOne({ email });
  console.log(user.otp);
  return user.otp;
};
