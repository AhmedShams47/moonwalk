import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { VideoTexture, Float } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

export function SkillsScene() {
  const designGroupRef = useRef<THREE.Group>(null); // Dragon 01 - Warm
  const techGroupRef = useRef<THREE.Group>(null);  // Dragon 02 - Cool

  const fireVideo = useLoader(VideoTexture, "/videos/dragon-intro.mp4");

  // Hologram shader for Dragon 02
  const holoShader = useMemo(() => ({
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
        vec3 color = vec3(0.0, 0.8, 1.0);
        float strength = cos(vUv.y * 20.0 + time) * 0.5 + 0.5;
        gl_FragColor = vec4(color * strength, 1.0);
      }
    `,
  }), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Design dragon orbit
    if (designGroupRef.current) {
      designGroupRef.current.position.x = Math.sin(time * 0.5) * 2;
      designGroupRef.current.position.y = Math.sin(time * 0.3) * 1;
    }

    // Tech dragon counter-rotation
    if (techGroupRef.current) {
      techGroupRef.current.position.x = Math.cos(time * 0.5) * 2;
      techGroupRef.current.position.y = Math.cos(time * 0.3) * 1;
    }
  });

  return (
    <group>
      {/* Dragon 01 - Design (Warm) */}
      <group ref={designGroupRef}>
        <Float speed={3} rotationIntensity={0.3} floatIntensity={0.5}>
          <mesh>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshPhysicalMaterial
              map={fireVideo}
              color="#ff6b00"
              metalness={0.6}
              roughness={0.4}
              emissive={0xff4500}
              emissiveIntensity={0.6}
            />
          </mesh>
        </Float>
      </group>

      {/* Dragon 02 - Tech (Cool) */}
      <group ref={techGroupRef}>
        <Float speed={4} rotationIntensity={0.5} floatIntensity={0.8}>
          <mesh>
            <icosahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial
              color="#00bfff"
              metalness={0.8}
              roughness={0.2}
              emissive={0x00ffff}
              emissiveIntensity={0.5}
              wireframe
            />
          </mesh>
        </Float>
      </group>

      {/* Energy bridge between dragons */}
      <line>
        <bufferGeometry />
        <lineBasicMaterial color="#ffffff" opacity={0.3} transparent />
      </line>

      {/* Particles */}
      <group position={[0, 0, 0]}>
        {[...Array(50)].map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
          >
            <sphereGeometry args={[0.05, 4, 4]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#ff6b00" : "#00bfff"} opacity={0.6} transparent />
          </mesh>
        ))}
      </group>
    </group>
  );
}
