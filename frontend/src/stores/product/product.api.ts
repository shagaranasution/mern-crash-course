import type { Product } from '@/types';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch('/api/products');

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const decoded = await res.json();

    return decoded.data;
  } catch (err) {
    console.error('Error calling get products api:', (err as Error).message);
    throw err;
  }
}

export async function createProduct(
  product: Omit<Product, '_id'>
): Promise<Product> {
  try {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const decoded = await res.json();

    if (!decoded.success) {
      throw new Error(decoded.message);
    }

    return decoded.data;
  } catch (err) {
    console.error('Error calling post product api:', (err as Error).message);
    throw err;
  }
}
