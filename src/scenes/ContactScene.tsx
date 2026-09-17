import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function ContactScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Debug */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#ff6b00" emissiveIntensity={0.8} />
      </mesh>
      <ambientLight intensity={0.5} color="#ff6b00" />
    </group>
  );
}
