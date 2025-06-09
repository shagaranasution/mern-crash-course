import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

app.listen(5000, () => {
  connectDB();
  console.log('Server is running in port 5000...');
  console.log(process.env.MONGO_URI);
});
