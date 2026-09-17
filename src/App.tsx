import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CinematicCanvas } from "@/components/3d/CinematicCanvas";
import { ScrollController } from "@/components/3d/ScrollController";
import { EffectControls } from "@/components/3d/EffectControls";
import { IntroScene } from "@/scenes/IntroScene";
import { HeroScene } from "@/scenes/HeroScene";
import { SkillsScene } from "@/scenes/SkillsScene";
import { ContactScene } from "@/scenes/ContactScene";

const queryClient = new QueryClient();

const CinematicView = () => {
  const location = useLocation();

  return (
    <CinematicCanvas>
      <Suspense fallback={null}>
        <IntroScene />
      </Suspense>
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
      <Suspense fallback={null}>
        <SkillsScene />
      </Suspense>
      <Suspense fallback={null}>
        <ContactScene />
      </Suspense>
    </CinematicCanvas>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<CinematicView />} />
        {/* Add other routes if needed */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollController />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
