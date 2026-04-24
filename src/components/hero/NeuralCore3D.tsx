import * as React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ──────────────────────────────────────────────
   Rotating wireframe icosahedron "Neural Core"
────────────────────────────────────────────── */
function Core() {
  const mesh = React.useRef<THREE.Mesh>(null!);
  const glow = React.useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.15;
      mesh.current.rotation.y += delta * 0.2;
    }
    if (glow.current) {
      glow.current.rotation.x -= delta * 0.08;
      glow.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group>
      {/* Small emissive nucleus - tiny sphere for the "core pulse" */}
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial
          color={'#d8ff3d'}
          emissive={'#d8ff3d'}
          emissiveIntensity={1.2}
          metalness={0.2}
          roughness={0.4}
        />
      </mesh>

      {/* Wireframe icosahedron */}
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.05, 2]} />
        <meshBasicMaterial color={'#d8ff3d'} wireframe transparent opacity={0.45} />
      </mesh>

      {/* Outer glow icosahedron */}
      <mesh ref={glow}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color={'#ffa14a'} wireframe transparent opacity={0.13} />
      </mesh>
    </group>
  );
}

/* ──────────────────────────────────────────────
   Orbital rings
────────────────────────────────────────────── */
function OrbitRing({
  radius,
  tilt,
  speed,
  color = '#d8ff3d',
  opacity = 0.35,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color?: string;
  opacity?: number;
}) {
  const ref = React.useRef<THREE.Group>(null!);
  const particle = React.useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });

  return (
    <group ref={ref} rotation={tilt}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.006, 8, 128]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>
      {/* A travelling dot on the ring */}
      <mesh ref={particle} position={[radius, 0, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

/* ──────────────────────────────────────────────
   Starfield nebula background
────────────────────────────────────────────── */
function Starfield({ count = 600 }: { count?: number }) {
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  const ref = React.useRef<THREE.Points>(null!);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

/* ──────────────────────────────────────────────
   Scene wrapper
────────────────────────────────────────────── */
export const NeuralCore3D: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={1} color="#d8ff3d" />
      <pointLight position={[-4, -2, 2]} intensity={0.6} color="#ffa14a" />

      <Starfield />

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <Core />
      </Float>

      <OrbitRing radius={1.8} tilt={[Math.PI / 3.2, 0.2, 0]} speed={0.25} color="#d8ff3d" opacity={0.5} />
      <OrbitRing radius={2.3} tilt={[-Math.PI / 4, 0.5, 0.3]} speed={-0.18} color="#ffa14a" opacity={0.38} />
      <OrbitRing radius={2.9} tilt={[Math.PI / 2.2, -0.3, 0.6]} speed={0.12} color="#8aa9ff" opacity={0.28} />
    </Canvas>
  );
};
