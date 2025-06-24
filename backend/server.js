import express, { json, urlencoded, static as static_ } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middleware
app.use(json()); // Middleware that allows us to accept JSON data in req.body
app.use(urlencoded({ extended: false }));

// Routes
app.use('/api/products', productRoutes);

// Production: serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(static_(path.join(__dirname, 'frontend', 'dist')));
  app.get('/*splat', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log('Server is started at http://localhost:' + PORT);
});
