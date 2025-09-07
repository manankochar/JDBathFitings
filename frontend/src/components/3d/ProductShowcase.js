import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PresentationControls, ContactShadows, Html } from '@react-three/drei';
import { Box, Text, Button, Flex, Badge } from '@chakra-ui/react';

const ProductModel = ({ position, showDetails, setShowDetails, productData }) => {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };

  return (
    <group position={position} onClick={handleClick}>
      <mesh ref={ref} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
        <meshPhysicalMaterial
          color="#c0c0c0"
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
        {/* Additional mesh elements */}
      </mesh>

      {showDetails && (
        <Html position={[1.5, 0, 0]} distanceFactor={10}>
          <Box bg="rgba(5, 8, 22, 0.9)" p={4} borderRadius="md" color="white" width="250px">
            <Flex justify="space-between" align="center" mb={2}>
              <Text fontWeight="bold" fontSize="lg">{productData.name}</Text>
              <Badge colorScheme="blue">New</Badge>
            </Flex>
            <Text fontSize="sm" mb={3}>{productData.description}</Text>
            <Flex justify="space-between" align="center">
              <Text fontWeight="bold">₹{productData.price}</Text>
              <Badge colorScheme="green">{productData.category}</Badge>
            </Flex>
          </Box>
        </Html>
      )}
    </group>
  );
};

const ProductShowcase = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const sampleProducts = [
    {
      id: 1,
      name: 'Modern Faucet X1',
      description: 'Premium bathroom faucet with water-saving technology',
      price: '4,999',
      category: 'Faucets'
    },
    // Add other sample products
  ];

  return (
    <Box height="500px" width="100%">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 25 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <PresentationControls>
          <group position={[0, -1, 0]}>
            {sampleProducts.map((product, index) => (
              <ProductModel
                key={product.id}
                position={[(index - 1) * 2, 0, 0]}
                showDetails={selectedProduct === product.id}
                setShowDetails={(show) => setSelectedProduct(show ? product.id : null)}
                productData={product}
              />
            ))}
          </group>
        </PresentationControls>
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={1.5} />
      </Canvas>
    </Box>
  );
};

export default React.memo(ProductShowcase);