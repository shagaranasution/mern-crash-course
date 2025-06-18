import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateProductPage from './pages/CreateProductPage';
import { useColorModeValue } from './components/ui/color-mode';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <Box minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.950')}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateProductPage />} />
      </Routes>
      <Toaster />
    </Box>
  );
}

export default App;
