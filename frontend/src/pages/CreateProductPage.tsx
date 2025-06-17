import { ProductForm } from '@/components/ProductForm';
import type { Product } from '@/types';
import { Container, Heading, VStack } from '@chakra-ui/react';

function CreateProductPage() {
  const handleProductSubmit = (product: Product) => {
    console.log(product);
  };

  return (
    <Container maxW={'breakpoint-sm'}>
      <VStack gap={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
          Create New Product
        </Heading>

        <ProductForm onSubmit={handleProductSubmit} />
      </VStack>
    </Container>
  );
}

export default CreateProductPage;
