import type { Product } from '@/types';
import { formatPrice } from '@/utils/priceFormatter';
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
}

const defaultImageURL = 'https://placehold.co/400x400?text=No+Product+Image';

function ProductCard({ product }: ProductCardProps) {
  let imageSource = product.image;
  if (!imageSource) {
    imageSource = defaultImageURL;
  }

  return (
    <Box
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all 0.3s'}
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}>
      <Image
        src={imageSource}
        alt={product.name}
        h={48}
        w={'full'}
        objectFit={'cover'}
      />

      <Box p={4}>
        <Heading as={'h3'} size={'md'} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={'light'} fontSize={'large'} mb={4}>
          {`Rp. ${formatPrice(product.price)}`}
        </Text>

        <HStack gap={2}>
          <IconButton
            aria-label="Edit product"
            size={'sm'}
            variant={'subtle'}
            colorPalette={'blue'}>
            <FaEdit />
          </IconButton>

          <IconButton
            aria-label="Remove product"
            size={'sm'}
            variant={'subtle'}
            colorPalette={'red'}>
            <FaTrashAlt />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
}

export default ProductCard;
