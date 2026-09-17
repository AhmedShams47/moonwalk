import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ContactScene() {
  const finaleGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (finaleGroupRef.current) {
      const time = state.clock.getElapsedTime();
      finaleGroupRef.current.position.y = Math.sin(time * 1.5) * 0.3 + 1;
      finaleGroupRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <group ref={finaleGroupRef} position={[0, 1, 0]}>
      {/* Merging energy sphere */}
      <mesh>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.9}
          roughness={0.1}
          emissive={0xff6b00}
          emissiveIntensity={1}
          clearcoat={1}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshBasicMaterial color="#00bfff" />
      </mesh>

      {/* Particle explosion */}
      <group>
        {[...Array(100)].map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 8,
            ]}
          >
            <sphereGeometry args={[0.03, 4, 4]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? "#ff6b00" : i % 3 === 1 ? "#00bfff" : "#ffffff"}
              opacity={0.8}
              transparent
            />
          </mesh>
        ))}
      </group>

      {/* Spotlights */}
      <spotLight position={[0, 5, 0]} angle={0.5} penumbra={1} intensity={3} color="#ff6b00" />
      <spotLight position={[0, -3, 2]} angle={0.5} penumbra={1} intensity={2} color="#00bfff" />
    </group>
  );
}
