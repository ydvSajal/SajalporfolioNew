import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Floating geometric shapes component - optimized with fewer shapes
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
      [4, 1, -1]
    ];
    
    return positions.map((pos, i) => ({
      position: pos as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      scale: 0.4 + Math.random() * 0.3,
      color: i % 2 === 0 ? '#8B5CF6' : '#06B6D4'
    }));
  }, []);

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float
          key={i}
          speed={1.2}
          rotationIntensity={0.5}
          floatIntensity={0.6}
        >
          {i % 2 === 0 ? (
            <Box
              position={shape.position}
              scale={shape.scale}
              rotation={shape.rotation}
            >
              <meshStandardMaterial 
                color={shape.color} 
                transparent 
                opacity={0.7}
                roughness={0.3}
                metalness={0.2}
              />
            </Box>
          ) : (
            <Sphere
              position={shape.position}
              scale={shape.scale}
              args={[1, 16, 16]}
            >
              <meshStandardMaterial 
                color={shape.color} 
                transparent 
                opacity={0.7}
                roughness={0.3}
                metalness={0.3}
              />
            </Sphere>
          )}
        </Float>
      ))}
    </group>
  );
};

// Animated particles background - reduced particle count for better performance
const ParticleField = () => {
  const mesh = useRef<THREE.Points>(null);
  
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 500; // Reduced from 1000
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

// Main 3D Scene component - optimized with performance settings
const Scene3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]} // Limit pixel ratio for better performance
        performance={{ min: 0.5 }} // Enable performance monitoring
        gl={{ antialias: false, powerPreference: "high-performance" }} // Disable antialiasing for speed
      >
        <Suspense fallback={null}>
          {/* Simplified Lighting */}
          <ambientLight intensity={0.4} color="#8B5CF6" />
          <directionalLight position={[5, 5, 5]} intensity={0.6} color="#06B6D4" />
          
          {/* 3D Elements */}
          <FloatingShapes />
          <ParticleField />
          
          {/* Interactive controls */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.4}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;