import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

interface CinematicCanvasProps {
  children: React.ReactNode;
}

export function CinematicCanvas({ children }: CinematicCanvasProps) {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
