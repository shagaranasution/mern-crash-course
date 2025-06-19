import { Schema, model } from 'mongoose';

const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // option for let mongodb handle
    versionKey: false,
  }
);

const Product = model('Product', productSchema);

export default Product;
