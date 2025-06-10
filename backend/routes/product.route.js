import { Router } from 'express';
import {
  addNewProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from '../controllers/product.controller.js';

const route = Router();

route.get('/', getProducts);

route.get('/:id', getProductById);

route.post('/', addNewProduct);

route.put('/:id', updateProductById);

route.delete('/:id', deleteProductById);

export default route;
