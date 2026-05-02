import svgPaths from "./svg-399vjdurux";
import imgShadow from "figma:asset/393e3811afff84b0fbf0f92ceb18484fc8c05797.png";
import imgReflection from "figma:asset/172253be1ceff14552b2a84247dc2e7a5fd6d366.png";
import imgDesign1 from "figma:asset/dff3c6f3113dbe2d1fcde254ae041e78127cfe85.png";
import imgShadow1 from "figma:asset/ef4faaf9a7d9e42e915ed79717d932d746d58d96.png";
import imgReflection1 from "figma:asset/9ddc8e473b949538aa9afe185d33a5aa2fe05a5e.png";
import imgShadow2 from "figma:asset/39928d6cde9b4cacfdc6aa4af4b93207076a067c.png";
import imgReflection2 from "figma:asset/cd30352937f1fa58f8a0536719e7f787b0a41593.png";
import img20221111141 from "figma:asset/7b2629bce3c64c9405aa09fa1ce263a99e482e68.png";
import imgImage57 from "figma:asset/80086e1bfb85fafac4266e57e0662e4907c40d66.png";
import imgImg1464Acc1214C11 from "figma:asset/6311e68501e616a44fd722ac33628a9f53f41a9f.png";
import { imgDesign } from "./svg-aqf2n";

function HandR() {
  return (
    <div className="absolute contents inset-[30.42%_-18.33%_0.02%_58.81%]" data-name="Hand,R">
      <div className="absolute inset-[30.43%_-18.33%_0.02%_58.82%]" data-name="Change-Color">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 859 752">
          <path clipRule="evenodd" d={svgPaths.p54ca200} fill="var(--fill-0, white)" fillRule="evenodd" id="Change-Color" />
        </svg>
      </div>
      <div className="absolute inset-[30.42%_-18.33%_0.02%_58.81%] mix-blend-multiply" data-name="Shadow">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgShadow} />
        </div>
      </div>
      <div className="absolute inset-[30.42%_-18.33%_0.02%_58.81%] mix-blend-screen" data-name="Reflection">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgReflection} />
        </div>
      </div>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents inset-[22.57%_9.17%_35.58%_60.67%]" data-name="Mask group">
      <div className="absolute h-[465.254px] left-[864.37px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[10.5px_5.586px] mask-size-[434.912px_451.98px] top-[238.13px] w-[456.848px]" data-name="Design" style={{ maskImage: `url('${imgDesign}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgDesign1} />
      </div>
    </div>
  );
}

function Mockup() {
  return (
    <div className="absolute contents inset-[22.57%_9.17%_35.58%_60.67%]" data-name="Mockup">
      <MaskGroup />
    </div>
  );
}

function IPhone() {
  return (
    <div className="absolute contents inset-[21.83%_8.31%_33.03%_59.41%]" data-name="iPhone-12">
      <div className="absolute inset-[21.83%_8.32%_33.04%_59.42%]" data-name="Change-Color">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 466 488">
          <path clipRule="evenodd" d={svgPaths.p21f0b180} fill="var(--fill-0, white)" fillRule="evenodd" id="Change-Color" />
        </svg>
      </div>
      <Mockup />
      <div className="absolute inset-[21.83%_8.31%_33.03%_59.41%] mix-blend-multiply" data-name="Shadow">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgShadow1} />
        </div>
      </div>
      <div className="absolute inset-[21.83%_8.31%_33.03%_59.41%] mix-blend-screen" data-name="Reflection">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgReflection1} />
        </div>
      </div>
    </div>
  );
}

function HandL() {
  return (
    <div className="absolute contents inset-[55.32%_15.48%_0.02%_60.16%]" data-name="Hand,L">
      <div className="absolute inset-[55.35%_15.51%_0.02%_60.17%]" data-name="Change-Color">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 351 482">
          <path clipRule="evenodd" d={svgPaths.p3f2d1400} fill="var(--fill-0, white)" fillRule="evenodd" id="Change-Color" />
        </svg>
      </div>
      <div className="absolute inset-[55.32%_15.48%_0.02%_60.16%] mix-blend-multiply" data-name="Shadow">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgShadow2} />
        </div>
      </div>
      <div className="absolute inset-[55.32%_15.48%_0.02%_60.16%] mix-blend-screen" data-name="Reflection">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgReflection2} />
        </div>
      </div>
    </div>
  );
}

function IPhone12ProWoodenHands() {
  return (
    <div className="absolute contents left-[848px] top-[235.72px]" data-name="iPhone 12 Pro (Wooden Hands)">
      <HandR />
      <IPhone />
      <HandL />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-gradient-to-r from-[#23bb7c] relative size-full to-[#0c9b91]" data-name="124">
      <div className="absolute h-[284px] left-[377px] top-[292px] w-[284.774px]" data-name="Union">
        <div className="absolute inset-[0_-3.86%_-3.52%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 296 294">
            <g filter="url(#filter0_d_18_76)" id="Union">
              <path d={svgPaths.p3a73af00} fill="url(#paint0_linear_18_76)" shapeRendering="crispEdges" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="294" id="filter0_d_18_76" width="295.774" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dx="7" dy="6" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.283333 0 0 0 0 0.283333 0 0 0 0 0.283333 0 0 0 0.06 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_18_76" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_18_76" mode="normal" result="shape" />
              </filter>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_18_76" x1="319.82" x2="-13.0171" y1="-6.19538e-05" y2="-5.86709e-05">
                <stop stopColor="white" stopOpacity="0.01" />
                <stop offset="1" stopColor="#E1FFAF" stopOpacity="0.36" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="[text-shadow:rgba(72,72,72,0.24)_3px_6px_4px] absolute flex flex-col font-['Freight:Disp_Black',sans-serif] justify-center leading-[64px] left-[78px] not-italic text-[#f2f2f2] text-[64px] text-nowrap top-[912px] translate-y-[-50%] whitespace-pre">
        <p className="mb-0">Usability</p>
        <p>Test</p>
      </div>
      <div className="absolute h-[28px] left-[1194px] top-[107px] w-[100px]" data-name="截屏2022-11-11 14 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img20221111141} />
      </div>
      <div className="absolute left-[1326px] size-[34px] top-[104px]" data-name="image 57">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage57} />
      </div>
      <div className="absolute left-[78px] rounded-[34px] shadow-[3px_6px_4px_0px_rgba(72,72,72,0.24)] size-[120px] top-[104px]" data-name="IMG_1464ACC1214C-1 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[34px]">
          <img alt="" className="absolute h-[1400%] left-[-198.44%] max-w-none top-[-617.19%] w-[646.87%]" src={imgImg1464Acc1214C11} />
        </div>
      </div>
      <IPhone12ProWoodenHands />
      <div className="[text-shadow:rgba(72,72,72,0.24)_3px_6px_4px] absolute flex flex-col font-['SF_Pro:Heavy_Italic',sans-serif] font-[858.4] italic justify-center leading-[160px] left-[78px] text-[128px] text-nowrap text-white top-[504px] translate-y-[-50%] whitespace-pre" style={{ fontVariationSettings: "'YAXS' 400" }}>
        <p className="mb-0">Boohee</p>
        <p>App</p>
      </div>
    </div>
  );
}