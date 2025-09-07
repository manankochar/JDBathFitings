import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Button,
  VStack,
  HStack,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { Input, Textarea } from '@chakra-ui/react';
import { createToaster } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import ImagePlaceholder from './ImagePlaceholder';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const Contact = () => {
  const toast = createToaster();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    toast.show({
      title: 'Form submitted',
      description: 'We\'ve received your message and will get back to you soon!',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top'
    });
  };

  return (
    <Box 
      py={{ base: 20, md: 28 }} 
      bg="linear-gradient(135deg, #1e293b 0%, #475569 50%, #64748b 100%)"
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
        backgroundImage={`
          radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 70% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)
        `}
      />
      
      {/* Floating geometric shapes */}
      <Box position="absolute" top="15%" right="10%" w="100px" h="100px" opacity={0.1}>
        <Box
          w="100%"
          h="100%"
          borderRadius="50%"
          bg="rgba(255,255,255,0.3)"
          animation="float 6s ease-in-out infinite"
        />
      </Box>
      
      <Box position="absolute" bottom="20%" left="15%" w="80px" h="80px" opacity={0.1}>
        <Box
          w="100%"
          h="100%"
          borderRadius="30% 70% 70% 30% / 30% 30% 70% 70%"
          bg="rgba(255,255,255,0.3)"
          animation="float 8s ease-in-out infinite reverse"
        />
      </Box>
      
      <Container maxW="container.xl" position="relative" zIndex={2}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={20}>
          {/* Contact Information */}
          <MotionBox
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <VStack align="flex-start" spacing={10}>
              <Box>
                <MotionText
                  color="rgba(255,255,255,0.9)"
                  fontWeight="700"
                  fontSize="sm"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  mb={4}
                >
                  Get In Touch
                </MotionText>
                
                <MotionHeading
                  as="h2"
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  fontWeight="900"
                  lineHeight="1.2"
                  mt={2}
                  mb={6}
                  color="white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Let's Discuss Your{" "}
                  <Text 
                    as="span" 
                    bgGradient="linear(45deg, #fbbf24, #f59e0b)"
                    bgClip="text"
                  >
                    Bathroom Dreams
                  </Text>
                </MotionHeading>
                
                <MotionText
                  color="rgba(255,255,255,0.8)"
                  fontSize="lg"
                  mb={10}
                  lineHeight="1.7"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Have questions about our products or services? Need a custom solution for your bathroom?
                  Our team is ready to assist you with expert advice and personalized recommendations.
                </MotionText>
              </Box>
              
              {/* Enhanced Contact Details */}
              <VStack spacing={6} align="flex-start" w="full">
                {[
                  {
                    icon: FaMapMarkerAlt,
                    title: "Our Location",
                    info: "Chawri Bazar, Delhi, India",
                    gradient: "linear(135deg, #f093fb, #f5576c)"
                  },
                  {
                    icon: FaPhone,
                    title: "Call Us",
                    info: "+91-8527161330 | +91-8826455039",
                    gradient: "linear(135deg, #4facfe, #00f2fe)"
                  },
                  {
                    icon: FaEnvelope,
                    title: "Email Us",
                    info: "jd95royal@gmail.com",
                    gradient: "linear(135deg, #43e97b, #38f9d7)"
                  }
                ].map((contact, index) => (
                  <MotionBox
                    key={contact.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    w="full"
                  >
                    <HStack 
                      spacing={4} 
                      p={4}
                      bg="rgba(255,255,255,0.1)"
                      backdropFilter="blur(10px)"
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="rgba(255,255,255,0.2)"
                      _hover={{
                        bg: "rgba(255,255,255,0.15)",
                        transform: "translateX(10px)",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                      }}
                      transition="all 0.3s ease"
                    >
                      <Flex
                        w="60px"
                        h="60px"
                        bgGradient={contact.gradient}
                        borderRadius="xl"
                        align="center"
                        justify="center"
                        color="white"
                        boxShadow="0 8px 25px rgba(0,0,0,0.15)"
                        flexShrink={0}
                      >
                        <Icon as={contact.icon} boxSize={7} />
                      </Flex>
                      <Box>
                        <Text fontWeight="bold" fontSize="lg" color="white" mb={1}>
                          {contact.title}
                        </Text>
                        <Text color="rgba(255,255,255,0.8)" fontWeight="500">
                          {contact.info}
                        </Text>
                      </Box>
                    </HStack>
                  </MotionBox>
                ))}
              </VStack>
              
              {/* Enhanced Business Hours */}
              <MotionBox
                w="full"
                mt={8}
                p={6}
                bg="rgba(255,255,255,0.1)"
                backdropFilter="blur(10px)"
                borderRadius="xl"
                border="1px solid"
                borderColor="rgba(255,255,255,0.2)"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <Text fontWeight="bold" fontSize="lg" mb={6} color="white">
                  Business Hours
                </Text>
                <VStack spacing={4} align="stretch">
                  {[
                    { days: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
                    { days: "Saturday", hours: "10:00 AM - 4:00 PM" },
                    { days: "Sunday", hours: "Closed" }
                  ].map((schedule, index) => (
                    <Flex key={schedule.days} justify="space-between" align="center">
                      <Text fontWeight="600" color="white">{schedule.days}</Text>
                      <Text color="rgba(255,255,255,0.8)" fontWeight="500">{schedule.hours}</Text>
                    </Flex>
                  ))}
                </VStack>
              </MotionBox>
            </VStack>
          </MotionBox>
          
          {/* Enhanced Contact Form */}
          <MotionBox
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box
              p={8}
              borderRadius="2xl"
              bg="rgba(255,255,255,0.95)"
              backdropFilter="blur(20px)"
              border="1px solid"
              borderColor="rgba(255,255,255,0.3)"
              boxShadow="0 25px 50px rgba(0,0,0,0.15)"
            >
              <Heading as="h3" size="xl" mb={2} color="gray.800" fontWeight="900">
                Send Us a Message
              </Heading>
              <Text color="gray.600" mb={8}>
                Fill out the form below and we'll get back to you within 24 hours.
              </Text>
              
              <form onSubmit={handleSubmit}>
                <VStack spacing={6}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                    <Box>
                      <Text mb={3} fontWeight="700" color="gray.700">First Name *</Text>
                      <Input 
                        placeholder="Your first name" 
                        bg="white"
                        border="2px solid"
                        borderColor="gray.200"
                        borderRadius="xl"
                        h="56px"
                        _hover={{ borderColor: '#64748b' }}
                        _focus={{ 
                          borderColor: '#64748b', 
                          boxShadow: '0 0 0 3px rgba(100,116,139,0.1)' 
                        }}
                        _placeholder={{ color: 'gray.400' }}
                        transition="all 0.3s ease"
                        required
                      />
                    </Box>
                    
                    <Box>
                      <Text mb={3} fontWeight="700" color="gray.700">Last Name *</Text>
                      <Input 
                        placeholder="Your last name" 
                        bg="white"
                        border="2px solid"
                        borderColor="gray.200"
                        borderRadius="xl"
                        h="56px"
                        _hover={{ borderColor: '#64748b' }}
                        _focus={{ 
                          borderColor: '#64748b', 
                          boxShadow: '0 0 0 3px rgba(100,116,139,0.1)' 
                        }}
                        _placeholder={{ color: 'gray.400' }}
                        transition="all 0.3s ease"
                        required
                      />
                    </Box>
                  </SimpleGrid>
                  
                  <Box w="full">
                    <Text mb={3} fontWeight="700" color="gray.700">Email *</Text>
                    <Input 
                      type="email" 
                      placeholder="your.email@example.com" 
                      bg="white"
                      border="2px solid"
                      borderColor="gray.200"
                      borderRadius="xl"
                      h="56px"
                      _hover={{ borderColor: '#64748b' }}
                      _focus={{ 
                        borderColor: '#64748b', 
                        boxShadow: '0 0 0 3px rgba(100,116,139,0.1)' 
                      }}
                      _placeholder={{ color: 'gray.400' }}
                      transition="all 0.3s ease"
                      required
                    />
                  </Box>
                  
                  <Box w="full">
                    <Text mb={3} fontWeight="700" color="gray.700">Phone *</Text>
                    <Input 
                      placeholder="+91 98765 43210" 
                      bg="white"
                      border="2px solid"
                      borderColor="gray.200"
                      borderRadius="xl"
                      h="56px"
                      _hover={{ borderColor: '#64748b' }}
                      _focus={{ 
                        borderColor: '#64748b', 
                        boxShadow: '0 0 0 3px rgba(100,116,139,0.1)' 
                      }}
                      _placeholder={{ color: 'gray.400' }}
                      transition="all 0.3s ease"
                      required
                    />
                  </Box>
                  
                  <Box w="full">
                    <Text mb={3} fontWeight="700" color="gray.700">Message *</Text>
                    <Textarea 
                      placeholder="Tell us about your bathroom requirements, budget, timeline, or any specific questions you have..." 
                      rows={6}
                      bg="white"
                      border="2px solid"
                      borderColor="gray.200"
                      borderRadius="xl"
                      resize="vertical"
                      _hover={{ borderColor: '#64748b' }}
                      _focus={{ 
                        borderColor: '#64748b', 
                        boxShadow: '0 0 0 3px rgba(100,116,139,0.1)' 
                      }}
                      _placeholder={{ color: 'gray.400' }}
                      transition="all 0.3s ease"
                      required
                    />
                  </Box>
                  
                  <Button
                    type="submit"
                    w="full"
                    h="56px"
                    bg="linear-gradient(135deg, #64748b, #1e293b)"
                    color="white"
                    fontSize="lg"
                    fontWeight="700"
                    borderRadius="xl"
                    rightIcon={<Icon as={FaPaperPlane} />}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 15px 35px rgba(100,116,139,0.4)"
                    }}
                    transition="all 0.3s ease"
                    mt={4}
                  >
                    Send Message
                  </Button>
                </VStack>
              </form>
            </Box>
          </MotionBox>
        </SimpleGrid>
      </Container>
      
      {/* Enhanced animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(180deg);
          }
        }
      `}</style>
    </Box>
  );
};

export default Contact;