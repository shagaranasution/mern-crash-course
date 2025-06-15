import { Container, Flex, HStack, Text, Button } from '@chakra-ui/react';
import { CiSquarePlus } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useColorMode } from './ui/color-mode';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={'1140px'} px={4}>
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
          <Button variant={'subtle'} asChild>
            <Link to={'/create'}>
              <CiSquarePlus />
            </Link>
          </Button>

          <Button variant={'subtle'} onClick={toggleColorMode}>
            {colorMode === 'light' ? <IoMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default Navbar;
