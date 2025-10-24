import React, { useEffect, useState } from 'react';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

const OpenStreetMap = ({ 
  center = { lat: 28.6482, lng: 77.2270 }, 
  zoom = 17, 
  height = "500px",
  width = "100%",
  markerTitle = "R Diamond Bathroom Fittings",
  markerAddress = "Shop No. 3615, Bazar Sita Ram, Chawri Bazar, Chandni Chowk, Delhi - 110006"
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for consistency
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // OpenStreetMap URL with the coordinates (disabled zoom)
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${center.lng - 0.01},${center.lat - 0.01},${center.lng + 0.01},${center.lat + 0.01}&layer=mapnik&marker=${center.lat},${center.lng}`;
  
  // Google Maps link to open when clicked
  const googleMapsLink = "https://www.google.com/maps/place/R+Diamond+Bathroom+Fittings+(Jankidas+Sanitaryware+Pvt+Ltd)/@28.6484061,77.2259063,17z/data=!4m6!3m5!1s0x390cfdf62ae08fa7:0x5eb32c1d490ef4f8!8m2!3d28.6482084!4d77.2269577!16s%2Fg%2F11shpdmrks?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D";

  const handleMapClick = () => {
    window.open(googleMapsLink, '_blank');
  };

  return (
    <Box position="relative" height={height} width={width} borderRadius="lg" overflow="hidden" role="group">
      {isLoading && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="rgba(255, 255, 255, 0.9)"
          zIndex="10"
        >
          <VStack spacing={4}>
            <Spinner size="xl" color="blue.500" />
            <Text color="gray.600" fontWeight="medium">
              Loading Map...
            </Text>
          </VStack>
        </Box>
      )}
      
      {/* Clickable overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex="5"
        cursor="pointer"
        onClick={handleMapClick}
        _hover={{
          bg: "rgba(251, 191, 36, 0.1)"
        }}
        transition="all 0.3s ease"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          position="absolute"
          bottom="20px"
          right="20px"
          bg="rgba(0, 0, 0, 0.8)"
          color="white"
          px={4}
          py={2}
          borderRadius="lg"
          fontSize="sm"
          fontWeight="bold"
          opacity={0}
          _groupHover={{ opacity: 1 }}
          transition="opacity 0.3s ease"
        >
          Click to open in Google Maps
        </Box>
      </Box>
      
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ 
          border: 'none', 
          borderRadius: '8px',
          pointerEvents: 'none' // Disable all interactions with iframe
        }}
        title={`Map showing ${markerTitle}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Box>
  );
};

export default OpenStreetMap;
