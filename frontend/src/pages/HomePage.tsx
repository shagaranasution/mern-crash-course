import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import ProductEmpty from '@/components/ProductEmpty';
import { toaster } from '@/components/ui/toaster';
import { useProductStore } from '@/stores';
import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';

function HomePage() {
  const { products, getProducts, removeProduct, isLoading } = useProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleProductRemoval = async (id: string) => {
    const { success, message } = await removeProduct(id);
    toaster.create({
      description: message,
      type: success ? 'success' : 'error',
      closable: true,
      duration: 3000,
    });
  };

  return (
    <Container maxW={'breakpoint-xl'} py={12}>
      <VStack gap={8}>
        <Text
          fontSize={'3xl'}
          fontWeight={'bold'}
          bgGradient={'to-r'}
          gradientFrom={'cyan.400'}
          gradientTo={'blue.500'}
          bgClip={'text'}
          textAlign={'center'}>
          Current Products 🚀
        </Text>

        {isLoading && (
          <SimpleGrid
            columns={{
              base: 1,
              sm: 2,
              md: 3,
            }}
            gap={5}
            w={'full'}>
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </SimpleGrid>
        )}

        {!isLoading && products.length > 0 && (
          <SimpleGrid
            columns={{
              base: 1,
              sm: 2,
              md: 3,
            }}
            gap={5}
            w={'full'}>
            {products.map((product) => (
              <ProductCard
                product={product}
                removing={isLoading}
                onRemove={() => handleProductRemoval(product._id)}
                key={product._id}
              />
            ))}
          </SimpleGrid>
        )}

        {!isLoading && products.length == 0 && <ProductEmpty />}
      </VStack>
    </Container>
  );
}

export default HomePage;
