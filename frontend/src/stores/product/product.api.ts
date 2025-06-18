import type { Product } from '@/types';

export async function createProduct(
  product: Omit<Product, 'id'>
): Promise<Product> {
  try {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (err) {
    console.error('Error calling post product api: ', (err as Error).message);
    throw err;
  }
}
