import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import cors from 'cors';
import userRouter from './routes/user';

const PORT = process.env.PORT || 3000;

dotenv.config();

const index = express();

// index.use(cors);
index.use(morgan('dev'));
index.use(userRouter);

index.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Baby' });
});

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/html');
//   res.end('<h1>Hello World</h1>');
// });

index.use((req, res) => res.status(404).json({
  status: 'Fail',
  message: 'Not Found',
}));

const dbName = `mongodb+srv://ruqayaah:${process.env.MONGO_PASSWORD}@cluster0.2lwgs.mongodb.net/tester`;

mongoose.connect(dbName,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).then(() => console.log('Connected to DB')).catch((err) => console.log(err));

index.listen(PORT, () => (console.log(`Listening @ ${PORT} again`)));
