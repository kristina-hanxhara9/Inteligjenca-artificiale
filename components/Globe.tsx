import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Html, QuadraticBezierLine, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Constants
const GLOBE_RADIUS = 2.2;
const ALBANIA_COORDS = { lat: 41.15, lon: 20.17 }; // Tirana
// Connecting to tech hubs/standards
const CONNECTION_POINTS = [
  { name: 'London', lat: 51.50, lon: -0.12 }, // UK Education
  { name: 'New York', lat: 40.71, lon: -74.00 }, // Global Std
  { name: 'Zurich', lat: 47.37, lon: 8.54 }, // European Tech
  { name: 'Dubai', lat: 25.20, lon: 55.27 }, // Innovation
];

// Helper to convert lat/lon to 3D position (Standard mapping)
const getPosition = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  return new THREE.Vector3(x, y, z);
};

interface PulsingMarkerProps {
  position: THREE.Vector3;
  delay?: number;
  color?: string;
  scale?: number;
}

const PulsingMarker: React.FC<PulsingMarkerProps> = ({ position, delay = 0, color = "#DC2626", scale = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current || !meshRef.current) return;
    
    const t = (state.clock.elapsedTime + delay) % 2; // 2 second cycle
    
    // Ring expansion
    if (t < 1.5) {
        ringRef.current.scale.setScalar(t * 1.5 * scale);
        (ringRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - t/1.5);
    } else {
        ringRef.current.scale.setScalar(0);
        (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0;
    }
  });

  return (
    <group position={position} lookAt={new THREE.Vector3(0,0,0)}>
      {/* Dot */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.04 * scale, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      {/* Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05 * scale, 0.06 * scale, 32]} />
        <meshBasicMaterial color={color} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

interface ConnectionArcProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  hovered: boolean;
}

const ConnectionArc: React.FC<ConnectionArcProps> = ({ start, end, hovered }) => {
  const mid = useMemo(() => {
    const v = start.clone().add(end).normalize().multiplyScalar(GLOBE_RADIUS + (hovered ? 1.8 : 1.2));
    return v;
  }, [start, end, hovered]);

  return (
    <QuadraticBezierLine
      start={start}
      end={end}
      mid={mid}
      color={hovered ? "#ffffff" : "#DC2626"}
      lineWidth={hovered ? 2 : 1}
      transparent
      opacity={hovered ? 0.8 : 0.2}
      dashed={false} // Solid lines look more professional/stable
    />
  );
};

export const Globe = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHover] = useState(false);
  
  // Change cursor on hover
  useCursor(hovered);

  const albaniaPos = useMemo(() => getPosition(ALBANIA_COORDS.lat, ALBANIA_COORDS.lon, GLOBE_RADIUS), []);
  
  const connections = useMemo(() => CONNECTION_POINTS.map(city => ({
    ...city,
    pos: getPosition(city.lat, city.lon, GLOBE_RADIUS)
  })), []);

  // Animate rotation
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Base rotation - slows down on hover
      const targetSpeed = hovered ? 0.05 : 0.15;
      groupRef.current.rotation.y += delta * targetSpeed;
    }
  });

  // GSAP Animation on mount
  useEffect(() => {
    if(groupRef.current) {
        groupRef.current.scale.set(0,0,0);
        gsap.to(groupRef.current.scale, {
            x: 1, y: 1, z: 1,
            duration: 2,
            ease: "elastic.out(1, 0.75)"
        });
    }
  }, []);

  return (
    <group 
      ref={groupRef} 
      rotation={[0.3, -0.2, 0]} // Initial tilt
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -5, -5]} intensity={1} color="#DC2626" />

      {/* Main Globe Sphere */}
      <Sphere args={[GLOBE_RADIUS, 64, 64]}>
        <meshPhysicalMaterial
          color="#050505"
          metalness={0.8}
          roughness={0.3}
          clearcoat={0.5}
          emissive="#1a0505"
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Wireframe Overlay - Tech feel */}
      <Sphere args={[GLOBE_RADIUS + 0.01, 32, 32]}>
        <meshBasicMaterial
          color="#303030"
          wireframe
          transparent
          opacity={0.1}
        />
      </Sphere>

      {/* Albania Marker - The Hub */}
      <PulsingMarker position={albaniaPos} scale={1.5} color="#DC2626" />
      
      {/* Label for Albania */}
      <group position={albaniaPos}>
         <Html distanceFactor={15} position={[0.1, 0.1, 0]} style={{ pointerEvents: 'none' }}>
            <div className={`transition-all duration-300 ${hovered ? 'opacity-100 transform translate-x-2' : 'opacity-70'}`}>
                <div className="flex items-center gap-2">
                    <div className="h-[1px] w-4 bg-red-600"></div>
                    <span className="text-xs font-bold text-white bg-black/80 px-2 py-1 border-l-2 border-red-600">
                        TIRANA HQ
                    </span>
                </div>
            </div>
         </Html>
      </group>

      {/* Connection Points & Arcs */}
      {connections.map((city, idx) => (
        <React.Fragment key={idx}>
            <PulsingMarker position={city.pos} delay={idx * 0.5} scale={0.8} color="#ffffff" />
            <ConnectionArc start={albaniaPos} end={city.pos} hovered={hovered} />
        </React.Fragment>
      ))}

      {/* Expanding Tech Network (Particles on surface) */}
      {/* We simulate 'expansion' by having random red dots fade in/out near Albania */}
      <group>
         {Array.from({ length: 20 }).map((_, i) => {
             // Random pos near Albania
             const spread = 0.5;
             const lat = ALBANIA_COORDS.lat + (Math.random() - 0.5) * 10 * spread;
             const lon = ALBANIA_COORDS.lon + (Math.random() - 0.5) * 10 * spread;
             const pos = getPosition(lat, lon, GLOBE_RADIUS);
             return <PulsingMarker key={i} position={pos} delay={Math.random() * 2} scale={0.3} color="#ff3333" />
         })}
      </group>
      
      {/* Outer Atmosphere Glow */}
      <mesh scale={[1.1, 1.1, 1.1]}>
        <sphereGeometry args={[GLOBE_RADIUS, 32, 32]} />
        <meshBasicMaterial color="#DC2626" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>

    </group>
  );
};

export default Globe;