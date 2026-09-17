import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function AboutScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Debug */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff4500" />
      </mesh>
      <ambientLight intensity={0.5} color="#ff4500" />
    </group>
  );
}
