import React, { useMemo } from "react";
import { useMotionValue, useAnimationFrame } from "motion/react";
import { ProjectCard } from "./ProjectCard";
import neteaseImage from "figma:asset/6879de0af4525915f1e96ded4cf84bc511c87639.png";
import monashNewImage from "figma:asset/37b140ae8bf365a17bcb31d05104861fe99e6ef4.png";
import panMbzuaiImage from "figma:asset/230651df040f13bc39c78933f1c032c7c34757cb.png";
import booheeImage from "figma:asset/640a74afb45d63abf4b07cf33056fb7574f1c041.png";
import ecovacsImage from "figma:asset/284af2ad7dbc75408bb93b64063ee540f6f755c6.png";

const IMAGES = [
  neteaseImage,
  monashNewImage,
  panMbzuaiImage,
  booheeImage,
  ecovacsImage,
];

const GAP = 280; // Larger gap for cleaner look
const LANES = [-2, -1, 0, 1, 2]; // 5 distinct lanes

type ScrollerItem = {
  id: number;
  image: string;
  height: number;
  width: number;
  rotation: number;
  component?: React.ReactNode;
};

function InfiniteColumn({ items, speed = 0.5, laneId }: { items: ScrollerItem[], speed?: number, laneId: number }) {
  const columnHeight = items.length * GAP;
  const y = useMotionValue(0);

  useAnimationFrame((time, delta) => {
    // Move upwards (decrease y)
    let newY = y.get() - speed * (delta / 16); 
    if (newY <= -columnHeight) {
      newY = 0;
    }
    y.set(newY);
  });

  // Calculate start offset to stagger the lanes
  // Even lanes (outer) start lower, Odd lanes (inner) start higher
  // This creates a "checkerboard" or interleaved feel
  const laneStagger = (Math.abs(laneId) % 2) * (GAP / 2);

  // We render 3 sets for smooth infinite looping covering the whole screen
  return (
    <>
      {/* Set 1 */}
      {items.map((item, index) => (
        <ProjectCard 
          key={`a-${item.id}`}
          id={item.id}
          image={item.image}
          component={item.component}
          columnY={y}
          offset={index * GAP + laneStagger + window.innerHeight} 
          laneId={laneId}
        />
      ))}
      
      {/* Set 2 */}
      {items.map((item, index) => (
        <ProjectCard 
          key={`b-${item.id}`}
          id={item.id + 1000} // Offset ID for randomness variance
          image={item.image}
          component={item.component}
          columnY={y}
          offset={index * GAP + columnHeight + laneStagger + window.innerHeight} 
          laneId={laneId}
        />
      ))}

        {/* Set 3 - Extra buffer for tall screens */}
        {items.map((item, index) => (
        <ProjectCard 
          key={`c-${item.id}`}
          id={item.id + 2000}
          image={item.image}
          component={item.component}
          columnY={y}
          offset={index * GAP + columnHeight * 2 + laneStagger + window.innerHeight} 
          laneId={laneId}
        />
      ))}
    </>
  );
}

export function BackgroundScroller() {
  const lanesItems = useMemo(() => {
    const allLanes: ScrollerItem[][] = [];
    // Use 5 items to match the number of unique images (5).
    // This allows us to create a perfect loop without duplicates.
    const itemCount = 5; 

    for (let l = 0; l < LANES.length; l++) {
      const laneItems: ScrollerItem[] = [];

      // DETERMINISTIC PATTERN GENERATION
      // Pattern formula: (index + lane * 2) % 5
      // 
      // Why this works:
      // 1. Vertical: index increments by 1, so neighbors are always different (0,1,2...)
      // 2. Horizontal (Lane l vs l-1): Shifted by 2. 
      //    Lane 0: [0, 1, 2, 3, 4]
      //    Lane 1: [2, 3, 4, 0, 1]
      //    
      // 3. Staggered Neighbors (Critical):
      //    Because lanes are staggered, Item L1[0] (value 2) sits visually between L0[0] (value 0) and L0[1] (value 1).
      //    Since 2 != 0 and 2 != 1, there is no visual clash.
      
      for (let i = 0; i < itemCount; i++) {
        const imgIndex = (i + l * 2) % 5;

        laneItems.push({
          id: l * 100 + i,
          image: IMAGES[imgIndex],
          // We keep the random visual properties for the "floating" feel,
          // but the content itself is now strictly ordered.
          height: Math.random() > 0.5 ? 280 : 350,
          width: Math.random() > 0.5 ? 200 : 240,
          rotation: Math.random() * 30 - 15,
        });
      }
      allLanes.push(laneItems);
    }
    return allLanes;
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none">
       <div className="relative w-full h-full [perspective:1000px] [transform-style:preserve-3d]"> 
          {LANES.map((laneId, index) => (
             <InfiniteColumn 
                key={laneId} 
                items={lanesItems[index]} 
                speed={0.8} 
                laneId={laneId} 
             />
          ))}
       </div>
    </div>
  );
}
