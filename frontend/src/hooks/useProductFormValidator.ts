import { useState } from 'react';

type ProductFormErrors = {
  name?: string;
  price?: string;
};

export function useProductFormValidator() {
  const [errors, setErrors] = useState<ProductFormErrors>({});

  const validateProductName = (value: string): boolean => {
    const trimmed = value.trim();

    if (trimmed.length === 0) {
      setErrors((prev) => ({
        ...prev,
        name: 'Please fill out this field',
      }));

      return false;
    } else if (trimmed.length < 3) {
      setErrors((prev) => ({
        ...prev,
        name: 'Product Name should have at least 3 characters',
      }));

      return false;
    }

    setErrors((prev) => ({
      ...prev,
      name: undefined,
    }));

    return true;
  };

  const validatePrice = (value: number): boolean => {
    if (value === 0) {
      setErrors((prev) => ({
        ...prev,
        price: 'Please fill out this field',
      }));

      return false;
    }

    setErrors((prev) => ({
      ...prev,
      price: undefined,
    }));

    return true;
  };

  const validateInputs = (name: string, price: number): boolean => {
    const isNameValid = validateProductName(name);
    const isPriceValid = validatePrice(price);

    return isNameValid && isPriceValid;
  };

  const clearErrors = () => setErrors({});

  return {
    errors,
    validateProductName,
    validatePrice,
    validateInputs,
    clearErrors,
  };
}
