export async function api<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
  opts?: {
    skipAppResponseShape?: boolean;
  }
): Promise<T> {
  try {
    const res = await fetch(input, init);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const parsed = await res.json();

    if (opts?.skipAppResponseShape || parsed?.success === undefined) {
      return parsed as T;
    }

    if (!parsed.success) {
      throw new Error(
        parsed?.message || `Request failed with status ${res.status}`
      );
    }

    return parsed.data as T;
  } catch (err) {
    console.error('API call failed:', (err as Error).message);
    throw err;
  }
}
