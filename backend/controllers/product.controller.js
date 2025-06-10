import Product from '../models/product.model.js';

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.error('Error fetching products: ', err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const getProductById = async (req, res) => {
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
};

const addNewProduct = async (req, res) => {
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
};

const updateProductById = async (req, res) => {
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
};

const deleteProductById = async (req, res) => {
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
};

export {
  getProducts,
  getProductById,
  addNewProduct,
  updateProductById,
  deleteProductById,
};
