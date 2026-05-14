import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Target, Box, Rocket, ChevronDown, Gem, Figma, BarChart2, Share2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const frameCount1 = 121;
const frameCount2 = 118;
const frameCount3 = 147;
const totalFrames = frameCount1 + frameCount2 + frameCount3;

const currentFrame = (index: number) => {
  if (index < frameCount1) {
    return `/cv-sequence/${(index + 1).toString().padStart(5, '0')}.png`;
  } else if (index < frameCount1 + frameCount2) {
    return `/cv-sequence-2/${(index - frameCount1 + 1).toString().padStart(5, '0')}.png`;
  } else {
    return `/cv-sequence-3/${(index - frameCount1 - frameCount2 + 1).toString().padStart(5, '0')}.png`;
  }
};

export function CVPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImages(loadedImages);
          setIsLoading(false);
        }
      };
      // fallback in case image fails to load to prevent hanging
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImages(loadedImages);
          setIsLoading(false);
        }
      }
      loadedImages.push(img);
    }
  }, []);

  useGSAP(() => {
    if (images.length < totalFrames || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Use the first image's dimensions for the canvas to maintain aspect ratio
    const img = images[0];
    if (img && img.width) {
      canvas.width = img.width;
      canvas.height = img.height;
    } else {
      canvas.width = 1920;
      canvas.height = 1080;
    }

    const render = (index: number) => {
      const imageToDraw = images[index];
      if (imageToDraw && imageToDraw.width) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(imageToDraw, 0, 0, canvas.width, canvas.height);
      }
    };

    render(0);

    const playhead = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".sequence-container",
        start: "top top",
        end: "+=12000", 
        pin: true,
        scrub: 0.5,
      }
    });

    // ===== PHASE 1: First sequence (frames 0 → 120) =====
    // Duration 0 → 1 in the timeline

    // 1. Scrub video frame from 0 to frameCount1 - 1
    tl.to(playhead, {
      frame: frameCount1 - 1,
      snap: "frame",
      ease: "none",
      duration: 1,
      onUpdate: () => render(playhead.frame),
    }, 0);

    // 2. Move canvas slightly right during phase 1
    tl.to(canvas, {
      x: "5vw",
      ease: "none",
      duration: 1,
    }, 0);

    // 3. Fade out hero text overlay early in the scroll
    tl.to('.cv-text-overlay', {
      opacity: 0,
      x: 50,
      ease: "power2.inOut",
      duration: 0.3,
    }, 0);

    tl.to('.cv-gradient-overlay', {
      opacity: 0,
      ease: "power2.inOut",
      duration: 0.3,
    }, 0);

    tl.to('.cv-scroll-hint', {
      opacity: 0,
      y: 20,
      ease: "power2.inOut",
      duration: 0.15,
    }, 0);

    // 4. Fade in left text overlay near end of phase 1
    tl.fromTo('.cv-left-overlay',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, ease: "power2.out", duration: 0.35 },
      0.55
    );

    // ===== PHASE 2: Second sequence (frames 121 → 238) =====
    // Duration 1 → 2 in the timeline

    // 5. Scrub video frame from frameCount1 to frameCount1 + frameCount2 - 1
    tl.to(playhead, {
      frame: frameCount1 + frameCount2 - 1,
      snap: "frame",
      ease: "none",
      duration: 1,
      onUpdate: () => render(playhead.frame),
    }, 1);

    // 6. Fade out left text overlay at the start of phase 2
    tl.to('.cv-left-overlay', {
      opacity: 0,
      x: -50,
      ease: "power2.inOut",
      duration: 0.2,
    }, 1);

    // 7. Fade in right text overlay later in phase 2
    tl.fromTo('.cv-right-overlay',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, ease: "power2.out", duration: 0.3 },
      1.9
    );

    // ===== PHASE 3: Third sequence (frames 239 → 385) =====
    // Duration 2 → 3 in the timeline

    // 8. Scrub video frame from frameCount1+frameCount2 to totalFrames - 1
    tl.to(playhead, {
      frame: totalFrames - 1,
      snap: "frame",
      ease: "none",
      duration: 1,
      onUpdate: () => render(playhead.frame),
    }, 2);

    // 9. Move canvas to the left during phase 3 to follow character moving right
    tl.to(canvas, {
      x: "-5vw",
      ease: "none",
      duration: 1,
    }, 2);

    // 10. Fade out right text overlay at the start of phase 3
    tl.to('.cv-right-overlay', {
      opacity: 0,
      x: 50,
      ease: "power2.inOut",
      duration: 0.2,
    }, 2);

    // 11. Fade in third text overlay (on the left) near end of phase 3
    tl.fromTo('.cv-third-overlay',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, ease: "power2.out", duration: 0.3 },
      2.9
    );

    // Fade up effects for content sections
    gsap.utils.toArray('.fade-up').forEach((elem: any) => {
      gsap.fromTo(elem, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 80%",
          }
        }
      );
    });

  }, { dependencies: [images], scope: containerRef });

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen overflow-x-hidden selection:bg-[#ff8a1c] selection:text-black">
      
      {/* Fixed Background Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full object-cover object-[center_top] origin-center"
        />
        <div className="cv-gradient-overlay absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-black/90 pointer-events-none" />
      </div>

      {/* Hero Sequence Section */}
      <div className="sequence-container relative h-screen w-full z-10 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-black">
            <div className="text-[#ff8a1c] animate-pulse font-mono text-sm uppercase tracking-widest">Loading Experience...</div>
          </div>
        )}

        {/* Text Overlay matching the user's design */}
        <div className="cv-text-overlay absolute right-[6%] lg:right-[10%] top-[48%] -translate-y-1/2 w-full max-w-[600px] z-10 pointer-events-auto">
          <p 
            className="text-[11px] md:text-[13px] uppercase text-[#ff8a1c] mb-3 tracking-[0.2em]"
            style={{ fontFamily: '"Eurostile Extended", Michroma, Eurostile, sans-serif', fontWeight: 500 }}
          >
            AI PRODUCT DESIGNER // <span className="text-white/20 ml-2">----------</span>
          </p>
          <h1 
            className="text-white text-5xl md:text-6xl lg:text-[72px] font-bold leading-[1.05] tracking-tight mb-4"
            style={{ fontFamily: '"Eurostile Extended", Michroma, Eurostile, sans-serif', fontWeight: 500 }}
          >
            Building<br/>
            <span className="text-[#ff8a1c]">AI-Native</span> Experiences.
          </h1>
          <p className="text-[#828486] text-base md:text-lg mb-5 leading-relaxed font-['Inter:Medium',sans-serif] max-w-[520px]">
            I'm an AI Product Designer, Design System Builder, and Design Educator
            crafting intelligent, intuitive, and human-centered digital experiences.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {["AI Product Design", "Design Systems", "UX Strategy"].map((tag) => (
              <span key={tag} className="rounded-full border border-white/12 bg-black/40 px-4 py-1.5 text-xs lg:text-sm font-medium text-white/80 backdrop-blur-md flex items-center shadow-[inset_0_0_12px_rgba(255,138,28,0.05)] tracking-wide">
                <span className="mr-2.5 inline-block h-1.5 w-1.5 rounded-full bg-[#ff8a1c] shadow-[0_0_8px_rgba(255,138,28,0.8)]"></span>
                {tag}
              </span>
            ))}
          </div>

          <div className="group overflow-hidden rounded-[8px] border border-[#ff8a1c]/30 bg-black/70 p-5 lg:p-6 backdrop-blur-xl relative shadow-[0_0_50px_rgba(255,138,28,0.12)]">
            <span className="absolute -left-px -top-px h-4 w-4 border-l border-t border-[#ff8a1c] z-10"></span>
            <span className="absolute -right-px -bottom-px h-4 w-4 border-b border-r border-[#ff8a1c] z-10"></span>
            
            {/* Liquid Gloss Reflection - Continuous */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent skew-x-12 pointer-events-none z-0"
              animate={{ x: ["-150%", "150%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
            />
            {/* Inner subtle glow for liquid volume */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,138,28,0.15),transparent_60%)] pointer-events-none z-0" />
            
            <div className="relative z-10 grid grid-cols-[40px_1fr] md:grid-cols-[40px_80px_1fr] items-start border-b border-white/5 pb-3.5 mb-3.5 gap-y-2 md:gap-y-0">
              <div className="hero-system-orb h-8 w-8 rounded-full border border-[#ff8a1c]/40 flex items-center justify-center bg-[radial-gradient(circle,rgba(255,138,28,0.15),transparent_70%)]">
                <Target className="w-4 h-4 text-[#ff8a1c]" strokeWidth={1.5} />
              </div>
              <span className="font-mono text-[11px] text-[#ff8a1c] uppercase md:pt-2 tracking-wider md:block hidden">FOCUS</span>
              <div className="md:hidden font-mono text-[11px] text-[#ff8a1c] uppercase pt-2 tracking-wider">FOCUS</div>
              <span className="text-[14px] md:text-[15px] text-[#828486] leading-relaxed font-['Inter:Medium',sans-serif] md:col-start-3 col-span-2 md:col-span-1 pr-2">
                Designing AI-native products and scalable design systems that empower teams and elevate user experiences.
              </span>
            </div>
            
            <div className="relative z-10 grid grid-cols-[40px_1fr] md:grid-cols-[40px_80px_1fr] items-start border-b border-white/5 pb-3.5 mb-3.5 gap-y-2 md:gap-y-0">
              <div className="hero-system-orb h-8 w-8 rounded-full border border-[#ff8a1c]/40 flex items-center justify-center bg-[radial-gradient(circle,rgba(255,138,28,0.15),transparent_70%)]">
                <Box className="w-4 h-4 text-[#ff8a1c]" strokeWidth={1.5} />
              </div>
              <span className="font-mono text-[11px] text-[#ff8a1c] uppercase md:pt-2 tracking-wider md:block hidden">TOOLS</span>
              <div className="md:hidden font-mono text-[11px] text-[#ff8a1c] uppercase pt-2 tracking-wider">TOOLS</div>
              <span className="text-[14px] md:text-[15px] text-[#828486] leading-relaxed font-['Inter:Medium',sans-serif] md:col-start-3 col-span-2 md:col-span-1 pr-2">
                Figma, Cursor, Midjourney, Spline, Notion, GitHub, Claude, GPT-4, Runway
              </span>
            </div>

            <div className="relative z-10 grid grid-cols-[40px_1fr] md:grid-cols-[40px_80px_1fr] items-start gap-y-2 md:gap-y-0">
              <div className="hero-system-orb h-8 w-8 rounded-full border border-[#ff8a1c]/40 flex items-center justify-center bg-[radial-gradient(circle,rgba(255,138,28,0.15),transparent_70%)]">
                <Rocket className="w-4 h-4 text-[#ff8a1c]" strokeWidth={1.5} />
              </div>
              <span className="font-mono text-[11px] text-[#ff8a1c] uppercase md:pt-2 tracking-wider md:block hidden">OUTPUT</span>
              <div className="md:hidden font-mono text-[11px] text-[#ff8a1c] uppercase pt-2 tracking-wider">OUTPUT</div>
              <span className="text-[14px] md:text-[15px] text-[#828486] leading-relaxed font-['Inter:Medium',sans-serif] md:col-start-3 col-span-2 md:col-span-1 pr-2">
                Design Systems, UX Strategy, Prototypes, AI Workflows, Educational Content
              </span>
            </div>
          </div>
        </div>

        {/* NEW Left Text Overlay (Appears at the end of the sequence) */}
        <div className="cv-left-overlay absolute left-[6%] lg:left-[10%] top-[54%] -translate-y-1/2 w-full max-w-[600px] z-10 pointer-events-auto opacity-0">
          <div className="flex flex-col gap-1.5 mb-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[13px] text-[#ff8a1c] tracking-widest font-semibold">
                01 / AI Product Builder
              </span>
              <span className="text-[#ff8a1c]/40 text-[10px] tracking-widest hidden md:inline-block">
                ////////
              </span>
            </div>
            <span className="font-['Inter:Medium',sans-serif] text-[12px] text-[#828486] tracking-wider uppercase">
              AI Product Designer · System Builder · Dec 2024 — Present
            </span>
          </div>
          
          <h2 
            className="text-white text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.05] tracking-tight mb-4"
            style={{ fontFamily: '"Eurostile Extended", Michroma, Eurostile, sans-serif', fontWeight: 500 }}
          >
            Building<br/>
            <span className="whitespace-nowrap">design systems</span><br/>
            with AI.
          </h2>
          
          <p className="text-[#828486] text-base md:text-lg mb-8 leading-relaxed font-['Inter:Medium',sans-serif] max-w-[500px]">
            I design and build AI-native products that turn complex model capabilities into usable, scalable, and consistent digital experiences.
          </p>

          <div className="cv-energy-card group relative max-w-[560px] overflow-hidden rounded-[8px] border border-[#ff8a1c]/30 bg-black/65 p-4 backdrop-blur-xl shadow-[0_0_50px_rgba(255,138,28,0.12)] transition-all duration-300 hover:border-[#ff8a1c]/50 hover:shadow-[0_0_58px_rgba(255,138,28,0.18)]">
            <span className="absolute -left-px -top-px z-10 h-4 w-4 border-l border-t border-[#ff8a1c]"></span>
            <span className="absolute -right-px -bottom-px z-10 h-4 w-4 border-b border-r border-[#ff8a1c]"></span>
            <motion.div
              className="absolute inset-0 z-0 skew-x-12 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none"
              animate={{ x: ["-150%", "150%"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
            />
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,138,28,0.16),transparent_62%)] pointer-events-none" />
            <div className="relative z-10 space-y-1">
              {[
                {
                  index: "01",
                  title: "DNA — Design Native Accelerator",
                  role: "Co-founder",
                  date: "Dec 2024 — Present",
                },
                {
                  index: "02",
                  title: "Libra AI / Pan World Model",
                  role: "AI Product Manager",
                  date: "2025.10 — 2026.01",
                },
              ].map((item) => (
                <motion.div
                  key={item.index}
                  className="group/item grid grid-cols-[42px_1fr] gap-x-5 rounded-[6px] border-b border-white/5 px-3 py-3 last:border-b-0 transition-all duration-300 hover:bg-white/[0.035]"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 360, damping: 28 }}
                >
                  <div className="font-mono text-lg text-[#ff8a1c] drop-shadow-[0_0_10px_rgba(255,138,28,0.45)]">{item.index}</div>
                  <div>
                    <h3 className="font-mono text-lg font-semibold text-white transition-colors group-hover/item:text-[#ffb256]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-[#828486] transition-colors group-hover/item:text-white/72">
                      {item.role} · {item.date}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Decorative bottom element */}
          <div className="flex items-center gap-2 mt-8 opacity-40">
            <div className="w-16 h-px bg-[#ff8a1c]"></div>
            <div className="w-2 h-px bg-[#ff8a1c]"></div>
            <div className="w-2 h-px bg-[#ff8a1c]"></div>
            <div className="w-2 h-px bg-[#ff8a1c]"></div>
            <Target className="w-4 h-4 text-[#ff8a1c]" />
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="cv-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="font-mono text-[10px] text-[#828486] tracking-[0.2em] uppercase">SCROLL TO EXPLORE</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-[#ff8a1c]" />
          </motion.div>
        </div>

        {/* Right Text Overlay - Design Educator (appears during phase 2) */}
        <div className="cv-right-overlay absolute right-[4%] lg:right-[2%] top-[50%] -translate-y-1/2 w-full max-w-[750px] z-10 pointer-events-auto opacity-0">
          <div className="flex flex-col gap-1.5 mb-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[13px] text-[#ff8a1c] tracking-widest font-semibold">
                02 / Design Educator
              </span>
              <span className="text-[#ff8a1c]/40 text-[10px] tracking-widest hidden md:inline-block">
                ////////
              </span>
            </div>
            <span className="font-['Inter:Medium',sans-serif] text-[12px] text-[#828486] tracking-wider uppercase">
              Lecturer · Tianjin College of Media & Arts · 2024.03 — 2026.03
            </span>
          </div>
          
          <h2 
            className="text-white text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.05] tracking-tight mb-4"
            style={{ fontFamily: '"Eurostile Extended", Michroma, Eurostile, sans-serif', fontWeight: 500 }}
          >
            Teaching design<br/>
            as a <span className="text-[#ff8a1c]">product</span><br/>
            <span className="text-[#ff8a1c]">journey.</span>
          </h2>
          
          <p className="text-[#828486] text-base md:text-lg mb-8 leading-relaxed font-['Inter:Medium',sans-serif] max-w-[650px]">
            I help students move beyond tools — from interface making to user research, MVP validation, and iterative product thinking.
          </p>

          <div className="relative mt-4 p-4 md:p-6 rounded-xl border border-[#ff8a1c]/20 bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(255,138,28,0.1)] group max-w-[650px]">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ff8a1c]/50 rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ff8a1c]/50 rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ff8a1c]/50 rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ff8a1c]/50 rounded-br-xl"></div>
            
            {/* Animated Bottom glow line */}
            <motion.div 
              className="absolute bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff8a1c] to-transparent shadow-[0_0_15px_#ff8a1c]"
              animate={{ 
                left: ["20%", "80%", "20%"],
                width: ["25%", "40%", "25%"],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ x: "-50%" }}
            />

            {/* Side dot accents */}
            <div className="absolute left-3 bottom-1/4 flex flex-col gap-1.5">
               <div className="w-1 h-1 rounded-full bg-[#ff8a1c]/40"></div>
               <div className="w-1 h-1 rounded-full bg-[#ff8a1c]/40"></div>
            </div>
            
            {/* Top dash accents */}
            <div className="absolute right-8 top-0 flex gap-1 pt-1">
               <div className="w-6 h-[2px] bg-[#ff8a1c]/30"></div>
               <div className="w-1 h-[2px] bg-[#ff8a1c]/30"></div>
               <div className="w-1 h-[2px] bg-[#ff8a1c]/30"></div>
            </div>

            <div className="flex flex-col ml-4">
              {/* Item 1 */}
              <div className="flex items-center gap-6 py-3 border-b border-white/5 relative group/item transition-colors hover:bg-white/[0.02] rounded-lg px-2 -mx-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 relative group-hover/item:shadow-[0_0_15px_rgba(255,138,28,0.3)] transition-all p-[1px] bg-gradient-to-tr from-[#ff8a1c]/80 via-transparent to-[#ff8a1c]/80">
                  <div className="absolute inset-[1px] rounded-full bg-black/80 z-0"></div>
                  <div className="absolute inset-0 rounded-full bg-[#ff8a1c]/10 opacity-0 group-hover/item:opacity-100 transition-opacity z-10"></div>
                  <Gem className="w-4 h-4 text-[#828486] group-hover/item:text-white transition-colors relative z-20" strokeWidth={1.5} />
                </div>
                <div className="font-mono text-[22px] text-[#ff8a1c] font-bold tracking-tight">01</div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="flex-1 text-[#828486] group-hover/item:text-white/90 text-[16px] tracking-wide font-['Inter:Medium',sans-serif] transition-colors">Double Diamond Process</div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff8a1c]/40 group-hover/item:bg-[#ff8a1c] group-hover/item:shadow-[0_0_8px_#ff8a1c] transition-all flex shrink-0"></div>
              </div>

              {/* Item 2 */}
              <div className="flex items-center gap-6 py-3 border-b border-white/5 relative group/item transition-colors hover:bg-white/[0.02] rounded-lg px-2 -mx-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 relative group-hover/item:shadow-[0_0_15px_rgba(255,138,28,0.3)] transition-all p-[1px] bg-gradient-to-tr from-[#ff8a1c]/80 via-transparent to-[#ff8a1c]/80">
                  <div className="absolute inset-[1px] rounded-full bg-black/80 z-0"></div>
                  <div className="absolute inset-0 rounded-full bg-[#ff8a1c]/10 opacity-0 group-hover/item:opacity-100 transition-opacity z-10"></div>
                  <Figma className="w-4 h-4 text-[#828486] group-hover/item:text-white transition-colors relative z-20" strokeWidth={1.5} />
                </div>
                <div className="font-mono text-[22px] text-[#ff8a1c] font-bold tracking-tight">02</div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="flex-1 text-[#828486] group-hover/item:text-white/90 text-[16px] tracking-wide font-['Inter:Medium',sans-serif] transition-colors">Figma / Protopie Prototyping</div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff8a1c]/40 group-hover/item:bg-[#ff8a1c] group-hover/item:shadow-[0_0_8px_#ff8a1c] transition-all flex shrink-0"></div>
              </div>

              {/* Item 3 */}
              <div className="flex items-center gap-6 py-3 border-b border-white/5 relative group/item transition-colors hover:bg-white/[0.02] rounded-lg px-2 -mx-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 relative group-hover/item:shadow-[0_0_15px_rgba(255,138,28,0.3)] transition-all p-[1px] bg-gradient-to-tr from-[#ff8a1c]/80 via-transparent to-[#ff8a1c]/80">
                  <div className="absolute inset-[1px] rounded-full bg-black/80 z-0"></div>
                  <div className="absolute inset-0 rounded-full bg-[#ff8a1c]/10 opacity-0 group-hover/item:opacity-100 transition-opacity z-10"></div>
                  <BarChart2 className="w-4 h-4 text-[#828486] group-hover/item:text-white transition-colors relative z-20" strokeWidth={1.5} />
                </div>
                <div className="font-mono text-[22px] text-[#ff8a1c] font-bold tracking-tight">03</div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="flex-1 text-[#828486] group-hover/item:text-white/90 text-[16px] tracking-wide font-['Inter:Medium',sans-serif] transition-colors">MVP Validation</div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff8a1c]/40 group-hover/item:bg-[#ff8a1c] group-hover/item:shadow-[0_0_8px_#ff8a1c] transition-all flex shrink-0"></div>
              </div>

              {/* Item 4 */}
              <div className="flex items-center gap-6 py-3 relative group/item transition-colors hover:bg-white/[0.02] rounded-lg px-2 -mx-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 relative group-hover/item:shadow-[0_0_15px_rgba(255,138,28,0.3)] transition-all p-[1px] bg-gradient-to-tr from-[#ff8a1c]/80 via-transparent to-[#ff8a1c]/80">
                  <div className="absolute inset-[1px] rounded-full bg-black/80 z-0"></div>
                  <div className="absolute inset-0 rounded-full bg-[#ff8a1c]/10 opacity-0 group-hover/item:opacity-100 transition-opacity z-10"></div>
                  <Share2 className="w-4 h-4 text-[#828486] group-hover/item:text-white transition-colors relative z-20" strokeWidth={1.5} />
                </div>
                <div className="font-mono text-[22px] text-[#ff8a1c] font-bold tracking-tight">04</div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="flex-1 text-[#828486] group-hover/item:text-white/90 text-[16px] tracking-wide font-['Inter:Medium',sans-serif] transition-colors">Product Design Workflow</div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff8a1c]/40 group-hover/item:bg-[#ff8a1c] group-hover/item:shadow-[0_0_8px_#ff8a1c] transition-all flex shrink-0"></div>
              </div>
            </div>
          </div>
          
          {/* Decorative bottom element */}
          <div className="flex items-center gap-2 mt-8 opacity-40">
            <div className="w-16 h-px bg-[#ff8a1c]"></div>
            <div className="w-2 h-px bg-[#ff8a1c]"></div>
            <div className="w-2 h-px bg-[#ff8a1c]"></div>
            <div className="w-2 h-px bg-[#ff8a1c]"></div>
            <Target className="w-4 h-4 text-[#ff8a1c]" />
          </div>
        </div>

        {/* Third Text Overlay - UX & Interface Designer section */}
        <div className="cv-third-overlay absolute left-[6%] lg:left-[10%] top-[50%] -translate-y-1/2 w-full max-w-[650px] z-10 pointer-events-auto opacity-0">
          <div className="flex flex-col gap-1.5 mb-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[13px] text-[#ff8a1c] tracking-widest font-semibold">
                03 / UX & Interface Designer
              </span>
              <span className="text-[#ff8a1c]/40 text-[10px] tracking-widest hidden md:inline-block">
                ////////
              </span>
            </div>
            <span className="font-['Inter:Medium',sans-serif] text-[12px] text-[#828486] tracking-wider uppercase">
              Research · Testing · Interface
            </span>
          </div>
          
          <h2 
            className="text-white text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.05] tracking-tight mb-4"
            style={{ fontFamily: '"Eurostile Extended", Michroma, Eurostile, sans-serif', fontWeight: 500 }}
          >
            From <span className="text-[#ff8a1c]">user insights</span><br/>
            to <span className="text-[#ff8a1c]">usable interfaces.</span><br/>
          </h2>
          
          <p className="text-[#828486] text-base md:text-lg mb-7 leading-relaxed font-['Inter:Medium',sans-serif] max-w-[520px]">
            I turn research findings into prototypes, interfaces, and product decisions.
          </p>

          <div className="cv-energy-card group relative max-w-[620px] overflow-hidden rounded-[8px] border border-[#ff8a1c]/30 bg-black/65 p-4 backdrop-blur-xl shadow-[0_0_50px_rgba(255,138,28,0.12)] transition-all duration-300 hover:border-[#ff8a1c]/50 hover:shadow-[0_0_58px_rgba(255,138,28,0.18)]">
            <span className="absolute -left-px -top-px z-10 h-4 w-4 border-l border-t border-[#ff8a1c]"></span>
            <span className="absolute -right-px -bottom-px z-10 h-4 w-4 border-b border-r border-[#ff8a1c]"></span>
            <motion.div
              className="absolute inset-0 z-0 skew-x-12 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none"
              animate={{ x: ["-150%", "150%"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
            />
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,138,28,0.16),transparent_62%)] pointer-events-none" />
            <div className="relative z-10 space-y-1">
            {[
              {
                index: "01",
                title: "Ecovacs",
                date: "Apr 2023 — Sep 2023",
                description: "Usability testing for an unreleased robot vacuum.",
              },
              {
                index: "02",
                title: "The VR Superstore",
                date: "Jan 2023 — Apr 2023",
                description: "Web, video, and marketing visual design.",
              },
              {
                index: "03",
                title: "NetEase",
                date: "Dec 2021 — Feb 2022",
                description: "Low-fidelity prototype iteration for a metaverse social app.",
              },
            ].map((item) => (
              <motion.div
                key={item.index}
                className="group/item grid grid-cols-[42px_1fr] gap-x-5 rounded-[6px] border-b border-white/5 px-3 py-3 last:border-b-0 transition-all duration-300 hover:bg-white/[0.035]"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 360, damping: 28 }}
              >
                <div className="font-mono text-lg text-[#ff8a1c] drop-shadow-[0_0_10px_rgba(255,138,28,0.45)]">{item.index}</div>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                    <h3 className="font-mono text-lg font-semibold text-white transition-colors group-hover/item:text-[#ffb256]">
                      {item.title}
                    </h3>
                    <span className="font-mono text-[11px] text-[#828486] transition-colors group-hover/item:text-white/55">
                      {item.date}
                    </span>
                  </div>
                  <p className="mt-1 text-[14px] leading-relaxed text-[#828486] transition-colors group-hover/item:text-white/72">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
