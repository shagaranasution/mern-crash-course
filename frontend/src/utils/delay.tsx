export function delay(ms: number): Promise<unknown> {
  return new Promise((res) => setTimeout(res, ms));
}
