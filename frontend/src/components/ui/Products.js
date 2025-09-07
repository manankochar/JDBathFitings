import React, { useState, useCallback, useMemo } from 'react';
import { Box, Container, Heading, Text, SimpleGrid, Stack, Button, Flex, Image, Badge, VStack, HStack, Icon } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaShoppingCart, FaFire, FaArrowRight } from 'react-icons/fa';
import { productsData, categories } from '../../data/productsData';

const MotionBox = motion(Box);
const MotionSimpleGrid = motion(SimpleGrid);

// Fallback component for failed images
const ProductImageFallback = ({ productName }) => (
  <Box
    width="100%"
    height="100%"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    bg="linear-gradient(135deg, #f8fafc, #ffffff)"
    color="gray.600"
    fontWeight="600"
    fontSize="sm"
    p={4}
  >
    <Text fontSize="2xl" mb={2}>🏠</Text>
    <Text textAlign="center" fontWeight="700" noOfLines={2}>{productName}</Text>
    <Text fontSize="xs" opacity={0.7} mt={1}>Product Image</Text>
  </Box>
);

// Enhanced Product Image component with better error handling
const ProductImage = ({ item }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = useCallback(() => {
    console.warn('Image failed to load:', item.image);
    setImageError(true);
  }, [item.image]);

  const handleImageLoad = useCallback(() => {
    console.log('Image loaded successfully:', item.image);
    setImageLoaded(true);
  }, [item.image]);

  if (imageError || !item.image) {
    return <ProductImageFallback productName={item.name} />;
  }

  return (
    <>
      <img
        src={item.image}
        alt={`${item.name} - ${item.category} product`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          padding: '20px',
          transition: 'all 0.4s ease',
          opacity: imageLoaded ? 1 : 0
        }}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
      {!imageLoaded && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="gray.400"
        >
          Loading...
        </Box>
      )}
    </>
  );
};

