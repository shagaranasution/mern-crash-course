import { Container, Flex, HStack, Text, IconButton } from '@chakra-ui/react';
import { CiSquarePlus } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useColorMode } from './ui/color-mode';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={'1140px'} px={4} pb={4}>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDir={{ base: 'column', sm: 'row' }}>
        <Text
          fontSize={{ base: 22, sm: 28 }}
          fontWeight={'bold'}
          textAlign={'center'}
          textTransform={'uppercase'}
          bgGradient={'to-r'}
          gradientFrom={'cyan.400'}
          gradientTo={'cyan.500'}
          bgClip={'text'}>
          <Link to={'/'}>Product Store 🛒</Link>
        </Text>

        <HStack gap={2} alignItems={'center'}>
          <IconButton variant={'subtle'} asChild>
            <Link to={'/product/add'}>
              <CiSquarePlus />
            </Link>
          </IconButton>

          <IconButton variant={'subtle'} onClick={toggleColorMode}>
            {colorMode === 'light' ? <IoMoon /> : <LuSun />}
          </IconButton>
        </HStack>
      </Flex>
    </Container>
  );
}

export default Navbar;
