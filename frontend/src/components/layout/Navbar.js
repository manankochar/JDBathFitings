import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Image,
  Link,
  HStack,
  Text,
  Stack,
  Button,
  VStack,
} from '@chakra-ui/react';
import { 
  FaHome,
  FaInfoCircle,
  FaImages,
  FaAddressBook,
  FaBars,
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaRocket,
} from 'react-icons/fa';

const navItems = [
  { name: 'Home', path: '/', icon: FaHome },
  { name: 'About', path: '/about', icon: FaInfoCircle },
  { name: 'Products', path: '/products', icon: FaImages },
  { name: 'Contact', path: '/contact', icon: FaAddressBook }
];

const NavLink = ({ to, label, icon: Icon, isActive, scrolled }) => (
  <Link
    as={RouterLink}
    to={to}
    px={4}
    py={3}
    rounded="xl"
    color={scrolled ? (isActive ? 'gray.800' : 'gray.700') : 'whiteAlpha.900'}
    _hover={{
      textDecoration: 'none',
      color: scrolled ? 'gray.900' : 'white',
      bg: scrolled ? 'blackAlpha.50' : 'whiteAlpha.200',
      transform: 'translateY(-2px)',
    }}
    transition="all 0.2s"
  >
    <HStack spacing={2}>
      <Icon size="14px" />
      <Text fontWeight={isActive ? '600' : '500'}>{label}</Text>
    </HStack>
  </Link>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      width="100%"
      bg={scrolled ? 'white' : 'rgba(0,0,0,0.15)'}
      boxShadow={scrolled ? 'lg' : 'none'}
      transition="all 0.3s ease-in-out"
      zIndex="1000"
      backdropFilter={scrolled ? 'blur(10px)' : 'blur(4px)'}
      borderBottom={scrolled ? '1px solid' : 'none'}
      borderColor="gray.200"
    >
      <Flex
        maxW="8xl"
        mx="auto"
        px={{ base: 4, sm: 6, lg: 8 }}
        h={{ base: "70px", md: "80px" }}
        align="center"
        justify="space-between"
      >
        {/* Logo */}
        <Box>
          <Link 
            as={RouterLink} 
            to="/" 
            display="flex" 
            alignItems="center" 
            _hover={{ transform: 'scale(1.05)' }}
            transition="transform 0.2s ease-in-out"
          >
            <Box
              w={{ base: "120px", sm: "150px" }}
              h={{ base: "60px", sm: "75px" }}
              position="relative"
            >
              <Image
                src="/jankidas-logo.png"
                alt="JD Bath Fittings"
                w="100%"
                h="100%"
                objectFit="contain"
                objectPosition="center"
                fallbackSrc="/logo.png"
              />
            </Box>
          </Link>
        </Box>

        {/* Desktop Navigation */}
        <Stack
          direction="row"
          spacing={6}
          display={{ base: 'none', md: 'flex' }}
          align="center"
        >
          {navItems.map((item) => (
            <NavLink 
              key={item.name}
              to={item.path} 
              label={item.name} 
              icon={item.icon}
              isActive={location.pathname === item.path} 
              scrolled={scrolled}
            />
          ))}
        </Stack>

        {/* Mobile Menu Button */}
        <Box display={{ base: 'flex', md: 'none' }}>
          <Button
            onClick={handleToggle}
            variant="ghost"
            aria-label="Toggle Navigation"
            color={scrolled ? 'gray.800' : 'white'}
            size="lg"
            p={3}
            borderRadius="xl"
            bg={scrolled ? 'white' : 'rgba(255,255,255,0.2)'}
            border="1px solid"
            borderColor={scrolled ? 'gray.200' : 'rgba(255,255,255,0.3)'}
            boxShadow={scrolled ? '0 4px 10px rgba(0,0,0,0.06)' : '0 4px 10px rgba(0,0,0,0.1)'}
            _hover={{ 
              bg: scrolled ? 'rgba(100, 116, 139, 0.1)' : 'rgba(255,255,255,0.3)',
              transform: 'scale(1.1)',
            }}
            transition="all 0.3s ease"
            zIndex={1001}
            position="relative"
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </Button>
        </Box>
      </Flex>

      {/* Mobile Menu */}
      {isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.5)"
          backdropFilter="blur(10px)"
          zIndex={999}
          onClick={handleToggle}
        >
          <Box
            position="absolute"
            top={{ base: "75px", sm: "80px" }}
            right={{ base: "2", sm: "3" }}
            left={{ base: "2", sm: "3" }}
            maxH="calc(100vh - 85px)"
            bg="white"
            borderRadius={{ base: "2xl", sm: "3xl" }}
            border="2px solid"
            borderColor="gray.200"
            boxShadow="0 32px 80px rgba(0, 0, 0, 0.12)"
            overflow="hidden"
            overflowY="auto"
            onClick={(e) => e.stopPropagation()}
            transform="translateY(0)"
            transition="all 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
          >
            {/* Mobile Menu Header */}
            <Box
              bgGradient="linear(135deg, #1e293b 0%, #475569 50%, #64748b 100%)"
              p={{ base: 6, sm: 8 }}
              color="white"
            >
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between" align="center">
                  <VStack align="flex-start" spacing={1}>
                    <Text fontSize="xl" fontWeight="800" letterSpacing="tight">
                      Menu
                    </Text>
                    <Text fontSize="sm" opacity={0.9}>
                      Navigate to any section
                    </Text>
                  </VStack>
                  <Button
                    onClick={handleToggle}
                    variant="ghost"
                    size="sm"
                    color="white"
                    borderRadius="full"
                    _hover={{ bg: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <FaTimes size={18} />
                  </Button>
                </HStack>
                
                {/* Brand Logo */}
                <Box textAlign="center" py={4} px={2}>
                  <Box
                    w={{ base: "120px", sm: "150px" }}
                    h={{ base: "60px", sm: "75px" }}
                    mx="auto"
                  >
                    <Image
                      src="/jankidas-logo.png"
                      alt="Jankidas Sanitaryware Logo"
                      w="100%"
                      h="100%"
                      objectFit="contain"
                      objectPosition="center"
                      fallbackSrc="/logo.png"
                    />
                  </Box>
                </Box>
              </VStack>
            </Box>

            {/* Navigation Links */}
            <Box p={{ base: 4, sm: 6 }}>
              <VStack spacing={{ base: 1, sm: 2 }} align="stretch">
                {navItems.map((item, index) => (
                  <MobileNavLink
                    key={item.name}
                    to={item.path}
                    label={item.name}
                    icon={item.icon}
                    isActive={location.pathname === item.path}
                    onClose={handleToggle}
                    index={index}
                  />
                ))}
              </VStack>
            </Box>

            {/* Quick Contact Section */}
            <Box
              bg="rgba(100, 116, 139, 0.03)"
              borderTop="1px solid"
              borderColor="rgba(100, 116, 139, 0.1)"
              p={{ base: 4, sm: 6 }}
            >
              <Text
                fontSize="lg"
                fontWeight="700"
                color="gray.800"
                mb={4}
                textAlign="center"
              >
                Get In Touch
              </Text>
              
              <VStack spacing={4}>
                <HStack
                  spacing={4}
                  w="full"
                  justify="center"
                  flexWrap="wrap"
                >
                  <Button
                    as="a"
                    href="tel:+91-8527161330"
                    leftIcon={<FaPhone />}
                    size="sm"
                    variant="outline"
                    colorScheme="blue"
                    borderRadius="full"
                    _hover={{ transform: 'translateY(-2px)' }}
                  >
                    Call Now
                  </Button>
                  <Button
                    as="a"
                    href="mailto:jd95royal@gmail.com"
                    leftIcon={<FaEnvelope />}
                    size="sm"
                    variant="outline"
                    colorScheme="purple"
                    borderRadius="full"
                    _hover={{ transform: 'translateY(-2px)' }}
                  >
                    Email
                  </Button>
                </HStack>

                {/* CTA Button */}
                <Button
                  as={RouterLink}
                  to="/contact"
                  w="full"
                  h={{ base: "56px", sm: "64px" }}
                  bgGradient="linear(135deg, #1e293b 0%, #475569 50%, #fbbf24 100%)"
                  color="white"
                  fontSize={{ base: "md", sm: "lg" }}
                  fontWeight={800}
                  borderRadius="2xl"
                  position="relative"
                  overflow="hidden"
                  border="2px solid"
                  borderColor="rgba(251, 191, 36, 0.3)"
                  boxShadow="0 8px 32px rgba(30, 41, 59, 0.25)"
                  _hover={{
                    transform: "translateY(-4px) scale(1.02)",
                    bgGradient: "linear(135deg, #0f172a 0%, #1e293b 50%, #f59e0b 100%)",
                    boxShadow: "0 16px 48px rgba(15, 23, 42, 0.35)",
                  }}
                  _active={{
                    transform: "translateY(-2px) scale(0.98)"
                  }}
                  transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                  onClick={handleToggle}
                >
                  <HStack spacing={3}>
                    <FaRocket />
                    <Text>Get Free Quote</Text>
                  </HStack>
                </Button>
              </VStack>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

// Mobile Navigation Link Component
const MobileNavLink = ({ to, label, icon: Icon, isActive, onClose, index = 0 }) => (
  <Link
    as={RouterLink}
    to={to}
    onClick={onClose}
    display="block"
    p={0}
    textDecoration="none"
    _hover={{ textDecoration: 'none' }}
  >
    <Box
      py={5}
      px={6}
      borderRadius="2xl"
      bg={isActive 
        ? 'linear-gradient(135deg, #1e293b 0%, #475569 100%)' 
        : 'rgba(255, 255, 255, 0.9)'
      }
      color={isActive ? 'white' : '#1e293b'}
      fontWeight={isActive ? '700' : '600'}
      fontSize="lg"
      transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
      border="2px solid"
      borderColor={isActive 
        ? 'rgba(30, 41, 59, 0.3)' 
        : 'rgba(100, 116, 139, 0.15)'
      }
      position="relative"
      overflow="hidden"
      backdropFilter="blur(10px)"
      boxShadow={isActive 
        ? '0 8px 32px rgba(30, 41, 59, 0.25), 0 1px 0 rgba(255, 255, 255, 0.2) inset' 
        : '0 4px 20px rgba(100, 116, 139, 0.08), 0 1px 0 rgba(255, 255, 255, 0.5) inset'
      }
      _hover={{
        bg: isActive 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' 
          : 'rgba(100, 116, 139, 0.08)',
        transform: 'translateY(-3px) scale(1.02)',
        boxShadow: isActive 
          ? '0 12px 40px rgba(15, 23, 42, 0.35), 0 1px 0 rgba(255, 255, 255, 0.3) inset' 
          : '0 8px 32px rgba(100, 116, 139, 0.15), 0 1px 0 rgba(255, 255, 255, 0.6) inset',
        borderColor: 'rgba(100, 116, 139, 0.3)'
      }}
    >
      <HStack spacing={4} align="center">
        <Box
          p={3}
          borderRadius="xl"
          bg={isActive 
            ? 'rgba(255, 255, 255, 0.2)'
            : 'linear-gradient(135deg, rgba(100, 116, 139, 0.1), rgba(71, 85, 105, 0.1))'
          }
          color={isActive ? 'white' : '#64748b'}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minW="52px"
          h="52px"
          transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
          border="1px solid"
          borderColor={isActive 
            ? 'rgba(255, 255, 255, 0.3)'
            : 'rgba(100, 116, 139, 0.15)'
          }
          boxShadow={isActive 
            ? '0 4px 16px rgba(255, 255, 255, 0.1)' 
            : '0 4px 16px rgba(100, 116, 139, 0.1)'
          }
        >
          <Icon size="20px" />
        </Box>
        
        <VStack align="flex-start" spacing={0} flex="1">
          <Text fontSize="lg" fontWeight="inherit" lineHeight="1.2">
            {label}
          </Text>
          {isActive && (
            <Text fontSize="xs" opacity={0.8} fontWeight="400">
              Current page
            </Text>
          )}
        </VStack>
        
        {isActive && (
          <Box
            w="6px"
            h="6px"
            borderRadius="full"
            bg="white"
            animation="pulse 2s infinite"
          />
        )}
      </HStack>
    </Box>
  </Link>
);

export default Navbar;