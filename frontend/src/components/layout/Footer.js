import React from 'react';
import { colors } from '../../theme/colors';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Link,
  Heading,
  Input,
  Button,
  Icon,
  Image,
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import logoImage from '../../assets/logo.png';

const Footer = () => {
  return (
    <Box
      bg="#f5f5f5"
      color="gray.800"
      position="relative"
      overflow="hidden"
      zIndex="1"
    >
      <Container as={Stack} maxW={'container.xl'} py={12} px={{ base: 6, md: 8, lg: 12 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 8, md: 12 }} alignItems="flex-start">
          {/* Company Info Section */}
          <Stack spacing={6}>
            <Box>
              <Image src={logoImage} alt="JD Sanitaryware Logo" width="180px" mb={4} />
            </Box>
            <Text fontSize={'sm'} maxW="300px" lineHeight="1.8" color="gray.700" fontWeight="400">
              A reputed name in the plumbing, bathroom and sanitaryware industry, providing 
              excellent products that are cost effective and stay in good working condition 
              for the long run. Your trusted partner for quality bathroom solutions.
            </Text>
          </Stack>
          
          {/* Quick Links Section */}
          <Stack align={'flex-start'} spacing={5}>
            <Heading 
              as="h4" 
              size="md" 
              color="gray.900" 
              fontFamily="Inter" 
              fontWeight="600"
              fontSize="18px"
            >
              Quick Links
            </Heading>
            <Stack spacing={2.5}>
              <Link 
                as={RouterLink} 
                to="/" 
                color="gray.700"
                fontWeight="400"
                fontSize="15px"
                _hover={{ 
                  color: colors.accent,
                  textDecoration: 'none'
                }}
                transition="all 0.2s ease"
              >
                Home
              </Link>
              <Link 
                as={RouterLink} 
                to="/about" 
                color="gray.700"
                fontWeight="400"
                fontSize="15px"
                _hover={{ 
                  color: colors.accent,
                  textDecoration: 'none'
                }}
                transition="all 0.2s ease"
              >
                About Us
              </Link>
              <Link 
                as={RouterLink} 
                to="/products" 
                color="gray.700"
                fontWeight="400"
                fontSize="15px"
                _hover={{ 
                  color: colors.accent,
                  textDecoration: 'none'
                }}
                transition="all 0.2s ease"
              >
                Products
              </Link>
              <Link 
                as={RouterLink} 
                to="/contact" 
                color="gray.700"
                fontWeight="400"
                fontSize="15px"
                _hover={{ 
                  color: colors.accent,
                  textDecoration: 'none'
                }}
                transition="all 0.2s ease"
              >
                Contact
              </Link>
            </Stack>
          </Stack>
          
          {/* Contact Us Section */}
          <Stack align={'flex-start'} spacing={5}>
            <Heading 
              as="h4" 
              size="md" 
              color="gray.900" 
              fontFamily="Inter" 
              fontWeight="600"
              fontSize="18px"
            >
              Contact Us
            </Heading>
            <Stack spacing={3}>
              <Flex align="flex-start" color="gray.700">
                <Icon 
                  as={FaMapMarkerAlt} 
                  mr={3} 
                  mt={1}
                  color="gray.900" 
                  fontSize="md"
                />
                <Text fontWeight="400" fontSize="15px">Chawri Bazar, Delhi, India</Text>
              </Flex>
              <Flex align="center" color="gray.700">
                <Icon 
                  as={FaPhone} 
                  mr={3} 
                  color="gray.900" 
                  fontSize="md"
                />
                <Text fontWeight="400" fontSize="15px">+91-8527161330</Text>
              </Flex>
              <Flex align="center" color="gray.700">
                <Icon 
                  as={FaPhone} 
                  mr={3} 
                  color="gray.900" 
                  fontSize="md"
                />
                <Text fontWeight="400" fontSize="15px">+91-8826455039</Text>
              </Flex>
              <Flex align="center" color="gray.700">
                <Icon 
                  as={FaEnvelope} 
                  mr={3} 
                  color="gray.900" 
                  fontSize="md"
                />
                <Link 
                  href={'mailto:rdiamond2423@gmail.com'} 
                  color="gray.700"
                  fontWeight="400"
                  fontSize="15px"
                  _hover={{ 
                    color: colors.accent,
                    textDecoration: 'none'
                  }}
                  transition="all 0.2s ease"
                >
                  rdiamond2423@gmail.com
                </Link>
              </Flex>
            </Stack>
            
            {/* Stay Updated Section */}
            <Stack spacing={3} width="100%" pt={3}>
              <Heading 
                as="h5" 
                size="sm" 
                color="gray.900"
                fontFamily="Inter"
                fontWeight="600"
                fontSize="16px"
              >
                Stay Updated
              </Heading>
              <Stack spacing={2.5}>
                <Input
                  placeholder={'Enter your email'}
                  bg="white"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="md"
                  size="md"
                  fontWeight="400"
                  fontSize="14px"
                  _focus={{
                    borderColor: colors.accent,
                    boxShadow: 'none',
                  }}
                  _placeholder={{ color: 'gray.500' }}
                />
                <Button
                  bg="#2d1b4e"
                  color="white"
                  size="md"
                  w="full"
                  borderRadius="md"
                  fontWeight="600"
                  fontSize="14px"
                  _hover={{ 
                    bg: "#1e1333",
                    transform: 'none'
                  }}
                  transition="all 0.2s ease"
                >
                  Subscribe
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
      
      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={'gray.200'}
        bg="rgba(255, 255, 255, 0.8)"
        backdropFilter="blur(10px)"
      >
        <Container
          as={Stack}
          maxW={'container.xl'}
          py={6}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text 
            color="gray.600" 
            fontWeight="500"
            fontSize="sm"
          >
            © {new Date().getFullYear()} Jankidas Sanitaryware Pvt Ltd. All rights reserved
          </Text>
          <Stack direction={'row'} spacing={8}>
            <Link 
              href={'#'} 
              color="gray.600"
              fontWeight="500"
              fontSize="sm"
              _hover={{ 
                color: colors.accent,
                transform: 'translateY(-1px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            >
              Privacy Policy
            </Link>
            <Link 
              href={'#'} 
              color="gray.600"
              fontWeight="500"
              fontSize="sm"
              _hover={{ 
                color: colors.accent,
                transform: 'translateY(-1px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            >
              Terms of Use
            </Link>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;