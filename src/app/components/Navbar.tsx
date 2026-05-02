import React from "react";
import { motion } from "motion/react";
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
  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 pointer-events-none transition-colors duration-300",
      currentPage === "home" ? "bg-transparent" : "bg-black"
    )}>
      <div 
        className="text-white font-bold text-2xl tracking-tight cursor-pointer pointer-events-auto flex items-center gap-2"
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
          className="font-[Poppins] text-[16px]"
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

      <div className="flex items-center gap-8 pointer-events-auto">
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
        <button 
            onClick={() => onNavigate("portfolio")}
            className={cn(
                "text-sm font-medium transition-colors",
                currentPage === "portfolio" ? "text-white" : "text-white/70 hover:text-white"
            )}
        >
            UI/UX
        </button>
        <button 
            onClick={() => onNavigate("cv")}
            className={cn(
                "text-sm font-medium transition-colors",
                currentPage === "cv" ? "text-white" : "text-white/70 hover:text-white"
            )}
        >
            CV
        </button>
        <a 
            href="#"
            onClick={(e) => {
                e.preventDefault();
                alert("这里稍后可以替换为你的预约链接，比如 Calendly 或 Buy Me a Coffee");
            }}
            className="relative ml-2 px-6 py-2.5 bg-white/5 backdrop-blur-xl border border-white/20 text-white text-sm font-medium rounded-full transition-all duration-500 hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.15)] overflow-hidden group"
        >
            <span className="relative z-10 flex items-center gap-2 tracking-wide">Let's Talk</span>
            {/* Liquid Gloss Reflection */}
            <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:translate-x-[150%] transition-transform duration-1000 ease-out pointer-events-none" />
            {/* Inner subtle glow for liquid volume */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_60%)] pointer-events-none" />
        </a>
      </div>
    </nav>
  );
}