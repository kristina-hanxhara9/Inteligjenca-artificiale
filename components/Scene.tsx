import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  
  // Create particles
  const count = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create a sphere distribution
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 10 + Math.random() * 20; // Radius

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    const red = new THREE.Color('#DC2626');
    const white = new THREE.Color('#FFFFFF');
    
    for (let i = 0; i < count; i++) {
      // Mix red and white
      const color = Math.random() > 0.5 ? red : white;
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return cols;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors
        />
      </Points>
    </group>
  );
}

function ConnectingLines() {
   const groupRef = useRef<THREE.Group>(null!);
   
   useFrame((state) => {
     if(groupRef.current) {
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
     }
   })

   return (
    <group ref={groupRef}>
       {/* Abstract geometry to represent structure/order amidst chaos */}
       <mesh rotation={[0.5, 0.5, 0]}>
         <icosahedronGeometry args={[4, 1]} />
         <meshBasicMaterial color="#DC2626" wireframe transparent opacity={0.1} />
       </mesh>
       <mesh rotation={[-0.5, -0.5, 0]}>
         <icosahedronGeometry args={[6, 1]} />
         <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} />
       </mesh>
    </group>
   )
}

const Scene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 bg-black pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <fog attach="fog" args={['#000000', 5, 30]} />
        <ParticleField />
        <ConnectingLines />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black pointer-events-none" />
    </div>
  );
};

export default Scene;