import React from "react";
import panWorldModelImage from "figma:asset/037eac21d645e42cea00840cf678b7b048ba01bd.png";
import panOverviewImage from "figma:asset/b0fe905b911aa7934f5aceb47e395c6c44bc76d9.png";
import panTypographyImage from "figma:asset/521a9588847e029b73b0942931ac47d850ffa574.png";
import panResponsiveImage from "figma:asset/0f207547d79589d41ada96b5cc8b0e789ce04fb2.png";
import panGenerationHistoryImage from "figma:asset/fe5b977a56246651f56ae1487111aefdf1023092.png";
import panCardDesignImage from "figma:asset/c9b29ad502621dd5733df0d20d757a3d024dc496.png";
import panFeaturesOverviewImage from "figma:asset/897de0bff8f139978294a1c10a6194ab9d571287.png";
import { ImageWithFallback } from './figma/ImageWithFallback';

export function PanProjectOverview() {
  return (
    <div className="w-full flex justify-center items-center">
       <div className="flex flex-col gap-12 w-full max-w-7xl">
           <div className="flex flex-col w-full">
               <img
                 src={panWorldModelImage}
                 alt="Pan World Model"
                 className="w-full h-auto rounded-t-3xl block"
               />
               <img
                 src={panOverviewImage}
                 alt="Project Overview"
                 className="w-full h-auto block"
               />
               <img
                 src={panTypographyImage}
                 alt="Typography and Color Palette"
                 className="w-full h-auto block"
               />
               <ImageWithFallback
                 src="https://res.cloudinary.com/dgllzgkbi/image/upload/v1766132027/Landingpage_im9odb.jpg"
                 alt="Landing Page Design"
                 className="w-full h-auto block"
               />
               <img
                 src={panResponsiveImage}
                 alt="Responsive Design Optimized"
                 className="w-full h-auto block"
               />
               <img
                 src={panGenerationHistoryImage}
                 alt="Generation History and Gallery"
                 className="w-full h-auto block"
               />
               <img
                 src={panCardDesignImage}
                 alt="Card Design"
                 className="w-full h-auto block"
               />
               <img
                 src={panFeaturesOverviewImage}
                 alt="Features Overview"
                 className="w-full h-auto block"
               />
           </div>
       </div>
    </div>
  );
}
