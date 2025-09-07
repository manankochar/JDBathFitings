import React from 'react';
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
  useColorModeValue,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram, FaFacebook, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import logoImage from '../../assets/logo.png';

const Footer = () => {
  return (
    <Box
      bg="var(--white-primary)"
      color="gray.800"
      position="relative"
      overflow="hidden"
      zIndex="1"
      borderTop="1px solid"
      borderColor="gray.200"
    >
      {/* Futuristic background effects */}
      <Box
        position="absolute"
        top="-150px"
        left="-150px"
        width="400px"
        height="400px"
        borderRadius="full"
        bg="rgba(100, 116, 139, 0.06)"
        filter="blur(100px)"
        zIndex="-1"
      />
      <Box
        position="absolute"
        bottom="-150px"
        right="-150px"
        width="400px"
        height="400px"
        borderRadius="full"
        bg="rgba(251, 191, 36, 0.06)"
        filter="blur(100px)"
        zIndex="-1"
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="300px"
        height="300px"
        borderRadius="full"
        bg="rgba(30, 41, 59, 0.04)"
        filter="blur(80px)"
        zIndex="-1"
      />
      
      <Container as={Stack} maxW={'container.xl'} py={16} px={{ base: 6, md: 8, lg: 12 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={10}>
          <Stack spacing={8}>
            <Box>
              <Image src={logoImage} alt="JD Sanitaryware Logo" width="200px" />
            </Box>
            <Text fontSize={'md'} maxW="320px" lineHeight="1.7" color="gray.600" fontWeight="400">
              A reputed name in the plumbing, bathroom and sanitaryware industry, providing 
              excellent products that are cost effective and stay in good working condition 
              for the long run. Your trusted partner for quality bathroom solutions.
            </Text>
            <Stack direction={'row'} spacing={4}>
              <SocialButton label={'Twitter'} href={'#'}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'YouTube'} href={'#'}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'#'}>
                <FaInstagram />
              </SocialButton>
              <SocialButton label={'Facebook'} href={'#'}>
                <FaFacebook />
              </SocialButton>
            </Stack>
          </Stack>
          
          <Stack align={'flex-start'} spacing={6}>
            <Heading 
              as="h4" 
              size="md" 
              color="gray.700" 
              fontFamily="Inter" 
              fontWeight="700"
              letterSpacing="-0.01em"
            >
              Quick Links
            </Heading>
            <Stack spacing={3}>
              <Link 
                as={RouterLink} 
                to="/" 
                color="gray.600"
                fontWeight="500"
                _hover={{ 
                  color: '#64748b',
                  transform: 'translateX(4px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                Home
              </Link>
              <Link 
                as={RouterLink} 
                to="/about" 
                color="gray.600"
                fontWeight="500"
                _hover={{ 
                  color: '#64748b',
                  transform: 'translateX(4px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                About Us
              </Link>
              <Link 
                as={RouterLink} 
                to="/products" 
                color="gray.600"
                fontWeight="500"
                _hover={{ 
                  color: '#64748b',
                  transform: 'translateX(4px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                Products
              </Link>
              <Link 
                as={RouterLink} 
                to="/contact" 
                color="gray.600"
                fontWeight="500"
                _hover={{ 
                  color: '#64748b',
                  transform: 'translateX(4px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                Contact
              </Link>
            </Stack>
          </Stack>
          
          <Stack align={'flex-start'} spacing={6}>
            <Heading 
              as="h4" 
              size="md" 
              color="gray.700" 
              fontFamily="Inter" 
              fontWeight="700"
              letterSpacing="-0.01em"
            >
              Products
            </Heading>
            <Stack spacing={3}>
              <Link 
                href={'#'} 
                color="gray.600"
                fontWeight="500"
                _hover={{ 
                  color: '#64748b',
                  transform: 'translateX(4px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                Bathroom Fittings
              </Link>
              <Link 
                href={'#'} 
                color="gray.600"
                fontWeight="500"
                _hover={{ 
                  color: '#64748b',
                  transform: 'translateX(4px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                Sanitaryware Collection
              </Link>
              <Link 
                href={'#'} 
                color="gray.600"
                fontWeight="500"
                _hover={{ 
                  color: '#64748b',
                  transform: 'translateX(4px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                Toilet Collection
              </Link>
              <Link 
                href={'#'} 
                color="gray.600"
                fontWeight="500"
                _hover={{ 
                  color: '#64748b',
                  transform: 'translateX(4px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                Fitting Accessories
              </Link>
              <Link 
                href={'#'} 
                color="gray.600"
                fontWeight="500"
                _hover={{ 
                  color: '#64748b',
                  transform: 'translateX(4px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                Premium Solutions
              </Link>
            </Stack>
          </Stack>
          
          <Stack align={'flex-start'} spacing={6}>
            <Heading 
              as="h4" 
              size="md" 
              color="gray.700" 
              fontFamily="Inter" 
              fontWeight="700"
              letterSpacing="-0.01em"
            >
              Contact Us
            </Heading>
            <Stack spacing={4}>
              <Flex align="center" color="gray.600">
                <Icon 
                  as={FaMapMarkerAlt} 
                  mr={3} 
                  color="#64748b" 
                  fontSize="lg"
                />
                <Text fontWeight="500">Chawri Bazar, Delhi, India</Text>
              </Flex>
              <Flex align="center" color="gray.600">
                <Icon 
                  as={FaPhone} 
                  mr={3} 
                  color="#fbbf24" 
                  fontSize="lg"
                />
                <Text fontWeight="500">+91-8527161330</Text>
              </Flex>
              <Flex align="center" color="gray.600" mb={2}>
                <Icon 
                  as={FaPhone} 
                  mr={3} 
                  color="#fbbf24" 
                  fontSize="lg"
                />
                <Text fontWeight="500">+91-8826455039</Text>
              </Flex>
              <Flex align="center" color="gray.600">
                <Icon 
                  as={FaEnvelope} 
                  mr={3} 
                  color="#1e293b" 
                  fontSize="lg"
                />
                <Text fontWeight="500">jd95royal@gmail.com</Text>
              </Flex>
            </Stack>
            
            <Stack spacing={4} width="100%" pt={4}>
              <Heading 
                as="h5" 
                size="sm" 
                color="gray.700"
                fontFamily="Inter"
                fontWeight="700"
              >
                Stay Updated
              </Heading>
              <Box className="neo-card" p={4}>
                <Stack spacing={3}>
                  <Input
                    placeholder={'Enter your email'}
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="lg"
                    fontWeight="500"
                    _focus={{
                      borderColor: '#64748b',
                      boxShadow: '0 0 0 1px #64748b',
                    }}
                    _placeholder={{ color: 'gray.500' }}
                  />
                  <Button
                    className="primary-button"
                    size="sm"
                    w="full"
                    borderRadius="lg"
                    fontWeight="600"
                  >
                    Subscribe
                  </Button>
                </Stack>
              </Box>
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
                color: '#64748b',
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
                color: '#64748b',
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

const SocialButton = ({ children, label, href }) => {
  return (
    <Button
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      rounded={'full'}
      w={10}
      h={10}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'}
      color="gray.600"
      boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
      _hover={{
        bg: '#64748b',
        color: 'white',
        borderColor: '#64748b',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)'
      }}
      aria-label={label}
    >
      {children}
    </Button>
  );
};

export default Footer;