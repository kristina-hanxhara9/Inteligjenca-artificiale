import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const AlbaniaMap = () => {
  const groupRef = useRef<THREE.Group>(null!);

  // Simplified Albania Outline
  const borderPoints = useMemo(() => {
    const coords = [
        [0.0, 2.8], [0.4, 2.6], [0.8, 2.2], [1.0, 1.8], [1.2, 1.2],
        [1.1, 0.5], [1.3, 0.0], [1.4, -0.5], [1.5, -1.0], [1.3, -1.5],
        [1.1, -2.0], [0.8, -2.5], [0.5, -2.8], [0.2, -3.2], [-0.1, -3.4],
        [-0.4, -3.0], [-0.6, -2.6], [-0.9, -2.2], [-1.2, -1.5], [-0.8, -1.2],
        [-1.0, -0.5], [-1.2, 0.0], [-1.3, 0.5], [-1.4, 0.8], [-1.2, 1.2],
        [-1.1, 1.5], [-1.0, 2.0], [-0.6, 2.4], [-0.3, 2.7], [0.0, 2.8]
    ];
    return coords.map(p => new THREE.Vector3(p[0] * 0.9, p[1] * 0.9, 0));
  }, []);

  // Neural Network Connections (Abstract Cities)
  const connections = useMemo(() => {
     // Tirana center
     const center = new THREE.Vector3(-0.1, 0.2, 0);
     const hubs = [
         new THREE.Vector3(-1.1, 0.6, 0), // Durres
         new THREE.Vector3(-0.8, 2.1, 0), // Shkoder
         new THREE.Vector3(-0.8, -1.8, 0), // Vlore
         new THREE.Vector3(1.1, -2.0, 0), // Korce
         new THREE.Vector3(1.0, 1.5, 0), // Kukes
     ];
     return hubs.map(hub => ({ start: center, end: hub }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* 1. Main Outline */}
      <Line 
        points={borderPoints} 
        color="#1a1a1a" 
        lineWidth={3} 
        transparent 
        opacity={0.8} 
      />
      
      {/* 2. Abstract "Double Headed Eagle" Geometric Center */}
      {/* Low poly stylized representation using lines */}
      <group position={[-0.1, 0.2, 0]} scale={0.5}>
         <Line 
            points={[
                [-1, 1, 0], [0, -1, 0], [1, 1, 0], // Wings V shape
                [0, -1, 0], [0, 2, 0], // Body vertical
                [-0.5, 1.5, 0], [-0.8, 2.2, 0], // Left Head
                [0.5, 1.5, 0], [0.8, 2.2, 0] // Right Head
            ]}
            color="#DC2626"
            lineWidth={2}
            transparent
            opacity={0.6}
         />
      </group>

      {/* 3. Neural Connections (The "Brain" of Albania) */}
      {connections.map((conn, i) => (
         <Line 
            key={i}
            points={[conn.start, conn.end]}
            color="#DC2626"
            lineWidth={1}
            transparent
            opacity={0.3}
            dashed={true}
            dashScale={10}
         />
      ))}

      {/* 4. City Nodes */}
      {connections.map((conn, i) => (
         <group key={`node-${i}`} position={conn.end}>
             <Sphere args={[0.08, 8, 8]}>
                 <meshBasicMaterial color="#1a1a1a" />
             </Sphere>
             <Sphere args={[0.12, 8, 8]}>
                 <meshBasicMaterial color="#DC2626" transparent opacity={0.3} />
             </Sphere>
         </group>
      ))}

      {/* Central Hub (Tirana) - Pulsing */}
      <group position={[-0.1, 0.2, 0]}>
         <Sphere args={[0.15, 16, 16]}>
             <meshBasicMaterial color="#DC2626" />
         </Sphere>
      </group>

    </group>
  );
};

export default AlbaniaMap;