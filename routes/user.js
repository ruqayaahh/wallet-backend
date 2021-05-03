import { Router } from 'express';
import bodyParser from 'body-parser';
import { checkSchema } from 'express-validator';
// eslint-disable-next-line import/extensions
import registrationSchema from '../validation/user.js';
// eslint-disable-next-line import/extensions
import validator from '../middlewares/user.js';
// eslint-disable-next-line import/extensions
import validate from '../controllers/user.js';

const parser = bodyParser.json();
// const urlbodyParser = bodyParser.urlencoded({ extends: false });

const userRouter = Router();

userRouter.post('/register', parser, validator(checkSchema(registrationSchema)), validate);

export default userRouter;
