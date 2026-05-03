import React from "react";
import svgPaths from "./svg-ihewxosi73";

export default function Youtube() {
  return (
    <div 
      className="relative size-full cursor-pointer" 
      data-name="youtube"
      onClick={() => window.open("https://www.youtube.com/@timxu3370", "_blank")}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="youtube">
          <g id="youtube_2">
            <path d={svgPaths.p15f64c00} fill="currentColor" />
            <path d={svgPaths.pbec6800} fill="black" />
          </g>
        </g>
      </svg>
    </div>
  );
}
