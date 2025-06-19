import { create } from 'zustand';
import type { ProductStore } from './product.type';
import { createProduct, fetchProducts } from './product.api';

export const useProductStore = create<ProductStore>((set) => {
  return {
    products: [],
    isLoading: false,
    error: null,

    async getProducts() {
      set({ isLoading: true, error: null });

      try {
        const products = await fetchProducts();
        set({ products });
        return { success: true, message: 'Get products successfully' };
      } catch {
        const message = 'Fail to get products data';
        set({ error: message });
        return { success: false, message };
      } finally {
        set({ isLoading: false });
      }
    },

    async addProduct(product) {
      set({ isLoading: true, error: null });

      try {
        const addedProduct = await createProduct(product);
        set((state) => ({ products: [...state.products, addedProduct] }));
        return { success: true, message: 'Product added successfully' };
      } catch {
        const message = 'Fail to add product';
        set({ error: message });
        return { success: false, message };
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
