import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Stack,
  Link,
  Button,
  Image,
  VStack,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { 
  FaBars, 
  FaTimes, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaRocket,
  FaHome,
  FaInfoCircle,
  FaImages,
  FaAddressBook
} from 'react-icons/fa';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Debug logging
  console.log('Navbar render - isOpen:', isOpen);
  
  const onToggle = () => {
    console.log('onToggle called, current isOpen:', isOpen);
    setIsOpen(!isOpen);
  };
  
  // Hero-matching color values
  const bgColor = scrolled ? 'rgba(248, 250, 252, 0.98)' : 'rgba(255, 255, 255, 0.95)';
  const textColor = '#1e293b';
  const borderColor = 'rgba(100, 116, 139, 0.2)';
  const accentColor = '#64748b';

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
      document.documentElement.style.overflowX = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflowX = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflowX = '';
    };
  }, [isOpen]);

  // Navigation items with icons
  const navItems = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'About', path: '/about', icon: FaInfoCircle },
    { name: 'Products', path: '/all-products', icon: FaImages },
    { name: 'Contact', path: '/contact', icon: FaAddressBook },
  ];

  // Contact info for mobile menu
  const contactInfo = [
    { icon: FaPhone, text: '+91-8527161330', label: 'Primary' },
    { icon: FaPhone, text: '+91-8826455039', label: 'Secondary' },
    { icon: FaEnvelope, text: 'jd95royal@gmail.com', label: 'Email' },
    { icon: FaMapMarkerAlt, text: 'Chawri Bazar, Delhi', label: 'Location' },
  ];

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      width="100%"
      zIndex="1000"
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      bg={bgColor}
      backdropFilter={scrolled ? 'blur(25px)' : 'blur(15px)'}
      borderBottom={`1px solid ${borderColor}`}
      boxShadow={scrolled ? '0 8px 32px rgba(0, 0, 0, 0.12)' : '0 4px 20px rgba(0, 0, 0, 0.08)'}
    >
      <Box w="100%" px={{ base: 3, sm: 4, md: 6, lg: 8, xl: 12 }}>
        <Flex
          color={textColor}
          minH={{ base: '70px', md: '80px' }}
          align={'center'}
          justify="space-between"
          w="100%"
        >
          {/* Logo Section */}
          <Flex flex={{ base: 1 }} justify="start" align="center">
            <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
              <HStack spacing={{ base: 2, md: 3 }} cursor="pointer">
                <Box
                  position="relative"
                  w={{ base: '60px', sm: '70px', md: '80px', lg: '90px' }}
                  h={{ base: '60px', sm: '70px', md: '80px', lg: '90px' }}
                  borderRadius="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  overflow="hidden"
                  bg="transparent"
                  flexShrink={0}
                >
                  <Image
                    src="/logo.png"
                    alt="JD Bath Fittings Logo"
                    w="100%"
                    h="100%"
                    objectFit="contain"
                    objectPosition="center"
                    fallbackSrc="https://via.placeholder.com/100x100/3b82f6/ffffff?text=JD"
                    draggable={false}
                  />
                </Box>
                <VStack align="flex-start" spacing={{ base: 0, md: 1 }} display={{ base: "none", sm: "flex" }}>
                  <Text
                    fontFamily="Inter"
                    fontWeight="800"
                    fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
                    color="gray.800"
                    lineHeight="0.9"
                    zIndex="2"
                    position="relative"
                    textShadow="0 2px 4px rgba(0,0,0,0.1)"
                    letterSpacing="tight"
                    noOfLines={1}
                  >
                    JANKIDAS
                  </Text>
                  <Text
                    fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
                    color="#fbbf24"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    zIndex="2"
                    position="relative"
                    textShadow="0 1px 3px rgba(251, 191, 36, 0.3)"
                    noOfLines={1}
                  >
                    Sanitaryware
                  </Text>
                </VStack>
              </HStack>
            </Link>
          </Flex>

          {/* Desktop Navigation */}
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={{ base: 4, lg: 6 }}
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
              />
            ))}
            
            {/* Enhanced CTA Button */}
            <Button
              as={RouterLink}
              to="/contact"
              display={{ base: 'none', md: 'inline-flex' }}
              bgGradient="linear(135deg, #1e293b, #475569)"
              color="white"
              fontSize={'sm'}
              fontWeight={700}
              px={6}
              py={3}
              borderRadius="xl"
              position="relative"
              overflow="hidden"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                w: '100%',
                h: '100%',
                bg: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transition: 'left 0.6s ease',
              }}
              _hover={{
                transform: "translateY(-3px)",
                boxShadow: "0 15px 35px rgba(30, 41, 59, 0.4)",
                _before: { left: '100%' }
              }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            >
              Get Quote
            </Button>
          </Stack>

          {/* Mobile Menu Button */}
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: 0 }}
            display={{ base: 'flex', md: 'none' }}
            justify="flex-end"
          >
            <Button
              onClick={onToggle}
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
              color={textColor}
              size="lg"
              p={3}
              borderRadius="xl"
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              boxShadow="0 4px 10px rgba(0,0,0,0.06)"
              zIndex={1100}
              _hover={{ 
                bg: 'rgba(100, 116, 139, 0.1)',
                transform: 'scale(1.1)',
              }}
              transition="all 0.3s ease"
            >
              {isOpen ? <FaTimes color="#64748b" size={22} /> : <FaBars color="#64748b" size={22} />}
            </Button>
          </Flex>
        </Flex>

        {/* Modern Mobile Navigation */}
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
            onClick={onToggle}
          >
            <Box
              position="absolute"
              top="90px"
              right="4"
              left="4"
              maxH="calc(100vh - 100px)"
              bg="linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95))"
              backdropFilter="blur(30px)"
              borderRadius="3xl"
              border="1px solid"
              borderColor="rgba(255, 255, 255, 0.3)"
              boxShadow="0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)"
              overflow="hidden"
              onClick={(e) => e.stopPropagation()}
              transform="translateY(0)"
              transition="all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            >
              {/* Header */}
              <Box
                bgGradient="linear(135deg, #1e293b, #475569)"
                p={6}
                color="white"
                position="relative"
                overflow="hidden"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bg: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  opacity: 0.3
                }}
              >
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
                    onClick={onToggle}
                    variant="ghost"
                    size="sm"
                    color="white"
                    borderRadius="full"
                    _hover={{ bg: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <FaTimes size={18} />
                  </Button>
                </HStack>
              </Box>

              {/* Navigation Grid */}
              <Box p={6}>
                <VStack spacing={2} align="stretch">
                  {navItems.map((item, index) => (
                    <MobileNavLink
                      key={item.name}
                      to={item.path}
                      label={item.name}
                      icon={item.icon}
                      isActive={location.pathname === item.path}
                      onClose={onToggle}
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
                p={6}
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

                  {/* Main CTA */}
                  <Button
                    as={RouterLink}
                    to="/contact"
                    w="full"
                    h="56px"
                    bgGradient="linear(135deg, #1e293b, #475569, #fbbf24)"
                    color="white"
                    fontSize="lg"
                    fontWeight={700}
                    borderRadius="2xl"
                    position="relative"
                    overflow="hidden"
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      w: '100%',
                      h: '100%',
                      bg: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      transition: 'left 0.6s ease',
                    }}
                    _hover={{
                      transform: "translateY(-3px)",
                      boxShadow: "0 20px 40px rgba(30, 41, 59, 0.4)",
                      _before: { left: '100%' }
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    onClick={onToggle}
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

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes borderRotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.2);
          }
        }
        
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </Box>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ to, label, icon: Icon, isActive }) => (
  <Link
    as={RouterLink}
    to={to}
    px={4}
    py={3}
    rounded={'xl'}
    position="relative"
    fontWeight={600}
    fontSize="sm"
    fontFamily="Inter"
    color={isActive ? 'gray.800' : 'gray.600'}
    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    _hover={{
      textDecoration: 'none',
      color: '#64748b',
      transform: 'translateY(-2px)',
      bg: 'rgba(100, 116, 139, 0.08)',
    }}
    _after={{
      content: '""',
      position: 'absolute',
      width: isActive ? '80%' : '0%',
      height: '3px',
      bottom: '-2px',
      left: '50%',
      transform: 'translateX(-50%)',
      bg: 'linear-gradient(90deg, #64748b, #fbbf24)',
      borderRadius: '2px',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }}
    sx={{
      '&:hover::after': {
        width: '80%',
      },
    }}
  >
    <HStack spacing={2}>
      <Icon size="14px" />
      <Text>{label}</Text>
    </HStack>
  </Link>
);

