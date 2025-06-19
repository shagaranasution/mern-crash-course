export async function api<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(input, init);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const parsed = await res.json();

    if (!parsed.success) {
      throw new Error(
        parsed?.message || `Request failed with status ${res.status}`
      );
    }

    return parsed.data as T;
  } catch (err) {
    console.error('Error calling post product api:', (err as Error).message);
    throw err;
  }
}
