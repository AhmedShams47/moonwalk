import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function IntroScene() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      {/* Debug sphere - visible orange ball */}
      <mesh ref={sphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#ff6b00" emissive="#ff6b00" emissiveIntensity={0.5} />
      </mesh>
      {/* Ambient light */}
      <pointLight position={[0, 0, 5]} intensity={2} color="#ff6b00" />
    </group>
  );
}
