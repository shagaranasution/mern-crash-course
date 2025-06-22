import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoute from './routes/product.route.js';

dotenv.config();

const app = express();

// Middleware
app.use(json()); // Middleware that allows us to accept JSON data in req.body
app.use(urlencoded({ extended: false }));

// Routes
app.use('/api/products', productRoute);

app.listen(3000, () => {
  connectDB();
  console.log('Server is running on port 3000...');
});
