import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";
import logoImage from 'figma:asset/e6a5fe1152256f7070c61c702edd3064b17aefff.png';
import Linkedin from "../imports/Linkedin";
import Youtube from "../imports/Youtube";
import Shuffle from "./Shuffle";

interface NavbarProps {
  onNavigate: (page: "home" | "portfolio" | "cv") => void;
  currentPage: "home" | "portfolio" | "cv";
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const isHome = currentPage === "home";

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-5 md:px-12 pointer-events-none transition-colors duration-300",
      isHome ? "bg-transparent" : "bg-black"
    )}>
      <div 
        className="text-white font-bold text-2xl cursor-pointer pointer-events-auto flex items-center gap-4"
        onClick={() => onNavigate("home")}
      >
        <motion.img 
            src={logoImage} 
            alt="Logo" 
            className="w-8 h-8 rounded-full object-cover" 
            whileHover={{ rotateY: 360 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <Shuffle
          text="TimTsui"
          className="font-[Poppins] text-[15px]"
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
      </div>

      <div className={cn("flex items-center pointer-events-auto", isHome ? "gap-8 md:gap-12" : "gap-8")}>
        {!isHome && (
          <>
        <button className="text-white/70 hover:text-white transition-colors w-6 h-6">
            <span className="sr-only">Youtube</span>
            <Youtube />
        </button>
        <a 
            href="https://www.linkedin.com/in/tim-tsui/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors w-6 h-6"
        >
            <Linkedin />
        </a>
          </>
        )}
        <button 
            onClick={() => onNavigate("portfolio")}
            className={cn(
                "text-sm font-medium transition-colors",
                isHome && "font-mono text-white/76 hover:text-white",
                currentPage === "portfolio" ? "text-white" : "text-white/70 hover:text-white"
            )}
        >
            UI/UX
        </button>
        <button 
            onClick={() => onNavigate("cv")}
            className={cn(
                "text-sm font-medium transition-colors",
                isHome && "font-mono text-white/76 hover:text-white",
                currentPage === "cv" ? "text-white" : "text-white/70 hover:text-white"
            )}
        >
            CV
        </button>
        {isHome && (
          <>
            <a
              href="https://www.youtube.com/@timtsui"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-white/76 hover:text-white transition-colors w-6 h-6 md:block"
            >
              <span className="sr-only">Youtube</span>
              <Youtube />
            </a>
            <a
              href="https://www.linkedin.com/in/tim-tsui/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-white/76 hover:text-white transition-colors w-6 h-6 md:block"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin />
            </a>
          </>
        )}
        <a 
            href="#"
            onClick={(e) => {
                e.preventDefault();
                alert("这里稍后可以替换为你的预约链接，比如 Calendly 或 Buy Me a Coffee");
            }}
            className={cn(
              "relative ml-2 overflow-hidden rounded-full text-sm transition-all duration-500 hover:scale-105 active:scale-95 group",
              isHome
                ? "hidden border border-[#ff8a1c]/80 bg-black/30 px-6 py-2.5 text-white shadow-[0_0_24px_rgba(255,122,18,0.18)] backdrop-blur-xl md:inline-flex"
                : "px-6 py-2.5 bg-white/5 backdrop-blur-xl border border-white/20 text-white hover:bg-white/10 hover:border-white/40 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.15)]"
            )}
            style={{ fontFamily: '"Eurostile Extended", Michroma, Eurostile, sans-serif', fontWeight: 500 }}
        >
            <span className="relative z-10 flex items-center gap-3">
              Let's Talk
              {isHome && <ArrowRight className="h-4 w-4 text-[#ffb256]" />}
            </span>
            {/* Liquid Gloss Reflection */}
            <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:translate-x-[150%] transition-transform duration-1000 ease-out pointer-events-none" />
            {/* Inner subtle glow for liquid volume */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_60%)] pointer-events-none" />
        </a>
      </div>
    </nav>
  );
}
