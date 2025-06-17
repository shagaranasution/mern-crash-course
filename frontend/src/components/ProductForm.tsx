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
  onSubmit: (product: Product) => void;
}

const initialProduct: Product = {
  name: '',
  price: 0,
  image: '',
};

function ProductForm({ onSubmit }: ProductFormProps) {
  const [newProduct, setNewProduct] = useState<Product>(initialProduct);
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

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, price } = newProduct;
    const isValid = validateInputs(name, price);

    if (isValid) {
      onSubmit(newProduct);
      clearErrors();
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

          <Button type="submit" w={'full'} bg={'blue.focusRing'}>
            Add Product
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export { ProductForm };
