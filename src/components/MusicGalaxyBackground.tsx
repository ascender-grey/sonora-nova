"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

// Simple animated nebula background without custom shaders
function Nebula() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (meshRef.current && meshRef.current.material) {
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.1;
      // Type assertion for material opacity
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.3 + Math.sin(clock.getElapsedTime()) * 0.1;
    }
  });
  
  return (
    <mesh ref={meshRef} scale={[100, 100, 1]} position={[0, 0, -50]}>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial 
        color="#351b5a" 
        transparent 
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Additional nebula layers for depth
function NebulaLayer({ color, scale, speed }: { color: string; scale: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = clock.getElapsedTime() * speed;
      meshRef.current.position.x = Math.sin(clock.getElapsedTime() * speed * 0.5) * 2;
      meshRef.current.position.y = Math.cos(clock.getElapsedTime() * speed * 0.3) * 2;
    }
  });
  
  return (
    <mesh ref={meshRef} scale={[scale, scale, 1]} position={[0, 0, -45]}>
      <planeGeometry args={[3, 3]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Floating music letters with 3D effect
function FloatingLetters() {
  const groupRef = useRef<THREE.Group>(null!);
  const letters = ["♫", "♪", "♩", "♬", "𝄞", "𝄢"];
  
  const particles = useMemo(() => {
    const temp: { pos: [number, number, number]; letter: string; speed: number; rotation: [number, number, number] }[] = [];
    for (let i = 0; i < 80; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 60;
      const letter = letters[Math.floor(Math.random() * letters.length)];
      const speed = Math.random() * 0.02 + 0.01;
      const rotation: [number, number, number] = [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      ];
      temp.push({ pos: [x, y, z], letter, speed, rotation });
    }
    return temp;
  }, []);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });
  
  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <FloatingLetter 
          key={i} 
          position={particle.pos} 
          letter={particle.letter}
          speed={particle.speed}
          initialRotation={particle.rotation}
        />
      ))}
    </group>
  );
}

// Individual floating letter component
function FloatingLetter({ 
  position, 
  letter, 
  speed, 
  initialRotation 
}: { 
  position: [number, number, number]; 
  letter: string; 
  speed: number; 
  initialRotation: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed + position[0]) * 2;
      meshRef.current.rotation.z = initialRotation[2] + clock.getElapsedTime() * speed;
      
      // Gentle floating movement
      const time = clock.getElapsedTime();
      meshRef.current.position.x = position[0] + Math.sin(time * speed * 0.5) * 1;
      meshRef.current.position.z = position[2] + Math.cos(time * speed * 0.3) * 1;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 8, 8]} />
      <meshStandardMaterial 
        color={letter === "♫" || letter === "𝄞" ? "#E45A92" : "#FFACAC"} 
        emissive={letter === "♫" || letter === "𝄞" ? "#E45A92" : "#FFACAC"}
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

// Main background component
export default function MusicGalaxyBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 30], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#E45A92" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFACAC" />
        <directionalLight position={[0, 0, 5]} intensity={0.5} color="#E45A92" />
        
        {/* 3D Elements */}
        <Nebula />
        <NebulaLayer color="#dc5692" scale={80} speed={0.02} />
        <NebulaLayer color="#351b5a" scale={60} speed={-0.015} />
        <FloatingLetters />
        
        {/* Galaxy stars */}
        <Stars 
          radius={100} 
          depth={50} 
          count={3000} 
          factor={6} 
          saturation={0.8} 
          fade 
          speed={0.5}
        />
        
        {/* Auto-rotating camera controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.3}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}