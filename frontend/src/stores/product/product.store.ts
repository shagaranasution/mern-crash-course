import { create } from 'zustand';
import type { ProductStore } from './product.type';
import { createProduct } from './product.api';

export const useProductStore = create<ProductStore>((set) => {
  return {
    products: [],
    isLoading: false,
    error: null,

    async addProduct(product) {
      set({ isLoading: true, error: null });

      try {
        const addedProduct = await createProduct(product);
        set((state) => ({ products: { ...state.products, addedProduct } }));
        return { success: true, message: 'Product added successfully' };
      } catch {
        set({ error: `Fail to create product` });
        return { success: false, message: 'Fail to add product' };
      } finally {
        set({ isLoading: false });
      }
    },

    setLoading(loading) {
      set({ isLoading: loading });
    },

    setError(message) {
      set({ error: message });
    },
  };
});
