import ProductForm from '@/components/ProductForm';
import { toaster } from '@/components/ui/toaster';
import { useProductStore } from '@/stores';
import type { Product } from '@/types';
import { Container, Heading, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProductPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { product, isLoading, getProduct, editProduct } = useProductStore();

  const handleSubmit = async (
    product: Omit<Product, '_id'>,
    id?: string | null
  ) => {
    if (!id) {
      return { success: false, message: 'Fail to edit product' };
    }

    const { success, message } = await editProduct(id, product);

    toaster.create({
      description: message,
      type: success ? 'success' : 'error',
      closable: true,
      duration: 3000,
    });

    return { success, message };
  };

  const handleSuccess = () => {
    navigate('/', {
      replace: true,
    });
  };

  useEffect(() => {
    const id = params?.id;

    if (!id) return;

    getProduct(id);
  }, [params, getProduct]);

  return (
    <Container maxW={'breakpoint-sm'}>
      <VStack gap={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
          Edit Product
        </Heading>

        <ProductForm
          product={product}
          submitting={isLoading}
          onSubmit={handleSubmit}
          onSuccess={handleSuccess}
        />
      </VStack>
    </Container>
  );
}

export default UpdateProductPage;
