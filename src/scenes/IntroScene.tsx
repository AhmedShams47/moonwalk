import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useVideoTexture } from "@react-three/drei";
import * as THREE from "three";
import { MeshPhysicalMaterial } from "three";
import { gsap } from "gsap";
import { useEffect } from "react";

export function IntroScene() {
  const groupRef = useRef<THREE.Group>(null);
  const eyesRef = useRef<THREE.Mesh>(null);

  // Load dragon eye video
  const texture = useVideoTexture("/videos/dragon-eye-bg.mp4");
  
  const eyeMaterial = useMemo(() => {
    return new MeshPhysicalMaterial({
      color: 0x000000,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0xff4500,
      emissiveIntensity: 0.8,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
  }, []);

  useEffect(() => {
    // Initial entrance animation
    if (groupRef.current) {
      gsap.from(groupRef.current.position, {
        y: 2,
        opacity: 0,
        duration: 2,
        ease: "power3.out",
      });
    }
  }, []);

  useFrame((state) => {
    // Gentle float
    if (eyesRef.current) {
      eyesRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dragon eye close-up */}
      <mesh ref={eyesRef} material={eyeMaterial}>
        <sphereGeometry args={[0.5, 64, 64]} />
      </mesh>
      {/* Ambient particles */}
      <pointLight position={[0, 0, 2]} intensity={2} color="#ff6b00" distance={5} />
      {/* Video texture overlay placeholder */}
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial map={texture} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
