import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
// eslint-disable-next-line import/extensions
import userRouter from './routes/user.js';

const index = express();
const port = 3000;

index.use(userRouter);
index.use(morgan('dev'));

mongoose.connect(`mongodb+srv://ruqayaah:${process.env.MONGO_PASSWORD}@cluster0.2lwgs.mongodb.net/test`,
  {
    useMongoClient: true,
  });
index.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello' });
});

index.listen(port, () => (console.log(`Listening @ ${port} again`)));
