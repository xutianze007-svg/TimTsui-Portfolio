import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import graduationImage from 'figma:asset/c49bfbe176655044f4e9fae0405070ab1e274898.png';
import presentationImage from 'figma:asset/f03037d257dc01f861fb750a513f0773908ca71a.png';
import workshopImage from 'figma:asset/2debc723ebfba17cd5272bf3de41b265740baef7.png';
import profileImage from 'figma:asset/d1f638618c03a834b546f88ef0d7297de99d5bec.png';

import panPng from "../../assets/pan.png";
import ecovacsPng from "../../assets/Ecovacs.png";
import monashPng from "../../assets/M-career portal.png";
import booheePng from "../../assets/Boohee.png";
import alandPng from "../../assets/aland.png";

// Critical Assets to Preload
const cardImages = [
  graduationImage,
  presentationImage,
  workshopImage,
  profileImage,
  panPng,
  ecovacsPng,
  monashPng,
  booheePng,
  alandPng
];

const totalSequenceFrames = 66;

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);
  const [status, setStatus] = useState("Initializing...");

  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = cardImages.length + totalSequenceFrames;
    const startTime = Date.now();
    const minimumDisplayTime = 2500; // Keep preloader for at least 2.5s for aesthetics

    const updateProgress = () => {
      loadedCount++;
      const actualProgress = Math.floor((loadedCount / totalAssets) * 100);
      
      // We want the counter to be smooth, so we don't just jump to actualProgress
      // but we also can't go faster than real loading.
      setCount(actualProgress);
      
      if (loadedCount < 10) setStatus("Connecting to Neural Link...");
      else if (loadedCount < 40) setStatus("Downloading Visual Sequences...");
      else if (loadedCount < 80) setStatus("Calibrating Motion Frames...");
      else if (loadedCount < totalAssets) setStatus("Finalizing System Buffer...");
      else setStatus("System Ready.");

      if (loadedCount === totalAssets) {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minimumDisplayTime - elapsedTime);
        
        setTimeout(() => {
          setExit(true);
          setTimeout(onComplete, 800);
        }, remainingTime);
      }
    };

    // 1. Preload Card Images
    cardImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress; // Continue anyway on error
    });

    // 2. Preload Sequence Frames (Batching to avoid blocking)
    const preloadSequence = async () => {
      for (let i = 1; i <= totalSequenceFrames; i++) {
        // We use a slight delay for every batch of 10 to keep the UI responsive
        if (i % 20 === 0) await new Promise(r => setTimeout(r, 10));
        
        const img = new Image();
        img.src = `/tim-sequence/${i.toString().padStart(5, '0')}.png`;
        img.onload = updateProgress;
        img.onerror = updateProgress;
      }
    };

    preloadSequence();
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-[#ff8a1c]/20 rounded-full"
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
          {!exit && cardImages.map((src, index) => (
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
                opacity: 1 - (index * 0.15),
                rotateX: [10, 5, 10], 
                rotateY: [0, (index % 2 === 0 ? 5 : -5), 0],
                rotateZ: (index - 1.5) * 5,
                y: 0,
                scale: 1 - (index * 0.05),
              }}
              transition={{
                duration: 1.5,
                delay: index * 0.2,
                ease: "backOut"
              }}
            >
              <img 
                src={src} 
                alt="Portfolio Preview" 
                className="w-full h-full object-cover grayscale contrast-125 brightness-75" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="text-[10px] font-mono text-white/60">
                    <div>ASSET_0{index + 1}</div>
                    <div>STATUS.READY</div>
                </div>
                <div className="w-2 h-2 bg-[#ff8a1c] rounded-full animate-pulse" />
              </div>
              
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
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-[#ff8a1c] tabular-nums" style={{ textShadow: '0 0 40px rgba(255, 138, 28, 0.3)' }}>
              {count}%
            </h1>
            
            <div className="absolute -bottom-8 left-0 right-0 text-center">
                <span className="text-[10px] font-mono tracking-[0.3em] text-[#ff8a1c]/90 uppercase">
                    {status}
                </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Corner UI Elements */}
      <div className="absolute top-8 left-8 font-mono text-[10px] text-white/40">
        <div>SYS.V.3.1.0</div>
        <div>PRELOAD_BUFFER_ACTIVE</div>
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-[10px] text-white/40 text-right">
        <div>QUEUED_ASSETS: 154</div>
        <div>DOWNLOAD_SECURE_MODE</div>
      </div>

    </motion.div>
  );
}
