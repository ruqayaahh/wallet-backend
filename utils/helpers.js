import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

dotenv.config();

const salt = genSaltSync(10);

const jwtSecret = process.env.JWT_SECRET;

export const convertDataToToken = (data) => jwt.sign(data, jwtSecret);

export const verifyToken = (token) => jwt.verify(token, jwtSecret, (err, data) => ({ err, data }));

export const hashPassword = (password) => hashSync(password, salt);

export const comparePassword = (plainPassword, hashedPassword) => (
  compareSync(plainPassword, hashedPassword)
);
