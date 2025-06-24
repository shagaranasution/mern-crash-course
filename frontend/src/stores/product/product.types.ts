import type { Product } from '@/types';

export interface ProductStoreState {
  products: Product[];
  product: Product | null;
  isLoading: boolean;
  error: string | null;
}

export interface ProductStoreActions {
  getProducts: () => Promise<{ success: boolean; message: string }>;

  getProduct: (id: string) => Promise<{ success: boolean; message: string }>;

  addProduct: (
    product: Omit<Product, '_id'>
  ) => Promise<{ success: boolean; message: string }>;

  editProduct: (
    id: string,
    product: Omit<Product, '_id'>
  ) => Promise<{ success: boolean; message: string }>;

  removeProduct: (id: string) => Promise<{ success: boolean; message: string }>;

  setLoading: (loading: boolean) => void;

  setError: (message: string | null) => void;
}

export type ProductStore = ProductStoreState & ProductStoreActions;
