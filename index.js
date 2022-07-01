import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//routes
import semesterRoute from './routes/semester.js';
import subjectRoute from './routes/subjects.js';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('connected to mongoDB');
  } catch (error) {
    throw error;
  }
};

//middlewares
app.use(cookieParser());
app.use(express.json());

app.use('/api/sem', semesterRoute);
app.use('/api/sub', subjectRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', usersRoute);

//writing error
app.use((err, req, res, next) => {
  const errorStatus = err.errorStatus || 500;
  const errorMessage = err.message || 'Something went Wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  connect();
  console.log(`Port listen at ${port}`);
});
