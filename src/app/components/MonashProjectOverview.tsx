import React from "react";
import mCareerBannerImage from "figma:asset/93d08fd4607871f2ccb7ec3fad372b4c12f69b32.png";
import researchObjectivesImage from "figma:asset/4c672fcd0ef985c17baab331b25799c6430d6568.png";
import painPoints1Image from "figma:asset/da5ce574f2bc2d85ee8b9ac1aab7406f93c66fcf.png";
import painPoints2Image from "figma:asset/ab9b3fe555cea0c08323771042a5a2e8846f1857.png";
import mCareerPortalImage from "figma:asset/b5e661e2c85468371edae324467a3450f476072f.png";
import designOverviewImage from "figma:asset/df043d19bb1e119a8f5fb784e956c009a9bb4c90.png";
import searchBarImage from "figma:asset/e560493b5c90503cd8b43ae50275552746a6eb8f.png";
import navigationBarImage from "figma:asset/8331f93995319e7937fb700330d6165c6bf3da4e.png";
import hierarchyImage from "figma:asset/0e39234e895ba43bdd4ce828d710cd5744355abc.png";
import guidanceImage from "figma:asset/a4a450859ac963b8fc34a50bcace2ada38bebbfd.png";
import visualStyleImage from "figma:asset/f547b20822c0261fad854ed3b26214f625c81a26.png";
import designStyle1Image from "figma:asset/de85fe530e227d7a9783285fd089120d7498d2b4.png";
import designStyle2Image from "figma:asset/0e12edc826ac581eca0c22e5459accc292fac143.png";
import designStyle3Image from "figma:asset/1a9ec28a8be5722568d17fb644308b57e6e65377.png";
import mobilePhoneMockupImage from "figma:asset/8563b71acea653f1040a27c079d850b1325bf854.png";

export function MonashProjectOverview() {
  return (
    <div className="w-full flex justify-center items-center">
       <div className="flex flex-col w-full max-w-7xl">
           <img
             src={mCareerBannerImage}
             alt="M-Career Portal Banner"
             className="w-full h-auto block"
           />
           <img
             src={researchObjectivesImage}
             alt="Research Objectives"
             className="w-full h-auto block"
           />
           <img
             src={painPoints1Image}
             alt="Pain Points 1"
             className="w-full h-auto block"
           />
           <img
             src={painPoints2Image}
             alt="Pain Points 2"
             className="w-full h-auto block"
           />
           <img
             src={mCareerPortalImage}
             alt="What Is M-Career Portal"
             className="w-full h-auto block"
           />
           <img
             src={designOverviewImage}
             alt="Design Overview"
             className="w-full h-auto block"
           />
           <img
             src={searchBarImage}
             alt="Search Bar"
             className="w-full h-auto block"
           />
           <img
             src={navigationBarImage}
             alt="Navigation Bar"
             className="w-full h-auto block"
           />
           <img
             src={hierarchyImage}
             alt="Hierarchy"
             className="w-full h-auto block"
           />
           <img
             src={guidanceImage}
             alt="Guidance"
             className="w-full h-auto block"
           />
           <img
             src={visualStyleImage}
             alt="Visual Style"
             className="w-full h-auto block"
           />
           <img
             src={designStyle1Image}
             alt="Design Style - Color and Typography"
             className="w-full h-auto block"
           />
           <img
             src={designStyle2Image}
             alt="Design Style - Spacing and Grid"
             className="w-full h-auto block"
           />
           <img
             src={designStyle3Image}
             alt="Design Style - Input Fields and Icons"
             className="w-full h-auto block"
           />
           <img
             src={mobilePhoneMockupImage}
             alt="Mobile Phone Mockup"
             className="w-full h-auto block"
           />
       </div>
    </div>
  );
}
