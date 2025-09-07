import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid, 
  Stack, 
  Button, 
  Flex, 
  Image,
  Input,
  Badge,
  VStack,
  Icon
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import Layout from '../components/layout/Layout';
import { productsData, categories } from '../data/productsData';

const MotionBox = motion(Box);
const MotionSimpleGrid = motion(SimpleGrid);

const AllProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Get unique categories for filter dropdown
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...Object.entries(categories).map(([key, value]) => ({
      value: key,
      label: value
    }))
  ];

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = productsData;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <Layout>
      <Box 
        py={{ base: 20, md: 28 }} 
        className="hero-background"
        minHeight="100vh"
        position="relative"
        overflow="hidden"
      >
        {/* Background Elements */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          className="grid-background"
          opacity={0.2}
          zIndex={1}
        />
        
        <Container maxW="container.xl" position="relative" zIndex={2} px={{ base: 3, sm: 4, md: 6, lg: 8 }}>
          <Stack spacing={12}>
            {/* Page Header */}
            <MotionBox
              textAlign="center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Text
                fontSize="sm"
                fontWeight="bold"
                color="var(--accent-primary)"
                textTransform="uppercase"
                letterSpacing="2px"
                mb={4}
              >
                Complete Product Catalog
              </Text>
              
              <Heading
                as="h1"
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="900"
                color="gray.800"
                lineHeight="1.1"
                letterSpacing="-0.02em"
                fontFamily="Inter"
                mb={6}
                px={{ base: 2, md: 0 }}
                wordBreak="break-word"
              >
                <Text as="span" display="block" mb={2}>
                  All Our Premium
                </Text>
                <Text as="span" className="gradient-text">
                  Sanitaryware Products
                </Text>
              </Heading>
              
              <Text
                fontSize={{ base: "md", sm: "lg", md: "xl" }}
                color="gray.600"
                maxW="800px"
                mx="auto"
                lineHeight="1.7"
                fontWeight="400"
                px={{ base: 2, md: 0 }}
                wordBreak="break-word"
              >
                Browse our complete collection of {productsData.length} premium sanitaryware products. 
                Each item is crafted with precision and designed for lasting quality.
              </Text>
            </MotionBox>

            {/* Search and Filter Section */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                align="center"
                justify="center"
                bg="rgba(255, 255, 255, 0.8)"
                backdropFilter="blur(10px)"
                p={6}
                borderRadius="xl"
                className="neo-card"
              >
                {/* Search Input */}
                <Box maxW="400px" position="relative">
                  <Icon 
                    as={FaSearch} 
                    color="gray.400" 
                    position="absolute"
                    left="12px"
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex="2"
                    pointerEvents="none"
                  />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    _focus={{
                      borderColor: 'var(--accent-primary)',
                      boxShadow: '0 0 0 1px var(--accent-primary)'
                    }}
                    borderRadius="lg"
                    fontWeight="500"
                    pl="2.5rem"
                  />
                </Box>

                {/* Category Filter */}
                <Box maxW="250px">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontWeight: '500',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {categoryOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Box>

                {/* Sort By */}
                <Box maxW="200px">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontWeight: '500',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="name">Sort by Name</option>
                    <option value="category">Sort by Category</option>
                    <option value="type">Sort by Type</option>
                  </select>
                </Box>
              </Stack>

              {/* Results Summary */}
              <Flex justify="center" mt={4}>
                <Text color="gray.600" fontWeight="500">
                  Showing {filteredProducts.length} of {productsData.length} products
                </Text>
              </Flex>
            </MotionBox>

            {/* Products Grid */}
            <AnimatePresence mode="wait">
              <MotionSimpleGrid
                key={`${selectedCategory}-${searchTerm}-${sortBy}`}
                columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                spacing={6}
                px={{ base: 2, md: 0 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, staggerChildren: 0.05 }}
              >
                {filteredProducts.map((product, index) => (
                  <MotionBox
                    key={product.id}
                    className="neo-card group"
                    overflow="hidden"
                    cursor="pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    _hover={{
                      boxShadow: "0 20px 40px rgba(99, 102, 241, 0.15)"
                    }}
                  >
                    {/* Product Image */}
                    <Box
                      position="relative"
                      height="200px"
                      overflow="hidden"
                      borderRadius="lg"
                      mb={4}
                      bg="var(--gray-50)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width="100%"
                        height="100%"
                        objectFit="contain"
                        padding="15px"
                        transition="all 0.3s ease"
                        _groupHover={{
                          transform: "scale(1.1)",
                          filter: "brightness(1.1)"
                        }}
                        fallback={
                          <VStack spacing={2} color="gray.500">
                            <Text fontSize="sm" fontWeight="600" textAlign="center">
                              {product.name}
                            </Text>
                            <Text fontSize="xs" opacity={0.7}>
                              Image Loading...
                            </Text>
                          </VStack>
                        }
                      />

                      {/* Category Badge */}
                      <Badge
                        position="absolute"
                        top="3"
                        left="3"
                        bg="rgba(255, 255, 255, 0.95)"
                        color="var(--accent-primary)"
                        fontSize="2xs"
                        fontWeight="700"
                        px={2}
                        py={1}
                        borderRadius="md"
                        textTransform="uppercase"
                        letterSpacing="0.5px"
                      >
                        {categories[product.category] || product.category}
                      </Badge>

                      {/* Hover Overlay */}
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        bg="var(--accent-primary)"
                        opacity="0"
                        transition="all 0.3s ease"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        _groupHover={{ opacity: 1 }}
                      >
                        <Button
                          className="futuristic-button"
                          size="sm"
                          bg="white"
                          color="var(--accent-primary)"
                          fontWeight="700"
                          fontSize="xs"
                          _hover={{
                            transform: "scale(1.05)",
                            bg: "white"
                          }}
                        >
                          View Details
                        </Button>
                      </Box>
                    </Box>

                    {/* Product Info */}
                    <Stack spacing={2} p={3}>
                      <Heading
                        as="h3"
                        fontSize="md"
                        fontWeight="700"
                        color="gray.800"
                        fontFamily="Inter"
                        lineHeight="1.3"
                        noOfLines={1}
                      >
                        {product.name}
                      </Heading>
                      
                      <Text
                        fontSize="xs"
                        color="var(--accent-primary)"
                        fontWeight="600"
                        textTransform="uppercase"
                        letterSpacing="0.5px"
                      >
                        {product.type}
                      </Text>
                      
                      <Text
                        fontSize="sm"
                        color="gray.600"
                        fontWeight="400"
                        noOfLines={3}
                        lineHeight="1.4"
                      >
                        {product.description}
                      </Text>
                    </Stack>
                  </MotionBox>
                ))}
              </MotionSimpleGrid>
            </AnimatePresence>

            {/* No Results Message */}
            {filteredProducts.length === 0 && (
              <MotionBox
                textAlign="center"
                py={16}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Text fontSize="xl" color="gray.500" fontWeight="600" mb={2}>
                  No products found
                </Text>
                <Text color="gray.400">
                  Try adjusting your search terms or filters
                </Text>
                <Button
                  mt={4}
                  className="futuristic-button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                >
                  Clear Filters
                </Button>
              </MotionBox>
            )}

            {/* Back to Gallery Button */}
            <Flex justify="center" pt={8}>
              <Button
                as="a"
                href="/#gallery"
                className="primary-button"
                size="lg"
                px={12}
                py={6}
                fontSize="lg"
                fontWeight="700"
                borderRadius="xl"
                _hover={{
                  transform: "translateY(-3px) scale(1.05)",
                  boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)"
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                ← Back to Gallery
              </Button>
            </Flex>
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
};

export default AllProductsPage;
