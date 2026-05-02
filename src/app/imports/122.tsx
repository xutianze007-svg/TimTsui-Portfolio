import svgPaths from "./svg-7qdmwswgrw";
import imgDesign1 from "figma:asset/5c6ff405878115096feb19fdfb7629cf01d350bc.png";
import imgSurfaceLaptopStudio from "figma:asset/bbbd43ae60e0c1f0cd2f56e922088d5ac1a0cba2.png";
import imgRectangle from "figma:asset/f262a5317e4a4e17f94b8e73a8135d65946978b5.png";
import { imgDesign } from "./svg-39rz2";

function MonashUniversityLogo() {
  return (
    <div className="absolute h-[42px] left-[144px] top-[100px] w-[138px]" data-name="Monash_University_logo (2) 2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 138 42">
        <g id="Monash_University_logo (2) 2">
          <path d={svgPaths.p22a75e00} fill="var(--fill-0, white)" id="path7759" />
          <path d={svgPaths.p1df77900} fill="var(--fill-0, white)" id="path7783" />
          <path d={svgPaths.p1bd13fb0} fill="var(--fill-0, white)" id="use7800" />
        </g>
      </svg>
    </div>
  );
}

function Down() {
  return (
    <div className="absolute h-[21.333px] left-[11.77px] top-[21.34px] w-[38.895px]" data-name="Down">
      <div className="absolute inset-[-4.69%_-2.57%_-4.68%_-2.57%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 24">
          <g id="Down">
            <path d={svgPaths.p2dc3a9c0} id="Vector" stroke="var(--stroke-0, #212121)" strokeLinecap="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Down1() {
  return (
    <div className="relative size-[64px]" data-name="Down">
      <Down />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-white content-stretch flex items-start left-[144px] overflow-clip px-[64px] py-[4px] shadow-[0px_55px_64px_8px_rgba(30,30,30,0.08)] top-[680px]">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Down1 />
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[144px] top-[384px]">
      <p className="[text-shadow:rgba(35,35,35,0.32)_0px_4px_32px] absolute font-['IBM_Plex_Mono:SemiBold',sans-serif] leading-none left-[144px] not-italic text-[96px] text-white top-[384px] w-[463px]">
        <span>{`M-Career `}</span>Portal
      </p>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents inset-[17.22%_3.19%_15.76%_39.76%]" data-name="Mask group">
      <div className="absolute h-[726.368px] left-[calc(33.33%+122.27px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[1.082px_1.215px] mask-size-[1095.48px_723.828px] top-[184.8px] w-[1096.92px]" data-name="Design" style={{ maskImage: `url('${imgDesign}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgDesign1} />
      </div>
    </div>
  );
}

function Mockup() {
  return (
    <div className="absolute contents inset-[17.22%_3.19%_15.76%_39.76%]" data-name="Mockup">
      <MaskGroup />
    </div>
  );
}

function SurfaceLaptopStudio() {
  return (
    <div className="absolute contents left-[calc(16.67%+306px)] top-[156px]" data-name="Surface Laptop Studio">
      <div className="absolute inset-[14.44%_-3.96%_7.8%_32.6%]" data-name="Surface-Laptop-Studio">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgSurfaceLaptopStudio} />
        </div>
      </div>
      <Mockup />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#e9e9e9] relative size-full" data-name="122">
      <div className="absolute bg-gradient-to-b from-[#4d4d4d] from-[3.426%] h-[1080px] left-0 to-[#000000] top-0 w-[701px]" />
      <div className="absolute bg-repeat bg-size-[500px_500px] bg-top-left h-[1080px] left-0 mix-blend-screen opacity-20 top-0 w-[701px]" data-name="Rectangle" style={{ backgroundImage: `url('${imgRectangle}')` }} />
      <div className="absolute inset-[-3.98%_82.29%_56.3%_-7.08%] mix-blend-soft-light" data-name="use7800">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 476 515">
          <g id="use7800" opacity="0.6" style={{ mixBlendMode: "soft-light" }}>
            <path d={svgPaths.p8b73380} fill="var(--fill-0, black)" />
          </g>
        </svg>
      </div>
      <MonashUniversityLogo />
      <Frame />
      <Group />
      <SurfaceLaptopStudio />
    </div>
  );
}