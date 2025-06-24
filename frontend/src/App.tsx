import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateProductPage from './pages/CreateProductPage';
import { useColorModeValue } from './components/ui/color-mode';
import { Toaster } from './components/ui/toaster';
import UpdateProductPage from './pages/UpdateProductPage';

function App() {
  return (
    <Box minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.950')}>
      <Navbar />
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/product/add" element={<CreateProductPage />} />
        <Route path="/product/:id/edit" element={<UpdateProductPage />} />
      </Routes>
      <Toaster />
    </Box>
  );
}

export default App;
