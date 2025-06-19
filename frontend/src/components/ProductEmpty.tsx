import { VStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function ProductEmpty() {
  return (
    <VStack>
      <Text
        fontSize={'xl'}
        textAlign={'center'}
        fontWeight={'bold'}
        color={'gray.500'}>
        No products found 😢{' '}
      </Text>
      <Link to={'/create'}>
        <Text color={'blue.500'} _hover={{ textDecoration: 'underline' }}>
          Create a product
        </Text>
      </Link>
    </VStack>
  );
}

export default ProductEmpty;
