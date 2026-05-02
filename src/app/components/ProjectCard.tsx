import React, { useRef, useEffect, useState, useMemo } from "react";
import { motion, useTransform, MotionValue } from "motion/react";

interface ProjectCardProps {
  image?: string;
  component?: React.ReactNode;
  columnY: MotionValue<number>;
  offset: number;
  laneId: number; // -2, -1, 1, 2
}

export function ProjectCard({ image, component, columnY, offset, laneId, id }: ProjectCardProps & { id: number }) {
  const [windowHeight, setWindowHeight] = useState(1000);
  const [windowWidth, setWindowWidth] = useState(1200);
  
  // Deterministic random values based on ID
  const randomX = useMemo(() => (id * 1337) % 60 - 30, [id]); // +/- 30px jitter
  const randomRotation = useMemo(() => (id * 97) % 20 - 10, [id]); // +/- 10deg extra rotation

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
      const handleResize = () => {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const width = 180;
  const height = 240;

  const y = useTransform(columnY, (latest) => latest + offset);

  // Motion Logic: "Hourglass" / ") (" shape
  // The cards should be wide at top/bottom and narrow in the middle.
  const x = useTransform(y, (currentY) => {
    const centerY = windowHeight * 0.5;
    const distFromCenter = Math.abs(currentY - centerY);
    const normalizedDist = distFromCenter / (windowHeight * 0.5); // 0 at center, 1 at edges

    // Base spacing between lanes (at the narrowest point - center)
    // We want the center (lane 0) to be at x=0.
    const laneBaseX = laneId * 110; 

    // Divergence factor: How much they spread out at the edges
    // We want them to spread significantly.
    const spread = normalizedDist * (windowWidth * 0.25); // Increased spread for more "suction" feel

    // Apply spread in the direction of the lane
    if (laneId === 0) return randomX * 0.5; // Center lane just jitters slightly

    return laneBaseX + (laneId > 0 ? spread : -spread) + randomX;
  });

  // Z-Position Logic: The "Crease"
  // Cards start close (Z=0), move deep into the void at center (Z=-500), and come back out (Z=0)
  const z = useTransform(y, (currentY) => {
      const centerY = windowHeight * 0.5;
      const dist = Math.abs(currentY - centerY);
      const normalizedDist = Math.min(dist / (windowHeight * 0.5), 1);
      
      // Map: Center (0) -> -1000px (Deep void)
      // Edges (1) -> 0px
      // We use a deeper Z to emphasize the "void"
      return -800 + (normalizedDist * 800);
  });
  
  // Blur Logic:
  // User requested: "Background fuzzy separated" in the middle area.
  // We apply a blur when the card is near the center.
  const filter = useTransform(y, (currentY) => {
    const centerY = windowHeight * 0.5;
    const distFromCenter = Math.abs(currentY - centerY);
    const blurRadius = Math.max(0, 10 - (distFromCenter / 40)); // Increased blur at center (deep in void)
    
    // Also fade out slightly in the void
    return `blur(${blurRadius}px)`;
  });

  // Scale Logic: Large -> Small -> Large
  // Close to center (0 dist) -> Small scale
  // Far from center (high dist) -> Large scale
  const scale = useTransform(y, (currentY) => {
    const centerY = windowHeight * 0.5;
    const distFromCenter = Math.abs(currentY - centerY);
    const normalizedDist = Math.min(distFromCenter / (windowHeight * 0.5), 1);
    
    // Middle scale: 0.6
    // Edge scale: 1.3
    return 0.6 + (normalizedDist * 0.7);
  });

  // Rotation Logic:
  // Strictly following the reference image:
  // Left Lanes (negative): Rotate Counter-Clockwise (-)
  // Right Lanes (positive): Rotate Clockwise (+)
  const rotateZ = useTransform(y, (currentY) => {
    const centerY = windowHeight * 0.5;
    
    // Base angle based on lane + random jitter
    const side = laneId === 0 ? (randomX > 0 ? 1 : -1) : laneId / Math.abs(laneId); // -1 or 1
    
    // Map Y: [windowHeight, 0] -> [45, 15]
    const progress = Math.max(0, Math.min(1, currentY / windowHeight)); // 0 at top, 1 at bottom
    const angle = 15 + (progress * 30); // 15 to 45
    
    return (side * angle) + randomRotation;
  });

  // Y-Rotation (Perspective Face)
  const rotateY = (laneId * -15) + (randomRotation * 0.5); // Enhanced curvature

  // X-Rotation (Vertical Tilt) - "Concave" / "Folded" effect
  // Top half tilts forward, Bottom half tilts backward.
  // This creates a "V" shape in depth where the center is furthest away.
  const rotateX = useTransform(y, (currentY) => {
    const centerY = windowHeight * 0.5;
    const progress = (currentY - centerY) / (windowHeight * 0.5);
    return progress * 60; // Increased angle to 60deg for stronger "plane" effect
  });

  // Transition: Wireframe -> Cover
  const triggerPoint = windowHeight * 0.5;
  const opacity = useTransform(
    y,
    [triggerPoint + 100, triggerPoint - 100],
    [0, 1]
  );
  
  const wireframeOpacity = useTransform(
    y,
    [triggerPoint + 100, triggerPoint - 100],
    [1, 0]
  );

  return (
    <motion.div
      style={{ 
        y, 
        x, 
        z,
        rotateZ,
        rotateX,
        rotateY,
        scale,
        filter,
        zIndex: Math.abs(laneId) 
      }} 
      className="absolute left-1/2 top-0 will-change-transform [transform-style:preserve-3d]"
    >
        <div 
            style={{ width, height, x: "-50%", y: "-50%" }} // Center the card on its point
            className="relative"
        >
            {/* Wireframe Layer - Styled like file icons/blueprints to match reference feel */}
            <motion.div 
                style={{ opacity: wireframeOpacity }}
                className="absolute inset-0 z-10 border border-white/20 rounded-2xl bg-black flex flex-col items-center justify-center p-6"
            >
                <div className="w-full h-full border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-3">
                    {/* Icon placeholder */}
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white/20 rounded-md" />
                    </div>
                    {/* Text lines */}
                    <div className="w-16 h-2 bg-white/10 rounded-full" />
                    <div className="w-10 h-2 bg-white/10 rounded-full" />
                    
                    <div className="mt-auto text-[10px] font-mono text-white/20 uppercase tracking-widest">
                        {laneId % 2 === 0 ? 'IMG' : 'DOC'}
                    </div>
                </div>
            </motion.div>

            {/* Image Layer */}
            <motion.div
                style={{ opacity }}
                className="absolute inset-0 z-20 overflow-hidden rounded-2xl bg-gray-900"
            >
                {component ? (
                  <div className="w-full h-full relative overflow-hidden">
                    {component}
                  </div>
                ) : (
                  <img 
                      src={image} 
                      alt="Project" 
                      className="w-full h-full object-cover"
                  />
                )}
                {/* Inner shadow/highlight for depth */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
            </motion.div>
        </div>
    </motion.div>
  );
}
