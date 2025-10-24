import React, { useState } from 'react';
import { colors, gradients } from '../../theme/colors';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Button,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { Input, Textarea } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import OpenStreetMap from './GoogleMap';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', website: '' });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState({ ok: false, msg: '' });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setResult({ ok: false, msg: '' });
    if (!form.name || !form.email || !form.message) {
      setResult({ ok: false, msg: 'Please fill in your name, email, and message.' });
      return;
    }
    try {
      setSubmitting(true);
      const body = new URLSearchParams(form).toString();
      const API_BASE = (process.env.REACT_APP_API_BASE || '').replace(/\/$/, '');
      const endpoint = `${API_BASE}/api/contact.php`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      const data = await res.json();
      if (data.success) {
        setResult({ ok: true, msg: 'Thanks! We will reach out shortly.' });
        setForm({ name: '', email: '', subject: '', message: '', website: '' });
      } else {
        setResult({ ok: false, msg: data.message || 'Something went wrong.' });
      }
    } catch (err) {
      setResult({ ok: false, msg: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <Box
        minH="100vh"
        bg="linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)"
        position="relative"
        overflow="hidden"
        paddingTop="3rem"
      >
        {/* Enhanced Background Elements */}
        <Box position="absolute" top="5%" left="5%" w={{ base: "150px", md: "300px" }} h={{ base: "150px", md: "300px" }} opacity={0.05}>
          <Box
            w="100%"
            h="100%"
            borderRadius="50%"
            bg={gradients.accentLinear}
            animation="float 8s ease-in-out infinite"
          />
        </Box>
        
        <Box position="absolute" top="15%" right="10%" w={{ base: "75px", md: "150px" }} h={{ base: "75px", md: "150px" }} opacity={0.08}>
          <Box
            w="100%"
            h="100%"
            borderRadius="30% 70% 70% 30% / 30% 30% 70% 70%"
            bg="linear-gradient(45deg, #3b82f6, #1d4ed8)"
            animation="float 10s ease-in-out infinite reverse"
          />
        </Box>
        
        <Box position="absolute" bottom="10%" right="15%" w={{ base: "100px", md: "200px" }} h={{ base: "100px", md: "200px" }} opacity={0.06}>
          <Box
            w="100%"
            h="100%"
            borderRadius="50%"
            bg="linear-gradient(45deg, #10b981, #059669)"
            animation="float 12s ease-in-out infinite"
          />
        </Box>
        
        <Box position="absolute" bottom="25%" left="20%" w={{ base: "50px", md: "100px" }} h={{ base: "50px", md: "100px" }} opacity={0.1}>
          <Box
            w="100%"
            h="100%"
            borderRadius="40% 60% 60% 40% / 60% 30% 70% 40%"
            bg={`linear-gradient(45deg, ${colors.accent}, ${colors.accentStrong})`}
            animation="float 7s ease-in-out infinite reverse"
          />
        </Box>
        
        <Container maxW="container.xl" position="relative" zIndex={2} px={{ base: 4, sm: 6, md: 8, lg: 10 }}>
          {/* Contact Information Section */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            mb={{ base: 8, md: 16 }}
          >
            <VStack align="center" spacing={{ base: 6, md: 10 }} textAlign="center">
              <Box maxW="800px" mb={{ base: 6, md: 0 }}>
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
                  fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
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
                  Let's Discuss Your {" "}
                  <Text 
                    as="span" 
                    bgGradient={`linear(45deg, ${colors.accent}, ${colors.accentStrong})`}
                  >
                    Bathroom Dreams
                  </Text>
                </MotionHeading>
                
                <MotionText
                  color="rgba(255,255,255,0.8)"
                  fontSize={{ base: "md", sm: "lg", md: "xl" }}
                  lineHeight="1.6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Have questions about our products or services? Need a custom solution for your bathroom? Our team is ready to assist you with expert advice and personalized recommendations.
                </MotionText>
              </Box>
              
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 3, md: 8 }} w="full" maxW="1000px" mb={{ base: 4, md: 0 }}>
                <MotionBox
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  w="full"
                  mb={{ base: 4, md: 0 }}
                >
                  <Box
                    marginX={{ base: "0", md: "1rem" }}
                    marginY={{ base: "0", md: "0" }}
                    p={{ base: 6, md: 8 }}
                    borderRadius="2xl"
                    bg="rgba(255,255,255,0.1)"
                    backdropFilter="blur(20px)"
                    border="1px solid"
                    borderColor="rgba(255,255,255,0.2)"
                    boxShadow="0 25px 50px rgba(0,0,0,0.2)"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: '0 35px 60px rgba(0,0,0,0.3)'
                    }}
                    h="full"
                  >
                    <VStack spacing={6} align="center" textAlign="center">
                      <Box
                        p={4}
                        borderRadius="xl"
                        bg={gradients.accentLinear}
                        boxShadow="0 8px 25px rgba(34,4,56,0.35)"
                      >
                        <Icon as={FaMapMarkerAlt} color="white" fontSize="32px" />
                      </Box>
                      <VStack spacing={2}>
                        <Text color="white" fontWeight="700" fontSize="lg">
                          Our Location
                        </Text>
                        <Text color="rgba(255,255,255,0.8)" fontSize="md">
                          Chawri Bazar, Delhi, India
                        </Text>
                      </VStack>
                    </VStack>
                  </Box>
                </MotionBox>
                
                <MotionBox
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  w="full"
                  mb={{ base: 4, md: 0 }}
                >
                  <Box
                    marginX={{ base: "0", md: "1rem" }}
                    marginY={{ base: "0", md: "0" }}
                    p={{ base: 6, md: 8 }}
                    borderRadius="2xl"
                    bg="rgba(255,255,255,0.1)"
                    backdropFilter="blur(20px)"
                    border="1px solid"
                    borderColor="rgba(255,255,255,0.2)"
                    boxShadow="0 25px 50px rgba(0,0,0,0.2)"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: '0 35px 60px rgba(0,0,0,0.3)'
                    }}
                    h="full"
                  >
                    <VStack spacing={6} align="center" textAlign="center">
                      <Box
                       marginX="1rem"
                        p={4}
                        borderRadius="xl"
                        bg="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                        boxShadow="0 8px 25px rgba(59, 130, 246, 0.3)"
                      >
                        <Icon as={FaPhone} color="white" fontSize="32px" />
                      </Box>
                      <VStack spacing={2}>
                        <Text color="white" fontWeight="700" fontSize="lg">
                          Call Us
                        </Text>
                        <Text color="rgba(255,255,255,0.8)" fontSize="md">
                          +91-8527161330
                        </Text>
                        <Text color="rgba(255,255,255,0.8)" fontSize="md">
                          +91-8826455039
                        </Text>
                      </VStack>
                    </VStack>
                  </Box>
                </MotionBox>
                
                <MotionBox
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                  w="full"
                  mb={{ base: 4, md: 0 }}
                >
                  <Box
                    marginX={{ base: "0", md: "1rem" }}
                    marginY={{ base: "0", md: "0" }}
                    p={{ base: 6, md: 8 }}
                    borderRadius="2xl"
                    bg="rgba(255,255,255,0.1)"
                    backdropFilter="blur(20px)"
                    border="1px solid"
                    borderColor="rgba(255,255,255,0.2)"
                    boxShadow="0 25px 50px rgba(0,0,0,0.2)"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: '0 35px 60px rgba(0,0,0,0.3)'
                    }}
                    h="full"
                  >
                    <VStack spacing={6} align="center" textAlign="center">
                      <Box
                      
                        p={4}
                        borderRadius="xl"
                        bg="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                        boxShadow="0 8px 25px rgba(16, 185, 129, 0.3)"
                      >
                        <Icon as={FaEnvelope} color="white" fontSize="32px" />
                      </Box>
                      <VStack spacing={2}>
                        <Text color="white" fontWeight="700" fontSize="lg">
                          Email Us
                        </Text>
                        <Text color="rgba(255,255,255,0.8)" fontSize="md">
                          rdiamond2423@gmail.com
                        </Text>
                      </VStack>
                    </VStack>
                  </Box>
                </MotionBox>
              </SimpleGrid>
            </VStack>
          </MotionBox>

          {/* Full Width Enhanced Map Section */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            mb={{ base: 6, md: 12 }}
             marginX={{ base: "0.5rem", md: "2rem" }}
          >
            {/* Enhanced Map Container */}
            <Box
              w="100%"
              borderRadius="3xl"
              overflow="hidden"
              boxShadow="0 30px 60px rgba(0,0,0,0.2)"
              border="3px solid"
              borderColor="rgba(251, 191, 36, 0.3)"
              bg="white"
            >
              {/* Map Header */}
              <Box
                bg="linear-gradient(135deg, #1e293b 0%, #475569 100%)"
                p={{ base: 4, md: 8 }}
                textAlign="center"
              >
                <Heading as="h3" size="xl" mb={4} color="white" fontWeight="800">
                  Find Us Here
                </Heading>
                <Text color="rgba(255,255,255,0.9)" mb={2} fontSize="lg">
                  Visit our showroom in the heart of Delhi's Chawri Bazar
                </Text>
                <Text color="rgba(255,255,255,0.7)" fontSize="sm" fontStyle="italic">
                  Shop No. 3615, Bazar Sita Ram, Chawri Bazar, Chandni Chowk, Delhi - 110006
                </Text>
              </Box>
              
              {/* Interactive OpenStreetMap */}
              <OpenStreetMap
                center={{ lat: 28.6482, lng: 77.2270 }}
                zoom={20}
                height={{ base: "200px", sm: "250px", md: "300px", lg: "350px" }}
                markerTitle="R Diamond Bathroom Fittings"
                markerAddress="Shop No. 3615, Bazar Sita Ram, Chawri Bazar, Chandni Chowk, Delhi - 110006"
              />
              
              {/* Map Footer */}
              <Box
                bg="gray.50"
                p={4}
                textAlign="center"
                borderTop="1px solid"
                borderColor="gray.200"
              >
                <Text fontSize="xs" color="gray.500">
                  Interactive OpenStreetMap - Click on the marker for more information
                </Text>
              </Box>
            </Box>
          </MotionBox>

          {/* Enhanced Contact Form Section */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            mt={{ base: 8, md: 0 }}
          >
            <Box
             margin={{ base: "1rem", md: "5rem" }}

              p={{ base: 4, md: 8 }}
              borderRadius="3xl"
              bg="rgba(255,255,255,0.98)"
              backdropFilter="blur(25px)"
              border="2px solid"
              borderColor="rgba(255,255,255,0.4)"
              boxShadow="0 30px 60px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.6)"
              textAlign="center"
              position="relative"
              overflow="hidden"
            >
              <Box
                position="absolute"
                top="-20%"
                right="-20%"
                w="40%"
                h="40%"
                bg="radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, transparent 70%)"
                borderRadius="50%"
              />
              <Box
                position="absolute"
                bottom="-30%"
                left="-30%"
                w="60%"
                h="60%"
                bg="radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)"
                borderRadius="50%"
              />
              <MotionText
                color="rgba(0,0,0,0.7)"
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
                Send Us a Message
              </MotionText>
              
              <MotionHeading
                as="h2"
                fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
                fontWeight="900"
                lineHeight="1.2"
                mt={2}
                mb={4}
                color="gray.800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Let's Discuss Your{" "}
                <Text 
                  as="span" 
                  bgGradient={`linear(45deg, ${colors.accent}, ${colors.accentStrong})`}
                >
                  Bathroom Dreams
                </Text>
              </MotionHeading>
              
              <MotionText
                color="gray.600"
                fontSize={{ base: "sm", md: "md" }}
                mb={6}
                lineHeight="1.6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Have questions about our products or services? Need a custom solution for your bathroom? Our team is ready to assist you with expert advice and personalized recommendations.
              </MotionText>
              
              {/* Contact Form */}
              <Box as="form" onSubmit={onSubmit} position="relative" zIndex={2}>
                <VStack spacing={{ base: 4, md: 6 }} align="stretch" maxW="600px" mx="auto">
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 3, md: 4 }}>
                    <Input
                      placeholder="Your Name"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      size={{ base: "md", md: "lg" }}
                      borderRadius="2xl"
                      border="2px solid"
                      borderColor="rgba(0,0,0,0.1)"
                      bg="rgba(255,255,255,0.9)"
                      _focus={{
                          borderColor: colors.accent,
                          boxShadow: `0 0 0 4px ${colors.accent}33`,
                          bg: "white"
                        }}
                        _hover={{
                          borderColor: `${colors.accent}55`
                        }}
                      transition="all 0.3s ease"
                    />
                    <Input
                      placeholder="Your Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      size={{ base: "md", md: "lg" }}
                      borderRadius="2xl"
                      border="2px solid"
                      borderColor="rgba(0,0,0,0.1)"
                      bg="rgba(255,255,255,0.9)"
                      _focus={{
                          borderColor: colors.accent,
                          boxShadow: `0 0 0 4px ${colors.accent}33`,
                          bg: "white"
                        }}
                        _hover={{
                          borderColor: `${colors.accent}55`
                        }}
                      transition="all 0.3s ease"
                    />
                  </SimpleGrid>
                  
                  <Input
                    placeholder="Moblie No."
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    size={{ base: "md", md: "lg" }}
                    borderRadius="2xl"
                    border="2px solid"
                    borderColor="rgba(0,0,0,0.1)"
                    bg="rgba(255,255,255,0.9)"
                    _focus={{
                      borderColor: colors.accent,
                      boxShadow: `0 0 0 4px ${colors.accent}33`,
                      bg: "white"
                    }}
                    _hover={{
                      borderColor: `${colors.accent}55`
                    }}
                    transition="all 0.3s ease"
                  />
                  
                  <Textarea
                    placeholder="Your Message"
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    size={{ base: "md", md: "lg" }}
                    borderRadius="2xl"
                    border="2px solid"
                    borderColor="rgba(0,0,0,0.1)"
                    bg="rgba(255,255,255,0.9)"
                    rows={5}
                    resize="vertical"
                    _focus={{
                      borderColor: colors.accent,
                      boxShadow: `0 0 0 4px ${colors.accent}33`,
                      bg: "white"
                    }}
                    _hover={{
                      borderColor: `${colors.accent}55`
                    }}
                    transition="all 0.3s ease"
                  />
                  {/* Honeypot field - invisible to users */}
                  <Input
                    name="website"
                    value={form.website}
                    onChange={onChange}
                    position="absolute"
                    left="-9999px"
                    top="-9999px"
                    aria-hidden="true"
                    tabIndex={-1}
                  />
                  
                  <Button
                    colorScheme="purple"
                    type="submit"
                    isLoading={submitting}
                    size={{ base: "md", md: "lg" }}
                    borderRadius="2xl"
                    leftIcon={<Icon as={FaPaperPlane} />}
                    bg={gradients.accentLinear}
                    _hover={{
                      transform: "translateY(-3px)",
                      boxShadow: '0 15px 35px rgba(34,4,56,0.45)'
                    }}
                    _active={{
                      transform: "translateY(-1px)"
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    fontWeight="800"
                    fontSize="lg"
                    py={7}
                    letterSpacing="wide"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                  {result.msg && (
                    <Text color={result.ok ? 'green.600' : 'red.600'} fontWeight="600">
                      {result.msg}
                    </Text>
                  )}
                </VStack>
              </Box>
            </Box>
          </MotionBox>
        </Container>
      </Box>
      
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(34,4,56, 0.6);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(34,4,56, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(34,4,56, 0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </>
  );
};

export default Contact;