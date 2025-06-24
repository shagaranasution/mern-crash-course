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
import { Link } from 'react-router-dom';
import { Tooltip } from '@/components/ui/tooltip';

interface ProductCardProps {
  product: Product;
  removing: boolean;
  onRemove: () => void;
}

const defaultImageURL = 'https://placehold.co/400x400?text=No+Product+Image';

function ProductCard({ product, removing, onRemove }: ProductCardProps) {
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
        <Tooltip content={product.name}>
          <Heading as={'h3'} size={'md'} mb={2} lineClamp={1}>
            {product.name}
          </Heading>
        </Tooltip>

        <Text fontWeight={'light'} fontSize={'large'} mb={4}>
          {`Rp. ${formatPrice(product.price)}`}
        </Text>

        <HStack gap={2}>
          <IconButton
            aria-label="Edit product"
            size={'sm'}
            variant={'subtle'}
            colorPalette={'blue'}>
            <Link to={`product/${product._id}/edit`}>
              <FaEdit />
            </Link>
          </IconButton>

          <IconButton
            onClick={onRemove}
            aria-label="Remove product"
            size={'sm'}
            variant={'subtle'}
            colorPalette={'red'}
            disabled={removing}>
            <FaTrashAlt />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
}

export default ProductCard;
