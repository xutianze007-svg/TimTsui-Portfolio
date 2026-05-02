import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import graduationImage from 'figma:asset/c49bfbe176655044f4e9fae0405070ab1e274898.png';
import presentationImage from 'figma:asset/f03037d257dc01f861fb750a513f0773908ca71a.png';
import workshopImage from 'figma:asset/2debc723ebfba17cd5272bf3de41b265740baef7.png';
import profileImage from 'figma:asset/d1f638618c03a834b546f88ef0d7297de99d5bec.png';

const images = [
  graduationImage,
  presentationImage,
  workshopImage,
  profileImage
];

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // Animation duration for the counter
    const duration = 2500; 
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smoother counter
      const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
      
      setCount(Math.floor(easeOutQuart(progress) * 100));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
            setExit(true);
            setTimeout(onComplete, 800); // Wait for exit animation
        }, 500);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-[#050505] z-[100] flex items-center justify-center overflow-hidden font-sans"
      initial={{ opacity: 1 }}
      animate={{ opacity: exit ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background Grid/Noise */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, #000 100%)' }} />

      {/* Card Stack Container */}
      <div className="relative w-64 h-80 md:w-80 md:h-96 perspective-[1000px]">
        
        {/* Decorative elements behind */}
        <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-[#F2C94C]/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-dashed border-white/10 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* The Cards */}
        <AnimatePresence>
          {!exit && images.map((src, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#111]"
              style={{
                zIndex: index,
                transformStyle: 'preserve-3d',
              }}
              initial={{ 
                opacity: 0, 
                rotateX: 10, 
                rotateZ: (index - 1.5) * 10, 
                y: 100 + index * 20,
                scale: 0.8
              }}
              animate={{ 
                opacity: 1 - (index * 0.15), // Fade back cards slightly
                rotateX: [10, 5, 10], 
                rotateY: [0, (index % 2 === 0 ? 5 : -5), 0],
                rotateZ: (index - 1.5) * 5, // Fanned out
                y: 0, // Stack them
                scale: 1 - (index * 0.05), // Perspective scaling
              }}
              transition={{
                duration: 1.5,
                delay: index * 0.2,
                ease: "backOut"
              }}
            >
              {/* Image with grayscale filter */}
              <img 
                src={src} 
                alt="Cyberpunk element" 
                className="w-full h-full object-cover grayscale contrast-125 brightness-75" 
              />
              
              {/* Overlay UI Elements on Cards */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="text-[10px] font-mono text-white/60">
                    <div>IMG_0{index + 1}</div>
                    <div>DATA.RAW</div>
                </div>
                <div className="w-2 h-2 bg-[#F2C94C] rounded-full animate-pulse" />
              </div>
              
              {/* Glassmorphism shine */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Central Counter */}
        <div className="absolute inset-0 flex items-center justify-center z-50 mix-blend-difference">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-[#F2C94C] tabular-nums" style={{ textShadow: '0 0 40px rgba(242, 201, 76, 0.3)' }}>
              {count}%
            </h1>
            
            {/* Loading text */}
            <div className="absolute -bottom-8 left-0 right-0 text-center">
                <span className="text-xs font-mono tracking-[0.5em] text-[#F2C94C]/80 uppercase">
                    System Loading
                </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Corner UI Elements */}
      <div className="absolute top-8 left-8 font-mono text-xs text-white/40">
        <div>SYS.V.2.0.4</div>
        <div>INIT_SEQUENCE_START</div>
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-xs text-white/40 text-right">
        <div>MEMORY_ALLOC: 64TB</div>
        <div>ENCRYPTED_CONNECTION</div>
      </div>

    </motion.div>
  );
}
