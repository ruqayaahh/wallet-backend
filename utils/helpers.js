import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import User from '../models/user';

dotenv.config();

const salt = genSaltSync(10);

const jwtSecret = process.env.JWT_SECRET;

export const convertDataToToken = (data) => jwt.sign(data, jwtSecret);

export const verifyToken = (token) => jwt.verify(token, jwtSecret, (err, data) => ({ err, data }));

export const hashPassword = (password) => hashSync(password, salt);

export const comparePassword = (plainPassword, hashedPassword) => (
  compareSync(plainPassword, hashedPassword)
);

export const checkIfOtpExists = async () => {
  let otp = Math.floor(1000 + Math.random() * 9000);
  const userOtp = await User.findOne({ otp });
  if (userOtp) {
    otp = Math.floor(1000 + Math.random() * 9000);
  }
  return otp;
};

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: `${process.env.EMAIL}`,
    pass: `${process.env.PASSWORD}`,
  },
});
