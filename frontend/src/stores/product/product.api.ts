import { api } from '@/lib/api';
import type { Product, MinimalProduct } from '@/types';

export async function fetchProducts(): Promise<Product[]> {
  return api<Product[]>('/api/products');
}

export async function fetchProduct(id: string): Promise<Product> {
  return api<Product>(`/api/products/${id}`);
}

export async function createProduct(
  product: Omit<Product, '_id'>
): Promise<Product> {
  return api<Product>('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
}

export async function updateProduct(
  id: string,
  body: Omit<Product, '_id'>
): Promise<Product> {
  return api<Product>(`/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export async function deleteProduct(id: string): Promise<MinimalProduct> {
  return api<MinimalProduct>(`/api/products/${id}`, {
    method: 'DELETE',
  });
}
