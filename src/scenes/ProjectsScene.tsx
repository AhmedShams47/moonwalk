import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function ProjectsScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Debug */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#ffd700" wireframe />
      </mesh>
      <ambientLight intensity={0.5} color="#ffd700" />
    </group>
  );
}
