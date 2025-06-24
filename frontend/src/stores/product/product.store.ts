import { create } from 'zustand';
import type { ProductStore } from './product.types';
import {
  createProduct,
  deleteProduct,
  fetchProduct,
  fetchProducts,
  updateProduct,
} from './product.api';

export const useProductStore = create<ProductStore>((set, get) => {
  return {
    products: [],
    product: null,
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

    async getProduct(id) {
      set({ isLoading: true, error: null });

      try {
        const product = await fetchProduct(id);
        set({ product });
        return { success: true, message: 'Get product successfully' };
      } catch {
        const message = 'Fail to get product data';
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

    async editProduct(id, product) {
      set({ isLoading: true, error: null });

      try {
        const updated = await updateProduct(id, product);
        set({
          products: get().products.map((p) => (p._id === id ? updated : p)),
        });
        return { success: true, message: 'Product edit successfully' };
      } catch {
        const message = 'Fail to edit product';
        return { success: false, message };
      } finally {
        get().setLoading(false);
      }
    },

    async removeProduct(id) {
      set({ isLoading: true, error: null });

      try {
        const deleted = await deleteProduct(id);

        set({ products: get().products.filter((p) => p._id !== deleted._id) });
        return { success: true, message: 'Product removed successfully' };
      } catch {
        const message = 'Fail to remove product';
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
