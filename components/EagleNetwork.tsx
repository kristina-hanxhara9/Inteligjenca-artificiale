
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const EagleNetwork = () => {
  const groupRef = useRef<THREE.Group>(null!);

  const eaglePoints = useMemo(() => {
    const p = [
      [0, -1.5, 0], [0, 1.5, 0], 
      [0, 1.5, 0], [-0.3, 1.8, 0], [-0.6, 1.6, 0], [-0.4, 1.2, 0],
      [0, 1.5, 0], [0.3, 1.8, 0], [0.6, 1.6, 0], [0.4, 1.2, 0],
      [0, 0.5, 0], [-1.5, 1.2, 0], [-2.5, 0.8, 0], 
      [-2.5, 0.8, 0], [-1.8, 0.2, 0], [-2.2, -0.2, 0], [-1.5, -0.5, 0], [-0.5, -0.5, 0],
      [0, 0.5, 0], [1.5, 1.2, 0], [2.5, 0.8, 0],
      [2.5, 0.8, 0], [1.8, 0.2, 0], [2.2, -0.2, 0], [1.5, -0.5, 0], [0.5, -0.5, 0],
      [0, -1.5, 0], [-0.8, -2.5, 0], [0.8, -2.5, 0], [0, -1.5, 0]
    ];
    return p.map(c => new THREE.Vector3(c[0], c[1], c[2]));
  }, []);

  const lineGeometry = useMemo(() => {
     const points: number[] = [];
     for (let i = 0; i < eaglePoints.length - 1; i++) {
        // Main connections
        points.push(eaglePoints[i].x, eaglePoints[i].y, eaglePoints[i].z);
        points.push(eaglePoints[i+1].x, eaglePoints[i+1].y, eaglePoints[i+1].z);
        
        // Random cross connections to create the "Network" effect
        if (i + 2 < eaglePoints.length && Math.random() > 0.5) {
             points.push(eaglePoints[i].x, eaglePoints[i].y, eaglePoints[i].z);
             points.push(eaglePoints[i+2].x, eaglePoints[i+2].y, eaglePoints[i+2].z);
        }
     }
     // Structural lines: Wing tips to center for stability visual
     points.push(-2.5, 0.8, 0, 0, 0, 0);
     points.push(2.5, 0.8, 0, 0, 0, 0);
     
     const geo = new THREE.BufferGeometry();
     geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
     return geo;
  }, [eaglePoints]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef} scale={1.3}>
      {/* 1. Wireframe Network Structure using Native LineSegments (High Performance, No Crash) */}
      <lineSegments geometry={lineGeometry}>
         <lineBasicMaterial color="#DC2626" transparent opacity={0.6} />
      </lineSegments>

      {/* 2. Nodes */}
      {eaglePoints.map((point, i) => (
         <group key={i} position={point}>
             <Sphere args={[0.08, 8, 8]}>
                 <meshBasicMaterial color="#DC2626" />
             </Sphere>
         </group>
      ))}

      {/* 3. Central Core "Brain" */}
      <group position={[0, 0, 0]}>
         <Sphere args={[0.4, 16, 16]}>
             <meshBasicMaterial color="#000000" wireframe />
         </Sphere>
         <Sphere args={[0.2, 16, 16]}>
             <meshBasicMaterial color="#DC2626" />
         </Sphere>
      </group>
    </group>
  );
};

export default EagleNetwork;
