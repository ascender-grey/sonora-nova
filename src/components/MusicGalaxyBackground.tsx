"use client";

import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Stars, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

// TypeScript declarations for extended materials
declare global {
  namespace JSX {
    interface IntrinsicElements {
      nebulaMaterial: any;
    }
  }
}

// Nebula shader material for swirling clouds
const NebulaMaterial = shaderMaterial(
  { 
    time: 0, 
    color1: new THREE.Color("#351b5a"), // Deep purple
    color2: new THREE.Color("#dc5692")  // Pink
  },
  // Vertex shader
  `varying vec2 vUv;
   void main() {
     vUv = uv;
     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
   }`,
  // Fragment shader with noise for nebula effect
  `varying vec2 vUv;
   uniform float time;
   uniform vec3 color1;
   uniform vec3 color2;
   
   float random(vec2 st) {
     return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
   }
   
   float noise(vec2 st) {
     vec2 i = floor(st);
     vec2 f = fract(st);
     float a = random(i);
     float b = random(i + vec2(1.0, 0.0));
     float c = random(i + vec2(0.0, 1.0));
     float d = random(i + vec2(1.0, 1.0));
     vec2 u = f * f * (3.0 - 2.0 * f);
     return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
   }
   
   void main() {
     vec2 st = vUv * 3.0 + time * 0.1;
     float n1 = noise(st);
     float n2 = noise(st * 2.0 + time * 0.05);
     float n = mix(n1, n2, 0.5);
     
     vec3 color = mix(color1, color2, n);
     gl_FragColor = vec4(color, 0.8);
   }`
);

extend({ NebulaMaterial });

// Animated nebula background
function Nebula() {
  const ref = useRef<any>();
  
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.time = clock.getElapsedTime();
    }
  });
  
  return (
    <mesh scale={[100, 100, 1]} position={[0, 0, -50]}>
      <planeGeometry args={[2, 2]} />
      <nebulaMaterial ref={ref} transparent />
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
      <boxGeometry args={[1, 1, 0.2]} />
      <meshStandardMaterial 
        color={letter === "♫" || letter === "𝄞" ? "#E45A92" : "#FFACAC"} 
        emissive={letter === "♫" || letter === "𝄞" ? "#E45A92" : "#FFACAC"}
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
      {/* Text overlay */}
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
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