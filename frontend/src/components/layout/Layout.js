import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" w="100%" maxW="100vw" overflow="hidden">
      <Navbar />
      <Box flex="1" as="main" w="100%" maxW="100%" overflow="hidden">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;