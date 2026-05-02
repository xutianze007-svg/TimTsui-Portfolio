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
      </div>
    </nav>
  );
}