import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { ArrowRight, ChevronRight, Plus, MoveRight } from "lucide-react";
import { cn } from "../lib/utils";
import auroraImage from "figma:asset/6879de0af4525915f1e96ded4cf84bc511c87639.png";
import panImage from "figma:asset/7237bf6f2c91bcc871db31ffa6b87afa3edf268d.png";
import deeBotImage from "figma:asset/33ff736431f6b92124e3b93ad1b4309cb11acfef.png";
import aLandImage from "figma:asset/84048e062975b57cd7eb1d6cc36659251723ee07.png";
import Shuffle from "./Shuffle";
import panPng from "../../assets/pan.png";
import ecovacsPng from "../../assets/Ecovacs.png";
import monashPng from "../../assets/M-career portal.png";
import booheePng from "../../assets/Boohee.png";
import alandPng from "../../assets/aland.png";

interface LandingPageProps {
  onNavigate: () => void;
  onProjectClick?: (projectId: string) => void;
}

const focusRows = [
  ["Focus", "End-to-End Product Architecture"],
  ["Mode", "Vibe Coding & Rapid Iteration"],
  ["Tools", "Anti Gravity / Codex / Figma"],
  ["Output", "Full-Stack Intelligent Solutions"],
];

const projectCards = [
  {
    id: "pan",
    isImageOnly: true,
    title: "Pan World Model",
    text: "Immersive 3D product configurator.",
    image: panPng,
  },
  {
    id: "ecovacs",
    isImageOnly: true,
    title: "Deebot X2 Omni",
    text: "AI-powered home robotics control center.",
    image: ecovacsPng,
  },
  {
    id: "monash",
    isImageOnly: true,
    title: "Monash / Career Connect",
    text: "Career portal for university students.",
    image: monashPng,
  },
  {
    id: "boohee",
    isImageOnly: true,
    title: "Boohee App",
    text: "Usability testing for a health and fitness app.",
    image: booheePng,
  },
  {
    id: "aland",
    isImageOnly: true,
    title: "A.Land",
    text: "Mobile app that turns sustainability into action.",
    image: alandPng,
  },
];

