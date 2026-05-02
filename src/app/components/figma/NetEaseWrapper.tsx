import React from 'react';
import NetEaseComponent from '../../imports/88';

export function NetEaseWrapper() {
  const DESIGN_WIDTH = 1440;
  const DESIGN_HEIGHT = 1024;
  
  // Target is 180x240
  // Scale height: 240/1024 = 0.234
  // Scale width: 180/1440 = 0.125
  // Use larger scale to cover
  const scale = 0.24;
  
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#e50213] flex items-center justify-center">
      <div 
        style={{
           width: DESIGN_WIDTH,
           height: DESIGN_HEIGHT,
           flexShrink: 0,
           transform: `scale(${scale})`,
           transformOrigin: 'center center',
        }}
      >
         <NetEaseComponent />
      </div>
    </div>
  );
}
