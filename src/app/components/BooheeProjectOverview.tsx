import React from "react";
import targetClientImage from "figma:asset/679545c4618104fa90cdf0b25eedf20f1aabb086.png";
import projectOverviewImage from "figma:asset/66ff2ea129fbeff2748b9ad6fc6768604e39a78e.png";
import backgroundResearchImage from "figma:asset/1623dbe41007b9deb517754fe74e72f0d997d80e.png";
import researchObjectivesImage from "figma:asset/6e14ab9dcddc3e69a506b845d2bcd4f9ee1a63c0.png";
import participantScreeningImage from 'figma:asset/2ffe0e799b07e278e9be4dc87f68a31bae8c149b.png';
import screenerQuestionnairesImage from 'figma:asset/4c1eab38d43ff15cc81e59cb09e79bb63aa196b0.png';
import screenerQuestionnaireResultsImage from 'figma:asset/293072437b7d1f4a64abdd998665e32307cbdb15.png';
import usabilityTestImage from 'figma:asset/823cc8db520391a2167eb68bbb9cedfb7a220dd1.png';
import task1Image from 'figma:asset/72ac6e671b6285c390107241cf4a87f295b2ca9c.png';
import task2Image from 'figma:asset/ee4608980da9dd8b3106f577b30bec4e3e389c7e.png';
import task3Image from 'figma:asset/780693ce5307c82724745a5040bed48afa58a174.png';
import task4Image from 'figma:asset/023f020954f3ebe04504a8ff9cdd4252672dcaa7.png';
import task5Image from 'figma:asset/85fd9befab2068ea1162c28068178d638b96eeb1.png';
import dataOverviewImage from 'figma:asset/8adae100a89aa7d2eb40f19e27c44df1b2da9a36.png';
import keyQuotesPositiveImage from 'figma:asset/1fcfca0316f4b2464d96c110cb7f129fe3238bcc.png';
import keyQuotesNegativeImage from 'figma:asset/8764f6cda8b9ad89ff1e893a1291770168d8d59c.png';
import keyFindingsImage from 'figma:asset/7791d95e5ebbc30bf61e00f8f9d2919115e47498.png';
import conclusionImage from 'figma:asset/23c7a82b303527af6d806c7e18b560a495584826.png';
import recommendationImage from 'figma:asset/c81e28ba37e0d1935347cbd053f278150f99ef8d.png';

export function BooheeProjectOverview() {
  return (
    <div className="w-full flex justify-center items-center">
       <div className="flex flex-col gap-12 w-full max-w-7xl">
           <div className="flex flex-col w-full">
               <img
                 src={targetClientImage}
                 alt="Target Client"
                 className="w-full h-auto block"
               />
               <img
                 src={projectOverviewImage}
                 alt="Project Overview"
                 className="w-full h-auto block"
               />
               <img
                 src={backgroundResearchImage}
                 alt="Background Research"
                 className="w-full h-auto block"
               />
               <img
                 src={researchObjectivesImage}
                 alt="Research Objectives"
                 className="w-full h-auto block"
               />
               <img
                 src={participantScreeningImage}
                 alt="Participant Screening"
                 className="w-full h-auto block"
               />
               <img
                 src={screenerQuestionnairesImage}
                 alt="Screener Questionnaires"
                 className="w-full h-auto block"
               />
               <img
                 src={screenerQuestionnaireResultsImage}
                 alt="Screener Questionnaire Results"
                 className="w-full h-auto block"
               />
               <img
                 src={usabilityTestImage}
                 alt="Usability Test"
                 className="w-full h-auto block"
               />
               <img
                 src={task1Image}
                 alt="Task 1"
                 className="w-full h-auto block"
               />
               <img
                 src={task2Image}
                 alt="Task 2"
                 className="w-full h-auto block"
               />
               <img
                 src={task3Image}
                 alt="Task 3"
                 className="w-full h-auto block"
               />
               <img
                 src={task4Image}
                 alt="Task 4"
                 className="w-full h-auto block"
               />
               <img
                 src={task5Image}
                 alt="Task 5"
                 className="w-full h-auto block"
               />
               <img
                 src={dataOverviewImage}
                 alt="Data Overview"
                 className="w-full h-auto block"
               />
               <img
                 src={keyQuotesPositiveImage}
                 alt="Key Quotes Positive"
                 className="w-full h-auto block"
               />
               <img
                 src={keyQuotesNegativeImage}
                 alt="Key Quotes Negative"
                 className="w-full h-auto block"
               />
               <img
                 src={keyFindingsImage}
                 alt="Key Findings & Insights"
                 className="w-full h-auto block"
               />
               <img
                 src={conclusionImage}
                 alt="Our Conclusion"
                 className="w-full h-auto block"
               />
               <img
                 src={recommendationImage}
                 alt="Recommendation"
                 className="w-full h-auto block"
               />
           </div>
       </div>
    </div>
  );
}
