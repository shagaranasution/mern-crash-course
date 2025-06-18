import type { Product } from '@/types';

export interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

export interface ProductActions {
  addProduct: (
    product: Omit<Product, 'id'>
  ) => Promise<{ success: boolean; message: string }>;
  setLoading: (loading: boolean) => void;
  setError: (message: string | null) => void;
}

export type ProductStore = ProductState & ProductActions;
