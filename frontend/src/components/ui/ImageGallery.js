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
    <Box py={{ base: 12, sm: 16, md: 20 }} bg="#070b1b">
      <Container maxW="container.xl" px={{ base: 4, sm: 6, md: 8, lg: 10, xl: 12 }} className="container-responsive">
        {/* Section Header */}
        <VStack spacing={{ base: 3, md: 4 }} textAlign="center" mb={{ base: 8, md: 12 }} className="gallery-header-responsive">
          <Text color="brand.500" fontWeight="600" fontSize={{ base: "xs", md: "sm" }} textTransform="uppercase">
            Gallery
          </Text>
          <Heading 
            as="h2" 
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold" 
            lineHeight="1.2"
            px={{ base: 2, md: 0 }}
            wordBreak="break-word"
          >
            {title}
          </Heading>
          <Text 
            color="gray.300" 
            fontSize={{ base: "md", md: "lg" }} 
            maxW="600px"
            px={{ base: 4, md: 0 }}
            wordBreak="break-word"
          >
            {subtitle}
          </Text>
        </VStack>

        {/* Gallery Grid */}
        <SimpleGrid 
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} 
          spacing={{ base: 4, sm: 5, md: 6 }}
          className="gallery-grid-responsive"
        >
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
                <Box position="relative" height={{ base: "200px", sm: "220px", md: "250px" }} className="gallery-item-image">
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
                <Box p={{ base: 3, md: 4 }}>
                  <Heading 
                    as="h3" 
                    fontSize={{ base: "md", md: "lg" }}
                    mb={2} 
                    color="white"
                    noOfLines={2}
                  >
                    {item.title}
                  </Heading>
                  <Text 
                    color="gray.400" 
                    fontSize={{ base: "xs", md: "sm" }} 
                    noOfLines={2}
                  >
                    {item.description}
                  </Text>
                </Box>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>

        {/* View All Button */}
        <Flex justify="center" mt={{ base: 8, md: 10 }}>
          <Box
            as="button"
            px={{ base: 6, md: 8 }}
            py={{ base: 3, md: 4 }}
            bg="transparent"
            border="2px solid"
            borderColor="brand.500"
            color="brand.500"
            borderRadius="lg"
            fontWeight="medium"
            fontSize={{ base: "sm", md: "md" }}
            className="gallery-view-all-btn"
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
      <DialogRoot open={isOpen} onOpenChange={(e) => e.open ? null : onClose()} size={{ base: "full", md: "4xl" }} placement="center">
        <DialogBackdrop bg="blackAlpha.800" backdropFilter="blur(10px)" />
        <DialogContent 
          bg="slate.900" 
          borderRadius={{ base: "none", md: "xl" }} 
          overflow="hidden" 
          maxW={{ base: "100vw", md: "4xl" }}
          maxH={{ base: "100vh", md: "90vh" }}
          m={{ base: 0, md: 4 }}
          className="gallery-modal-responsive"
        >
          <CloseButton 
            color="white" 
            position="absolute" 
            top={4} 
            right={4} 
            zIndex={10}
            onClick={onClose}
          />
          <DialogBody p={0}>
            <Flex direction={{ base: "column", md: "row" }} className="gallery-modal-content">
              {/* Image section */}
              <Box flex={2} position="relative" height={{ base: "50vh", sm: "60vh", md: "500px" }}>
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
              <Box flex={1} p={{ base: 4, md: 6, lg: 8 }} color="white" className="gallery-modal-details">
                <VStack align="start" spacing={4} h="100%">
                  <Box>
                    <Badge colorScheme="blue" mb={2}>
                      {galleryItems[selectedImage]?.category}
                    </Badge>
                    <Heading 
                      as="h3" 
                      fontSize={{ base: "lg", md: "xl" }}
                      mb={4}
                      noOfLines={2}
                    >
                      {galleryItems[selectedImage]?.title}
                    </Heading>
                    <Text 
                      color="gray.300" 
                      lineHeight="1.6"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      {galleryItems[selectedImage]?.description}
                    </Text>
                  </Box>

                  <Box mt="auto">
                    <Text fontSize="sm" color="gray.500" mb={2}>
                      Image {selectedImage + 1} of {galleryItems.length}
                    </Text>
                    <Flex gap={2} direction={{ base: "column", md: "row" }} className="gallery-modal-buttons">
                      <Box
                        as="button"
                        px={{ base: 4, md: 6 }}
                        py={2}
                        bg="brand.500"
                        color="white"
                        borderRadius="md"
                        fontSize={{ base: "xs", md: "sm" }}
                        fontWeight="medium"
                        _hover={{ bg: "brand.400" }}
                        w={{ base: "100%", md: "auto" }}
                      >
                        View Details
                      </Box>
                      <Box
                        as="button"
                        px={{ base: 4, md: 6 }}
                        py={2}
                        border="1px solid"
                        borderColor="gray.600"
                        color="gray.300"
                        borderRadius="md"
                        fontSize={{ base: "xs", md: "sm" }}
                        fontWeight="medium"
                        _hover={{ borderColor: "gray.500" }}
                        w={{ base: "100%", md: "auto" }}
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

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .gallery-grid-responsive {
            gap: 16px !important;
          }
          
          .gallery-item-image {
            height: 180px !important;
          }
          
          .gallery-header-responsive {
            margin-bottom: 32px !important;
          }
          
          .gallery-modal-responsive {
            border-radius: 0 !important;
            margin: 0 !important;
            max-width: 100vw !important;
            max-height: 100vh !important;
          }
          
          .gallery-modal-content {
            flex-direction: column !important;
          }
          
          .gallery-modal-details {
            padding: 16px !important;
          }
          
          .gallery-modal-buttons {
            flex-direction: column !important;
            gap: 8px !important;
          }
        }
        
        @media (max-width: 480px) {
          .gallery-grid-responsive {
            gap: 12px !important;
            grid-template-columns: 1fr !important;
          }
          
          .gallery-item-image {
            height: 160px !important;
          }
          
          .gallery-view-all-btn {
            width: 100% !important;
            max-width: 280px !important;
          }
        }
        
        @media (max-width: 320px) {
          .gallery-grid-responsive {
            gap: 8px !important;
          }
          
          .gallery-item-image {
            height: 140px !important;
          }
          
          .gallery-modal-details {
            padding: 12px !important;
          }
        }
      `}</style>
    </Box>
  );
};

export default ImageGallery;
