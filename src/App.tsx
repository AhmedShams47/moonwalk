import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CinematicCanvas } from "@/components/3d/CinematicCanvas";
import { ScrollController } from "@/components/3d/ScrollController";
import { IntroScene } from "@/scenes/IntroScene";
import { HeroScene } from "@/scenes/HeroScene";
import { AboutScene } from "@/scenes/AboutScene";
import { ProjectsScene } from "@/scenes/ProjectsScene";
import { SkillsScene } from "@/scenes/SkillsScene";
import { ContactScene } from "@/scenes/ContactScene";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import PackagesPage from "./pages/PackagesPage";

const queryClient = new QueryClient();

// Fixed background canvas that reacts to scroll
function CinematicBackground() {
  return (
    <CinematicCanvas>
      <Suspense fallback={null}>
        <IntroScene />
      </Suspense>
    </CinematicCanvas>
  );
}

// Scrollable content sections (now outside the fixed canvas)
function ScrollContent() {
  return (
    <>
      <div data-scroll data-start="0px" data-end="100vh" style={{ height: "100vh" }}>
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 10 }}>
          <h1 style={{ fontSize: "3rem", color: "#ff6b00", textShadow: "0 0 20px rgba(255, 107, 0, 0.5)", fontFamily: "Cinzel" }}>PIXEL HUNTER</h1>
        </div>
      </div>
      <div data-scroll data-start="100px" data-end="100vh" style={{ height: "100vh" }} />
      <div data-scroll data-start="100px" data-end="100vh" style={{ height: "100vh" }} />
      <div data-scroll data-start="100px" data-end="100vh" style={{ height: "100vh" }} />
      <div data-scroll data-start="100px" data-end="100vh" style={{ height: "100vh" }} />
      <div data-scroll data-start="100px" data-end="100vh" style={{ height: "100vh" }} />
    </>
  );
}

function PageRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<><ScrollContent /><ScrollController /></>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CinematicBackground />
        <PageRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
