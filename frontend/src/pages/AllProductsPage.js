import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid, 
  Button, 
  Flex, 
  Image,
  Badge
} from '@chakra-ui/react';
import Layout from '../components/layout/Layout';
import { productsData, categories } from '../data/productsData';

const AllProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories for filter bar
  const categoryOptions = [
    { value: 'all', label: 'All Products' },
    ...Object.entries(categories).map(([key, value]) => ({
      value: key,
      label: value
    }))
  ];

  // Filter products by category
  const filteredProducts = selectedCategory === 'all'
    ? productsData
    : productsData.filter(product => product.category === selectedCategory);

  return (
    <Layout>
      <Box
        minHeight="100vh"
        bgGradient="linear(to-br, #f8fafc 0%, #e2e8f0 100%)"
        py={{ base: 10, md: 16 }}
        pt={{ base: 24, md: 28 }}
        px={{ base: 2, md: 0 }}
      >
        <Container maxW="container.xl" position="relative" zIndex={2}>
          {/* Header */}
          <Box textAlign="center" mb={10}>
            <Badge
              bg="#e0e7ef"
              color="#6366f1"
              px={6}
              py={2}
              borderRadius="full"
              fontSize="md"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="wider"
              border="1px solid #cbd5e1"
              boxShadow="sm"
            >
              Product Collection
            </Badge>
            <Heading
              as="h1"
              fontSize={{ base: "2.5rem", md: "3.5rem", lg: "4.5rem" }}
              fontWeight="900"
              color="#1e293b"
              mt={4}
              mb={2}
              letterSpacing="-0.02em"
              fontFamily="Inter"
            >
              Explore Our <Box as="span" color="#6366f1" borderBottom="3px solid #6366f1">Product Collection</Box>
            </Heading>
            <Text
              fontSize={{ base: "md", md: "xl" }}
              color="#475569"
              maxW="700px"
              mx="auto"
              mt={4}
            >
              Discover our comprehensive range of bathroom fittings, sanitaryware, and accessories. Each product is carefully selected for quality, durability, and aesthetic appeal.
            </Text>
          </Box>

          {/* Category Filter Bar */}
          <Flex
            wrap="wrap"
            justify="center"
            gap={3}
            mb={10}
          >
            {categoryOptions.map(option => (
              <Button
                key={option.value}
                onClick={() => setSelectedCategory(option.value)}
                bg={selectedCategory === option.value ? "#6366f1" : "#f1f5f9"}
                color={selectedCategory === option.value ? "white" : "#1e293b"}
                borderRadius="full"
                px={6}
                py={2}
                fontWeight="700"
                fontSize="md"
                boxShadow={selectedCategory === option.value ? "md" : "sm"}
                border={selectedCategory === option.value ? "2px solid #6366f1" : "1px solid #e2e8f0"}
                _hover={{ bg: "#6366f1", color: "white" }}
                transition="all 0.2s"
              >
                {option.label}
                {option.value !== 'all' && (
                  <Box as="span" ml={2} bg="#e0e7ef" color="#6366f1" px={2} borderRadius="full" fontSize="sm" fontWeight="600">
                    {productsData.filter(p => p.category === option.value).length}
                  </Box>
                )}
              </Button>
            ))}
          </Flex>

          {/* Products Grid */}
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8}>
            {filteredProducts.map(product => (
              <Box
                key={product.id}
                bg="white"
                borderRadius="2xl"
                boxShadow="0 4px 24px rgba(99,102,241,0.08)"
                p={5}
                transition="box-shadow 0.2s, transform 0.2s"
                _hover={{ boxShadow: "0 8px 32px rgba(99,102,241,0.16)", transform: "translateY(-4px) scale(1.03)" }}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box
                  w="100%"
                  h="170px"
                  mb={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    maxH="100%"
                    maxW="100%"
                    objectFit="contain"
                    borderRadius="lg"
                    fallbackSrc="/images/placeholder.png"
                  />
                </Box>
                <Flex align="center" gap={2} mb={2}>
                  <Badge
                    bg="#1e293b"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="700"
                  >
                    {product.type.toUpperCase()}
                  </Badge>
                  {product.isPopular && (
                    <Badge
                      bg="#6366f1"
                      color="white"
                      px={2}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="700"
                    >
                      Popular
                    </Badge>
                  )}
                </Flex>
                <Heading as="h3" fontSize="lg" fontWeight="700" color="#1e293b" mb={1} textAlign="center">
                  {product.name}
                </Heading>
                <Text fontSize="sm" color="#64748b" textAlign="center" mb={2}>
                  {product.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Layout>
  );
};

export default AllProductsPage;
