import { Router } from 'express';
import bodyParser from 'body-parser';
// import authenticate from '../middlewares/auth';
import { checkExistingUser, saveUser, verifyUserOtp } from '../middlewares/user';
import {
  verifyOtp, updateOtpOnTimeout, updateVerifyUser, makeTransaction,
} from '../controllers/user';

const parser = bodyParser.json();
// const urlbodyParser = bodyParser.urlencoded({ extends: false });

const userRouter = Router();

// endpoint for signup before confirming otp
userRouter.post('/register', parser, checkExistingUser, saveUser, verifyOtp);
userRouter.post('/verify', parser, verifyUserOtp, updateVerifyUser);
userRouter.post('/resend', parser, verifyOtp);
userRouter.post('/otp_reset', parser, updateOtpOnTimeout);
userRouter.post('/login', parser, checkIfUserExists, checkLoginDetails);
userRouter.post('/transaction', parser, makeTransaction);

export default userRouter;
