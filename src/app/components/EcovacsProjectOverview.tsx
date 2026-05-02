import image_095f1eb5cf27066e3e99d1c827f6e97d7dad7edd from 'figma:asset/095f1eb5cf27066e3e99d1c827f6e97d7dad7edd.png';
import userResearchImage from 'figma:asset/1aff6996971a15c4f1ac6af2d605a21b5d1f553a.png';
import quantitativeUxAssessmentImage from 'figma:asset/22c44f7597690602cd40344b654ddcf2a1353beb.png';
import deepInsightsImage from 'figma:asset/d9e6ecea177d84cc12fb312a9aa55020ad2c0ddd.png';
import productStrategyImage from 'figma:asset/c04f7ff15ec237b02f6f8c50306511d546d6efc1.png';
import React from "react";
import ecovacsImage from "figma:asset/33ff736431f6b92124e3b93ad1b4309cb11acfef.png";

export function EcovacsProjectOverview() {
  return (
    <div className="w-full flex justify-center items-center">
       <div className="flex flex-col gap-0 w-full max-w-7xl">
           <div className="flex flex-col w-full">
               <img
                 src={image_095f1eb5cf27066e3e99d1c827f6e97d7dad7edd}
                 alt="Our Challenge"
                 className="w-full h-auto block"
               />
               <img
                 src={userResearchImage}
                 alt="User Research"
                 className="w-full h-auto block"
               />
               <img
                 src={quantitativeUxAssessmentImage}
                 alt="Quantitative UX Assessment"
                 className="w-full h-auto block"
               />
               <img
                 src={deepInsightsImage}
                 alt="Deep Insights"
                 className="w-full h-auto block"
               />
               <img
                 src={productStrategyImage}
                 alt="Product Strategy"
                 className="w-full h-auto block"
               />
           </div>
       </div>
    </div>
  );
}
