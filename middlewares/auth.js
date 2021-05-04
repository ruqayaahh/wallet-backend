import { verifyToken } from '../utils/helpers';

const authenticate = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const { err, data } = verifyToken(token);
    if (err) {
      console.log(err);
      return res
        .status(401)
        .json({ status: 'Fail', message: 'You need to be signed in' });
    }
    req.entrant = data;
    console.log(token);
    return next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 'Fail', message: 'Something went wrong' });
  }
};

export default authenticate;
