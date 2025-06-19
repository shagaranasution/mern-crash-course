import type { Product } from '@/types';

export interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

export interface ProductActions {
  getProducts: () => Promise<{ success: boolean; message: string }>;
  addProduct: (
    product: Omit<Product, '_id'>
  ) => Promise<{ success: boolean; message: string }>;
  setLoading: (loading: boolean) => void;
  setError: (message: string | null) => void;
}

export type ProductStore = ProductState & ProductActions;
