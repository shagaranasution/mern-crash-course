import { Box, Skeleton, HStack, IconButton } from '@chakra-ui/react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function ProductCardSkeleton() {
  return (
    <Box shadow={'lg'} rounded={'lg'} overflow={'hidden'}>
      <Skeleton height={'192px'} width={'full'} /> {/* Image placeholder */}
      <Box p={4}>
        {/* Product Name placeholder */}
        <Skeleton height={'20px'} mb={2} width={'70%'} />

        {/* Product Price placeholder */}
        <Skeleton height={'16px'} mb={4} width={'50%'} />

        <HStack gap={2}>
          <IconButton
            aria-label={'Edit icon'}
            disabled={true}
            size={'sm'}
            variant={'subtle'}
            colorScheme={'gray'}>
            <FaEdit />
          </IconButton>

          <IconButton
            aria-label={'Remove icon'}
            disabled={true}
            size={'sm'}
            variant={'subtle'}
            colorScheme={'gray'}>
            <FaTrashAlt />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
}

export default ProductCardSkeleton;
