import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { BackgroundScroller } from "./BackgroundScroller";

interface LandingPageProps {
  onNavigate: () => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const textOpacity = useTransform(x, [0, 150], [1, 0]);
  
  const handleDragEnd = () => {
    const currentX = x.get();
    const width = constraintsRef.current?.offsetWidth || 0;
    // Threshold to trigger is roughly 80% of the slider track width minus the thumb width
    // We'll use a conservative pixel value based on the max-w-sm (24rem/384px)
    if (currentX > width * 0.6) { 
       onNavigate();
    } else {
       animate(x, 0, { type: "spring", stiffness: 400, damping: 40 });
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Background Animation */}
      <BackgroundScroller />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-6 relative">
          <h1 
            className="flex flex-col items-center leading-none cursor-default transition-all duration-300"
            style={{ filter: "url(#wave-noise)" }}
          >
            <span className="text-2xl sm:text-4xl md:text-6xl font-serif italic font-light text-white/90 self-start md:ml-12 mb-2 transform -rotate-2">
              Crafting
            </span>
            <span className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter bg-gradient-to-r from-[rgb(232,96,60)] to-yellow-500 bg-clip-text text-transparent z-10 scale-110">
              IMMERSIVE
            </span>
            <span className="text-3xl sm:text-5xl md:text-8xl font-black text-white tracking-tighter self-end md:mr-12 mt-2">
              EXPERIENCES
            </span>
          </h1>
          {/* Decorative lines */}
        </div>

        <div className="flex flex-col items-center gap-2 mb-12">
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light font-[Poppins] leading-relaxed text-center">
            Solving real-world problems through human-centered design logic and pixel-perfect execution.
          </p>
        </div>

        {/* Slider Component */}
        <div className="relative w-full max-w-sm mx-auto select-none group">
            {/* Track */}
            <div 
                ref={constraintsRef}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-1.5 rounded-full h-[56px] md:h-[64px] w-full flex items-center relative overflow-hidden ring-1 ring-white/5 shadow-2xl"
            >
                {/* Text Label */}
                <motion.div 
                    style={{ opacity: textOpacity }} 
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <span className="text-white/30 font-[Poppins] tracking-[0.2em] text-[10px] md:text-sm font-medium ml-4">SLIDE TO EXPLORE</span>
                    <div className="flex ml-2 opacity-50">
                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-white/20 -ml-2 animate-pulse" />
                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-white/20 animate-pulse delay-75" />
                    </div>
                </motion.div>

                {/* Draggable Thumb */}
                <motion.div
                    className="h-[44px] w-[44px] md:h-[52px] md:w-[52px] bg-gradient-to-r from-[rgb(232,96,60)] to-yellow-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(232,96,60,0.4)] relative z-10 cursor-grab active:cursor-grabbing hover:brightness-110 transition-all"
                    drag="x"
                    dragConstraints={constraintsRef}
                    dragElastic={0}
                    dragMomentum={false}
                    style={{ x }}
                    onDragEnd={() => {
                        const currentX = x.get();
                        const trackWidth = constraintsRef.current?.offsetWidth || 0;
                        const thumbWidth = 52; 
                        const padding = 12; // p-1.5 * 2 = 12px
                        const maxDrag = trackWidth - thumbWidth - padding;
                        
                        // Only trigger if we are very close to the end (95% of the way)
                        if (currentX >= maxDrag * 0.95) { 
                           onNavigate();
                        } else {
                           animate(x, 0, { type: "spring", stiffness: 400, damping: 40 });
                        }
                    }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(232,96,60,0.6)" }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 1.5,
                            ease: "easeInOut"
                        }}
                    >
                        <ArrowRight className="text-white w-6 h-6" strokeWidth={3} />
                    </motion.div>
                </motion.div>
            </div>
            
            {/* Decorative glow behind slider */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[rgb(232,96,60)] to-yellow-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />
        </div>
      </div>
      
      {/* SVG Filters for Hover Effect - persistent */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="wave-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.005 0.01"
              numOctaves="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.005 0.01;0.01 0.02;0.005 0.01"
                dur="8s" 
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="12" 
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
