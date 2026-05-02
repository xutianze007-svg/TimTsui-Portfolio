import React, { useRef, useState, useEffect } from 'react';
import Component from '../../imports/88-8-156';

export function UXDesignWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3); // Default initial scale
  
  const DESIGN_WIDTH = 1440;
  const DESIGN_HEIGHT = 1024;

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        // Add a small buffer to ensure coverage
        const scaleX = width / DESIGN_WIDTH;
        const scaleY = height / DESIGN_HEIGHT;
        setScale(Math.max(scaleX, scaleY)); 
      }
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    // Also update after a short delay to ensure layout is settled
    setTimeout(updateScale, 100);
    
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-[#e50213]">
      <div 
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center',
          position: 'absolute',
          top: '50%',
          left: '50%',
        }}
      >
        <Component />
      </div>
    </div>
  );
}
