import React, { useState, useCallback, useMemo } from 'react';
import { colors, gradients } from '../../theme/colors';
import { Box, Container, Heading, Text, SimpleGrid, Stack, Button, Flex, Badge, VStack, HStack, Icon } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
// Removed framer-motion wrappers to avoid runtime element type issues
import { FaEye, FaShoppingCart, FaFire, FaArrowRight, FaSearch } from 'react-icons/fa';
import { productsData, categories } from '../../data/productsData';

// Using Chakra components directly instead of motion wrappers

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
    <Box
      className="clean-card"
      overflow="hidden"
      bg="white"
      borderRadius="xl"
      boxShadow="0 4px 20px rgba(0,0,0,0.1)"
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
          <Box as="img"
            src={image}
            alt={title}
            width="100%"
            height="250px"
            style={{ objectFit: 'cover', transition: 'all 0.3s ease' }}
            onError={() => setHasError(true)}
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
    </Box>
  );
};

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  
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
  
  // Memoize filtered + searched + sorted products
  const filteredItems = useMemo(() => {
    if (!productsData || productsData.length === 0) return [];

    const base = activeCategory === 'all'
      ? productsData
      : productsData.filter(item => item.category === activeCategory);

    const searched = searchQuery.trim().length === 0
      ? base
      : base.filter(item => {
          const haystack = `${item.name ?? ''} ${item.description ?? ''} ${item.type ?? ''}`.toLowerCase();
          return haystack.includes(searchQuery.toLowerCase());
        });

    const sorted = [...searched];
    if (sortBy === 'name_asc') {
      sorted.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
    } else if (sortBy === 'name_desc') {
      sorted.sort((a, b) => (b.name ?? '').localeCompare(a.name ?? ''));
    }

    return sorted;
  }, [activeCategory, searchQuery, sortBy]);

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
      py={{ base: 16, md: 20 }} 
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
          radial-gradient(circle at 80% 20%, ${colors.accent}14 0%, transparent 50%),
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
          bg={`linear-gradient(45deg, #64748b, ${colors.accent})`}
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
        <Stack spacing={{ base: 8, md: 12, lg: 16 }}>
          {/* Enhanced Section Header */}
          <Box textAlign="center" mb={8}>
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
              mt={8}
            >
              Product Collection
            </Badge>
            
            <VStack spacing={3} align="center" mb={6}>
              <Text
                fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
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
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
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
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  w: { base: '120px', sm: '150px', md: '180px' },
                  h: { base: '2px', md: '3px' },
                  bg: `linear-gradient(90deg, #64748b, ${colors.accent}, #1e293b)`,
                  borderRadius: '2px'
                }}
              >
                <Text 
                  as="span" 
                  bgGradient={`linear(45deg, #64748b, ${colors.accent}, #1e293b)`}
                >
                  Product Collection
                </Text>
              </Heading>
            </VStack>
            
            <Text
              fontSize={{ base: "sm", sm: "md", md: "lg" }}
              color="gray.600"
              maxW="600px"
              mx="auto"
              lineHeight="1.7"
              fontWeight="400"
              px={{ base: 2, md: 0 }}
              wordBreak="break-word"
            >
              Discover our comprehensive range of bathroom fittings, sanitaryware, and accessories. 
              Each product is carefully selected for quality, durability, and aesthetic appeal.
            </Text>
          </Box>

          {/* Controls: Search + Sort (sticky on scroll) */}
          <Box
            mb={{ base: 2, md: 4 }}
            position="sticky"
            top={{ base: '64px', md: '72px' }}
            zIndex={3}
            bg="rgba(255,255,255,0.85)"
            backdropFilter="blur(8px)"
            border="1px solid"
            borderColor="#e2e8f0"
            borderRadius="xl"
            px={{ base: 3, md: 4 }}
            py={{ base: 2, md: 3 }}
            boxShadow="0 6px 24px rgba(15,23,42,0.06)"
          >
            <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 3, md: 4 }} align="stretch">
              <Box flex="1" position="relative">
                <Icon as={FaSearch} color="gray.400" position="absolute" left={3} top="50%" transform="translateY(-50%)" pointerEvents="none" />
                <Box as="input"
                  size="lg"
                  style={{ paddingLeft: '40px' }}
                  placeholder="Search products..."
                  bg="white"
                  borderColor="#e2e8f0"
                  _hover={{ borderColor: '#cbd5e1' }}
                  _focus={{ borderColor: '#64748b', boxShadow: '0 0 0 3px rgba(100,116,139,0.2)' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Box>
              <Flex gap={3} align="center" justify={{ base: 'space-between', md: 'flex-end' }}>
                <Box as="select"
                  size="lg"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  bg="white"
                  borderColor="#e2e8f0"
                  _hover={{ borderColor: '#cbd5e1' }}
                  _focus={{ borderColor: '#64748b', boxShadow: '0 0 0 3px rgba(100,116,139,0.2)' }}
                  minW={{ base: '50%', md: '240px' }}
                >
                  <option value="relevance">Sort: Relevance</option>
                  <option value="name_asc">Sort: Name (A–Z)</option>
                  <option value="name_desc">Sort: Name (Z–A)</option>
                </Box>
              </Flex>
            </Flex>
          </Box>
          <Box borderBottom="1px solid #e2e8f0" />

          {/* Enhanced Category Filters */}
          <Box mt={{ base: 2, md: 3 }}>
            <Flex 
              justify={{ base: "flex-start", md: "center" }} 
              wrap={{ base: "nowrap", md: "wrap" }} 
              gap={{ base: 2, sm: 3, md: 4 }} 
              align="center"
              maxW="100%"
              overflowX={{ base: "auto", md: "visible" }}
              px={{ base: 3, sm: 4, md: 0 }}
              pb={{ base: 2, md: 0 }}
              mb={{ base: 4, md: 6 }}
              className="category-filters-responsive"
              bg={{ base: 'white', md: 'transparent' }}
              borderRadius="lg"
              boxShadow={{ base: 'inset 0 -1px 0 #e2e8f0', md: 'none' }}
            >
              {categoryList.slice(0, 8).map((category, index) => (
                <Box key={category.id}>
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
                    size={{ base: "xs", md: "md" }}
                    px={{ base: 2, md: 5 }}
                    py={{ base: 1, md: 3 }}
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
                    <HStack spacing={{ base: 1, md: 2 }} justify="center" flexWrap="nowrap" alignItems="center">
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
                        fontSize={{ base: "10px", md: "11px" }}
                        px={{ base: 2, md: 2 }}
                        py={0.5}
                        borderRadius="full"
                        fontWeight="700"
                        minW="22px"
                        textAlign="center"
                      >
                        {category.count}
                      </Badge>
                    </HStack>
                  </Button>
                </Box>
              ))}
            </Flex>
          </Box>

          {/* Products Grid */}
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing={{ base: 4, sm: 5, md: 6, lg: 7 }}
            px={{ base: 3, sm: 4, md: 0 }}
            w="100%"
            maxW="100%"
            className="responsive-grid"
          >
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <Box
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
                      _hover={{
                        boxShadow: "0 25px 50px rgba(100,116,139,0.2)",
                        borderColor: "rgba(100,116,139,0.3)"
                      }}
                    role="group"
                    minH={{ base: "320px", sm: "360px", md: "380px", lg: "400px" }}
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
                      height={{ base: "180px", sm: "200px", md: "220px", lg: "240px" }}
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
                        bg="linear-gradient(135deg, rgba(100,116,139,0.95), rgba(30,41,59,0.95))"
                        opacity="0"
                        transition="all 0.4s ease"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        gap={4}
                        _groupHover={{ opacity: 1 }}
                        borderRadius="xl"
                      >
                        <VStack spacing={4}>
                          <Text
                            color="white"
                            fontSize="lg"
                            fontWeight="700"
                            textAlign="center"
                            mb={2}
                          >
                            {item.name}
                          </Text>
                          <HStack spacing={4}>
                            <Button as={RouterLink} to={`/product/${item.id}`} size="md" bg={gradients.accentLinear} color="white" fontWeight="800" borderRadius="2xl" px={6} py={3} transition="all 0.3s ease">
                              <Icon as={FaEye} mr={2} /> View Details
                            </Button>
                            <Button as={RouterLink} to={`/product/${item.id}`} size="md" bg="rgba(255,255,255,0.9)" color="#64748b" fontWeight="700" borderRadius="2xl" px={6} py={3} transition="all 0.3s ease">
                              <Icon as={FaShoppingCart} mr={2} /> Contact Us
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
                          bg={gradients.accentLinear}
                          color="white"
                          px={2}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="700"
                        >
                          <HStack spacing={1}>
                            <Icon as={FaFire} boxSize={2} />
                          
                          </HStack>
                        </Badge>
                      )}
                    </Box>

                    {/* Enhanced Product Info */}
                    <VStack spacing={{ base: 2, md: 3 }} p={{ base: 3, md: 4 }} align="stretch" flex="1">
                      <VStack spacing={2} align="stretch" flex="1">
                        <Heading
                          as="h3"
                          fontSize={{ base: "sm", md: "md" }}
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
                          noOfLines={{ base: 2, md: 2 }}
                          lineHeight="1.5"
                          flex="1"
                        >
                          {item.description}
                        </Text>
                      </VStack>

                      <Button
                        as={RouterLink}
                        to={`/product/${item.id}`}
                        variant="ghost"
                        size="xs"
                        color="#64748b"
                        fontWeight="700"
                        rightIcon={<Icon as={FaArrowRight} boxSize={3} />}
                        p={0}
                        h="auto"
                        fontSize="xs"
                        _hover={{
                          bg: "transparent",
                          color: colors.accent,
                          transform: "translateX(4px)"
                        }}
                        transition="all 0.3s ease"
                        justifyContent="flex-start"
                        mt="auto"
                      >
                        View Details
                      </Button>
                    </VStack>
                  </Box>
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
          </SimpleGrid>

          {/* Gallery Images Section */}
          <Box mt={16}>
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
          </Box>

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
                rightIcon={<Icon as={FaArrowRight} />}
              >
                View All {productsData.length} Products
              </Button>
            </Flex>
          )}
        </Stack>
      </Container>
      
      {/* CSS Animations and Responsive Styles */}
      <style>{`
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
        .category-filters-responsive {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          overflow-x: auto !important;
          white-space: nowrap !important;
          scroll-snap-type: x mandatory !important;
          -webkit-overflow-scrolling: touch !important;
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        .category-filters-responsive::-webkit-scrollbar { display: none !important; }
        .category-filters-responsive > * { scroll-snap-align: center !important; }
        
        @media (max-width: 768px) {
          .responsive-grid {
            gap: 16px !important;
          }
          
          .product-card-responsive {
            margin-bottom: 16px !important;
          }
          
          .category-filters-responsive {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
            white-space: nowrap !important;
            justify-content: flex-start !important;
            align-items: center !important;
            gap: 8px !important;
            padding: 0 12px !important;
          }
          
          .category-filters-responsive::-webkit-scrollbar {
            display: none !important;
          }
          
          .category-filters-responsive > * {
            scroll-snap-align: center !important;
            flex-shrink: 0 !important;
            white-space: nowrap !important;
            min-width: fit-content !important;
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
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            gap: 6px !important;
            padding: 0 8px !important;
            overflow-x: auto !important;
            justify-content: flex-start !important;
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