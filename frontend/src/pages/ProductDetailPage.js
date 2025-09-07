import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  Badge,
  SimpleGrid,
  Stack,
  Icon,
  Flex,
  Spinner,
  Center
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaShoppingCart, FaHeart, FaShare, FaCheck, FaStar, FaPhone, FaEnvelope } from 'react-icons/fa';
import { productsData } from '../data/productsData';

const MotionBox = motion(Box);

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Find product by ID
    const foundProduct = productsData.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      // Add additional product details
      setProduct({
        ...foundProduct,
        specifications: {
          material: 'Premium Ceramic',
          dimensions: '650mm x 400mm x 750mm',
          weight: '45kg',
          waterUsage: '3.5L per flush',
          installation: 'Floor mounted',
          warranty: '5 years',
          color: 'White',
          finish: 'Glossy'
        },
        features: [
          'Water-saving technology',
          'Easy-clean surface',
          'Soft-close seat',
          'Dual flush system',
          'Anti-bacterial coating',
          'Quiet operation'
        ],
        additionalImages: [
          foundProduct.image,
          foundProduct.image, // In real app, these would be different angles
          foundProduct.image,
          foundProduct.image
        ],
        price: {
          original: 25000,
          discounted: 22000,
          currency: 'INR'
        },
        rating: 4.5,
        reviews: 128,
        inStock: true
      });
    }
    setLoading(false);
  }, [id]);

  const handleInquiry = () => {
    alert("Inquiry Sent! Our team will contact you within 24 hours.");
  };

  const handleAddToWishlist = () => {
    alert(`${product.name} has been added to your wishlist.`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Product link has been copied to clipboard.");
    }
  };

  if (loading) {
    return (
      <Center minH="50vh">
        <Spinner size="xl" color="purple.500" />
      </Center>
    );
  }

  if (!product) {
    return (
      <Container maxW="container.xl" py={20}>
        <VStack spacing={6}>
          <Heading>Product Not Found</Heading>
          <Text>The product you're looking for doesn't exist.</Text>
          <Button onClick={() => navigate('/products')} leftIcon={<Icon as={FaArrowLeft} />}>
            Back to Products
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="container.xl" py={8}>
        {/* Breadcrumb */}
        <HStack mb={8} fontSize="sm" spacing={2}>
          <Button variant="link" onClick={() => navigate('/')} p={0} h="auto" fontSize="sm">
            Home
          </Button>
          <Text>/</Text>
          <Button variant="link" onClick={() => navigate('/products')} p={0} h="auto" fontSize="sm">
            Products
          </Button>
          <Text>/</Text>
          <Text fontWeight="600">{product.name}</Text>
        </HStack>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} mb={16}>
            {/* Product Images */}
            <VStack spacing={4} align="stretch">
              {/* Main Image */}
              <Box
                bg="white"
                borderRadius="2xl"
                p={6}
                boxShadow="0 4px 20px rgba(0,0,0,0.1)"
                position="relative"
                overflow="hidden"
              >
                <Image
                  src={product.additionalImages[selectedImage]}
                  alt={product.name}
                  w="100%"
                  h="500px"
                  objectFit="contain"
                  borderRadius="xl"
                />
                
                {/* Image Navigation */}
                <HStack
                  position="absolute"
                  bottom="4"
                  left="50%"
                  transform="translateX(-50%)"
                  bg="rgba(0,0,0,0.7)"
                  borderRadius="full"
                  p={2}
                  spacing={2}
                >
                  {product.additionalImages.map((_, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="ghost"
                      color="white"
                      bg={selectedImage === index ? "purple.500" : "transparent"}
                      onClick={() => setSelectedImage(index)}
                      minW="40px"
                      h="40px"
                      borderRadius="full"
                    >
                      {index + 1}
                    </Button>
                  ))}
                </HStack>
              </Box>

              {/* Thumbnail Images */}
              <HStack spacing={3} justify="center">
                {product.additionalImages.map((image, index) => (
                  <Box
                    key={index}
                    w="80px"
                    h="80px"
                    borderRadius="lg"
                    overflow="hidden"
                    cursor="pointer"
                    border={selectedImage === index ? "3px solid" : "1px solid"}
                    borderColor={selectedImage === index ? "purple.500" : "gray.200"}
                    onClick={() => setSelectedImage(index)}
                    _hover={{ borderColor: "purple.300" }}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                    />
                  </Box>
                ))}
              </HStack>
            </VStack>

            {/* Product Details */}
            <VStack spacing={6} align="stretch">
              {/* Product Header */}
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between" align="flex-start">
                  <VStack align="stretch" spacing={2} flex="1">
                    <Badge
                      bg="linear-gradient(135deg, #8b5cf6, #06b6d4)"
                      color="white"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="700"
                      textTransform="uppercase"
                      w="fit-content"
                    >
                      {product.type}
                    </Badge>
                    
                    <Heading
                      as="h1"
                      fontSize={{ base: "2xl", md: "3xl" }}
                      fontWeight="800"
                      color="gray.800"
                      lineHeight="1.2"
                    >
                      {product.name}
                    </Heading>
                    
                    <HStack spacing={4}>
                      <HStack spacing={1}>
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            as={FaStar}
                            color={i < Math.floor(product.rating) ? "yellow.400" : "gray.300"}
                            boxSize={4}
                          />
                        ))}
                        <Text fontSize="sm" color="gray.600">
                          ({product.reviews} reviews)
                        </Text>
                      </HStack>
                    </HStack>
                  </VStack>

                  <HStack spacing={2}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleAddToWishlist}
                      leftIcon={<Icon as={FaHeart} />}
                    >
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleShare}
                      leftIcon={<Icon as={FaShare} />}
                    >
                      Share
                    </Button>
                  </HStack>
                </HStack>

                <Text
                  fontSize="lg"
                  color="gray.600"
                  lineHeight="1.6"
                >
                  {product.description}
                </Text>

                {/* Price */}
                <HStack spacing={4} align="baseline">
                  <Text
                    fontSize="3xl"
                    fontWeight="800"
                    color="purple.600"
                  >
                    ₹{product.price.discounted.toLocaleString()}
                  </Text>
                  <Text
                    fontSize="xl"
                    color="gray.500"
                    textDecoration="line-through"
                  >
                    ₹{product.price.original.toLocaleString()}
                  </Text>
                  <Badge
                    bg="red.100"
                    color="red.600"
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontSize="sm"
                    fontWeight="700"
                  >
                    Save ₹{(product.price.original - product.price.discounted).toLocaleString()}
                  </Badge>
                </HStack>

                {/* Stock Status */}
                <HStack spacing={2}>
                  <Icon as={FaCheck} color="green.500" />
                  <Text color="green.600" fontWeight="600">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </Text>
                </HStack>
              </VStack>

              <Box h="1px" bg="gray.200" my={4} />

              {/* Key Features */}
              <VStack spacing={4} align="stretch">
                <Heading size="md" color="gray.800">
                  Key Features
                </Heading>
                <SimpleGrid columns={2} spacing={3}>
                  {product.features.map((feature, index) => (
                    <HStack key={index} spacing={2}>
                      <Icon as={FaCheck} color="green.500" boxSize={3} />
                      <Text fontSize="sm" color="gray.600">
                        {feature}
                      </Text>
                    </HStack>
                  ))}
                </SimpleGrid>
              </VStack>

              <Box h="1px" bg="gray.200" my={4} />

              {/* Action Buttons */}
              <VStack spacing={4} align="stretch">
                <HStack spacing={4}>
                  <Button
                    size="lg"
                    bg="linear-gradient(135deg, #8b5cf6, #06b6d4)"
                    color="white"
                    _hover={{
                      bg: "linear-gradient(135deg, #7c3aed, #0891b2)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 25px rgba(139,92,246,0.3)"
                    }}
                    leftIcon={<Icon as={FaShoppingCart} />}
                    onClick={handleInquiry}
                    isDisabled={!product.inStock}
                    flex="1"
                  >
                    {product.inStock ? 'Request Quote' : 'Out of Stock'}
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    borderColor="purple.500"
                    color="purple.500"
                    _hover={{
                      bg: "purple.50",
                      borderColor: "purple.600"
                    }}
                    leftIcon={<Icon as={FaPhone} />}
                    flex="1"
                  >
                    Call Now
                  </Button>
                </HStack>

                <Button
                  size="lg"
                  variant="ghost"
                  color="purple.600"
                  _hover={{
                    bg: "purple.50"
                  }}
                  leftIcon={<Icon as={FaEnvelope} />}
                >
                  Send Inquiry via Email
                </Button>
              </VStack>
            </VStack>
          </SimpleGrid>

          {/* Product Specifications */}
          <Box
            bg="white"
            borderRadius="2xl"
            p={8}
            boxShadow="0 4px 20px rgba(0,0,0,0.1)"
            mb={12}
          >
            <Heading size="lg" mb={6} color="gray.800">
              Specifications
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {Object.entries(product.specifications).map(([key, value]) => (
                <VStack key={key} align="stretch" spacing={2}>
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="gray.500"
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Text>
                  <Text fontSize="lg" color="gray.800" fontWeight="500">
                    {value}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </Box>

          {/* Related Products */}
          <Box>
            <Heading size="lg" mb={6} color="gray.800">
              Related Products
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
              {productsData
                .filter(p => p.category === product.category && p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Box
                    key={relatedProduct.id}
                    bg="white"
                    borderRadius="xl"
                    p={4}
                    boxShadow="0 4px 15px rgba(0,0,0,0.1)"
                    cursor="pointer"
                    _hover={{
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
                    }}
                    transition="all 0.3s ease"
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  >
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      w="100%"
                      h="200px"
                      objectFit="contain"
                      borderRadius="lg"
                      mb={3}
                    />
                    <Text fontWeight="600" fontSize="sm" color="gray.800" noOfLines={2}>
                      {relatedProduct.name}
                    </Text>
                    <Text fontSize="xs" color="gray.500" mt={1}>
                      {relatedProduct.type}
                    </Text>
                  </Box>
                ))}
            </SimpleGrid>
          </Box>

          {/* Back Button */}
          <Flex justify="center" mt={12}>
            <Button
              size="lg"
              variant="outline"
              leftIcon={<Icon as={FaArrowLeft} />}
              onClick={() => navigate(-1)}
            >
              Back to Products
            </Button>
          </Flex>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default ProductDetailPage;
