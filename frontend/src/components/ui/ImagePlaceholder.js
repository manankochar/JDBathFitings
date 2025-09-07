import React from 'react';
import { Box, Text, VStack, Icon } from '@chakra-ui/react';
import { FaImage } from 'react-icons/fa';

const ImagePlaceholder = ({ 
  width = "100%", 
  height = "200px", 
  text = "Image Placeholder", 
  showIcon = true,
  borderRadius = "md",
  bg = "gray.100",
  color = "gray.600",
  fontSize = "md",
  ...props 
}) => {
  return (
    <Box
      width={width}
      height={height}
      bg={bg}
      borderRadius={borderRadius}
      display="flex"
      alignItems="center"
      justifyContent="center"
      border="2px dashed"
      borderColor="gray.300"
      position="relative"
      overflow="hidden"
      _hover={{
        borderColor: "brand.500",
        transform: "scale(1.02)",
        transition: "all 0.3s ease"
      }}
      {...props}
    >
      {/* Background pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.1}
        bgImage="radial-gradient(circle at 20px 20px, #ffffff 1px, transparent 1px)"
        bgSize="40px 40px"
      />
      
      <VStack spacing={2} position="relative" zIndex={1}>
        {showIcon && <Icon as={FaImage} boxSize={6} color={color} />}
        <Text 
          fontSize={fontSize} 
          fontWeight="medium" 
          color={color}
          textAlign="center"
          px={4}
        >
          {text}
        </Text>
      </VStack>
      
      {/* Corner indicators */}
      <Box
        position="absolute"
        top={2}
        right={2}
        width={3}
        height={3}
        bg="brand.500"
        borderRadius="full"
        opacity={0.6}
      />
      <Box
        position="absolute"
        bottom={2}
        left={2}
        width={3}
        height={3}
        bg="brand.500"
        borderRadius="full"
        opacity={0.6}
      />
    </Box>
  );
};

export default ImagePlaceholder;
