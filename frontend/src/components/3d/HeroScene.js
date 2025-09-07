import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Floating bathroom fixture
const FloatingFixture = ({ position, rotation, scale, color }) => {
  const ref = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(t / 4) / 8;
    ref.current.rotation.y = Math.sin(t / 4) / 8;
    ref.current.position.y = position[1] + Math.sin(t / 2) / 10;
  });

  return (
    <group position={position} ref={ref}>
      <mesh castShadow receiveShadow scale={scale} rotation={rotation}>
        <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2} 
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};

// Particles effect
const Particles = () => {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  
  const ref = useRef();
  const particles = Array.from({ length: 100 }, () => ({
    position: [THREE.MathUtils.randFloatSpread(10), THREE.MathUtils.randFloatSpread(10), THREE.MathUtils.randFloatSpread(10)],
    factor: THREE.MathUtils.randFloat(0.5, 1),
    speed: THREE.MathUtils.randFloat(0.01, 0.05),
    color: ['#00a0ff', '#7928ca', '#ffffff'][Math.floor(Math.random() * 3)],
    size: THREE.MathUtils.randFloat(0.05, 0.15),
  }));
  
  useFrame(() => {
    const positions = ref.current.geometry.attributes.position.array;
    const scales = ref.current.geometry.attributes.scale.array;
    
    let i = 0;
    for (let j = 0; j < positions.length; j += 3) {
      const idx = i++;
      positions[j+1] += particles[idx].speed * particles[idx].factor;
      
      if (positions[j+1] > 5) {
        positions[j+1] = -5;
      }
      
      scales[idx] = Math.sin(particles[idx].factor + idx) / 2 + 0.5;
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.geometry.attributes.scale.needsUpdate = true;
  });
  
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={particles.length} 
          array={new Float32Array(particles.flatMap(p => p.position))} 
          itemSize={3} 
        />
        <bufferAttribute 
          attach="attributes-scale" 
          count={particles.length} 
          array={new Float32Array(particles.map(p => p.size))} 
          itemSize={1} 
        />
        <bufferAttribute 
          attach="attributes-color" 
          count={particles.length} 
          array={new Float32Array(particles.flatMap(p => new THREE.Color(p.color).toArray()))} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.15} 
        vertexColors 
        transparent 
        sizeAttenuation 
        depthWrite={false} 
      />
    </points>
  );
};

// Main hero scene component
const HeroScene = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
      <color attach="background" args={['#ffffff']} />
      <fog attach="fog" args={['#ffffff', 5, 20]} />
      
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.5} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}
      />
      
      {/* Floating fixtures */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <FloatingFixture 
          position={[-2, 0, 0]} 
          rotation={[0, 0, Math.PI / 6]} 
          scale={0.8} 
          color="#00a0ff" 
        />
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
        <FloatingFixture 
          position={[2, -0.5, 1]} 
          rotation={[0, Math.PI / 4, 0]} 
          scale={0.7} 
          color="#7928ca" 
        />
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
        <FloatingFixture 
          position={[0, 1, -1]} 
          rotation={[Math.PI / 6, 0, 0]} 
          scale={0.6} 
          color="#ffffff" 
        />
      </Float>
      
      {/* Background elements */}
      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      <Particles />
      
      {/* Environment lighting */}
      <Environment preset="night" />
    </Canvas>
  );
};

export default HeroScene;