import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Flex,
  Badge,
  Icon,
  IconButton
} from '@chakra-ui/react';
import { 
  FaArrowLeft, 
  FaPhone, 
  FaWhatsapp, 
  FaStar,
  FaHeart,
  FaRegHeart,
  FaShieldAlt,
  FaAward,
  FaCheckCircle,
  FaGem,
  FaShare,
  FaTruck,
  FaCertificate
} from 'react-icons/fa';
import { productsData } from '../data/productsData';
import { colors, gradients } from '../theme/colors';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchProduct = () => {
      try {
        const productId = parseInt(id, 10);
        const foundProduct = productsData.find(p => p.id === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
          // Check if product is in favorites
          const favorites = JSON.parse(localStorage.getItem('jd-favorites') || '[]');
          setIsFavorite(favorites.includes(productId));
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('jd-favorites') || '[]');
    const productId = parseInt(id, 10);
    
    if (isFavorite) {
      const updated = favorites.filter(fid => fid !== productId);
      localStorage.setItem('jd-favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(productId);
      localStorage.setItem('jd-favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Box
            w="60px"
            h="60px"
            border="4px solid"
            borderColor={colors.accent}
            borderTopColor="transparent"
            borderRadius="full"
            animation="spin 1s linear infinite"
          />
          <Text color="gray.600" fontWeight="600">Loading product...</Text>
        </VStack>
      </Box>
    );
  }

  if (!product) {
    return (
      <Container maxW="container.md" py={20} textAlign="center">
        <VStack spacing={6}>
          <Text fontSize="6xl">🔍</Text>
          <Heading size="xl" color="gray.700">Product Not Found</Heading>
          <Text color="gray.600">The product you're looking for doesn't exist.</Text>
          <Button
            onClick={() => navigate('/products')}
            bgGradient={gradients.accentLinear}
            color="white"
            size="lg"
            px={8}
            _hover={{ transform: 'translateY(-2px)' }}
          >
            Browse All Products
          </Button>
        </VStack>
      </Container>
    );
  }

  const imageSrc = product.image?.startsWith('http')
    ? product.image
    : `${process.env.PUBLIC_URL || ''}${product.image}`;

  const features = [
    { icon: FaGem, title: "Premium Quality", desc: "Finest materials & craftsmanship" },
    { icon: FaShieldAlt, title: "Warranty", desc: "Manufacturer warranty included" },
    { icon: FaAward, title: "Certified", desc: "ISO certified products" },
    { icon: FaTruck, title: "Fast Delivery", desc: "Quick installation support" }
  ];

  return (
    <>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>

      <Box
        minH="100vh"
        bg={`linear-gradient(135deg, #ffffff 0%, #f8fafc 15%, ${colors.accent}0A 35%, #e2e8f0 100%)`}
        position="relative"
        overflowX="hidden"
      >
        {/* Background Decoration */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          backgroundImage={`
            radial-gradient(circle at 20% 30%, ${colors.accent}08 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, ${colors.accent}0A 0%, transparent 50%)
          `}
          pointerEvents="none"
        />

        <Container
          maxW="container.xl"
          position="relative"
          zIndex={1}
          pt={{ base: 24, md: 32 }}
          pb={{ base: 16, md: 20 }}
        >
         
          {/* Main Content Grid */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, lg: 16 }} className="fade-in">
            {/* Left Column - Image */}
            <Box>
              <Box
                position="relative"
                bg="white"
                borderRadius="3xl"
                overflow="visible"
                border="2px solid"
                borderColor={`${colors.accent}15`}
                boxShadow={`0 20px 60px ${colors.accentGlow}`}
                margin={5}
              >
                {/* Action Buttons */}
                <HStack
                  position="absolute"
                  top={{ base: 4, md: 5 }}
                  right={{ base: 4, md: 5 }}
                  spacing={2}
                  zIndex={10}
                >
                  <Box
                    as="button"
                    onClick={toggleFavorite}
                    w={{ base: "36px", md: "40px" }}
                    h={{ base: "36px", md: "40px" }}
                    bg="white"
                    borderRadius="full"
                    border="2px solid"
                    borderColor={colors.accent}
                    boxShadow="0 4px 12px rgba(0,0,0,0.25)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                      transform: "scale(1.1)",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.3)"
                    }}
                    aria-label="Add to favorites"
                  >
                    {isFavorite ? (
                      <FaHeart size={16} color="#ef4444" />
                    ) : (
                      <FaRegHeart size={16} color={colors.accent} />
                    )}
                  </Box>
                  <Box
                    as="button"
                    onClick={handleShare}
                    w={{ base: "36px", md: "40px" }}
                    h={{ base: "36px", md: "40px" }}
                    bg="white"
                    borderRadius="full"
                    border="2px solid"
                    borderColor={colors.accent}
                    boxShadow="0 4px 12px rgba(0,0,0,0.25)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                      transform: "scale(1.1)",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.3)"
                    }}
                    aria-label="Share product"
                  >
                    <FaShare size={16} color={colors.accent} />
                  </Box>
                </HStack>

                {/* Product Image */}
                <Box
                  position="relative"
                  h={{ base: "350px", md: "550px" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p={{ base: 6, md: 10 }}
                  pb={{ base: 16, md: 20 }}
                  overflow="hidden"
                  borderRadius="3xl"
                >
                  <img
                    src={imageSrc}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transition: 'all 0.4s ease',
                      opacity: imageLoaded ? 1 : 0
                    }}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      e.target.src = '/placeholder-product.png';
                    }}
                  />
                  {!imageLoaded && (
                    <Box
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                    >
                      <Box
                        w="40px"
                        h="40px"
                        border="3px solid"
                        borderColor={colors.accent}
                        borderTopColor="transparent"
                        borderRadius="full"
                        animation="spin 1s linear infinite"
                      />
                    </Box>
                  )}
                </Box>

                {/* Product Type Badge */}
                <Badge
                  position="absolute"
                  bottom={4}
                  left={4}
                  bgGradient={gradients.accentLinear}
                  color="white"
                  px={5}
                  py={2}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="800"
                  textTransform="uppercase"
                  boxShadow={`0 8px 20px ${colors.accentGlow}`}
                  zIndex={3}
                >
                  {product.type || product.category}
                </Badge>
              </Box>
            </Box>

            {/* Right Column - Details */}
            <VStack align="stretch" spacing={6}>
              {/* Product Title */}
              <VStack align="stretch" spacing={3}>
                <Heading
                  as="h1"
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  fontWeight="900"
                  bgGradient={gradients.accentLinear}
                  bgClip="text"
                  lineHeight="1.2"
                >
                  {product.name}
                </Heading>
                
                {/* Rating */}
                <HStack spacing={1}>
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} as={FaStar} color={colors.accent} boxSize={5} />
                  ))}
                  <Text ml={2} color="gray.600" fontWeight="600">
                    4.8 (127 reviews)
                  </Text>
                </HStack>
              </VStack>

              <Box borderBottom={`1px solid ${colors.accent}20`} />

              {/* Description */}
              <Box>
                <Heading size="md" mb={3} color="gray.800">
                  Product Description
                </Heading>
                <Text fontSize="lg" color="gray.700" lineHeight="1.8">
                  {product.description}
                </Text>
              </Box>

              <Box borderBottom={`1px solid ${colors.accent}20`} />

              {/* Features Grid */}
              <Box>
                <Heading size="md" mb={4} color="gray.800">
                  Key Features
                </Heading>
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                  {features.map((feature, idx) => (
                    <HStack
                      key={idx}
                      p={4}
                      bg="white"
                      borderRadius="xl"
                      border="2px solid"
                      borderColor={`${colors.accent}10`}
                      spacing={3}
                      _hover={{
                        borderColor: `${colors.accent}30`,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 20px ${colors.accentGlow}`
                      }}
                      transition="all 0.3s"
                    >
                      <Box
                        p={3}
                        bg={`${colors.accent}10`}
                        borderRadius="lg"
                        color={colors.accent}
                      >
                        <Icon as={feature.icon} boxSize={6} />
                      </Box>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="700" color="gray.800" fontSize="sm">
                          {feature.title}
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                          {feature.desc}
                        </Text>
                      </VStack>
                    </HStack>
                  ))}
                </SimpleGrid>
              </Box>

              <Box borderBottom={`1px solid ${colors.accent}20`} />

              {/* CTA Buttons */}
              <VStack spacing={4} pt={4}>
                <Button
                  as="a"
                  href="https://wa.me/918527161330"
                  target="_blank"
                  w="full"
                  size="lg"
                  h="60px"
                  bgGradient={gradients.accentLinear}
                  color="white"
                  fontSize="lg"
                  fontWeight="900"
                  leftIcon={<Icon as={FaWhatsapp} boxSize={6} />}
                  borderRadius="xl"
                  boxShadow={`0 10px 30px ${colors.accentGlow}`}
                  _hover={{
                    transform: 'translateY(-3px)',
                    boxShadow: `0 15px 40px ${colors.accentGlow}`
                  }}
                  transition="all 0.3s"
                >
                  WhatsApp for Price & Details
                </Button>

                <Button
                  as="a"
                  href="tel:+918527161330"
                  w="full"
                  size="lg"
                  h="60px"
                  bg="white"
                  color={colors.accent}
                  fontSize="lg"
                  fontWeight="800"
                  leftIcon={<Icon as={FaPhone} boxSize={5} />}
                  borderRadius="xl"
                  border="2px solid"
                  borderColor={colors.accent}
                  _hover={{
                    bg: `${colors.accent}05`,
                    transform: 'translateY(-3px)',
                    boxShadow: `0 10px 30px ${colors.accentGlow}`
                  }}
                  transition="all 0.3s"
                >
                  Call Now: +91-8527161330
                </Button>
              </VStack>

              {/* Trust Badges */}
              <HStack
                spacing={4}
                p={5}
                bg={`${colors.accent}05`}
                borderRadius="xl"
                justify="center"
                flexWrap="wrap"
              >
                <HStack spacing={2}>
                  <Icon as={FaCheckCircle} color="green.500" boxSize={5} />
                  <Text fontSize="sm" fontWeight="600" color="gray.700">
                    Genuine Product
                  </Text>
                </HStack>
                <HStack spacing={2}>
                  <Icon as={FaCertificate} color={colors.accent} boxSize={5} />
                  <Text fontSize="sm" fontWeight="600" color="gray.700">
                    Certified Quality
                  </Text>
                </HStack>
                <HStack spacing={2}>
                  <Icon as={FaTruck} color="blue.500" boxSize={5} />
                  <Text fontSize="sm" fontWeight="600" color="gray.700">
                    Fast Delivery
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </SimpleGrid>

          {/* Related Products Section */}
          <Box mt={20}>
            <Heading
              size="xl"
              mb={8}
              textAlign="center"
              bgGradient={gradients.accentLinear}
              bgClip="text"
            >
              You May Also Like
            </Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
              {productsData
                .filter(p => p.id !== product.id && p.category === product.category)
                .slice(0, 4)
                .map(relatedProduct => (
                  <Box
                    key={relatedProduct.id}
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                    cursor="pointer"
                    bg="white"
                    borderRadius="2xl"
                    overflow="hidden"
                    border="2px solid"
                    borderColor={`${colors.accent}10`}
                    _hover={{
                      transform: 'translateY(-8px)',
                      borderColor: `${colors.accent}30`,
                      boxShadow: `0 20px 40px ${colors.accentGlow}`
                    }}
                    transition="all 0.4s"
                  >
                    <Box
                      position="relative"
                      h={{ base: "280px", sm: "220px" }}
                      bg="linear-gradient(135deg, #f8fafc, #ffffff)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      p={6}
                      pb={{ base: 20, sm: 6 }}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL || ''}${relatedProduct.image}`}
                        alt={relatedProduct.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                      />
                      
                      {/* Text overlay for mobile */}
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="white"
                        p={3}
                        display={{ base: "block", sm: "none" }}
                      >
                        <Text fontWeight="800" fontSize="sm" color="gray.800" noOfLines={1} mb={1}>
                          {relatedProduct.name}
                        </Text>
                        <Text fontSize="xs" color="gray.600" noOfLines={1} mb={2}>
                          {relatedProduct.description}
                        </Text>
                        <Button
                          size="xs"
                          bgGradient={gradients.accentLinear}
                          color="white"
                          fontWeight="700"
                          w="full"
                          h="32px"
                        >
                          View Details
                        </Button>
                      </Box>
                    </Box>
                    
                    {/* Desktop text */}
                    <VStack p={4} align="stretch" spacing={2} display={{ base: "none", sm: "flex" }}>
                      <Text fontWeight="800" fontSize="md" color="gray.800" noOfLines={1}>
                        {relatedProduct.name}
                      </Text>
                      <Text fontSize="sm" color="gray.600" noOfLines={2}>
                        {relatedProduct.description}
                      </Text>
                      <Button
                        size="sm"
                        bgGradient={gradients.accentLinear}
                        color="white"
                        fontWeight="700"
                        w="full"
                        _hover={{ transform: 'scale(1.05)' }}
                      >
                        View Details
                      </Button>
                    </VStack>
                  </Box>
                ))}
            </SimpleGrid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProductDetailPage;
