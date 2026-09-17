import { Canvas } from "@react-three/fiber";

interface CinematicCanvasProps {
  children: React.ReactNode;
}

export function CinematicCanvas({ children }: CinematicCanvasProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{
        antialias: true,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
      }}
    >
      {children}
    </Canvas>
  );
}
