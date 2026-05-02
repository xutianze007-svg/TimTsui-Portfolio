import React, { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { ProjectOverview } from "./ProjectOverview";
import { MonashProjectOverview } from "./MonashProjectOverview";
import { PanProjectOverview } from "./PanProjectOverview";
import { BooheeProjectOverview } from "./BooheeProjectOverview";
import { EcovacsProjectOverview } from "./EcovacsProjectOverview";

interface ProjectDetailsPageProps {
  onBack: () => void;
  projectId?: string;
}

export function ProjectDetailsPage({ onBack, projectId }: ProjectDetailsPageProps) {
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black pt-24 px-4 pb-20 relative"
    >
      {/* Background noise/grid similar to other pages */}
      <div className="fixed inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation */}
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-[#F2C94C] transition-colors mb-8 group"
        >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-lg font-mono">BACK_TO_ARCHIVES</span>
        </button>

        {/* Project Overview Section */}
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-20"
        >
            {projectId === "monash" ? (
              <MonashProjectOverview />
            ) : projectId === "pan" ? (
              <PanProjectOverview />
            ) : projectId === "boohee" ? (
              <BooheeProjectOverview />
            ) : projectId === "ecovacs" ? (
              <EcovacsProjectOverview />
            ) : (
              <ProjectOverview />
            )}
        </motion.div>

        {/* Content Placeholder for rest of case study */}
        
      </div>
    </motion.div>
  );
}
