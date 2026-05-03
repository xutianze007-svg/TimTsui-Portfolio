import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { PortfolioPage } from './components/PortfolioPage';
import { CVPage } from './components/CVPage';
import { Preloader } from './components/Preloader';
import { ProjectDetailsPage } from './components/ProjectDetailsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "portfolio" | "cv" | "project-details">("home");
  const [selectedProject, setSelectedProject] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigate = (page: "home" | "portfolio" | "cv" | "project-details") => {
    setCurrentPage(page);
    if (page !== "project-details") {
        setSelectedProject(undefined);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#FF5733] selection:text-black">
      {isLoading ? (
        <Preloader onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <Navbar 
            onNavigate={handleNavigate} 
            currentPage={currentPage === "project-details" ? "portfolio" : currentPage}
          />
          
          {currentPage === "home" && (
            <LandingPage 
              onNavigate={() => setCurrentPage("portfolio")} 
              onProjectClick={(projectId) => {
                setSelectedProject(projectId);
                setCurrentPage("project-details");
              }}
            />
          )}
          {currentPage === "portfolio" && (
            <PortfolioPage onProjectClick={(projectId) => {
                setSelectedProject(projectId);
                setCurrentPage("project-details");
            }} />
          )}
          {currentPage === "cv" && <CVPage />}
          {currentPage === "project-details" && (
            <ProjectDetailsPage onBack={() => handleNavigate("portfolio")} projectId={selectedProject} />
          )}
        </>
      )}
    </div>
  );
}
