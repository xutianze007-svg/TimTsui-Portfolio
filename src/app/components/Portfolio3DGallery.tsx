import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'motion/react';

interface ProjectData {
  id: string;
  title: string;
  category: string;
  image: string;
  hoverVideo?: string;
  hoverImage?: string;
}

interface Portfolio3DGalleryProps {
  projects: ProjectData[];
  onProjectClick: (id: string) => void;
}

function CarouselItem({ 
  item, index, count, radius, onClick, currentRotation 
}: { 
  item: ProjectData; index: number; count: number; radius: number; onClick: () => void; currentRotation: any 
}) {
  const [hovered, setHovered] = useState(false);
  
  const angleRad = (index / count) * Math.PI * 2;
  const angleDeg = (index / count) * 360;
  
  const x = Math.sin(angleRad) * radius;
  const z = Math.cos(angleRad) * radius;
  // +180 so it faces the center (outward from origin, viewer is inside looking out, or viewer is outside looking in)
  const rotationY = angleDeg + 180; 

  const visibility = useTransform(currentRotation, (rotVal: number) => {
      const rRad = (rotVal * Math.PI) / 180;
      const worldZ = -x * Math.sin(rRad) + z * Math.cos(rRad);
      // Hide the near side of the carousel to see the far side
      return worldZ > 100 ? "hidden" : "visible";
  });

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -320,
        marginTop: -180,
        width: 640,
        height: 360,
        x,
        y: 0,
        z,
        rotateY: rotationY,
        visibility
      }}
      initial={{ scale: 1 }}
      animate={{ scale: hovered ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="cursor-pointer group select-none"
    >
      <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
          {hovered && item.hoverVideo ? (
            <video 
              src={item.hoverVideo} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover shadow-[0_0_20px_rgba(0,0,0,0.8)] bg-[#111]"
            />
          ) : (
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover shadow-[0_0_20px_rgba(0,0,0,0.8)] bg-[#111]"
            />
          )}

          {/* Text Info - Floating slightly in front */}
          <div 
            className="absolute left-0 w-full flex flex-col items-center justify-center text-center pointer-events-none"
            style={{ 
                top: '116%', 
                transform: 'translateZ(20px)',
            }}
          >
            <div 
                className="text-[30px] font-sans text-white tracking-[0.2em] uppercase"
                style={{ 
                    WebkitTextStroke: '0.5px black', 
                    textShadow: '0 4px 10px rgba(0,0,0,0.8)' 
                }}
            >
              {item.title}
            </div>
            <div 
                className="text-[14px] font-sans text-[#aaa] mt-1 tracking-[0.1em] uppercase"
                style={{ 
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)' 
                }}
            >
              {item.category}
            </div>
          </div>
      </div>
    </motion.div>
  );
}

export function Portfolio3DGallery({ projects, onProjectClick }: Portfolio3DGalleryProps) {
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { damping: 30, stiffness: 100, mass: 1 });
  
  const itemWidth = 720; 
  const radius = Math.max((projects.length * itemWidth) / (2 * Math.PI), 650);

  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const startRotation = useRef(0);

  const handleWheel = (e: React.WheelEvent) => {
    const sensitivity = 0.1;
    rotation.set(rotation.get() - e.deltaY * sensitivity);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.clientX;
    startRotation.current = rotation.get();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const deltaX = e.clientX - startX.current;
    if (Math.abs(deltaX) > 5) {
      hasDragged.current = true;
    }
    const sensitivity = 0.3;
    rotation.set(startRotation.current + deltaX * sensitivity);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerLeave = () => {
    isDragging.current = false;
  };

  const handleProjectClick = (id: string) => {
    if (hasDragged.current) return;
    onProjectClick(id);
  };

  return (
    <div 
        className="w-full h-screen bg-[#000000] absolute top-0 left-0 z-0 touch-none overflow-hidden cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
    >
      <div 
         className="w-full h-full flex items-center justify-center pointer-events-none"
         style={{ perspective: 1800, transformStyle: 'preserve-3d' }}
      >
        <motion.div
           style={{ 
               rotateY: smoothRotation, 
               transformStyle: 'preserve-3d',
               width: 0,
               height: 0
           }}
           className="relative pointer-events-auto"
        >
          {projects.map((project, i) => (
            <CarouselItem
              key={project.id}
              index={i}
              count={projects.length}
              item={project}
              radius={radius}
              onClick={() => handleProjectClick(project.id)}
              currentRotation={smoothRotation}
            />
          ))}
        </motion.div>
      </div>
      
      {/* UI Overlays */}
      <div className="absolute top-8 left-8 text-white font-sans text-xs tracking-widest z-50 pointer-events-none mix-blend-difference opacity-70">
        TIMTSUI
      </div>
      <div className="absolute top-8 right-8 text-white font-sans text-xs tracking-widest z-50 pointer-events-none mix-blend-difference opacity-70">
        MENU
      </div>
      <div className="absolute bottom-8 left-8 text-white font-sans text-xs tracking-widest z-50 pointer-events-none mix-blend-difference opacity-70">
        2026
      </div>
      <div className="absolute bottom-8 right-8 text-white font-sans text-xs tracking-widest z-50 pointer-events-none mix-blend-difference opacity-70">
        SELECTED WORKS
      </div>
      
      {/* Scroll Hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 text-[10px] tracking-[0.3em] font-sans pointer-events-none uppercase whitespace-nowrap">
        Drag or Scroll to Rotate
      </div>
    </div>
  );
}
