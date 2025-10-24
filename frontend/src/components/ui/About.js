import React from 'react';
import { colors } from '../../theme/colors';
import { Box, Container, Heading, Text, SimpleGrid, Stack, VStack, Badge, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
// icons removed (using emoji icons in data)
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
      bg={`linear-gradient(135deg, #ffffff 0%, ${colors.accent}0A 15%, #f8fafc 25%, ${colors.accent}14 35%, #e2e8f0 100%)`}
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
          radial-gradient(circle at 75% 75%, ${colors.accent}14 0%, transparent 50%),
          radial-gradient(circle at 50% 10%, ${colors.accent}0D 0%, transparent 40%),
          radial-gradient(circle at 10% 80%, ${colors.accent}0F 0%, transparent 45%)
        `}
        opacity={0.7}
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
          bg={`linear-gradient(45deg, ${colors.accent}, #64748b)`}
          animation="float 8s ease-in-out infinite reverse"
        />
      </Box>

      {/* Additional Yellow Accent Shapes */}
      <Box position="absolute" top="30%" left="5%" w="60px" h="60px" opacity={0.08}>
        <Box
          w="100%"
          h="100%"
          borderRadius="40% 60% 60% 40% / 60% 40% 60% 40%"
          bg={`linear-gradient(45deg, ${colors.accent}22, ${colors.accent})`}
          animation="float 10s ease-in-out infinite"
        />
      </Box>

      <Box position="absolute" bottom="40%" right="5%" w="70px" h="70px" opacity={0.06}>
        <Box
          w="100%"
          h="100%"
          borderRadius="50%"
          bg={`linear-gradient(45deg, ${colors.accent}18, ${colors.accent})`}
          animation="float 7s ease-in-out infinite reverse"
        />
      </Box>
      
      <Container maxW="container.xl" position="relative" zIndex={2} px={{ base: 4, sm: 6, md: 8, lg: 10, xl: 12 }} className="container-responsive">
        <Stack spacing={{ base: 16, sm: 20, md: 24, lg: 32 }} className="about-content-responsive">
          {/* Enhanced Section Header */}
          <MotionStack
            spacing={{ base: 8, md: 12 }}
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
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
              fontWeight="900"
              color="gray.800"
              lineHeight="1.1"
              letterSpacing="-0.02em"
              fontFamily="Inter"
              px={{ base: 2, md: 0 }}
              wordBreak="break-word"
            >
              <Text as="span" display="block" mb={3}>
                A Reputed Name in
              </Text>
              <Text 
                as="span" 
                bgGradient={`linear(45deg, #64748b, #1e293b, ${colors.accent})`}
                position="relative"
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  w: { base: '120px', sm: '150px', md: '180px' },
                  h: { base: '3px', md: '4px' },
                  bg: `linear-gradient(90deg, #64748b, #1e293b, ${colors.accent})`,
                  borderRadius: '2px'
                }}
              >
                Sanitaryware Industry
              </Text>
            </Heading>
            
            <MotionText
              fontSize={{ base: "md", sm: "lg", md: "xl" }}
              color="gray.600"
              maxW="800px"
              mx="auto"
              lineHeight="1.8"
              fontWeight="400"
              px={{ base: 2, md: 0 }}
              wordBreak="break-word"
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
            <SimpleGrid 
              columns={{ base: 2, sm: 2, md: 4 }} 
              spacing={{ base: 3, sm: 4, md: 6, lg: 8 }} 
              px={{ base: 2, sm: 3, md: 0 }}
              className="stats-grid-responsive"
            >
              {stats.map((stat, index) => (
                <MotionBox
             marginX="1rem"

                  key={index}
                  textAlign="center"
                  p={{ base: 3, sm: 4, md: 6, lg: 8 }}
                  bg="rgba(255,255,255,0.8)"
                  backdropFilter="blur(10px)"
                  borderRadius={{ base: "xl", md: "2xl" }}
                  border="1px solid"
                  borderColor="rgba(100,116,139,0.1)"
                  className="stat-card-responsive"
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
                    bg="rgba(100, 116, 139, 0.08)"
                    border="2px solid"
                    borderColor="rgba(100, 116, 139, 0.15)"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    mb={4}
                    w={{ base: "50px", sm: "55px", md: "60px" }}
                    h={{ base: "50px", sm: "55px", md: "60px" }}
                    _hover={{
                      bg: "rgba(100, 116, 139, 0.12)",
                      borderColor: "rgba(100, 116, 139, 0.25)"
                    }}
                  >
                    <Text fontSize={{ base: "lg", sm: "xl", md: "2xl" }} opacity={0.8}>{stat.icon}</Text>
                  </Box>
                  <Text fontSize={{ base: "xl", sm: "2xl", md: "2xl" }} fontWeight="900" color="gray.800" mb={1}>
                    {stat.number}
                  </Text>
                  <Text fontSize={{ base: "xs", sm: "sm", md: "sm" }} color="gray.600" fontWeight="600">
                    {stat.label}
                  </Text>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionBox>

          {/* Enhanced Features Grid */}
          <SimpleGrid 
            columns={{ base: 1, md: 2 }} 
            spacing={{ base: 4, sm: 6, md: 8, lg: 12 }} 
            px={{ base: 3, sm: 4, md: 0 }}
            className="features-grid-responsive"
          >
            {features.map((feature, index) => (
              <MotionBox
             margin="1rem"

                key={index}
                p={{ base: 4, sm: 5, md: 6, lg: 8 }}
                bg="rgba(255,255,255,0.9)"
                backdropFilter="blur(20px)"
                borderRadius={{ base: "xl", md: "2xl" }}
                border="1px solid"
                borderColor="rgba(255,255,255,0.3)"
                boxShadow="0 8px 32px rgba(0,0,0,0.1)"
                textAlign="center"
                position="relative"
                overflow="hidden"
                className="feature-card-responsive"
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
                <VStack spacing={{ base: 6, md: 8 }} position="relative" zIndex={2}>
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
                    bg="rgba(100, 116, 139, 0.1)"
                    color="#64748b"
                    border="1px solid"
                    borderColor="rgba(100, 116, 139, 0.2)"
                    px={4}
                    py={2}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing="0.5px"
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
                  content: '"“"',
                  position: 'absolute',
                  left: '-30px',
                  top: '-10px',
                  fontSize: '4xl',
                  color: '#64748b',
                  opacity: 0.3
                }}
                _after={{
                  content: '"”"',
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
      
      {/* Enhanced animations and responsive styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
          .about-content-responsive {
            gap: 48px !important;
          }
          
          .stats-grid-responsive {
            gap: 12px !important;
          }
          
          .stat-card-responsive {
            min-height: 140px !important;
            padding: 12px !important;
          }
          
          .features-grid-responsive {
            gap: 20px !important;
          }
          
          .feature-card-responsive {
            min-height: 250px !important;
          }
        }
        
        @media (max-width: 480px) {
          .about-content-responsive {
            gap: 32px !important;
          }
          
          .stats-grid-responsive {
            gap: 8px !important;
            grid-template-columns: 1fr 1fr !important;
          }
          
          .stat-card-responsive {
            min-height: 120px !important;
            padding: 8px !important;
          }
          
          .features-grid-responsive {
            gap: 16px !important;
            grid-template-columns: 1fr !important;
          }
          
          .feature-card-responsive {
            min-height: 220px !important;
            padding: 16px !important;
          }
        }
        
        @media (max-width: 320px) {
          .about-content-responsive {
            gap: 24px !important;
          }
          
          .stat-card-responsive {
            min-height: 100px !important;
            padding: 6px !important;
          }
          
          .feature-card-responsive {
            min-height: 200px !important;
            padding: 12px !important;
          }
        }
      `}</style>
    </Box>
  );
};

export default About;