export function LandingPage({ onNavigate, onProjectClick }: LandingPageProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const textOpacity = useTransform(x, [0, 170], [1, 0]);

  const [maxDrag, setMaxDrag] = useState(0);
  const [sliderTop, setSliderTop] = useState(0); // 0 until measured
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let startTime = performance.now();

    const updateLayout = () => {
      if (constraintsRef.current) {
        setMaxDrag(constraintsRef.current.offsetWidth - 66);
      }
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        // Set slider top so its bottom edge (top + 66px height) aligns with card's bottom edge
        setSliderTop(rect.bottom - 66);
      }

      // Continuously update for the first 1.5 seconds to track the card's entrance animation
      if (performance.now() - startTime < 1500) {
        animationFrameId = requestAnimationFrame(updateLayout);
      }
    };
    
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  // --- Canvas-based Sequence Rendering ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const isHovering = useRef(false);
  const frameRef = useRef(1);
  const totalFrames = 66; // Rollback to 66 for performance stability

  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();
    const fps = 60;
    const interval = 1000 / fps;

    const renderFrame = (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const img = imagesRef.current[index];
      if (!img || !img.complete) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;
      
      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;
      
      let drawWidth, drawHeight, offsetX, offsetY;
      
      if (imgRatio > canvasRatio) {
        drawHeight = canvasHeight;
        drawWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) * 0.58; 
        offsetY = 0;
      } else {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        offsetX = 0;
        offsetY = (canvasHeight - drawHeight) * 0.5;
      }
      
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Preload images and trigger initial render
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/tim-sequence/${i.toString().padStart(5, '0')}.png`;
      img.onload = () => {
        if (i === 1) renderFrame(1);
      };
      imagesRef.current[i] = img;
    }

    const playSequence = (time: number) => {
      if (time - lastTime >= interval) {
        if (isHovering.current) {
          if (frameRef.current < totalFrames) {
            frameRef.current += 1;
            renderFrame(frameRef.current);
          }
        } else {
          if (frameRef.current > 1) {
            frameRef.current -= 1;
            renderFrame(frameRef.current);
          }
        }
        lastTime = time;
      }
      animationId = requestAnimationFrame(playSequence);
    };

    animationId = requestAnimationFrame(playSequence);

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        renderFrame(frameRef.current);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section 
      className="relative h-[100dvh] overflow-hidden bg-black text-white"
      onMouseMove={(e) => {
        const xPercent = e.clientX / window.innerWidth;
        if (xPercent > 0.4 && xPercent < 0.95) {
          isHovering.current = true;
        } else {
          isHovering.current = false;
        }
      }}
      onMouseLeave={() => { isHovering.current = false; }}
    >
      
      {/* Sequence Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Dark overlays to ensure text is readable */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_45%,rgba(255,122,18,0.08),rgba(0,0,0,0.22)_32%,rgba(0,0,0,0.94)_78%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.5)_34%,rgba(0,0,0,0.1)_58%,rgba(0,0,0,0.86)_100%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

      <div className="pointer-events-none absolute inset-0 opacity-45">
        <div className="hero-orbit absolute left-[42%] top-[17%] h-[440px] w-[440px] rounded-full border border-orange-400/15 shadow-[0_0_80px_rgba(255,122,18,0.08)]" />
        <div className="hero-orbit hero-orbit-slow absolute left-[38%] top-[10%] h-[620px] w-[620px] rounded-full border border-orange-300/5" />
        <div className="hero-particle left-[31%] top-[33%]" />
        <div className="hero-particle hero-particle-delay left-[64%] top-[24%]" />
        <div className="hero-particle left-[74%] top-[63%]" />
      </div>

      <div className="relative z-10 flex h-full max-h-[100dvh] flex-col px-5 pb-4 pt-[86px] sm:px-8 lg:px-12 lg:pt-[92px]">
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-[minmax(420px,0.85fr)_minmax(320px,0.55fr)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="flex max-w-[760px] flex-col justify-center lg:pb-[118px]"
          >
            <p 
                className="mb-2 text-[clamp(18px,2.2vw,36px)] uppercase leading-none text-[#ff8a1c] drop-shadow-[0_0_24px_rgba(255,122,18,0.65)]"
                style={{ fontFamily: '"Eurostile Extended", Eurostile, sans-serif', fontWeight: 500 }}
              >
                Tim Tsui //
              </p>
              <h1 
                className="text-[clamp(30px,4.5vw,72px)] uppercase leading-[0.9] text-white drop-shadow-[0_0_22px_rgba(255,255,255,0.22)]"
                style={{ fontFamily: '"Eurostile Extended", Eurostile, sans-serif', fontWeight: 500 }}
              >
                Modern
                <br />
                Interaction
                <br />
                Architect
              </h1>

              <div className="relative mt-5 h-[3px] w-full max-w-[410px] overflow-hidden rounded-full bg-[#ff8a1c]/20">
                <div 
                  className="absolute inset-y-0 w-1/2 rounded-full bg-gradient-to-r from-transparent via-[#ff8a1c] to-transparent shadow-[0_0_18px_rgba(255,122,18,0.75)]"
                  style={{
                    animation: 'heroBarScan 2.4s ease-in-out infinite',
                  }}
                />
              </div>
              <style>{`
                @keyframes heroBarScan {
                  0% { left: -50%; opacity: 0.4; }
                  50% { left: 100%; opacity: 1; }
                  100% { left: -50%; opacity: 0.4; }
                }
              `}</style>
              <p className="mt-4 max-w-[410px] text-[clamp(15px,1.35vw,20px)] font-light leading-relaxed text-white/78">
                Crafting immersive product experiences through UI/UX, motion, and spatial interaction.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {["GenAI Stack", "UI/UX", "System Design"].map((tag) => (
                  <motion.span
                    key={tag}
                    className="rounded-full border border-white/12 bg-black/35 px-4 py-1.5 text-sm font-semibold text-white/88 shadow-[inset_0_0_18px_rgba(255,122,18,0.08)] backdrop-blur-xl"
                    whileHover={{
                      y: -2,
                      borderColor: "rgba(255,138,28,0.7)",
                      boxShadow: "0 0 24px rgba(255,122,18,0.2), inset 0 0 22px rgba(255,122,18,0.12)",
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  >
                    <span className="mr-3 inline-block h-2 w-2 rounded-full bg-[#ff8a1c] shadow-[0_0_12px_rgba(255,122,18,1)]" />
                    {tag}
                  </motion.span>
                ))}
              </div>

              <motion.div
                ref={cardRef}
                className="hero-glow-card relative mt-6 max-w-[410px] rounded-[6px] p-[1px] backdrop-blur-md"
                whileHover={{ y: -3 }}
              >
                {/* Animated flowing border */}
                <div 
                  className="absolute inset-0 rounded-[6px] opacity-70"
                  style={{
                    background: 'conic-gradient(from var(--glow-angle, 0deg), transparent 0%, transparent 30%, #ff8a1c 50%, transparent 70%, transparent 100%)',
                    animation: 'glowSpin 3.5s linear infinite',
                  }}
                />
                {/* Static subtle border underneath */}
                <div className="absolute inset-0 rounded-[6px] border border-[#ff8a1c]/20" />
                {/* Inner card content */}
                <div className="relative rounded-[6px] bg-black/85 p-4 shadow-[0_0_38px_rgba(255,122,18,0.12)]">
              <style>{`
                @property --glow-angle {
                  syntax: '<angle>';
                  initial-value: 0deg;
                  inherits: false;
                }
                @keyframes glowSpin {
                  to { --glow-angle: 360deg; }
                }
              `}</style>
                <div className="flex items-start justify-between gap-5">
                  <p className="max-w-[270px] font-mono text-[11px] uppercase leading-relaxed text-white/78">
                    TURNING IDEAS INTO FULL-STACK REALITIES AT THE SPEED OF THOUGHT.
                  </p>
                  <div className="hero-radar h-12 w-12 shrink-0 rounded-full border border-[#ff8a1c]/45 bg-[radial-gradient(circle,rgba(255,138,28,0.28),transparent_60%)]" />
                </div>
                <div className="mt-4 flex items-start gap-7 border-t border-white/10 pt-3">
                  <div className="flex items-start">
                    <Shuffle
                      text="0 TO 1"
                      className="text-2xl leading-none text-white cursor-default"
                      style={{ fontFamily: '"Eurostile Extended", Eurostile, sans-serif', fontWeight: 400 }}
                      shuffleDirection="right"
                      duration={0.35}
                      animationMode="evenodd"
                      shuffleTimes={1}
                      ease="power3.out"
                      stagger={0.03}
                      threshold={0.1}
                      triggerOnce={true}
                      triggerOnHover={true}
                      respectReducedMotion={true}
                    />
                    <div className="ml-2 mt-0.5 flex flex-col items-start font-mono text-[10px] uppercase leading-[1.15] text-white/48">
                      <span>PRODUCT</span>
                      <span>DELIVERY</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shuffle
                      text="100%"
                      className="text-2xl leading-none text-white cursor-default"
                      style={{ fontFamily: '"Eurostile Extended", Eurostile, sans-serif', fontWeight: 400 }}
                      shuffleDirection="right"
                      duration={0.35}
                      animationMode="evenodd"
                      shuffleTimes={1}
                      ease="power3.out"
                      stagger={0.03}
                      threshold={0.1}
                      triggerOnce={true}
                      triggerOnHover={true}
                      respectReducedMotion={true}
                    />
                    <div className="ml-2 mt-0.5 flex flex-col items-start font-mono text-[10px] uppercase leading-[1.15] text-white/48">
                      <span>AI-LEVERAGED</span>
                      <span>WORKFLOW</span>
                    </div>
                  </div>
                </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease: "easeOut" }}
              className="hidden items-center justify-end pb-[112px] lg:flex"
            >
              <div className="w-full max-w-[430px]">
                <div className="relative rounded-[6px] p-[1px] overflow-hidden">
                  {/* Animated flowing border */}
                  <div 
                    className="absolute inset-0 rounded-[6px] opacity-60"
                    style={{
                      background: 'conic-gradient(from var(--glow-angle, 0deg), transparent 0%, transparent 30%, #ff8a1c 50%, transparent 70%, transparent 100%)',
                      animation: 'glowSpin 4s linear infinite',
                    }}
                  />
                  {/* Inner card with Liquid Glass effect */}
                  <div className="relative group overflow-hidden rounded-[6px] bg-black/85 p-5 shadow-[0_0_44px_rgba(255,122,18,0.08),inset_0_0_32px_rgba(255,255,255,0.03)] backdrop-blur-xl transition-all duration-500 hover:bg-black/92">
                    {/* Liquid Gloss Shine Animation */}
                    <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-12 transition-transform duration-[1500ms] ease-in-out group-hover:translate-x-[150%] pointer-events-none" />
                    
                    {/* Subtle Inner Volumetric Glow */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_50%_0%,rgba(255,138,28,0.08),transparent_60%)] pointer-events-none" />

                    <span className="absolute -left-px -top-px h-6 w-6 border-l border-t border-[#ff8a1c]/60" />
                    <span className="absolute -right-px -bottom-px h-6 w-6 border-b border-r border-[#ff8a1c]/60" />
                    
                    {focusRows.map(([label, value]) => (
                      <motion.div
                        key={label}
                        className="group/row grid grid-cols-[74px_34px_1fr] items-center border-b border-white/8 py-3 last:border-b-0"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 360, damping: 28 }}
                      >
                        <span className="font-mono text-sm uppercase text-[#ffb256]">{label}</span>
                        <span className="hero-data-line h-px bg-[#ff8a1c]/60" />
                        <span className="pl-5 font-mono text-sm text-white/76 transition-colors group-hover/row:text-white">{value}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 flex items-center gap-5">
                  <div className="hero-system-orb grid h-16 w-16 place-items-center rounded-full border border-[#ff8a1c]/35 bg-[radial-gradient(circle,rgba(255,138,28,0.38),rgba(255,138,28,0.04)_34%,transparent_68%)]">
                    <span className="h-3 w-3 rounded-full bg-[#ff8a1c] shadow-[0_0_18px_rgba(255,138,28,1)]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-xs uppercase text-white/58">
                      System <span className="text-[#ffb256]">Online</span>
                    </p>
                    <div className="hero-signal mt-3 h-[3px] w-full bg-[repeating-linear-gradient(90deg,#ff8a1c_0_4px,transparent_4px_10px)] opacity-80" />
                  </div>
                  <Plus className="h-5 w-5 text-white/46" />
                </div>
              </div>
            </motion.aside>
          </div>

          <div 
            className="pointer-events-none absolute left-1/2 z-20 hidden w-[min(520px,38vw)] -translate-x-1/2 lg:block transition-opacity duration-300"
            style={{ top: sliderTop || undefined, opacity: sliderTop ? 1 : 0 }}
          >
            <div ref={constraintsRef} className="pointer-events-auto relative flex h-[66px] items-center rounded-full border border-white/25 bg-black/28 p-1.5 shadow-[0_0_44px_rgba(255,122,18,0.22)] backdrop-blur-xl">
              <motion.div style={{ opacity: textOpacity }} className="absolute inset-0 flex items-center justify-center gap-5">
                <span className="font-mono text-sm uppercase text-white/62">Slide to Explore</span>
                <ChevronRight className="h-5 w-5 text-white/35" />
              </motion.div>
              <motion.button
                aria-label="Slide to explore portfolio"
                className="relative z-10 grid h-[54px] w-[54px] shrink-0 cursor-grab place-items-center rounded-full bg-[#ff8a1c] shadow-[0_0_34px_rgba(255,138,28,0.95)] active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: maxDrag }}
                dragElastic={0}
                dragMomentum={false}
                style={{ x }}
                onDragEnd={() => {
                  if (x.get() >= maxDrag * 0.82) {
                    onNavigate();
                  } else {
                    animate(x, 0, { type: "spring", stiffness: 420, damping: 42 });
                  }
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="h-7 w-7 text-white" strokeWidth={3} />
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* ── Node-Line Connector ── */}
          <div className="relative z-30 my-3 flex w-full items-center gap-0">
            <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#ff8a1c] shadow-[0_0_10px_rgba(255,138,28,0.9)]" />
            <div className="h-px flex-1 bg-[repeating-linear-gradient(90deg,#ff8a1c_0_6px,transparent_6px_14px)] opacity-50" />
            <div className="hero-system-orb grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#ff8a1c]/50 bg-black/60">
              <span className="h-[5px] w-[5px] rounded-full bg-[#ff8a1c] shadow-[0_0_8px_rgba(255,138,28,1)]" />
            </div>
            <div className="h-px flex-1 bg-[repeating-linear-gradient(90deg,#ff8a1c_0_6px,transparent_6px_14px)] opacity-50" />
            <div className="hero-system-orb grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#ff8a1c]/50 bg-black/60">
              <span className="h-[5px] w-[5px] rounded-full bg-[#ff8a1c] shadow-[0_0_8px_rgba(255,138,28,1)]" />
            </div>
            <div className="h-px flex-1 bg-[repeating-linear-gradient(90deg,#ff8a1c_0_6px,transparent_6px_14px)] opacity-50" />
            <div className="hero-system-orb grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#ff8a1c]/50 bg-black/60">
              <span className="h-[5px] w-[5px] rounded-full bg-[#ff8a1c] shadow-[0_0_8px_rgba(255,138,28,1)]" />
            </div>
            <div className="h-px flex-1 bg-[repeating-linear-gradient(90deg,#ff8a1c_0_6px,transparent_6px_14px)] opacity-50" />
            <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#ff8a1c] shadow-[0_0_10px_rgba(255,138,28,0.9)]" />
          </div>

          {/* ── Project Cards (Scrollable) ── */}
          <div className="relative z-10 mt-4 shrink-0">
            <div 
              className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {projectCards.map((project) => (
                <motion.button
                  key={project.title}
                  onClick={() => {
                    if (project.id && onProjectClick) {
                      onProjectClick(project.id);
                    } else {
                      onNavigate();
                    }
                  }}
                  className={cn(
                    "group relative flex-shrink-0 overflow-hidden rounded-[6px] border border-white/12 bg-black/42 text-left shadow-[0_18px_48px_rgba(0,0,0,0.34)] backdrop-blur-md transition duration-300 hover:border-[#ff8a1c]/70 hover:shadow-[0_0_34px_rgba(255,122,18,0.18)]",
                    project.isImageOnly ? "min-h-[118px] min-w-[240px] sm:min-w-[320px] lg:min-w-[320px]" : "min-h-[118px] min-w-[240px] sm:min-w-[260px] lg:flex-1"
                  )}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                >
                  {project.isImageOnly ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="absolute inset-0 h-full w-full object-contain transition duration-500 group-hover:scale-105" 
                    />
                  ) : (
                    <>
                      <img src={project.image} alt="" className="absolute bottom-0 right-0 h-full w-[58%] object-cover opacity-62 transition duration-500 group-hover:scale-105 group-hover:opacity-86" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/72 to-transparent" />
                      <div className="relative p-4">
                        <p className="font-mono text-[10px] uppercase text-[#ffb256]">Featured Project</p>
                        <h2 className="mt-3 font-mono text-[17px] font-bold uppercase leading-tight text-white">{project.title}</h2>
                        <p className="mt-2 max-w-[176px] text-xs leading-relaxed text-white/62">{project.text}</p>
                      </div>
                    </>
                  )}
                </motion.button>
              ))}
            </div>
            {/* Scroll hint on right */}
            <div className="pointer-events-none absolute right-0 top-0 z-20 flex h-full w-20 items-center justify-end bg-gradient-to-l from-black via-black/60 to-transparent pr-3 lg:hidden">
              <motion.div 
                className="flex flex-col items-center gap-1"
                animate={{ x: [0, -4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <MoveRight className="h-4 w-4 text-white/60" />
                <span className="font-mono text-[8px] uppercase text-white/40">Scroll</span>
              </motion.div>
            </div>
          </div>
        </div>
    </section>
  );
}
