# Cinematic Dragon Portfolio - Implementation Guide

## Structure

```
src/
├── components/3d/
│   ├── CinematicCanvas.tsx    # Main R3F canvas with post-processing
│   ├── EffectControls.tsx     # Real-time visual effect tuning
│   └── ScrollController.tsx   # GSAP + Lenis smooth scroll
├── scenes/
│   ├── IntroScene.tsx         # Dark entrance, dragon eyes
│   ├── HeroScene.tsx          # Dragon 01 (Warm/Gold) orbits
│   ├── SkillsScene.tsx        # Both dragons, energy bridge
│   └── ContactScene.tsx       # Climax, merging energies
├── shaders/                   # GLSL custom shaders
├── assets/
│   └── videos/
│       ├── dragon-intro.mp4
│       └── dragon-eye-bg.mp4
```

## Key Features

- **Smooth Scroll**: Lenis + GSAP ScrollTrigger
- **Post-Processing**: Bloom, Chromatic Aberration
- **Video Textures**: Dragon videos mapped to 3D meshes
- **Performance**: `dpr={[1, 2]}`, `preserveDrawingBuffer`, `powerPreference`

## Running

```bash
npm run dev
```

## Next Steps

1. **Add more scenes**: AboutPage.tsx, ProjectsScene.tsx
2. **Custom GLSL shaders**: In `src/shaders/` directory
3. **Audio integration**: Ambient tracks per scene
4. **Mobile optimization**: Reduce particle count, disable post-processing

## Performance Tips

- Keep GPU particles under 200
- Use `useMemo` for materials
- Freeze static lights with `castShadow = false`
- Video textures: compress to 720p, 6-8 Mbps
