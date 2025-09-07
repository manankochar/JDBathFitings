import React from 'react';
import { Box, Container, Heading, Text, SimpleGrid, Stack, Flex, Icon, HStack, VStack, Badge, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaAward, FaTools, FaHandshake, FaLeaf, FaStar, FaUsers, FaShoppingCart, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionStack = motion(Stack);

const About = () => {
  const features = [
    {
      icon: "🏆",
      title: "Premium Quality",
      description: "Excellent sanitarywares that are cost effective and stay in good working condition for the long run.",
      gradient: "linear(135deg, #f093fb, #f5576c)",
      stats: "15+ Years"
    },
    {
      icon: "🔧",
      title: "Expert Craftsmanship", 
      description: "Years of experience in the plumbing, bathroom and sanitaryware industry with proven expertise.",
      gradient: "linear(135deg, #4facfe, #00f2fe)",
      stats: "500+ Projects"
    },
    {
      icon: "🤝",
      title: "Customer First",
      description: "When our clients come with a specific budget, we provide the best quality products they find hard to choose from.",
      gradient: "linear(135deg, #43e97b, #38f9d7)",
      stats: "98% Satisfaction"
    },
    {
      icon: "🌿",
      title: "Sustainable Solutions",
      description: "Eco-friendly bathroom solutions that combine durability with environmental responsibility.",
      gradient: "linear(135deg, #fa709a, #fee140)",
      stats: "Eco-Friendly"
    }
  ];

  const stats = [
    { icon: "👥", number: "1000+", label: "Happy Customers" },
    { icon: "🛒", number: "150+", label: "Product Varieties" },
    { icon: "⭐", number: "4.8", label: "Average Rating" },
    { icon: "⏰", number: "15+", label: "Years Experience" }
  ];

  return (
    <Box 
      py={{ base: 20, md: 28 }} 
      bg="linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #e2e8f0 100%)"
      position="relative"
      overflow="hidden"
    >
      {/* Enhanced Background Elements */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundImage={`
          radial-gradient(circle at 25% 25%, rgba(100,116,139,0.05) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(251,191,36,0.05) 0%, transparent 50%)
        `}
        opacity={0.6}
      />
      
      {/* Floating geometric shapes */}
      <Box position="absolute" top="10%" left="10%" w="100px" h="100px" opacity={0.1}>
        <Box
          w="100%"
          h="100%"
          borderRadius="30% 70% 70% 30% / 30% 30% 70% 70%"
          bg="linear-gradient(45deg, #64748b, #1e293b)"
          animation="float 6s ease-in-out infinite"
        />
      </Box>
      
      <Box position="absolute" top="60%" right="15%" w="80px" h="80px" opacity={0.1}>
        <Box
          w="100%"
          h="100%"
          borderRadius="63% 37% 54% 46% / 55% 48% 52% 45%"
          bg="linear-gradient(45deg, #fbbf24, #64748b)"
          animation="float 8s ease-in-out infinite reverse"
        />
      </Box>
      
      <Container maxW="container.xl" position="relative" zIndex={2}>
        <Stack spacing={20}>
          {/* Enhanced Section Header */}
          <MotionStack
            spacing={8}
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
              alignSelf="center"
            >
              About Jankidas Sanitaryware
            </Badge>
            
            <Heading
              as="h2"
              fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
              fontWeight="900"
              color="gray.800"
              lineHeight="1.1"
              letterSpacing="-0.02em"
              fontFamily="Inter"
            >
              <Text as="span" display="block" mb={2}>
                A Reputed Name in
              </Text>
              <Text 
                as="span" 
                bgGradient="linear(45deg, #64748b, #1e293b, #fbbf24)"
                bgClip="text"
                position="relative"
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  w: '150px',
                  h: '4px',
                  bg: 'linear-gradient(90deg, #64748b, #1e293b, #fbbf24)',
                  borderRadius: '2px'
                }}
              >
                Sanitaryware Industry
              </Text>
            </Heading>
            
            <MotionText
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.600"
              maxW="800px"
              mx="auto"
              lineHeight="1.8"
              fontWeight="400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Located in the heart of Chawri Bazar, Delhi, we have built our reputation on providing 
              excellent sanitaryware products that are both cost-effective and built to last. Our commitment 
              to quality and customer satisfaction has made us a trusted partner for bathroom solutions.
            </MotionText>
          </MotionStack>

          {/* Stats Section */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
              {stats.map((stat, index) => (
                <MotionBox
                  key={index}
                  textAlign="center"
                  p={6}
                  bg="rgba(255,255,255,0.8)"
                  backdropFilter="blur(10px)"
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor="rgba(100,116,139,0.1)"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  _hover={{
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 40px rgba(100,116,139,0.15)',
                    borderColor: 'rgba(100,116,139,0.3)'
                  }}
                >
                  <Box
                    p={3}
                    borderRadius="xl"
                    bg="linear-gradient(135deg, #64748b, #1e293b)"
                    color="white"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    mb={4}
                    w="60px"
                    h="60px"
                  >
                    <Text fontSize="2xl">{stat.icon}</Text>
                  </Box>
                  <Text fontSize="2xl" fontWeight="900" color="gray.800" mb={1}>
                    {stat.number}
                  </Text>
                  <Text fontSize="sm" color="gray.600" fontWeight="600">
                    {stat.label}
                  </Text>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionBox>

          {/* Enhanced Features Grid */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {features.map((feature, index) => (
              <MotionBox
                key={index}
                p={8}
                bg="rgba(255,255,255,0.9)"
                backdropFilter="blur(20px)"
                borderRadius="2xl"
                border="1px solid"
                borderColor="rgba(255,255,255,0.3)"
                boxShadow="0 8px 32px rgba(0,0,0,0.1)"
                textAlign="center"
                position="relative"
                overflow="hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                _hover={{
                  transform: "translateY(-10px)",
                  boxShadow: "0 25px 50px rgba(100,116,139,0.2)"
                }}
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgGradient: feature.gradient,
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bg: 'rgba(255,255,255,0.9)',
                  zIndex: 1
                }}
                sx={{
                  '&:hover::before': {
                    opacity: 0.1
                  }
                }}
              >
                <VStack spacing={6} position="relative" zIndex={2}>
                  <Box
                    p={4}
                    borderRadius="2xl"
                    bgGradient={feature.gradient}
                    color="white"
                    boxShadow="0 10px 25px rgba(0,0,0,0.15)"
                    position="relative"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="80px"
                    h="80px"
                  >
                    <Text fontSize="3xl">{feature.icon}</Text>
                  </Box>
                  
                  <Badge
                    bgGradient={feature.gradient}
                    color="white"
                    px={4}
                    py={2}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="700"
                  >
                    {feature.stats}
                  </Badge>
                  
                  <Heading
                    as="h3"
                    fontSize="xl"
                    fontWeight="800"
                    color="gray.800"
                    fontFamily="Inter"
                  >
                    {feature.title}
                  </Heading>
                  
                  <Text
                    fontSize="md"
                    color="gray.600"
                    lineHeight="1.7"
                    fontWeight="400"
                  >
                    {feature.description}
                  </Text>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>

          {/* Enhanced Company Values */}
          <MotionBox
            p={{ base: 10, md: 16 }}
            bg="linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.9))"
            backdropFilter="blur(20px)"
            borderRadius="3xl"
            border="1px solid"
            borderColor="rgba(255,255,255,0.3)"
            boxShadow="0 25px 50px rgba(0,0,0,0.1)"
            textAlign="center"
            position="relative"
            overflow="hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Background pattern */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              backgroundImage={`url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2364748b" fill-opacity="0.05"%3E%3Cpath d="M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}
              opacity={0.3}
            />
            
            <VStack spacing={8} position="relative" zIndex={1}>
              <Badge
                bg="linear-gradient(135deg, #64748b, #1e293b)"
                color="white"
                px={6}
                py={3}
                borderRadius="full"
                fontSize="sm"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Our Mission
              </Badge>
              
              <Heading
                as="h3"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight="900"
                color="gray.800"
                fontFamily="Inter"
                lineHeight="1.2"
              >
                Our Long Standing Motto
              </Heading>
              
              <Text
                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                color="gray.700"
                lineHeight="1.8"
                maxW="700px"
                mx="auto"
                fontWeight="500"
                fontStyle="italic"
                position="relative"
                _before={{
                  content: '"\"\"\"',
                  position: 'absolute',
                  left: '-30px',
                  top: '-10px',
                  fontSize: '4xl',
                  color: '#64748b',
                  opacity: 0.3
                }}
                _after={{
                  content: '"\"\"\"',
                  position: 'absolute',
                  right: '-30px',
                  bottom: '-10px',
                  fontSize: '4xl',
                  color: '#64748b',
                  opacity: 0.3
                }}
              >
                To provide our esteemed patronage with excellent sanitarywares that are cost effective 
                and stay in good working condition in the long run.
              </Text>
              
              <Text
                fontSize="lg"
                color="gray.600"
                fontWeight="600"
              >
                — Jankidas Sanitaryware Pvt Ltd
              </Text>
              
              <Button
                as={Link}
                to="/contact"
                size="lg"
                bg="linear-gradient(135deg, #64748b, #1e293b)"
                color="white"
                px={8}
                py={6}
                borderRadius="xl"
                fontWeight="700"
                fontSize="md"
                _hover={{
                  transform: 'translateY(-3px)',
                  boxShadow: '0 20px 40px rgba(100,116,139,0.3)'
                }}
                transition="all 0.3s ease"
              >
                Get In Touch With Us
              </Button>
            </VStack>
          </MotionBox>
        </Stack>
      </Container>
      
      {/* Enhanced animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </Box>
  );
};

export default About;