import { useColorModeValue } from '@/components/ui/color-mode';
import { useProductFormValidator } from '@/hooks/useProductFormValidator';
import type { Product } from '@/types';
import { formatPrice, unformatPrice } from '@/utils/priceFormatter';
import {
  Box,
  Button,
  Field,
  Input,
  InputGroup,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

interface ProductFormProps {
  submitting: boolean;
  onSubmit: (
    product: Omit<Product, '_id'>
  ) => Promise<{ success: boolean; message: string }>;
}

const initialProductForm: Omit<Product, '_id'> = {
  name: '',
  price: 0,
  image: '',
};

function ProductForm({ submitting, onSubmit }: ProductFormProps) {
  const [newProduct, setNewProduct] =
    useState<Omit<Product, '_id'>>(initialProductForm);
  const { errors, validateInputs, clearErrors } = useProductFormValidator();

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name !== 'price') {
      setNewProduct({
        ...newProduct,
        [name]: value,
      });

      return;
    }

    setNewProduct({
      ...newProduct,
      [name]: parseInt(unformatPrice(value)) || 0,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, price } = newProduct;
    const isValid = validateInputs(name, price);

    if (isValid) {
      const { success } = await onSubmit(newProduct);

      if (success) {
        setNewProduct(initialProductForm);
        clearErrors();
      }
    }
  };

  return (
    <Box
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      p={6}
      rounded={'lg'}
      shadow={'md'}>
      <form onSubmit={handleFormSubmit}>
        <VStack gap={4}>
          <Field.Root invalid={!!errors?.name}>
            <Field.Label>
              Product Name <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="Enter Product Name"
              name="name"
              value={newProduct.name}
              onChange={handleFieldChange}
            />
            <Field.ErrorText>{errors?.name}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors?.price}>
            <Field.Label>
              Price <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup startElement="Rp" endElement="IDR">
              <Input
                placeholder="0"
                name="price"
                inputMode="numeric"
                value={
                  newProduct.price === 0 ? '' : formatPrice(newProduct.price)
                }
                onChange={handleFieldChange}
              />
            </InputGroup>
            <Field.ErrorText>{errors?.price}</Field.ErrorText>
          </Field.Root>

          <Field.Root>
            <Field.Label>Image</Field.Label>
            <Input
              placeholder="Enter Image URL"
              name="image"
              value={newProduct.image}
              onChange={handleFieldChange}
            />
          </Field.Root>

          <Button
            type="submit"
            w={'full'}
            bg={'blue.focusRing'}
            loading={submitting}
            loadingText={'Adding..'}
            disabled={submitting}>
            {'Add Product'}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default ProductForm;
