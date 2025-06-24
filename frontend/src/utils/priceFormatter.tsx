// Utility function: format number with dots (e.g., 1000000 -> "1.000.000")
export function formatPrice(value: number): string {
  if (!value) return '';
  return value.toLocaleString('id-ID'); // Locale for Indonesia
}

// Utility function: remove all non-digit characters
export function unformatPrice(value: string): number {
  return parseInt(value.replace(/\D/g, '')) || 0;
}
