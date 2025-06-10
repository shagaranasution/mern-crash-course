import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express();
app.use(json()); // Middleware that allows us to accept JSON data in req.body
app.use(urlencoded({ extended: false }));

app.listen(3000, () => {
  connectDB();
  console.log('Server is running on port 3000...');
});

// get products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.error('Error fetching products: ', err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// get product by id
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(401)
        .json({ success: false, message: 'Product Not Found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.error('Error in fetching product by id: ', err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// mutate products
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

// update product by id
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product Not Found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.error(`Error in update product with id ${id}: ${err.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// delete product by id
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(401)
        .json({ success: false, message: 'Product Not Found' });
    }

    res.status(200).json({ success: true, message: 'Product Deleted' });
  } catch (err) {
    console.error('Error in delete product: ', err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});
