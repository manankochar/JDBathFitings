import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid, 
  Flex,
  IconButton,
  Badge,
  VStack
} from '@chakra-ui/react';
import { FaExpand } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ImagePlaceholder from './ImagePlaceholder';

const MotionBox = motion(Box);

const SimpleImageGallery = ({ 
  title = "Product Gallery", 
  subtitle = "Explore our premium collection",
  images = [],
  columns = { base: 1, md: 2, lg: 3, xl: 4 }
}) => {
  // Default gallery items if no images provided
  const defaultGalleryItems = [
    {
      id: 1,
      title: "Premium Faucet Collection",
      category: "Faucets",
      description: "Modern and efficient faucets for your bathroom",
      isNew: true
    },
    {
      id: 2,
      title: "Luxury Shower Systems",
      category: "Bathroom",
      description: "Complete shower solutions with advanced features",
      isNew: false
    },
    {
      id: 3,
      title: "Designer Basin Sets",
      category: "Sanitaryware",
      description: "Elegant basin designs for contemporary bathrooms",
      isNew: true
    },
    {
      id: 4,
      title: "Kitchen Sink Mixers",
      category: "Kitchen",
      description: "Functional and stylish kitchen fittings",
      isNew: false
    },
    {
      id: 5,
      title: "Bathroom Accessories",
      category: "Accessories",
      description: "Complete your bathroom with matching accessories",
      isNew: true
    },
    {
      id: 6,
      title: "Wall Mount Toilets",
      category: "Sanitaryware",
      description: "Space-saving and modern toilet solutions",
      isNew: false
    },
    {
      id: 7,
      title: "Vanity Units",
      category: "Furniture",
      description: "Storage solutions for your bathroom",
      isNew: false
    },
    {
      id: 8,
      title: "Mirror Cabinets",
      category: "Accessories",
      description: "Functional mirrors with built-in storage",
      isNew: true
    }
  ];

  const galleryItems = images.length > 0 ? images : defaultGalleryItems;

  return (
    <Box py={20} bg="white">
      <Container maxW="container.xl">
        {/* Section Header */}
        <VStack spacing={4} textAlign="center" mb={12}>
          <Text color="brand.500" fontWeight="600" fontSize="sm" textTransform="uppercase">
            Gallery
          </Text>
          <Heading as="h2" size="xl" fontWeight="bold" lineHeight="1.2">
            {title}
          </Heading>
          <Text color="gray.600" fontSize="lg" maxW="600px">
            {subtitle}
          </Text>
        </VStack>

        {/* Gallery Grid */}
        <SimpleGrid columns={columns} spacing={6}>
          {galleryItems.map((item, index) => (
            <MotionBox
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Box
                position="relative"
                borderRadius="xl"
                overflow="hidden"
                bg="white"
                className="glass-effect"
                cursor="pointer"
                border="1px solid"
                borderColor="gray.200"
                boxShadow="lg"
                _hover={{
                  transform: "scale(1.02)",
                  transition: "all 0.3s ease",
                  boxShadow: "xl"
                }}
              >
                {/* Image placeholder */}
                <Box position="relative" height="250px">
                  <ImagePlaceholder
                    width="100%"
                    height="100%"
                    text={item.title}
                    fontSize="sm"
                    bg="gray.100"
                    borderRadius="none"
                    border="none"
                    showIcon={true}
                    color="gray.600"
                  />
                  
                  {/* Overlay */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg="rgba(0,0,0,0.4)"
                    opacity={0}
                    transition="opacity 0.3s ease"
                    _hover={{ opacity: 1 }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <IconButton
                      aria-label="View image"
                      icon={<FaExpand />}
                      size="lg"
                      colorScheme="blue"
                      variant="solid"
                      borderRadius="full"
                    />
                  </Box>

                  {/* Category badge */}
                  <Badge
                    position="absolute"
                    top={3}
                    left={3}
                    colorScheme="blue"
                    variant="solid"
                    fontSize="xs"
                    px={2}
                    py={1}
                  >
                    {item.category}
                  </Badge>

                  {/* New badge */}
                  {item.isNew && (
                    <Badge
                      position="absolute"
                      top={3}
                      right={3}
                      colorScheme="green"
                      variant="solid"
                      fontSize="xs"
                      px={2}
                      py={1}
                    >
                      NEW
                    </Badge>
                  )}
                </Box>

                {/* Content */}
                <Box p={4}>
                  <Heading as="h3" size="md" mb={2} color="gray.800">
                    {item.title}
                  </Heading>
                  <Text color="gray.600" fontSize="sm" noOfLines={2}>
                    {item.description}
                  </Text>
                </Box>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>

        {/* View All Button */}
        <Flex justify="center" mt={10}>
          <Box
            as="button"
            px={8}
            py={4}
            bg="transparent"
            border="2px solid"
            borderColor="brand.500"
            color="brand.500"
            borderRadius="lg"
            fontWeight="medium"
            _hover={{
              bg: "brand.500",
              color: "white",
              transform: "translateY(-2px)",
              transition: "all 0.3s ease"
            }}
          >
            View All Products
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default SimpleImageGallery;
