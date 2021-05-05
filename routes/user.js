import { Router } from 'express';
import bodyParser from 'body-parser';
// import authenticate from '../middlewares/auth';
// import validator from '../middlewares/user';
import { saveUser } from '../controllers/user';

const parser = bodyParser.json();
// const urlbodyParser = bodyParser.urlencoded({ extends: false });

const userRouter = Router();

userRouter.post('/register', parser, saveUser);

export default userRouter;