// Gallery image component with better error handling
const GalleryImage = ({ image, title, description, index }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <MotionBox
      className="clean-card"
      overflow="hidden"
      bg="white"
      borderRadius="xl"
      boxShadow="0 4px 20px rgba(0,0,0,0.1)"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
      }}
    >
      <Box position="relative" overflow="hidden">
        {hasError ? (
          <Box
            w="100%"
            h="250px"
            bg="gray.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Text fontSize="3xl" mb={2}>🖼️</Text>
            <Text color="gray.600" fontSize="sm">{title}</Text>
          </Box>
        ) : (
          <Image
            src={image}
            alt={title}
            w="100%"
            h="250px"
            objectFit="cover"
            transition="all 0.3s ease"
            onError={() => setHasError(true)}
            _hover={{
              transform: 'scale(1.05)'
            }}
          />
        )}
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          bg="linear-gradient(transparent, rgba(0,0,0,0.8))"
          color="white"
          p={4}
        >
          <Heading size="sm" mb={1}>
            {title}
          </Heading>
          <Text fontSize="sm" opacity="0.9">
            {description}
          </Text>
        </Box>
      </Box>
    </MotionBox>
  );
};

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Memoize categories calculation
  const categoryList = useMemo(() => {
    if (!productsData || productsData.length === 0) {
      return [{ id: 'all', name: 'All Products', count: 0 }];
    }

    const uniqueCategories = [...new Set(productsData.map(p => p.category))];
    const categoryList = [
      { id: 'all', name: 'All Products', count: productsData.length }
    ];
    
    uniqueCategories.forEach(cat => {
      const count = productsData.filter(p => p.category === cat).length;
      categoryList.push({
        id: cat,
        name: categories?.[cat] || cat.charAt(0).toUpperCase() + cat.slice(1),
        count: count
      });
    });
    
    return categoryList;
  }, []);
  
  // Memoize filtered products
  const filteredItems = useMemo(() => {
    if (!productsData || productsData.length === 0) return [];
    
    return activeCategory === 'all' 
      ? productsData.slice(0, 12) // Show first 12 for "all" view
      : productsData.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  // Gallery data
  const galleryData = useMemo(() => [
    {
      image: "/images/gallery/Best Sanitary Wares In Delhi.jpeg",
      title: "Best Sanitary Wares In Delhi",
      description: "Our premium collection of sanitaryware products"
    },
    {
      image: "/images/gallery/download.jpeg",
      title: "Showroom Display",
      description: "Modern bathroom fixtures and fittings on display"
    },
    {
      image: "/images/gallery/download-1.jpeg",
      title: "Product Showcase",
      description: "Wide range of bathroom solutions under one roof"
    }
  ], []);

  const handleCategoryChange = useCallback((categoryId) => {
    setActiveCategory(categoryId);
  }, []);

  return (
    <Box 
      id="products"
      py={{ base: 20, md: 28 }} 
      bg="linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #e2e8f0 100%)"
      position="relative"
      overflow="hidden"
      minH="100vh"
    >
      {/* Enhanced Background Elements */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundImage={`
          radial-gradient(circle at 20% 80%, rgba(100,116,139,0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(251,191,36,0.05) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(30,41,59,0.03) 0%, transparent 50%)
        `}
        opacity={0.8}
        pointerEvents="none"
      />
      
      {/* Floating shapes */}
      <Box 
        position="absolute" 
        top="20%" 
        left="5%" 
        w="120px" 
        h="120px" 
        opacity={0.1}
        pointerEvents="none"
      >
        <Box
          w="100%"
          h="100%"
          borderRadius="30% 70% 70% 30% / 30% 30% 70% 70%"
          bg="linear-gradient(45deg, #64748b, #fbbf24)"
          animation="float 8s ease-in-out infinite"
        />
      </Box>
      
      <Container 
        maxW="container.xl" 
        position="relative" 
        zIndex={2}
        px={{ base: 4, sm: 6, md: 8, lg: 10, xl: 12 }}
        className="container-responsive"
      >
        <Stack spacing={{ base: 12, md: 16, lg: 20 }}>
          {/* Enhanced Section Header */}
          <MotionBox
            textAlign="center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge
              bg="rgba(100,116,139,0.1)"
              color="#64748b"
              px={6}
              py={3}
              borderRadius="full"
              fontSize="sm"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="wider"
              border="1px solid"
              borderColor="rgba(100,116,139,0.2)"
              mb={6}
            >
              Product Collection
            </Badge>
            
            <VStack spacing={4} align="center" mb={6}>
              <Text
                fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight="800"
                color="gray.800"
                textAlign="center"
                lineHeight="1.2"
                letterSpacing="-0.01em"
                fontFamily="Inter"
                px={{ base: 2, md: 0 }}
                wordBreak="break-word"
              >
                Explore Our
              </Text>
              <Heading
                as="h2"
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="900"
                color="gray.800"
                lineHeight="1.1"
                letterSpacing="-0.02em"
                fontFamily="Inter"
                textAlign="center"
                position="relative"
                px={{ base: 2, md: 0 }}
                wordBreak="break-word"
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '-15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  w: { base: '150px', sm: '180px', md: '200px' },
                  h: { base: '3px', md: '4px' },
                  bg: 'linear-gradient(90deg, #64748b, #fbbf24, #1e293b)',
                  borderRadius: '2px'
                }}
              >
                <Text 
                  as="span" 
                  bgGradient="linear(45deg, #64748b, #fbbf24, #1e293b)"
                >
                  Product Collection
                </Text>
              </Heading>
            </VStack>
            
            <Text
              fontSize={{ base: "md", sm: "lg", md: "xl" }}
              color="gray.600"
              maxW="700px"
              mx="auto"
              lineHeight="1.8"
              fontWeight="400"
              px={{ base: 2, md: 0 }}
              wordBreak="break-word"
            >
              Discover our comprehensive range of bathroom fittings, sanitaryware, and accessories. 
              Each product is carefully selected for quality, durability, and aesthetic appeal.
            </Text>
          </MotionBox>

          {/* Enhanced Category Filters */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Flex 
              justify="center" 
              wrap="wrap" 
              gap={{ base: 2, sm: 3, md: 4 }} 
              align="center"
              maxW="100%"
              overflowX={{ base: "auto", md: "visible" }}
              px={{ base: 3, sm: 4, md: 0 }}
              pb={{ base: 2, md: 0 }}
              className="category-filters-responsive"
            >
              {categoryList.slice(0, 8).map((category, index) => (
                <MotionBox
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Button
                    onClick={() => handleCategoryChange(category.id)}
                    bg={activeCategory === category.id 
                      ? "linear-gradient(135deg, #64748b, #1e293b)" 
                      : "white"
                    }
                    color={activeCategory === category.id ? "white" : "gray.600"}
                    border={activeCategory === category.id 
                      ? "none" 
                      : "2px solid #e2e8f0"
                    }
                    size={{ base: "sm", md: "md" }}
                    px={{ base: 3, md: 5 }}
                    py={{ base: 2, md: 3 }}
                    borderRadius="full"
                    fontWeight="600"
                    fontSize={{ base: "xs", md: "sm" }}
                    boxShadow={activeCategory === category.id 
                      ? "0 8px 25px rgba(100,116,139,0.3)" 
                      : "0 2px 8px rgba(0,0,0,0.08)"
                    }
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: activeCategory === category.id 
                        ? "0 12px 30px rgba(100,116,139,0.4)"
                        : "0 4px 15px rgba(0,0,0,0.12)",
                      bg: activeCategory === category.id 
                        ? "linear-gradient(135deg, #64748b, #1e293b)" 
                        : "#f8fafc",
                      borderColor: activeCategory === category.id 
                        ? "transparent" 
                        : "#64748b"
                    }}
                    position="relative"
                    overflow="hidden"
                    minW={{ base: "80px", md: "120px" }}
                    flexShrink={0}
                  >
                    <HStack spacing={{ base: 1, md: 2 }} justify="center" flexWrap="wrap">
                      {activeCategory === category.id && <Icon as={FaFire} boxSize={{ base: 2, md: 3 }} />}
                      <Text 
                        fontWeight="600" 
                        textAlign="center"
                        fontSize={{ base: "xs", md: "sm" }}
                        noOfLines={1}
                      >
                        {category.name}
                      </Text>
                      <Badge
                        bg={activeCategory === category.id 
                          ? "rgba(255,255,255,0.2)" 
                          : "#64748b"
                        }
                        color={activeCategory === category.id ? "white" : "white"}
                        fontSize={{ base: "2xs", md: "xs" }}
                        px={{ base: 1, md: 2 }}
                        py={1}
                        borderRadius="full"
                        fontWeight="700"
                        minW="20px"
                        textAlign="center"
                      >
                        {category.count}
                      </Badge>
                    </HStack>
                  </Button>
                </MotionBox>
              ))}
            </Flex>
          </MotionBox>

          {/* Products Grid */}
          <AnimatePresence mode="wait">
            <MotionSimpleGrid
              key={activeCategory}
              columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
              spacing={{ base: 4, sm: 5, md: 6, lg: 7 }}
              px={{ base: 3, sm: 4, md: 0 }}
              w="100%"
              maxW="100%"
              className="responsive-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <MotionBox
                    key={`${item.id}-${activeCategory}`}
                    bg="rgba(255,255,255,0.95)"
                    backdropFilter="blur(20px)"
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor="rgba(255,255,255,0.3)"
                    boxShadow="0 8px 32px rgba(0,0,0,0.1)"
                    overflow="hidden"
                    cursor="pointer"
                    position="relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                      _hover={{
                        boxShadow: "0 25px 50px rgba(100,116,139,0.2)",
                        borderColor: "rgba(100,116,139,0.3)"
                      }}
                    role="group"
                    minH={{ base: "350px", sm: "380px", md: "420px", lg: "450px" }}
                    display="flex"
                    flexDirection="column"
                    w="100%"
                    maxW="100%"
                    boxSizing="border-box"
                    className="product-card-responsive"
                  >
                    {/* Image Container */}
                    <Box
                      position="relative"
                      height={{ base: "180px", sm: "200px", md: "220px", lg: "250px" }}
                      overflow="hidden"
                      borderRadius="xl"
                      mb={{ base: 2, sm: 3, md: 4 }}
                      bg="linear-gradient(135deg, #f8fafc, #ffffff)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box
                        width="100%"
                        height="100%"
                        position="relative"
                        overflow="hidden"
                      >
                        <ProductImage item={item} />
                      </Box>
                      
                      {/* Enhanced Hover Overlay */}
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        bg="linear-gradient(135deg, rgba(100,116,139,0.9), rgba(30,41,59,0.9))"
                        opacity="0"
                        transition="all 0.4s ease"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        gap={3}
                        _groupHover={{ opacity: 1 }}
                      >
                        <VStack spacing={3}>
                          <HStack spacing={3}>
                            <Button
                              as={RouterLink}
                              to={`/product/${item.id}`}
                              size="sm"
                              bg="rgba(255,255,255,0.9)"
                              color="#64748b"
                              fontWeight="700"
                              leftIcon={<Icon as={FaEye} />}
                              borderRadius="xl"
                              _hover={{
                                transform: "scale(1.05)",
                                bg: "white"
                              }}
                            >
                              View
                            </Button>
                            <Button
                              as={RouterLink}
                              to={`/product/${item.id}`}
                              size="sm"
                              bg="rgba(255,255,255,0.9)"
                              color="#fbbf24"
                              fontWeight="700"
                              leftIcon={<Icon as={FaShoppingCart} />}
                              borderRadius="xl"
                              _hover={{
                                transform: "scale(1.05)",
                                bg: "white"
                              }}
                            >
                              Inquire
                            </Button>
                          </HStack>
                        </VStack>
                      </Box>

                      {/* Enhanced Category Badge */}
                      <Badge
                        position="absolute"
                        top="4"
                        left="4"
                        bg="linear-gradient(135deg, #64748b, #1e293b)"
                        color="white"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="700"
                        textTransform="uppercase"
                        letterSpacing="1px"
                        boxShadow="0 4px 15px rgba(100,116,139,0.3)"
                      >
                        {item.type || item.category}
                      </Badge>

                      {/* Popular Badge */}
                      {index < 3 && (
                        <Badge
                          position="absolute"
                          top="4"
                          right="4"
                          bg="linear-gradient(135deg, #fbbf24, #f59e0b)"
                          color="white"
                          px={2}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="700"
                        >
                          <HStack spacing={1}>
                            <Icon as={FaFire} boxSize={2} />
                            <Text>Popular</Text>
                          </HStack>
                        </Badge>
                      )}
                    </Box>

                    {/* Enhanced Product Info */}
                    <VStack spacing={{ base: 3, md: 4 }} p={{ base: 4, md: 6 }} align="stretch" flex="1">
                      <VStack spacing={3} align="stretch" flex="1">
                        <Heading
                          as="h3"
                          fontSize={{ base: "md", md: "lg" }}
                          fontWeight="800"
                          color="gray.800"
                          fontFamily="Inter"
                          lineHeight="1.3"
                          noOfLines={2}
                        >
                          {item.name}
                        </Heading>
                        
                        <Text
                          fontSize={{ base: "xs", md: "sm" }}
                          color="gray.600"
                          fontWeight="500"
                          noOfLines={{ base: 2, md: 3 }}
                          lineHeight="1.6"
                          flex="1"
                        >
                          {item.description}
                        </Text>
                      </VStack>

                      <Button
                        as={RouterLink}
                        to={`/product/${item.id}`}
                        variant="ghost"
                        size={{ base: "xs", md: "sm" }}
                        color="#64748b"
                        fontWeight="700"
                        rightIcon={<Icon as={FaArrowRight} boxSize={{ base: 3, md: 4 }} />}
                        p={0}
                        h="auto"
                        fontSize={{ base: "xs", md: "sm" }}
                        _hover={{
                          bg: "transparent",
                          color: "#fbbf24",
                          transform: "translateX(4px)"
                        }}
                        transition="all 0.3s ease"
                        justifyContent="flex-start"
                        mt="auto"
                      >
                        Learn More
                      </Button>
                    </VStack>
                  </MotionBox>
                ))
              ) : (
                <Box
                  gridColumn={{ base: "1", md: "1 / -1" }}
                  textAlign="center"
                  py={12}
                >
                  <Text fontSize="lg" color="gray.500" mb={4}>
                    No products found in this category
                  </Text>
                  <Button
                    onClick={() => handleCategoryChange('all')}
                    colorScheme="purple"
                    variant="outline"
                  >
                    View All Products
                  </Button>
                </Box>
              )}
            </MotionSimpleGrid>
          </AnimatePresence>

          {/* Gallery Images Section */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            mt={16}
          >
            <Box textAlign="center" mb={12}>
              <Heading
                as="h3"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="700"
                color="gray.800"
                mb={4}
              >
                Our Showroom & Work Gallery
              </Heading>
              <Text
                fontSize="lg"
                color="gray.600"
                maxW="600px"
                mx="auto"
              >
                Take a look at our showroom and some of our completed bathroom installations
              </Text>
            </Box>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {galleryData.map((gallery, index) => (
                <GalleryImage
                  key={index}
                  image={gallery.image}
                  title={gallery.title}
                  description={gallery.description}
                  index={index}
                />
              ))}
            </SimpleGrid>
          </MotionBox>

          {/* View All Button */}
          {productsData && productsData.length > 0 && (
            <Flex justify="center" pt={8}>
              <Button
                as={RouterLink}
                to="/all-products"
                bg="linear-gradient(135deg, #64748b, #1e293b)"
                color="white"
                size="lg"
                px={12}
                py={6}
                fontSize="lg"
                fontWeight="700"
                borderRadius="xl"
                boxShadow="0 8px 25px rgba(100,116,139,0.3)"
                _hover={{
                  transform: "translateY(-3px) scale(1.05)",
                  boxShadow: "0 20px 40px rgba(100,116,139,0.4)"
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                View All {productsData.length} Products →
              </Button>
            </Flex>
          )}
        </Stack>
      </Container>
      
      {/* CSS Animations and Responsive Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }
        
        .clean-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        
        /* Enhanced Responsive Styles */
        @media (max-width: 768px) {
          .responsive-grid {
            gap: 16px !important;
          }
          
          .product-card-responsive {
            margin-bottom: 16px !important;
          }
          
          .category-filters-responsive {
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          
          .category-filters-responsive::-webkit-scrollbar {
            display: none !important;
          }
          
          .category-filters-responsive > * {
            scroll-snap-align: center !important;
            flex-shrink: 0 !important;
          }
        }
        
        @media (max-width: 480px) {
          .responsive-grid {
            gap: 12px !important;
            padding: 0 8px !important;
          }
          
          .product-card-responsive {
            min-height: 320px !important;
            margin-bottom: 12px !important;
          }
          
          .category-filters-responsive {
            gap: 8px !important;
          }
        }
        
        @media (max-width: 320px) {
          .responsive-grid {
            gap: 8px !important;
            padding: 0 4px !important;
          }
          
          .product-card-responsive {
            min-height: 300px !important;
          }
        }
      `}</style>
    </Box>
  );
};

export default Products;