import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function HeroScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Debug - rotating wireframe sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#ffa500" wireframe />
      </mesh>
      <ambientLight intensity={0.5} color="#ffa500" />
    </group>
  );
}
