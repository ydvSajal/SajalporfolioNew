import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Float, Text3D, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Floating geometric shapes component
const FloatingShapes = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const shapes = useMemo(() => {
    const positions = [
      [-4, 2, -2],
      [3, -1, 1],
      [-2, -3, 2],
      [4, 1, -1],
      [1, 3, -3],
      [-3, 1, 3]
    ];
    
    return positions.map((pos, i) => ({
      position: pos as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      scale: 0.3 + Math.random() * 0.4,
      color: i % 2 === 0 ? '#8B5CF6' : '#06B6D4'
    }));
  }, []);

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float
          key={i}
          speed={1 + Math.random()}
          rotationIntensity={0.5 + Math.random() * 0.5}
          floatIntensity={0.5 + Math.random()}
        >
          {i % 3 === 0 ? (
            <Box
              position={shape.position}
              scale={shape.scale}
              rotation={shape.rotation}
            >
              <meshStandardMaterial 
                color={shape.color} 
                transparent 
                opacity={0.8}
                roughness={0.1}
                metalness={0.2}
              />
            </Box>
          ) : i % 3 === 1 ? (
            <Sphere
              position={shape.position}
              scale={shape.scale}
              args={[1, 32, 32]}
            >
              <meshStandardMaterial 
                color={shape.color} 
                transparent 
                opacity={0.7}
                roughness={0.2}
                metalness={0.3}
              />
            </Sphere>
          ) : (
            <mesh position={shape.position} scale={shape.scale} rotation={shape.rotation}>
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial 
                color={shape.color} 
                transparent 
                opacity={0.9}
                roughness={0.1}
                metalness={0.4}
              />
            </mesh>
          )}
        </Float>
      ))}
    </group>
  );
};

// Animated particles background
const ParticleField = () => {
  const mesh = useRef<THREE.Points>(null);
  
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 1000;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={mesh} geometry={particlesGeometry}>
      <pointsMaterial 
        color="#8B5CF6" 
        size={0.02} 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Main 3D Scene component
const Scene3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Environment preset="night" />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} color="#8B5CF6" />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#06B6D4" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#F59E0B" />
        
        {/* 3D Elements */}
        <FloatingShapes />
        <ParticleField />
        
        {/* Interactive controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;