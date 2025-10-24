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
  Grid,
  GridItem,
  AspectRatio,
  SimpleGrid,
  Flex,
  Center,
  Badge,
  Icon
} from '@chakra-ui/react';
import { 
  FaArrowLeft, 
  FaPhone, 
  FaEnvelope, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaStar,
  FaTools,
  FaHeart,
  FaShare,
  FaBookmark,
  FaShieldAlt,
  FaAward,
  FaPlay,
  FaExpand,
  FaCheckCircle,
  FaGem,
  FaCrown,
  FaMagic
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { productsData } from '../data/productsData';
import { colors, gradients, shadows } from '../theme/colors';

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  
  // Elegant dark theme matching website
  const bgGradient = `linear-gradient(135deg, ${colors.dark} 0%, ${colors.darkAlt} 50%, ${colors.accent} 100%)`;
  const cardBg = 'rgba(255, 255, 255, 0.08)';
  const glassBg = 'rgba(255, 255, 255, 0.05)';
  const subtleBg = 'rgba(255, 255, 255, 0.03)';

  useEffect(() => {
    const fetchProduct = () => {
      try {
        const productId = parseInt(id, 10);
        const foundProduct = productsData.find(p => p.id === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
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

  const handleContactClick = (type) => {
    const message = `Hi! I'm interested in the ${product?.name} product. Could you please provide more details?`;
    
    switch (type) {
      case 'whatsapp':
        window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'phone':
        window.open('tel:+919876543210', '_self');
        break;
      case 'email':
        window.open(`mailto:rdiamond2423@gmail.com?subject=Inquiry about ${product?.name}&body=${encodeURIComponent(message)}`, '_blank');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <Box 
        minH="100vh" 
        bg={bgGradient}
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        position="relative"
        overflow="hidden"
        pt={{ base: 20, md: 24 }}
      >
        {/* Elegant background pattern */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          opacity="0.1"
          backgroundImage="radial-gradient(circle at 20px 20px, rgba(255,255,255,0.1) 1px, transparent 1px)"
          backgroundSize="40px 40px"
        />
        
        <VStack spacing={8} position="relative" zIndex={1}>
          <Box
            w={16}
            h={16}
            border="3px solid"
            borderColor="rgba(255,255,255,0.2)"
            borderTopColor={colors.accentTint}
            borderRadius="full"
            animation="spin 1s linear infinite"
          />
          <MotionText
            color="white"
            fontSize="xl"
            fontWeight="600"
            textAlign="center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Loading Premium Product...
          </MotionText>
        </VStack>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box minH="100vh" bg={bgGradient} position="relative" overflow="hidden" pt={{ base: 20, md: 24 }}>
        {/* Elegant background pattern */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          opacity="0.05"
          backgroundImage="radial-gradient(circle at 20px 20px, rgba(255,255,255,0.1) 1px, transparent 1px)"
          backgroundSize="40px 40px"
        />
        
        <Container maxW="container.xl" py={20} pt={{ base: 24, md: 28 }}>
          <Center>
            <MotionBox 
              maxW="lg" 
              bg={cardBg}
              backdropFilter="blur(20px)"
              boxShadow={shadows.accentStrong}
              borderRadius="2xl" 
              p={16} 
              textAlign="center"
              border="1px solid rgba(255,255,255,0.2)"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Box fontSize="8xl" mb={8} opacity="0.8">💎</Box>
              <MotionHeading 
                fontSize="4xl" 
                color={colors.dark}
                fontWeight="800" 
                mb={6}
                bgGradient={gradients.accentText}
                bgClip="text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Product Not Found
              </MotionHeading>
              <MotionText 
                fontSize="xl" 
                color={colors.grayText} 
                mb={10} 
                lineHeight="1.6"
                fontWeight="500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                The premium product you're looking for doesn't exist or has been removed from our collection.
              </MotionText>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Button
                  onClick={() => navigate('/all-products')}
                  leftIcon={<FaArrowLeft />}
                  bg={gradients.accentLinear}
                  color="white"
                  size="xl"
                  borderRadius="xl"
                  px={10}
                  py={8}
                  fontWeight="700"
                  fontSize="lg"
                  boxShadow={shadows.accentMedium}
                  _hover={{ 
                    transform: "translateY(-3px)",
                    boxShadow: shadows.accentStrong
                  }}
                  transition="all 0.3s ease"
                >
                  Explore Our Collection
                </Button>
              </MotionBox>
            </MotionBox>
          </Center>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={bgGradient} position="relative" overflow="hidden"  px={10}>
      {/* Elegant background pattern */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.03"
        backgroundImage="radial-gradient(circle at 20px 20px, rgba(255,255,255,0.1) 1px, transparent 1px)"
        backgroundSize="40px 40px"
      />
      
      {/* Floating accent elements */}
      <Box
        position="absolute"
        top="10%"
        right="10%"
        w="200px"
        h="200px"
        borderRadius="full"
        bg={gradients.accentRadialSoft}
        opacity="0.1"
        filter="blur(40px)"
      />
      <Box
        position="absolute"
        bottom="20%"
        left="5%"
        w="150px"
        h="150px"
        borderRadius="full"
        bg={gradients.accentRadialSoft}
        opacity="0.08"
        filter="blur(30px)"
      />

      {/* Navigation Header */}
      <Box position="relative" zIndex={2} py={8} pt={{ base: 24, md: 28 }}>
        <Container maxW="container.xl">
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Flex align="center" justify="space-between" mb={12}>
              <Button
                onClick={() => navigate('/all-products')}
                leftIcon={<FaArrowLeft />}
                bg={glassBg}
                backdropFilter="blur(20px)"
                color="white"
                size="lg"
                fontWeight="600"
                borderRadius="xl"
                border="1px solid rgba(255,255,255,0.2)"
                _hover={{ 
                  bg: "rgba(255,255,255,0.15)",
                  transform: "translateX(-4px)",
                  boxShadow: shadows.accentSoft
                }}
                transition="all 0.3s ease"
              >
                Back to Collection
              </Button> 
              
              <HStack spacing={4}>
                <Button
                  leftIcon={<FaShare />}
                  bg={glassBg}
                  backdropFilter="blur(20px)"
                  color="white"
                  size="lg"
                  borderRadius="xl"
                  border="1px solid rgba(255,255,255,0.2)"
                  _hover={{ 
                    bg: "rgba(255,255,255,0.15)",
                    boxShadow: shadows.accentSoft
                  }}
                  transition="all 0.3s ease"
                >
                  Share
                </Button>
                <Button
                  leftIcon={isLiked ? <FaHeart /> : <FaBookmark />}
                  bg={glassBg}
                  backdropFilter="blur(20px)"
                  color={isLiked ? colors.accentTint : "white"}
                  size="lg"
                  borderRadius="xl"
                  border="1px solid rgba(255,255,255,0.2)"
                  _hover={{ 
                    bg: "rgba(255,255,255,0.15)",
                    boxShadow: shadows.accentSoft
                  }}
                  onClick={() => setIsLiked(!isLiked)}
                  transition="all 0.3s ease"
                >
                  {isLiked ? 'Saved' : 'Save'}
                </Button>
              </HStack>
            </Flex>
          </MotionBox>

          {/* Main Product Display */}
          <Grid templateColumns={{ base: "1fr", xl: "1fr 1fr" }} gap={{ base: 8, xl: 20 }} align="start" mt={{ base: 4, md: 8 }}>
            
            {/* Product Image Gallery */}
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box 
                  bg={cardBg}
                  backdropFilter="blur(30px)"
                  boxShadow="0 20px 40px rgba(0,0,0,0.3)"
                  borderRadius="3xl" 
                  overflow="hidden" 
                  position="relative"
                  border="1px solid rgba(255,255,255,0.1)"
                >
                  {/* Premium Badge */}
                  <Box position="absolute" top={8} left={8} zIndex={3}>
                    <Badge
                      bg={gradients.accentLinear}
                      color="white"
                      borderRadius="full"
                      px={6}
                      py={3}
                      fontSize="sm"
                      fontWeight="700"
                      textTransform="uppercase"
                      letterSpacing="1px"
                      boxShadow={shadows.accentMedium}
                    >
                      <Icon as={FaGem} mr={2} />
                      {product.type || product.category}
                    </Badge>
                  </Box>

                  {/* Main Product Image */}
                  <Box position="relative">
                    <AspectRatio ratio={4/5}>
                      <Box
                        bg="rgba(255,255,255,0.02)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        p={16}
                        position="relative"
                        overflow="hidden"
                      >
                        {/* Elegant background pattern */}
                        <Box
                          position="absolute"
                          top="0"
                          left="0"
                          right="0"
                          bottom="0"
                          opacity="0.05"
                          backgroundImage="radial-gradient(circle at 20px 20px, rgba(34,4,56,0.1) 1px, transparent 1px)"
                          backgroundSize="40px 40px"
                        />
                        
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            maxH="100%"
                            maxW="100%"
                            objectFit="contain"
                            transition="transform 0.6s ease"
                            _hover={{ transform: "scale(1.08)" }}
                            filter="drop-shadow(0 20px 40px rgba(0,0,0,0.1))"
                          />
                        ) : (
                          <VStack spacing={8} color={colors.grayText}>
                            <Box fontSize="8xl" opacity="0.6">💎</Box>
                            <Text fontWeight="700" fontSize="2xl" color={colors.dark}>{product.name}</Text>
                            <Text fontSize="lg" color={colors.grayText}>Premium Product</Text>
                          </VStack>
                        )}
                        
                        {/* Elegant overlay actions */}
                        <HStack position="absolute" top={6} right={6} spacing={3}>
                          <Button
                            leftIcon={<FaExpand />}
                            size="md"
                            bg={glassBg}
                            backdropFilter="blur(20px)"
                            color="white"
                            borderRadius="full"
                            border="1px solid rgba(255,255,255,0.2)"
                            _hover={{ 
                              bg: "rgba(255,255,255,0.2)",
                              transform: "scale(1.1)"
                            }}
                            minW="auto"
                            px={4}
                            py={3}
                            transition="all 0.3s ease"
                          />
                          <Button
                            leftIcon={<FaPlay />}
                            size="md"
                            bg={glassBg}
                            backdropFilter="blur(20px)"
                            color="white"
                            borderRadius="full"
                            border="1px solid rgba(255,255,255,0.2)"
                            _hover={{ 
                              bg: "rgba(255,255,255,0.2)",
                              transform: "scale(1.1)"
                            }}
                            minW="auto"
                            px={4}
                            py={3}
                            transition="all 0.3s ease"
                          />
                        </HStack>
                      </Box>
                    </AspectRatio>
                  </Box>
                </Box>
              </MotionBox>
            </GridItem>

            {/* Product Information */}
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <VStack spacing={10} align="stretch">
                  
                  {/* Product Title & Description */}
                  <Box 
                    bg={cardBg}
                    backdropFilter="blur(30px)"
                    boxShadow="0 20px 40px rgba(0,0,0,0.3)"
                    borderRadius="3xl" 
                    p={12}
                    border="1px solid rgba(255,255,255,0.1)"
                    position="relative"
                    overflow="hidden"
                  >
                    {/* Elegant background accent */}
                    <Box
                      position="absolute"
                      top="-50%"
                      right="-50%"
                      w="200px"
                      h="200px"
                      borderRadius="full"
                      bg={gradients.accentRadialSoft}
                      opacity="0.1"
                      filter="blur(40px)"
                    />
                    
                    <VStack spacing={8} align="start" position="relative" zIndex={1}>
                      <MotionHeading
                        as="h1"
                        fontSize={{ base: "5xl", md: "6xl", lg: "7xl" }}
                        fontWeight="900"
                        color="white"
                        lineHeight="1.1"
                        bgGradient={gradients.accentText}
                        bgClip="text"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      >
                        {product.name}
                      </MotionHeading>
                      
                      <MotionText
                        fontSize="xl"
                        color="rgba(255,255,255,0.8)"
                        lineHeight="1.8"
                        fontWeight="500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                      >
                        {product.description}
                      </MotionText>

                      {/* Premium Rating & Reviews */}
                      <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                      >
                        <HStack spacing={6} p={6} bg="rgba(255,255,255,0.05)" borderRadius="xl" border="1px solid rgba(255,255,255,0.1)">
                          <HStack spacing={2}>
                            {[...Array(5)].map((_, i) => (
                              <Icon key={i} as={FaStar} color={colors.accentTint} boxSize={6} />
                            ))}
                          </HStack>
                          <Text color="rgba(255,255,255,0.7)" fontWeight="600" fontSize="lg">
                            (4.8/5) • 127 Premium Reviews
                          </Text>
                        </HStack>
                      </MotionBox>
                    </VStack>
                  </Box>

                  {/* Key Features */}
                  <Box 
                    bg={cardBg}
                    backdropFilter="blur(30px)"
                    boxShadow="0 20px 40px rgba(0,0,0,0.3)"
                    borderRadius="3xl" 
                    p={12}
                    border="1px solid rgba(255,255,255,0.1)"
                    position="relative"
                    overflow="hidden"
                  >
                    {/* Elegant background accent */}
                    <Box
                      position="absolute"
                      bottom="-30%"
                      left="-30%"
                      w="150px"
                      h="150px"
                      borderRadius="full"
                      bg={gradients.accentRadialSoft}
                      opacity="0.08"
                      filter="blur(30px)"
                    />
                    
                    <VStack spacing={8} align="stretch" position="relative" zIndex={1}>
                      <MotionHeading 
                        fontSize="3xl" 
                        fontWeight="800" 
                        color="white"
                        bgGradient={gradients.accentText}
                        bgClip="text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                      >
                        <Icon as={FaCrown} mr={3} color={colors.accentTint} />
                        Why Choose This Premium Product?
                      </MotionHeading>
                      
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                        {[
                          { icon: FaAward, text: 'Premium Quality', desc: 'Top-grade materials & craftsmanship', color: colors.accentTint },
                          { icon: FaShieldAlt, text: 'Durable Design', desc: 'Long-lasting performance', color: colors.accentSoft },
                          { icon: FaTools, text: 'Easy Installation', desc: 'Simple setup process', color: colors.accent },
                          { icon: FaMagic, text: 'Modern Elegance', desc: 'Contemporary luxury style', color: colors.accentStrong }
                        ].map((feature, index) => (
                          <MotionBox
                            key={index}
                            p={8}
                            bg="rgba(255,255,255,0.05)"
                            backdropFilter="blur(20px)"
                            borderRadius="2xl"
                            border="1px solid"
                            borderColor="rgba(255,255,255,0.1)"
                            _hover={{
                              bg: "rgba(255,255,255,0.08)",
                              borderColor: feature.color,
                              transform: "translateY(-8px)",
                              boxShadow: "0 15px 30px rgba(0,0,0,0.2)"
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                          >
                            <HStack spacing={6} align="start">
                              <Box
                                p={4}
                                bg={`linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`}
                                borderRadius="2xl"
                                color={feature.color}
                                boxShadow={shadows.accentSoft}
                              >
                                <Icon as={feature.icon} boxSize={8} />
                              </Box>
                              <VStack align="start" spacing={2}>
                                <Text color={colors.dark} fontWeight="800" fontSize="xl">
                                  {feature.text}
                                </Text>
                                <Text color={colors.grayText} fontSize="md" fontWeight="500">
                                  {feature.desc}
                                </Text>
                              </VStack>
                            </HStack>
                          </MotionBox>
                        ))}
                      </SimpleGrid>
                    </VStack>
                  </Box>

                  {/* Contact Section */}
                  <Box 
                    bg={cardBg}
                    backdropFilter="blur(30px)"
                    boxShadow="0 20px 40px rgba(0,0,0,0.3)"
                    borderRadius="3xl" 
                    p={12}
                    border="1px solid rgba(255,255,255,0.1)"
                    position="relative"
                    overflow="hidden"
                  >
                    {/* Elegant background accent */}
                    <Box
                      position="absolute"
                      top="-20%"
                      right="-20%"
                      w="180px"
                      h="180px"
                      borderRadius="full"
                      bg={gradients.accentRadialSoft}
                      opacity="0.1"
                      filter="blur(40px)"
                    />
                    
                    <VStack spacing={8} align="stretch" position="relative" zIndex={1}>
                      <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.8 }}
                      >
                        <VStack spacing={4} align="start">
                          <Heading 
                            fontSize="3xl" 
                            fontWeight="800" 
                            color="white"
                            bgGradient={gradients.accentText}
                            bgClip="text"
                          >
                            <Icon as={FaGem} mr={3} color={colors.accentTint} />
                            Get Premium Consultation
                          </Heading>
                          <Text 
                            color={colors.grayText} 
                            fontSize="xl" 
                            fontWeight="500"
                            lineHeight="1.6"
                          >
                            Contact our experts for detailed information, pricing, and personalized recommendations.
                          </Text>
                        </VStack>
                      </MotionBox>

                      {/* Premium Contact Buttons */}
                      <VStack spacing={6}>
                        <MotionBox
                          w="100%"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 2.0 }}
                        >
                          <Button
                            w="100%"
                            bg={gradients.accentLinear}
                            color="white"
                            leftIcon={<FaWhatsapp />}
                            size="xl"
                            fontWeight="800"
                            borderRadius="2xl"
                            py={8}
                            fontSize="lg"
                            boxShadow={shadows.accentMedium}
                            _hover={{ 
                              transform: "translateY(-4px)",
                              boxShadow: shadows.accentStrong
                            }}
                            onClick={() => handleContactClick('whatsapp')}
                            transition="all 0.4s ease"
                          >
                            Contact via WhatsApp
                          </Button>
                        </MotionBox>

                        <MotionBox
                          w="100%"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 2.2 }}
                        >
                          <Button
                            w="100%"
                            bg={gradients.accentLinearAlt}
                            color="white"
                            leftIcon={<FaPhone />}
                            size="xl"
                            fontWeight="800"
                            borderRadius="2xl"
                            py={8}
                            fontSize="lg"
                            boxShadow={shadows.accentMedium}
                            _hover={{ 
                              transform: "translateY(-4px)",
                              boxShadow: shadows.accentStrong
                            }}
                            onClick={() => handleContactClick('phone')}
                            transition="all 0.4s ease"
                          >
                            Call Our Experts
                          </Button>
                        </MotionBox>

                        <MotionBox
                          w="100%"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 2.4 }}
                        >
                          <Button
                            w="100%"
                            bg={gradients.ctaPill}
                            color="white"
                            leftIcon={<FaEnvelope />}
                            size="xl"
                            fontWeight="800"
                            borderRadius="2xl"
                            py={8}
                            fontSize="lg"
                            boxShadow={shadows.accentMedium}
                            _hover={{ 
                              transform: "translateY(-4px)",
                              boxShadow: shadows.accentStrong
                            }}
                            onClick={() => handleContactClick('email')}
                            transition="all 0.4s ease"
                          >
                            Send Detailed Inquiry
                          </Button>
                        </MotionBox>
                      </VStack>

                      <Box 
                        w="100%" 
                        h="1px" 
                        bg="rgba(255,255,255,0.3)" 
                        my={6}
                      />

                      {/* Premium Contact Information */}
                      <MotionBox
                        bg="rgba(255,255,255,0.05)"
                        backdropFilter="blur(20px)"
                        p={8}
                        borderRadius="2xl"
                        border="1px solid rgba(255,255,255,0.1)"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 2.6 }}
                      >
                        <VStack spacing={6}>
                          <Text fontSize="xl" fontWeight="800" color={colors.dark}>
                            <Icon as={FaCheckCircle} mr={2} color={colors.accentTint} />
                            Premium Contact Information
                          </Text>
                          <VStack spacing={4} w="100%">
                            <HStack
                              p={6}
                              bg="rgba(255,255,255,0.03)"
                              borderRadius="2xl"
                              w="100%"
                              border="1px solid rgba(255,255,255,0.1)"
                              _hover={{ 
                                borderColor: colors.accentTint,
                                transform: "translateY(-2px)",
                                boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                              }}
                              transition="all 0.3s ease"
                            >
                              <Icon as={FaMapMarkerAlt} color={colors.accentTint} boxSize={6} />
                              <Text color={colors.dark} fontWeight="700" fontSize="lg">
                                R Diamond Bathroom Fittings, Delhi
                              </Text>
                            </HStack>
                            <HStack
                              p={6}
                              bg="rgba(255,255,255,0.03)"
                              borderRadius="2xl"
                              w="100%"
                              border="1px solid rgba(255,255,255,0.1)"
                              _hover={{ 
                                borderColor: colors.accentSoft,
                                transform: "translateY(-2px)",
                                boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                              }}
                              transition="all 0.3s ease"
                            >
                              <Icon as={FaPhone} color={colors.accentSoft} boxSize={6} />
                              <Text color="white" fontWeight="700" fontSize="lg">
                                +91 98765 43210
                              </Text>
                            </HStack>
                            <HStack
                              p={6}
                              bg="rgba(255,255,255,0.03)"
                              borderRadius="2xl"
                              w="100%"
                              border="1px solid rgba(255,255,255,0.1)"
                              _hover={{ 
                                borderColor: colors.accent,
                                transform: "translateY(-2px)",
                                boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                              }}
                              transition="all 0.3s ease"
                            >
                              <Icon as={FaEnvelope} color={colors.accent} boxSize={6} />
                              <Text color="white" fontWeight="700" fontSize="lg">
                                rdiamond2423@gmail.com
                              </Text>
                            </HStack>
                          </VStack>
                        </VStack>
                      </MotionBox>
                    </VStack>
                  </Box>
                </VStack>
              </MotionBox>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;