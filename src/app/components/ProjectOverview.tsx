import image_29a177fa00a71bff3727cd9116aaed01a163988d from 'figma:asset/29a177fa00a71bff3727cd9116aaed01a163988d.png';
import React from "react";
import projectOverviewImage from "figma:asset/d56e7aae723c68d1629360aa3390ede9d5cafbcd.png";
import researchImage from "figma:asset/635b44c31c3c4803a2b3657565784bc67a86d32f.png";

// New images
import img39 from 'figma:asset/39.png';
import img40 from 'figma:asset/40.png';
import img41 from 'figma:asset/41.png';
import img42 from 'figma:asset/42.png';
import img47 from 'figma:asset/47.png';
import img48 from 'figma:asset/48.png';
import img49 from 'figma:asset/49.png';

export function ProjectOverview() {
  return (
    <div className="w-full flex justify-center items-center">
       <div className="flex flex-col w-full max-w-7xl">
           <img
             src={projectOverviewImage}
             alt="Project Overview - A Land Metaverse App"
             className="w-full h-auto block"
           />
           <img
             src={image_29a177fa00a71bff3727cd9116aaed01a163988d}
             alt="Landscape of Emotional Companionship Apps"
             className="w-full h-auto block"
           />
           
           {/* Added Images 39-49 */}
           <img src={img39} alt="Image 39" className="w-full h-auto block" />
           <img src={img40} alt="Image 40" className="w-full h-auto block" />
           <img src={img41} alt="Image 41" className="w-full h-auto block" />
           <img src={img42} alt="Image 42" className="w-full h-auto block" />
           <img src={img47} alt="Image 47" className="w-full h-auto block" />
           <img src={img48} alt="Image 48" className="w-full h-auto block" />
           <img src={img49} alt="Image 49" className="w-full h-auto block" />

           <img
             src={researchImage}
             alt="Competitors Analysis"
             className="w-full h-auto block"
           />
       </div>
    </div>
  );
}