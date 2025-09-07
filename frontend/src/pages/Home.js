import React from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Hero from '../components/ui/Hero';
import About from '../components/ui/About';
import Products from '../components/ui/Products';
import Contact from '../components/ui/Contact';

const MotionBox = motion(Box);

const Home = () => {
  return (
    <Box 
      bg="linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #e2e8f0 100%)"
      minH="100vh"
      position="relative"
      overflow="hidden"
    >
      {/* Enhanced Background Pattern */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundImage={`
          radial-gradient(circle at 20% 80%, rgba(100,116,139,0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(251,191,36,0.03) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(30,41,59,0.02) 0%, transparent 50%)
        `}
        opacity={0.8}
        zIndex={1}
      />
      
      {/* Floating Elements for Visual Interest */}
      <Box position="absolute" top="10%" left="5%" w="120px" h="120px" opacity={0.05} zIndex={1}>
        <Box
          w="100%"
          h="100%"
          borderRadius="30% 70% 70% 30% / 30% 30% 70% 70%"
          bg="linear-gradient(45deg, #64748b, #fbbf24)"
          animation="float 8s ease-in-out infinite"
        />
      </Box>
      
      <Box position="absolute" bottom="10%" right="5%" w="100px" h="100px" opacity={0.05} zIndex={1}>
        <Box
          w="100%"
          h="100%"
          borderRadius="63% 37% 54% 46% / 55% 48% 52% 45%"
          bg="linear-gradient(45deg, #fbbf24, #1e293b)"
          animation="float 10s ease-in-out infinite reverse"
        />
      </Box>

      {/* Content Sections */}
      <Box position="relative" zIndex={2}>
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <About />
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Products />
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Contact />
        </MotionBox>
      </Box>

      {/* Global Animation Styles */}
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

export default Home;