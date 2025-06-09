import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express();
app.use(express.json());
// Middleware that allows us to accept JSON data in req.body

app.listen(3000, () => {
  connectDB();
  console.log('Server is running in port 5000...');
  console.log(process.env.MONGO_URI);
});

// product post
app.post('/api/products', async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide all fields.' });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    console.err('Error in create product: ', err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});
