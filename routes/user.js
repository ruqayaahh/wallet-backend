import { Router } from 'express';
import bodyParser from 'body-parser';
// import authenticate from '../middlewares/auth';
import { checkExistingUser, saveUser } from '../middlewares/user';
import {
  getOTP, verifyOtp, updateOtpOnTimeout,
} from '../controllers/user';

const parser = bodyParser.json();
// const urlbodyParser = bodyParser.urlencoded({ extends: false });

const userRouter = Router();

// endpoint for signup before confirming otp
userRouter.post('/register', parser, checkExistingUser, saveUser, verifyOtp);

// endpoint for OTP timeout
userRouter.post('/otp_reset', parser, updateOtpOnTimeout);

// endpoint to get current OTP value
userRouter.get('/get_otp', parser, getOTP);

// endpoint for signup after confirming OTP
// userRouter.post('/register/:token', );

export default userRouter;
