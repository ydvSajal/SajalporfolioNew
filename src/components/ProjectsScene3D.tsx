import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Animated floating symbols using simple geometries
const FloatingCodeSymbols = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const shapes = [
    { type: 'box', color: '#8B5CF6' },
    { type: 'sphere', color: '#06B6D4' },
    { type: 'cone', color: '#F59E0B' },
    { type: 'cylinder', color: '#10B981' },
    { type: 'octahedron', color: '#EF4444' },
    { type: 'tetrahedron', color: '#8B5CF6' },
    { type: 'torus', color: '#06B6D4' },
    { type: 'dodecahedron', color: '#F59E0B' }
  ];
  
  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => {
        const angle = (i / shapes.length) * Math.PI * 2;
        const radius = 3 + Math.sin(i) * 0.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(i * 0.7) * 2;
        
        return (
          <Float
            key={i}
            speed={0.5 + Math.random() * 0.5}
            rotationIntensity={0.3}
            floatIntensity={0.5}
          >
            <mesh position={[x, y, z]} scale={0.2 + Math.random() * 0.3}>
              {shape.type === 'box' && <boxGeometry args={[1, 1, 1]} />}
              {shape.type === 'sphere' && <sphereGeometry args={[1, 16, 16]} />}
              {shape.type === 'cone' && <coneGeometry args={[1, 2, 8]} />}
              {shape.type === 'cylinder' && <cylinderGeometry args={[1, 1, 2, 8]} />}
              {shape.type === 'octahedron' && <octahedronGeometry args={[1]} />}
              {shape.type === 'tetrahedron' && <tetrahedronGeometry args={[1]} />}
              {shape.type === 'torus' && <torusGeometry args={[1, 0.4, 8, 16]} />}
              {shape.type === 'dodecahedron' && <dodecahedronGeometry args={[1]} />}
              <meshStandardMaterial 
                color={shape.color} 
                transparent 
                opacity={0.7}
                emissive={shape.color}
                emissiveIntensity={0.1}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
};

// Rotating geometric grid
const GeometricGrid = () => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      {Array.from({ length: 20 }, (_, i) => {
        const x = (i % 5 - 2) * 2;
        const z = (Math.floor(i / 5) - 2) * 2;
        
        return (
          <Float
            key={i}
            speed={0.5}
            rotationIntensity={0.2}
            floatIntensity={0.3}
          >
            <mesh position={[x, 0, z]}>
              <boxGeometry args={[0.2, 0.2, 0.2]} />
              <meshStandardMaterial 
                color="#06B6D4" 
                transparent 
                opacity={0.6}
                wireframe={i % 2 === 0}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
};

// 3D Scene for Projects
const ProjectsScene3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Environment preset="night" />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} color="#8B5CF6" />
        <directionalLight position={[10, 10, 5]} intensity={0.6} color="#06B6D4" />
        <pointLight position={[-10, -10, -5]} intensity={0.4} color="#F59E0B" />
        
        {/* 3D Elements */}
        <FloatingCodeSymbols />
        <GeometricGrid />
        
        {/* Interactive controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
};

export default ProjectsScene3D;