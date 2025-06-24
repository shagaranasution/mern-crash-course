import { useColorModeValue } from '@/components/ui/color-mode';
import { useProductFormValidator } from '@/hooks/useProductFormValidator';
import type { Product } from '@/types';
import { formatPrice, unformatPrice } from '@/utils/priceFormatter';
import {
  Box,
  Button,
  Field,
  HStack,
  Input,
  InputGroup,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import ImageDiscoveryDialog from './ImageDiscoveryDialog';

interface ProductFormProps {
  product?: Product | null;
  submitting: boolean;
  onSubmit: (
    product: Omit<Product, '_id'>,
    id?: string | null
  ) => Promise<{ success: boolean; message: string }>;
  onSuccess?: () => void;
}

interface ProductInputForm {
  name: string;
  price: string;
  image?: string;
}

const initialProductForm: ProductInputForm = {
  name: '',
  price: '',
  image: '',
};

function ProductForm({
  product,
  submitting,
  onSubmit,
  onSuccess,
}: ProductFormProps) {
  const [inputs, setInputs] = useState<ProductInputForm>(initialProductForm);
  const { errors, validateInputs, clearErrors } = useProductFormValidator();
  const priceInputRef = useRef(null);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name !== 'price') {
      setInputs({
        ...inputs,
        [name]: value,
      });

      return;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handlePriceInputFocus = () => {
    setInputs((prev) => ({
      ...prev,
      price: `${unformatPrice(prev.price)}`,
    }));
  };

  const handlePriceInputBlur = () => {
    setInputs((prev) => ({
      ...prev,
      price: formatPrice(parseInt(prev.price)),
    }));
  };

  const handleImageSelect = (url: string) => {
    setInputs((prev) => ({ ...prev, image: url }));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, price: priceString } = inputs;
    const price = unformatPrice(priceString);
    const isValid = validateInputs(name, price);

    if (isValid) {
      const { success } = await onSubmit(
        { ...inputs, price: price },
        product?._id
      );

      if (success && !product?._id) {
        setInputs(initialProductForm);
        clearErrors();
      } else if (success) {
        onSuccess?.();
      }
    }
  };

  useEffect(() => {
    if (!product) return;
    const { name, price, image } = product;
    setInputs({ name, price: formatPrice(price), image });
  }, [product]);

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
              value={inputs.name}
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
                value={inputs.price}
                onChange={handleFieldChange}
                onFocus={handlePriceInputFocus}
                onBlur={handlePriceInputBlur}
                ref={priceInputRef}
              />
            </InputGroup>
            <Field.ErrorText>{errors?.price}</Field.ErrorText>
          </Field.Root>

          <HStack w={'full'} gap={4} alignContent={'space-between'}>
            <Field.Root>
              <Field.Label>Image</Field.Label>
              <Input
                placeholder="Enter Image URL"
                name="image"
                value={inputs.image}
                onChange={handleFieldChange}
              />
            </Field.Root>

            <Box alignSelf={'end'}>
              <ImageDiscoveryDialog onSelect={handleImageSelect} />
            </Box>
          </HStack>

          <Button
            type="submit"
            w={'full'}
            bg={'blue.focusRing'}
            loading={submitting}
            loadingText={product && 'Adding..'}
            disabled={submitting}>
            {product ? `Edit Product` : `Add Product`}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default ProductForm;
