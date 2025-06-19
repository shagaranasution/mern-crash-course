import ProductCard from '@/components/ProductCard';
import ProductEmpty from '@/components/ProductEmpty';
import { useProductStore } from '@/stores';
import { Container, VStack, Text, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';

function HomePage() {
  const { products, getProducts, isLoading } = useProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

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

        {isLoading && <Spinner color="cyan.400" size="lg" />}

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
              <ProductCard product={product} key={product._id} />
            ))}
          </SimpleGrid>
        )}

        {!isLoading && products.length == 0 && <ProductEmpty />}
      </VStack>
    </Container>
  );
}

export default HomePage;
