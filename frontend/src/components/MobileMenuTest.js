import React, { useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { FaBars, FaTimes } from 'react-icons/fa';

const MobileMenuTest = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleToggle = () => {
    console.log('Button clicked! Current state:', isOpen);
    setIsOpen(!isOpen);
  };
  
  return (
    <Box p={4}>
      <Text mb={4}>Mobile Menu Test</Text>
      
      {/* Test Button */}
      <Button
        onClick={handleToggle}
        variant="ghost"
        size="lg"
        p={3}
        borderRadius="xl"
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        boxShadow="0 4px 10px rgba(0,0,0,0.06)"
        _hover={{ 
          bg: 'rgba(100, 116, 139, 0.1)',
          transform: 'scale(1.1)',
        }}
        transition="all 0.3s ease"
        mb={4}
      >
        {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </Button>
      
      {/* Test Menu */}
      {isOpen && (
        <Box
          bg="white"
          p={4}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
          boxShadow="0 4px 20px rgba(0,0,0,0.1)"
        >
          <Text mb={2}>Menu is open!</Text>
          <Text fontSize="sm" color="gray.600">
            State: {isOpen ? 'Open' : 'Closed'}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default MobileMenuTest;
