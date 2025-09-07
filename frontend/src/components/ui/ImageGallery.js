import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid, 
  DialogRoot,
  DialogBackdrop,
  DialogContent,
  DialogBody,
  Flex,
  IconButton,
  Badge,
  VStack,
  CloseButton
} from '@chakra-ui/react';
import { FaExpand, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ImagePlaceholder from './ImagePlaceholder';

const MotionBox = motion(Box);

const ImageGallery = ({ 
  title = "Product Gallery", 
  subtitle = "Explore our premium collection",
  images = [],
  columns = { base: 1, md: 2, lg: 3, xl: 4 }
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

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

  const openModal = (index) => {
    setSelectedImage(index);
    onOpen();
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % galleryItems.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <Box py={20} bg="#070b1b">
      <Container maxW="container.xl">
        {/* Section Header */}
        <VStack spacing={4} textAlign="center" mb={12}>
          <Text color="brand.500" fontWeight="600" fontSize="sm" textTransform="uppercase">
            Gallery
          </Text>
          <Heading as="h2" size="xl" fontWeight="bold" lineHeight="1.2">
            {title}
          </Heading>
          <Text color="gray.300" fontSize="lg" maxW="600px">
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
                bg="slate.800"
                className="glass-effect"
                cursor="pointer"
                onClick={() => openModal(index)}
                _hover={{
                  transform: "scale(1.02)",
                  transition: "all 0.3s ease"
                }}
              >
                {/* Image placeholder */}
                <Box position="relative" height="250px">
                  <ImagePlaceholder
                    width="100%"
                    height="100%"
                    text={item.title}
                    fontSize="sm"
                    bg="linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))"
                    borderRadius="none"
                    border="none"
                    showIcon={true}
                    color="gray.300"
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
                      aria-label="Expand image"
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
                  <Heading as="h3" size="md" mb={2} color="white">
                    {item.title}
                  </Heading>
                  <Text color="gray.400" fontSize="sm" noOfLines={2}>
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

      {/* Dialog for expanded view */}
      <DialogRoot open={isOpen} onOpenChange={(e) => e.open ? null : onClose()} size="4xl" placement="center">
        <DialogBackdrop bg="blackAlpha.800" backdropFilter="blur(10px)" />
        <DialogContent bg="slate.900" borderRadius="xl" overflow="hidden" maxW="4xl">
          <CloseButton 
            color="white" 
            position="absolute" 
            top={4} 
            right={4} 
            zIndex={10}
            onClick={onClose}
          />
          <DialogBody p={0}>
            <Flex direction={{ base: "column", md: "row" }}>
              {/* Image section */}
              <Box flex={2} position="relative" height={{ base: "300px", md: "500px" }}>
                <ImagePlaceholder
                  width="100%"
                  height="100%"
                  text={galleryItems[selectedImage]?.title}
                  fontSize="xl"
                  bg="linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))"
                  borderRadius="none"
                  border="none"
                  showIcon={true}
                  color="white"
                />

                {/* Navigation arrows */}
                <IconButton
                  aria-label="Previous image"
                  icon={<FaChevronLeft />}
                  position="absolute"
                  left={4}
                  top="50%"
                  transform="translateY(-50%)"
                  colorScheme="whiteAlpha"
                  variant="solid"
                  borderRadius="full"
                  onClick={prevImage}
                />
                <IconButton
                  aria-label="Next image"
                  icon={<FaChevronRight />}
                  position="absolute"
                  right={4}
                  top="50%"
                  transform="translateY(-50%)"
                  colorScheme="whiteAlpha"
                  variant="solid"
                  borderRadius="full"
                  onClick={nextImage}
                />
              </Box>

              {/* Details section */}
              <Box flex={1} p={8} color="white">
                <VStack align="start" spacing={4} h="100%">
                  <Box>
                    <Badge colorScheme="blue" mb={2}>
                      {galleryItems[selectedImage]?.category}
                    </Badge>
                    <Heading as="h3" size="lg" mb={4}>
                      {galleryItems[selectedImage]?.title}
                    </Heading>
                    <Text color="gray.300" lineHeight="1.6">
                      {galleryItems[selectedImage]?.description}
                    </Text>
                  </Box>

                  <Box mt="auto">
                    <Text fontSize="sm" color="gray.500" mb={2}>
                      Image {selectedImage + 1} of {galleryItems.length}
                    </Text>
                    <Flex gap={2}>
                      <Box
                        as="button"
                        px={6}
                        py={2}
                        bg="brand.500"
                        color="white"
                        borderRadius="md"
                        fontSize="sm"
                        fontWeight="medium"
                        _hover={{ bg: "brand.400" }}
                      >
                        View Details
                      </Box>
                      <Box
                        as="button"
                        px={6}
                        py={2}
                        border="1px solid"
                        borderColor="gray.600"
                        color="gray.300"
                        borderRadius="md"
                        fontSize="sm"
                        fontWeight="medium"
                        _hover={{ borderColor: "gray.500" }}
                      >
                        Contact Us
                      </Box>
                    </Flex>
                  </Box>
                </VStack>
              </Box>
            </Flex>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default ImageGallery;
