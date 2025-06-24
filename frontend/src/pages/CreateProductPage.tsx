import ProductForm from '@/components/ProductForm';
import { toaster } from '@/components/ui/toaster';
import { useProductStore } from '@/stores';
import type { Product } from '@/types';
import { Container, Heading, VStack } from '@chakra-ui/react';

function CreateProductPage() {
  const { addProduct, isLoading } = useProductStore();

  const handleProductSubmit = async (product: Omit<Product, '_id'>) => {
    const { success, message } = await addProduct(product);

    toaster.create({
      description: message,
      type: success ? 'success' : 'error',
      closable: true,
      duration: 3000,
    });

    return { success, message };
  };

  return (
    <Container maxW={'breakpoint-sm'}>
      <VStack gap={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
          Create New Product
        </Heading>

        <ProductForm submitting={isLoading} onSubmit={handleProductSubmit} />
      </VStack>
    </Container>
  );
}

export default CreateProductPage;
