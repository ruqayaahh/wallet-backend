import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// eslint-disable-next-line import/extensions
import userRouter from './routes/user.js';

dotenv.config();

const index = express();
const port = 4000;

index.use(userRouter);

index.use((req, res) => res.status(404).json({
  status: 'Fail',
  message: 'Not Found',
}));

index.use(morgan('dev'));
const dbName = `mongodb+srv://ruqayaah:${process.env.MONGO_PASSWORD}@cluster0.2lwgs.mongodb.net/tester`;

mongoose.connect(dbName,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).then(() => console.log('Connected to DB')).catch((err) => console.log(err));

index.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello' });
});

index.listen(port, () => (console.log(`Listening @ ${port} again`)));
