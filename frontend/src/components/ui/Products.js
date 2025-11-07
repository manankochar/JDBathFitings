import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { colors, gradients } from '../../theme/colors';
import { Box, Container, Heading, Text, SimpleGrid, Stack, Button, Flex, Badge, VStack, HStack, Icon, IconButton } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
// Removed framer-motion wrappers to avoid runtime element type issues
import { FaEye, FaShoppingCart, FaFire, FaArrowRight, FaSearch, FaHeart, FaRegHeart, FaFilePdf, FaDownload } from 'react-icons/fa';
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

// Enhanced Product Image component with lazy loading
const ProductImage = ({ item }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = useCallback(() => {
    console.warn('Image failed to load:', item.image);
    setImageError(true);
  }, [item.image]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  if (imageError || !item.image) {
    return <ProductImageFallback productName={item.name} />;
  }

  const imageSrc = item.image?.startsWith('http')
    ? item.image
    : `${process.env.PUBLIC_URL || ''}${item.image}`;

  return (
    <>
      <img
        src={imageSrc}
        alt={`${item.name} - Premium ${item.category} product by JD Bath Fittings`}
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
        decoding="async"
      />
      {!imageLoaded && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="gray.400"
          fontSize="sm"
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // 20 products per page
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('jd-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('jd-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite
  const toggleFavorite = useCallback((productId) => {
    setFavorites(prev => {
      const isFavorite = prev.includes(productId);
      if (isFavorite) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  }, []);
  
  // Memoize categories calculation - Simplified by type
  const categoryList = useMemo(() => {
    if (!productsData || productsData.length === 0) {
      return [{ id: 'all', name: 'All Products', count: 0 }];
    }

    // Group by main product types
    const typeGroups = {
      'Toilet': ['Toilet', 'Rimless', 'Comfort', 'Classic', 'Premium', 'Designer', 'Compact', 'Luxury'],
      'Basin': ['Basin', 'Wash Basin', 'Pedestal'],
      'Faucet': ['Faucet', 'Mixer', 'Tap', 'Cock'],
      'Shower': ['Shower', 'Rain', 'Overhead', 'Telephonic'],
      'Accessories': ['Accessories', 'Towel', 'Soap', 'Glass', 'Kit'],
      'Plumbing': ['Plumbing', 'Trap', 'Pipe', 'Nipple', 'Coupling', 'Angle'],
      'Drainage': ['Drainage', 'Grating', 'Floor']
    };

    const categoryList = [
      { id: 'all', name: 'All Products', count: productsData.length }
    ];

    Object.entries(typeGroups).forEach(([groupName, keywords]) => {
      const count = productsData.filter(p => {
        const type = p.type || '';
        return keywords.some(keyword => type.includes(keyword));
      }).length;
      
      if (count > 0) {
        categoryList.push({
          id: groupName.toLowerCase(),
          name: groupName,
          count: count
        });
      }
    });
    
    return categoryList;
  }, []);
  
  // Memoize filtered + searched + sorted products
  const filteredItems = useMemo(() => {
    if (!productsData || productsData.length === 0) return [];

    const typeGroups = {
      'toilet': ['Toilet', 'Rimless', 'Comfort', 'Classic', 'Premium', 'Designer', 'Compact', 'Luxury'],
      'basin': ['Basin', 'Wash Basin', 'Pedestal'],
      'faucet': ['Faucet', 'Mixer', 'Tap', 'Cock'],
      'shower': ['Shower', 'Rain', 'Overhead', 'Telephonic'],
      'accessories': ['Accessories', 'Towel', 'Soap', 'Glass', 'Kit'],
      'plumbing': ['Plumbing', 'Trap', 'Pipe', 'Nipple', 'Coupling', 'Angle'],
      'drainage': ['Drainage', 'Grating', 'Floor']
    };

    const base = activeCategory === 'all'
      ? productsData
      : productsData.filter(item => {
          const type = item.type || '';
          const keywords = typeGroups[activeCategory] || [];
          return keywords.some(keyword => type.includes(keyword));
        });

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

  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortBy]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

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
    <>
      <Box 
        id="products"
        py={{ base: 20, md: 28 }} 
        bg={`linear-gradient(135deg, #ffffff 0%, #f8fafc 15%, ${colors.accent}0A 35%, #e2e8f0 100%)`}
        position="relative"
        overflow="hidden"
        minH="100vh"
      >
      {/* Luxury Background Elements */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundImage={`
          radial-gradient(circle at 25% 25%, rgba(100,116,139,0.05) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, ${colors.accent}14 0%, transparent 50%),
          radial-gradient(circle at 50% 10%, ${colors.accent}0D 0%, transparent 40%),
          radial-gradient(circle at 10% 80%, ${colors.accent}0F 0%, transparent 45%)
        `}
        opacity={0.7}
        pointerEvents="none"
      />
      
      {/* Floating geometric shapes */}
      <Box position="absolute" top="10%" left="10%" w="100px" h="100px" opacity={0.1} pointerEvents="none">
        <Box
          w="100%"
          h="100%"
          borderRadius="30% 70% 70% 30% / 30% 30% 70% 70%"
          bg="linear-gradient(45deg, #64748b, #1e293b)"
          animation="float 6s ease-in-out infinite"
        />
      </Box>
      
      <Box position="absolute" top="60%" right="15%" w="80px" h="80px" opacity={0.1} pointerEvents="none">
        <Box
          w="100%"
          h="100%"
          borderRadius="63% 37% 54% 46% / 55% 48% 52% 45%"
          bg={`linear-gradient(45deg, ${colors.accent}, #64748b)`}
          animation="float 8s ease-in-out infinite reverse"
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
          {/* Luxury Section Header */}
          <Box textAlign="center" mb={12}>
            {/* <Badge
              bgGradient={gradients.accentLinear}
              color="white"
              px={8}
              py={4}
              borderRadius="full"
              fontSize="sm"
              fontWeight="800"
              textTransform="uppercase"
              letterSpacing="wider"
              border="2px solid"
              borderColor={`${colors.accent}30`}
              mb={8}
              mt={8}
              boxShadow={`0 8px 25px ${colors.accentGlow}`}
            >
              ✨ Premium Collection
            </Badge> */}
            
            <VStack spacing={4} align="center" mb={8}>
              <Heading
                as="h2"
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="900"
                bgGradient={gradients.accentLinear}
                bgClip="text"
                lineHeight="1.1"
                letterSpacing="-0.02em"
                textAlign="center"
                position="relative"
                px={{ base: 2, md: 0 }}
                wordBreak="break-word"
                mb={4}
              >
                Luxury Bath Fittings
              </Heading>
              <Box
                w={{ base: '150px', md: '200px' }}
                h="4px"
                bgGradient={gradients.accentLinear}
                borderRadius="full"
                mb={4}
              />
            </VStack>
            
            <Text
              fontSize={{ base: "md", sm: "lg", md: "xl" }}
              color="gray.700"
              maxW="700px"
              mx="auto"
              lineHeight="1.8"
              fontWeight="500"
              px={{ base: 4, md: 0 }}
              textAlign="center"
            >
              Discover our exquisite collection of premium bathroom fittings and sanitaryware. 
              Each piece embodies luxury, quality, and timeless elegance.
            </Text>
          </Box>

          {/* PDF Catalog Download Button - Luxury Design */}
          <Flex justify="center" mb={8}>
            <Button
              as="a"
              href="/Diamond Catalogue.pdf"
              download="JD-Bath-Fittings-Catalog.pdf"
              bgGradient={gradients.accentLinear}
              color="white"
              px={{ base: 8, md: 12 }}
              py={{ base: 5, md: 6 }}
              borderRadius="full"
              fontWeight="800"
              fontSize={{ base: "sm", md: "md" }}
              leftIcon={<Icon as={FaFilePdf} boxSize={5} />}
              rightIcon={<Icon as={FaDownload} boxSize={4} />}
              boxShadow={`0 8px 32px ${colors.accentGlow}`}
              border="2px solid"
              borderColor="rgba(255,255,255,0.2)"
              _hover={{
                transform: "translateY(-3px)",
                boxShadow: `0 12px 40px ${colors.accentGlow}`,
                borderColor: "rgba(255,255,255,0.4)",
              }}
              transition="all 0.3s ease"
            >
              Download Product Catalog
            </Button>
          </Flex>

          {/* Luxury Search & Sort Controls */}
          <Box
            mb={{ base: 4, md: 6 }}
            position="sticky"
            top={{ base: '64px', md: '72px' }}
            zIndex={3}
            bg="rgba(255,255,255,0.95)"
            backdropFilter="blur(20px)"
            border="2px solid"
            borderColor={`${colors.accent}20`}
            borderRadius="2xl"
            px={{ base: 4, md: 6 }}
            py={{ base: 3, md: 4 }}
            boxShadow={`0 8px 32px ${colors.accentGlow}`}
          >
            <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 3, md: 4 }} align="stretch">
              <Box flex="1" position="relative">
                <Icon as={FaSearch} color={colors.accent} position="absolute" left={4} top="50%" transform="translateY(-50%)" pointerEvents="none" zIndex={1} />
                <Box as="input"
                  size="lg"
                  style={{ 
                    paddingLeft: '45px',
                    border: `2px solid ${colors.accent}20`,
                    borderRadius: '12px',
                    padding: '12px 16px 12px 45px',
                    fontSize: '16px',
                    width: '100%',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="Search luxury products..."
                  bg="white"
                  _hover={{ borderColor: `${colors.accent}40` }}
                  _focus={{ borderColor: colors.accent, boxShadow: `0 0 0 3px ${colors.accentGlow}`, outline: 'none' }}
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
                  style={{
                    border: `2px solid ${colors.accent}20`,
                    borderRadius: '12px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  _hover={{ borderColor: `${colors.accent}40` }}
                  _focus={{ borderColor: colors.accent, boxShadow: `0 0 0 3px ${colors.accentGlow}`, outline: 'none' }}
                  minW={{ base: '50%', md: '240px' }}
                >
                  <option value="relevance">✨ Relevance</option>
                  <option value="name_asc">🔤 Name (A–Z)</option>
                  <option value="name_desc">🔤 Name (Z–A)</option>
                </Box>
              </Flex>
            </Flex>
          </Box>

          {/* Category Filters - Clean Design */}
          <Flex 
            direction="column"
            gap={4}
            mb={{ base: 8, md: 12 }}
          >
            <Flex 
              gap={3}
              overflowX="auto"
              overflowY="hidden"
              py={2}
              px={{ base: 2, md: 0 }}
              css={{
                '&::-webkit-scrollbar': {
                  height: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: colors.accent,
                  borderRadius: '10px',
                },
              }}
            >
              {categoryList.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  size="md"
                  px={6}
                  py={2}
                  borderRadius="full"
                  bg={activeCategory === category.id ? colors.accent : "white"}
                  color={activeCategory === category.id ? "white" : "gray.700"}
                  border="2px solid"
                  borderColor={activeCategory === category.id ? colors.accent : "gray.200"}
                  fontWeight="600"
                  fontSize="sm"
                  whiteSpace="nowrap"
                  flexShrink={0}
                  _hover={{
                    bg: activeCategory === category.id ? colors.accentStrong : "gray.50",
                    borderColor: colors.accent,
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.2s"
                >
                  {category.name}
                  <Badge
                    ml={2}
                    bg={activeCategory === category.id ? "whiteAlpha.300" : colors.accent}
                    color="white"
                    borderRadius="full"
                    px={2}
                    fontSize="xs"
                    fontWeight="700"
                  >
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </Flex>
          </Flex>

          {/* Products Grid */}
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing={{ base: 4, sm: 5, md: 6, lg: 7 }}
            px={{ base: 3, sm: 4, md: 0 }}
            w="100%"
            maxW="100%"
            className="responsive-grid"
          >
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item, index) => (
                  <Box
                    key={`${item.id}-${activeCategory}`}
                    bg="rgba(255,255,255,0.98)"
                    backdropFilter="blur(30px)"
                    borderRadius="3xl"
                    border="2px solid"
                    borderColor={`${colors.accent}15`}
                    boxShadow={`0 10px 40px ${colors.accentGlow}`}
                    overflow="hidden"
                    cursor="pointer"
                    position="relative"
                    _hover={{
                      transform: "translateY(-8px)",
                      boxShadow: `0 20px 60px ${colors.accentGlow}`,
                      borderColor: `${colors.accent}40`
                    }}
                    role="group"
                    minH={{ base: "340px", sm: "380px", md: "400px", lg: "420px" }}
                    display="flex"
                    flexDirection="column"
                    w="100%"
                    maxW="100%"
                    boxSizing="border-box"
                    className="product-card-responsive"
                    transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
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
                      
                      {/* Luxury Hover Overlay */}
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        bgGradient={`linear(135deg, ${colors.accent}F0, ${colors.accentStrong}F0)`}
                        opacity="0"
                        transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
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
                            <Button 
                              as={RouterLink} 
                              to={`/product/${item.id}`} 
                              size="md" 
                              bg="white"
                              color={colors.accent}
                              fontWeight="800" 
                              borderRadius="2xl" 
                              px={6} 
                              py={3} 
                              border="2px solid white"
                              _hover={{ transform: "scale(1.05)", boxShadow: "0 8px 20px rgba(255,255,255,0.3)" }}
                              transition="all 0.3s ease"
                            >
                              <Icon as={FaEye} mr={2} /> View Details
                            </Button>
                            <Button 
                              as={RouterLink} 
                              to={`/contact`} 
                              size="md" 
                              bg="rgba(255,255,255,0.2)" 
                              color="white"
                              fontWeight="700" 
                              borderRadius="2xl" 
                              px={6} 
                              py={3} 
                              border="2px solid rgba(255,255,255,0.4)"
                              backdropFilter="blur(10px)"
                              _hover={{ bg: "rgba(255,255,255,0.3)", transform: "scale(1.05)" }}
                              transition="all 0.3s ease"
                            >
                              <Icon as={FaShoppingCart} mr={2} /> Contact
                            </Button>
                          </HStack>
                        </VStack>
                      </Box>

                      {/* Luxury Category Badge */}
                      <Badge
                        position="absolute"
                        bottom="4"
                        left="4"
                        bgGradient={gradients.accentLinear}
                        color="white"
                        px={4}
                        py={2}
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="800"
                        textTransform="uppercase"
                        letterSpacing="1.5px"
                        boxShadow={`0 6px 20px ${colors.accentGlow}`}
                        border="2px solid rgba(255,255,255,0.3)"
                        backdropFilter="blur(10px)"
                      >
                        {item.type || item.category}
                      </Badge>

                      {/* Premium HOT Badge */}
                      {index < 3 && (
                        <Badge
                          position="absolute"
                          top="4"
                          right="4"
                          bg="rgba(255,255,255,0.95)"
                          color={colors.accent}
                          px={3}
                          py={2}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="800"
                          boxShadow="0 6px 20px rgba(0,0,0,0.15)"
                          border={`2px solid ${colors.accent}30`}
                          backdropFilter="blur(10px)"
                        >
                          <HStack spacing={1}>
                            <Icon as={FaFire} boxSize={3} color={colors.accent} />
                            <Text>HOT</Text>
                          </HStack>
                        </Badge>
                      )}

                      {/* Favorite Button */}
                      <IconButton
                        position="absolute"
                        top="4"
                        left="4"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                        bg="white"
                        color={favorites.includes(item.id) ? "red.500" : "gray.700"}
                        size="md"
                        borderRadius="full"
                        boxShadow="0 4px 12px rgba(0,0,0,0.2)"
                        border="2px solid"
                        borderColor={favorites.includes(item.id) ? "red.300" : "gray.300"}
                        _hover={{
                          transform: "scale(1.15)",
                          bg: "white",
                          color: favorites.includes(item.id) ? "red.600" : colors.accent,
                          borderColor: favorites.includes(item.id) ? "red.400" : colors.accent,
                          boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                        }}
                        transition="all 0.3s ease"
                        aria-label={favorites.includes(item.id) ? "Remove from favorites" : "Add to favorites"}
                        zIndex={2}
                      >
                        <Icon 
                          as={favorites.includes(item.id) ? FaHeart : FaRegHeart} 
                          boxSize={5}
                        />
                      </IconButton>
                    </Box>

                    {/* Luxury Product Info */}
                    <VStack spacing={{ base: 3, md: 4 }} p={{ base: 4, md: 5 }} align="stretch" flex="1">
                      <VStack spacing={3} align="stretch" flex="1">
                        <Heading
                          as="h3"
                          fontSize={{ base: "md", md: "lg" }}
                          fontWeight="900"
                          bgGradient={gradients.accentLinear}
                          bgClip="text"
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
                        bgGradient={gradients.accentLinear}
                        color="white"
                        size="md"
                        fontWeight="800"
                        rightIcon={<Icon as={FaArrowRight} boxSize={4} />}
                        borderRadius="xl"
                        py={6}
                        fontSize="sm"
                        _hover={{
                          transform: "translateY(-2px)",
                          boxShadow: `0 8px 25px ${colors.accentGlow}`
                        }}
                        transition="all 0.3s ease"
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
                    bgGradient={gradients.accentLinear}
                    color="white"
                    size="lg"
                    fontWeight="800"
                    borderRadius="xl"
                    px={8}
                    py={6}
                    _hover={{ transform: "translateY(-2px)", boxShadow: `0 10px 30px ${colors.accentGlow}` }}
                  >
                    View All Products
                  </Button>
                </Box>
              )}
          </SimpleGrid>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Flex 
              justify="center" 
              align="center" 
              gap={2}
              mt={12}
              mb={8}
              flexWrap="wrap"
            >
              {/* Previous Button */}
              <Button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                isDisabled={currentPage === 1}
                bgGradient={currentPage === 1 ? "gray.200" : gradients.accentLinear}
                color={currentPage === 1 ? "gray.500" : "white"}
                size="md"
                px={6}
                fontWeight="700"
                borderRadius="xl"
                _hover={{
                  transform: currentPage === 1 ? "none" : "translateY(-2px)",
                  boxShadow: currentPage === 1 ? "none" : `0 8px 25px ${colors.accentGlow}`
                }}
                transition="all 0.3s ease"
              >
                ← Previous
              </Button>

              {/* Page Numbers */}
              <HStack spacing={2} flexWrap="wrap" justify="center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage = 
                    page === 1 || 
                    page === totalPages || 
                    (page >= currentPage - 1 && page <= currentPage + 1);
                  
                  const showEllipsis = 
                    (page === currentPage - 2 && currentPage > 3) ||
                    (page === currentPage + 2 && currentPage < totalPages - 2);

                  if (showEllipsis) {
                    return <Text key={page} color="gray.500" fontWeight="700">...</Text>;
                  }

                  if (!showPage) return null;

                  return (
                    <Button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      bg={currentPage === page ? colors.accent : "white"}
                      color={currentPage === page ? "white" : colors.accent}
                      border="2px solid"
                      borderColor={colors.accent}
                      size="md"
                      minW="45px"
                      h="45px"
                      fontWeight="800"
                      fontSize="md"
                      borderRadius="xl"
                      boxShadow={currentPage === page ? `0 4px 15px ${colors.accentGlow}` : "0 2px 8px rgba(0,0,0,0.1)"}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: `0 8px 25px ${colors.accentGlow}`,
                        bg: currentPage === page ? colors.accentStrong : `${colors.accent}15`,
                        color: currentPage === page ? "white" : colors.accent
                      }}
                      transition="all 0.3s ease"
                    >
                      {page}
                    </Button>
                  );
                })}
              </HStack>

              {/* Next Button */}
              <Button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                isDisabled={currentPage === totalPages}
                bgGradient={currentPage === totalPages ? "gray.200" : gradients.accentLinear}
                color={currentPage === totalPages ? "gray.500" : "white"}
                size="md"
                px={6}
                fontWeight="700"
                borderRadius="xl"
                _hover={{
                  transform: currentPage === totalPages ? "none" : "translateY(-2px)",
                  boxShadow: currentPage === totalPages ? "none" : `0 8px 25px ${colors.accentGlow}`
                }}
                transition="all 0.3s ease"
              >
                Next →
              </Button>
            </Flex>
          )}

          {/* Page Info */}
          {filteredItems.length > 0 && (
            <Flex justify="center" mb={8}>
              <Text color="gray.600" fontSize="sm" fontWeight="600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} of {filteredItems.length} products
              </Text>
            </Flex>
          )}

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

          {/* Product Count Display */}
          {productsData && productsData.length > 0 && (
            <Flex justify="center" pt={8}>
              <Badge
                bgGradient={gradients.accentLinear}
                color="white"
                px={8}
                py={4}
                borderRadius="full"
                fontSize="md"
                fontWeight="800"
                boxShadow={`0 8px 25px ${colors.accentGlow}`}
              >
                Showing {filteredItems.length} of {productsData.length} Premium Products
              </Badge>
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
    </>
  );
};

export default Products;