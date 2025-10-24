import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  DialogRoot,
  DialogBackdrop,
  DialogContent,
  VStack
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import ImagePlaceholder from './ImagePlaceholder'; // fallback retained
import { Image } from '@chakra-ui/react';

const MotionBox = motion(Box);

const ImageGallery = ({ 
  title = "Product Gallery", 
  subtitle = "Explore our premium collection",
  images = [],
  columns = { base: 1, md: 2, lg: 3, xl: 4 }
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  // Default gallery items if no images provided
  const defaultGalleryItems = [
    {
      id: 1,
      title: "Premium Faucet Collection",
      image: "/images/showroom1.jpg",
      description: "A showcase of our finest faucets and fixtures in a luxury setting."
    },
    {
      id: 2,
      title: "Modern Bath Display",
      image: "/images/showroom2.jpg",
      description: "Contemporary designs and innovative solutions for modern bathrooms."
    },
    {
      id: 3,
      title: "Work Gallery",
      image: "/images/showroom3.jpg",
      description: "A gallery of our completed projects and installations."
    }
  ];

  const galleryItems = images.length > 0 ? images : defaultGalleryItems;

  return (
    <Box py={{ base: 12, sm: 16, md: 20 }} bg="#070b1b" overflowX="hidden">
      <Container maxW="container.xl" px={{ base: 4, sm: 6, md: 8, lg: 10, xl: 12 }} className="container-responsive">
        {/* Section Header */}
        <VStack spacing={{ base: 3, md: 4 }} textAlign="center" mb={{ base: 8, md: 12 }} className="gallery-header-responsive">
          <Text color="brand.500" fontWeight="600" fontSize={{ base: "xs", md: "sm" }} textTransform="uppercase">
            <span style={{ color: '#fff', letterSpacing: '0.12em', textShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>Gallery</span>
          </Text>
          <Heading 
            as="h2"
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            lineHeight="1.2"
            px={{ base: 2, md: 0 }}
            wordBreak="break-word"
            color="white"
            textShadow="0 2px 12px rgba(0,0,0,0.18)"
          >
            {title}
          </Heading>
          <Text
            color="#f8fafc"
            fontSize={{ base: "md", md: "lg" }}
            maxW="600px"
            px={{ base: 4, md: 0 }}
            wordBreak="break-word"
            textShadow="0 2px 8px rgba(0,0,0,0.12)"
          >
            {subtitle}
          </Text>
        </VStack>

        {/* Gallery Grid (refactored to CSS grid for consistent spacing) */}
        <Box mt={{ base: 8, md: 10 }} mb={{ base: 10, md: 14 }} px={{ base: 2, sm: 2, md: 0 }}>
          <Box
            display="grid"
            gridTemplateColumns={{ base: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' }}
            gap={{ base: 5, md: 10 }}
          >
            {galleryItems.map((item, index) => (
              <MotionBox
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: index * 0.1, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -10 }}
                position="relative"
                role="group"
              >
                <Box
                  position="relative"
                  borderRadius="24px"
                  overflow="hidden"
                  bgGradient="linear(to-b, #1b2034 0%, #141826 55%, #101320 100%)"
                  boxShadow="0 12px 42px -10px rgba(0,0,0,0.45), 0 4px 18px -6px rgba(0,0,0,0.35)"
                  border="1px solid rgba(255,255,255,0.06)"
                  // Removed click and interactive cursor to make card non-clickable
                  cursor="default"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    inset: '0',
                    background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.08), transparent 60%)',
                    opacity: 0,
                    transition: 'opacity .5s'
                  }}
                  // Keep subtle highlight on hover without lift effect
                  _groupHover={{ _before: { opacity: 1 } }}
                  _hover={{
                    boxShadow: '0 14px 38px -12px rgba(0,0,0,0.55)',
                    borderColor: 'rgba(255,255,255,0.12)'
                  }}
                  transition="all .45s cubic-bezier(.4,0,.2,1)"
                  minH={{ base: '320px', md: '360px' }}
                  display="flex"
                  flexDirection="column"
                >
                  <Box position="relative" height={{ base: '170px', sm: '190px', md: '200px' }} overflow="hidden">
                    {item.image ? (
                      <Image 
                        src={item.image}
                        alt={item.title}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        transition="transform .9s ease"
                        _groupHover={{ transform: 'scale(1.08)' }}
                        draggable={false}
                      />
                    ) : (
                      <ImagePlaceholder
                        width="100%"
                        height="100%"
                        text={item.title}
                        fontSize="sm"
                        bg="linear-gradient(135deg,#2d3350 0%,#4f56b3 55%,#6c63ff 100%)"
                        borderRadius="0"
                        border="none"
                        showIcon={true}
                        color="#eef2ff"
                      />
                    )}
                    <Box position="absolute" inset={0} opacity={0.18} background="linear-gradient(to bottom, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 100%)" />
                  </Box>
                  <Box p={{ base: 4, md: 5 }} flex="1" display="flex" flexDirection="column" justifyContent="flex-start">
                    <Heading
                      as="h3"
                      fontSize={{ base: 'lg', md: 'xl' }}
                      mb={2}
                      color="#f1f5f9"
                      textShadow="0 2px 6px rgba(0,0,0,0.35)"
                      letterSpacing="0.02em"
                    >
                      {item.title}
                    </Heading>
                    <Text color="#cbd5e1" fontSize={{ base: 'sm', md: 'sm' }} lineHeight="1.45" flex="0" noOfLines={3}>
                      {item.description}
                    </Text>
                    {/* Removed action link */}
                  </Box>
                </Box>
              </MotionBox>
            ))}
          </Box>
          {/* Optional CTA below grid */}
          <Box textAlign="center" mt={{ base: 10, md: 14 }}>
            <Box as="button"
              px={8}
              py={4}
              borderRadius="full"
              fontSize="sm"
              letterSpacing="0.25em"
              fontWeight="600"
              bgGradient="linear(to-r,#1e293b,#0f172a)"
              color="#fff"
              border="1px solid #334155"
              boxShadow="0 8px 28px -8px rgba(15,23,42,0.55)"
              transition="all .4s cubic-bezier(.4,0,.2,1)"
              _hover={{ transform: 'translateY(-4px)', boxShadow: '0 16px 42px -10px rgba(15,23,42,0.65)' }}
            >
              Contact Us
            </Box>
          </Box>
        </Box>


      </Container>

      {/* Dialog for expanded view */}
      <DialogRoot open={isOpen} onOpenChange={(e) => e.open ? null : onClose()} size={{ base: "full", md: "4xl" }} placement="center">
        <DialogBackdrop bg="blackAlpha.800" backdropFilter="blur(10px)" />
        <DialogContent 
          bg="slate.900" 
          borderRadius={{ base: "none", md: "xl" }} 
          overflow="hidden" 
          maxW={{ base: "100vw", md: "4xl" }}
          maxH={{ base: "100vh", md: "90vh" }}
          m={{ base: 0, md: 4 }}
          className="gallery-modal-responsive"
        >
          {/* Modal content here, implement as needed */}
        </DialogContent>
      </DialogRoot>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .gallery-grid-responsive {
            gap: 16px !important;
          }
          
          .gallery-item-image {
            height: 180px !important;
          }
          
          .gallery-header-responsive {
            margin-bottom: 32px !important;
          }
          
          .gallery-modal-responsive {
            border-radius: 0 !important;
            margin: 0 !important;
            max-width: 100vw !important;
            max-height: 100vh !important;
          }
          
          .gallery-modal-content {
            flex-direction: column !important;
          }
          
          .gallery-modal-details {
            padding: 16px !important;
          }
          
          .gallery-modal-buttons {
            flex-direction: column !important;
            gap: 8px !important;
          }
        }
        
        @media (max-width: 480px) {
          .gallery-grid-responsive {
            gap: 12px !important;
            grid-template-columns: 1fr !important;
          }
          
          .gallery-item-image {
            height: 160px !important;
          }
          
          .gallery-view-all-btn {
            width: 100% !important;
            max-width: 280px !important;
          }
        }
        
        @media (max-width: 320px) {
          .gallery-grid-responsive {
            gap: 8px !important;
          }
          
          .gallery-item-image {
            height: 140px !important;
          }
          
          .gallery-modal-details {
            padding: 12px !important;
          }
        }
      `}</style>
    </Box>
  );
};

export default ImageGallery;
