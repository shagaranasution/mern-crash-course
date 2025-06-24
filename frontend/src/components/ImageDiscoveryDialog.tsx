import {
  IconButton,
  Input,
  SimpleGrid,
  Image,
  Text,
  Portal,
  Dialog,
  CloseButton,
  Skeleton,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { toaster } from '@/components/ui/toaster';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import type { UnsplashImage } from '@/types/unsplash-api.types';
import { discoverUnsplashImages } from '@/services/discoverUnsplashImages';

interface ImageDiscoveryDialogProps {
  onSelect: (url: string) => void;
}

function ImageDiscoveryDialog({ onSelect }: ImageDiscoveryDialogProps) {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const bg = useColorModeValue('white', 'gray.900');

  const handleSearchInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setQuery(value);
  };

  useEffect(() => {
    if (!query.trim()) {
      setImages([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setIsloading(true);
        const { results } = await discoverUnsplashImages(query);
        setImages(results);
      } catch {
        toaster.create({
          description: 'Fail to search image',
          type: 'error',
          closable: true,
          duration: 3000,
        });
      } finally {
        setIsloading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton
          aria-label="Browse image"
          size={'md'}
          variant={'subtle'}
          colorPalette={'blue'}
          alignSelf={'end'}>
          <MdOutlineAddPhotoAlternate />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content mx={'4'} bg={bg} rounded="lg">
            <Dialog.Header>
              <Dialog.Title>Browse Images</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Input
                placeholder="Enter product name"
                mt={2}
                value={query}
                onChange={handleSearchInputChange}
              />
              {isLoading ? (
                <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} gap={4} mt={4}>
                  {Array.from({ length: 2 }).map((_, index) => (
                    <Skeleton
                      w={'full'}
                      h={'104px'}
                      key={index}
                      borderRadius={'md'}
                    />
                  ))}
                </SimpleGrid>
              ) : images.length ? (
                <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} gap={4} mt={4}>
                  {images.map((image) => (
                    <Dialog.ActionTrigger
                      onClick={() => onSelect(image.urls.regular)}
                      key={image.id}
                      asChild>
                      <Image
                        src={image.urls.regular}
                        alt={image.alt_description ?? image.description ?? ''}
                        w={'full'}
                        h={'104px'}
                        objectFit={'cover'}
                        borderRadius="md"
                        cursor="pointer"
                        transition={'all 0.3s'}
                        _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
                        onClick={() => {
                          onSelect(image.urls.regular);
                        }}
                      />
                    </Dialog.ActionTrigger>
                  ))}
                </SimpleGrid>
              ) : (
                <Text mt={4} color="gray.500" textAlign="center">
                  No images available
                </Text>
              )}
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default ImageDiscoveryDialog;
