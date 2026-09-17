import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { VideoTexture, Float } from "@react-three/drei";
import * as THREE from "three";
import { MeshPhysicalMaterial } from "three";
import { gsap } from "gsap";

export function HeroScene() {
  const dragonGroupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Warm gold dragon energy
  const fireShader = useMemo(() => {
    // In production, load from external .glsl file
    return {
      vertex: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          vec3 color = vec3(1.0, 0.5, 0.0);
          float strength = sin(vUv.x * 10.0 + time) * 0.5 + 0.5;
          gl_FragColor = vec4(color * strength, 1.0);
        }
      `,
    };
  }, []);

  // Load intro video as texture
  const videoTexture = useLoader(VideoTexture, "/videos/dragon-intro.mp4");

  useFrame((state) => {
    if (dragonGroupRef.current) {
      const time = state.clock.getElapsedTime();
      // Dragon orbit around camera
      dragonGroupRef.current.position.x = Math.sin(time * 0.3) * 3;
      dragonGroupRef.current.position.z = Math.cos(time * 0.3) * 3;
      dragonGroupRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <group ref={dragonGroupRef}>
      {/* Dragon silhouette using video */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshPhysicalMaterial
            map={videoTexture}
            metalness={0.7}
            roughness={0.3}
            clearcoat={1}
            emissive={0xff4500}
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      {/* Warm ambient light */}
      <pointLight
        ref={lightRef}
        position={[0, 1, 0]}
        intensity={1.5}
        color="#ff8c00"
        distance={10}
        decay={2}
      />

      {/* Fog particles */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial transparent opacity={0.1} color="#2a1a0a" />
      </mesh>
    </group>
  );
}
