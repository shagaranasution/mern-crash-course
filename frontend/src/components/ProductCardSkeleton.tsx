import { Box, Skeleton, HStack, IconButton } from '@chakra-ui/react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function ProductCardSkeleton() {
  return (
    <Box shadow={'lg'} rounded={'lg'} overflow={'hidden'}>
      <Skeleton height={'192px'} width={'full'} /> {/* Image placeholder */}
      <Box p={4}>
        {/* Product Name placeholder */}
        <Skeleton height={'20px'} width={'70%'} mb={2} />

        {/* Product Price placeholder */}
        <Skeleton height={'16px'} width={'50%'} mb={4} />

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
