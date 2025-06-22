export interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
}

export interface MinimalProduct {
  _id: string;
  name: string;
}
