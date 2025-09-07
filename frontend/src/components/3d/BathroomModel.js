import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations, OrbitControls, Environment } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// This is a placeholder component for a 3D bathroom model
// In a real implementation, you would import an actual GLTF model
const BathroomModel = ({ isMobile, ...props }) => {
  const group = useRef();
  
  // Rotation animation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Environment and lighting */}
      <Environment preset="apartment" />
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}
      />
      
      {/* Bathroom floor */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -2, 0]} 
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial 
          color="#f0f0f0" 
          roughness={0.1} 
          metalness={0.2} 
        />
      </mesh>
      
      {/* Bathtub */}
      <group position={[-2, -1, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4, 1, 2]} />
          <meshPhysicalMaterial 
            color="white" 
            roughness={0.1} 
            metalness={0.2} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
          />
        </mesh>
        {/* Bathtub interior */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <boxGeometry args={[3.8, 0.8, 1.8]} />
          <meshPhysicalMaterial 
            color="white" 
            roughness={0.1} 
            metalness={0.2} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
          />
        </mesh>
        {/* Faucet */}
        <mesh position={[-1.5, 0.7, -0.8]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-1.5, 0.9, -0.6]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Sink */}
      <group position={[2, -0.5, -1]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.1, 1]} />
          <meshPhysicalMaterial 
            color="white" 
            roughness={0.1} 
            metalness={0.2} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
          />
        </mesh>
        {/* Sink bowl */}
        <mesh position={[0, -0.2, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
          <meshPhysicalMaterial 
            color="white" 
            roughness={0.1} 
            metalness={0.2} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
          />
        </mesh>
        {/* Faucet */}
        <mesh position={[0, 0.3, -0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.4, 16]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.5, -0.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 16]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Toilet */}
      <group position={[2, -1.5, 1]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.4, 0.6]} />
          <meshPhysicalMaterial 
            color="white" 
            roughness={0.1} 
            metalness={0.2} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
          />
        </mesh>
        <mesh position={[0, 0.5, -0.1]} castShadow>
          <boxGeometry args={[0.8, 0.6, 0.4]} />
          <meshPhysicalMaterial 
            color="white" 
            roughness={0.1} 
            metalness={0.2} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
          />
        </mesh>
      </group>
      
      {/* Shower */}
      <group position={[-2, -1, 2]}>
        {/* Shower base */}
        <mesh position={[0, -1, 0]} receiveShadow>
          <boxGeometry args={[2, 0.1, 2]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.3} />
        </mesh>
        {/* Shower walls */}
        <mesh position={[-1, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
          <planeGeometry args={[2, 2]} />
          <meshPhysicalMaterial 
            color="#a0d0ff" 
            roughness={0.1} 
            metalness={0.1} 
            transmission={0.5} 
            transparent={true} 
          />
        </mesh>
        <mesh position={[0, 0, -1]} castShadow receiveShadow>
          <planeGeometry args={[2, 2]} />
          <meshPhysicalMaterial 
            color="#a0d0ff" 
            roughness={0.1} 
            metalness={0.1} 
            transmission={0.5} 
            transparent={true} 
          />
        </mesh>
        {/* Shower head */}
        <mesh position={[0, 1, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Add orbit controls for interactive viewing */}
      <OrbitControls 
        enableZoom={true} 
        enablePan={false} 
        enableRotate={true} 
        zoomSpeed={0.5} 
        rotateSpeed={0.5} 
        minDistance={5} 
        maxDistance={20} 
      />
    </group>
  );
};

export default BathroomModel;