// Modern Mobile Navigation Link Component
const MobileNavLink = ({ to, label, icon: Icon, isActive, onClose, index = 0 }) => (
  <Link
    as={RouterLink}
    to={to}
    onClick={onClose}
    display="block"
    p={0}
    textDecoration="none"
    _hover={{ textDecoration: 'none' }}
    style={{
      animationDelay: `${index * 0.1}s`,
      animation: 'slideInRight 0.5s ease-out forwards',
      opacity: 0,
      transform: 'translateX(20px)'
    }}
  >
    <Box
      py={4}
      px={5}
      borderRadius="2xl"
    bg={isActive 
      ? 'linear-gradient(135deg, #1e293b, #64748b)' 
      : 'rgba(255, 255, 255, 0.7)'
    }
      color={isActive ? 'white' : 'gray.700'}
      fontWeight={isActive ? '700' : '600'}
      fontSize="lg"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      border="1px solid"
      borderColor={isActive 
        ? 'transparent' 
        : 'rgba(100, 116, 139, 0.1)'
      }
      position="relative"
      overflow="hidden"
      _hover={{
        bg: isActive 
          ? 'linear-gradient(135deg, #1e293b, #64748b)' 
          : 'rgba(100, 116, 139, 0.05)',
        transform: 'translateY(-2px) scale(1.02)',
        boxShadow: isActive 
          ? '0 15px 35px rgba(30, 41, 59, 0.4)' 
          : '0 10px 25px rgba(100, 116, 139, 0.15)',
        borderColor: 'rgba(100, 116, 139, 0.3)'
      }}
      _before={!isActive ? {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        w: '100%',
        h: '100%',
        bg: 'linear-gradient(90deg, transparent, rgba(100, 116, 139, 0.1), transparent)',
        transition: 'left 0.6s ease',
      } : {}}
      sx={{
        '&:hover::before': !isActive ? {
          left: '100%'
        } : {}
      }}
    >
      <HStack spacing={4} align="center">
        <Box
          p={3}
          borderRadius="xl"
          bg={isActive 
            ? 'rgba(255, 255, 255, 0.25)' 
            : 'rgba(100, 116, 139, 0.1)'
          }
          color={isActive ? 'white' : '#64748b'}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minW="48px"
          h="48px"
          transition="all 0.3s ease"
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