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
      required: true,
    },
  },
  {
    timestamps: true, // option for let mongodb handle createdAt, updatedAt.
    versionKey: false,
  }
);

const Product = model('Product', productSchema);

export default Product;
