import React from "react";
import { Portfolio3DGallery } from "./Portfolio3DGallery";
import booheeImage from "figma:asset/84048e062975b57cd7eb1d6cc36659251723ee07.png";
import neteaseImage from "figma:asset/455459955953f2bb93fda4d8cc2da30b96444288.png";
import monashNewImage from "figma:asset/93d08fd4607871f2ccb7ec3fad372b4c12f69b32.png";
import ecovacsImage from "figma:asset/33ff736431f6b92124e3b93ad1b4309cb11acfef.png";
import panMbzuaiImage from "figma:asset/7237bf6f2c91bcc871db31ffa6b87afa3edf268d.png";

const PROJECTS = [
  {
    title: "NetEase / α land",
    category: "UX Design Project",
    image: neteaseImage,
    id: "netease"
  },
  {
    title: "Monash / Career Connect",
    category: "UX Design Project",
    image: monashNewImage,
    id: "monash",
    hoverVideo: "https://res.cloudinary.com/dgllzgkbi/video/upload/v1765526825/M-Career_Portal_zfdp0u.mp4"
  },
  {
    title: "Pan / MBZUAI",
    category: "UX Design Project",
    image: panMbzuaiImage,
    id: "pan",
    hoverVideo: "https://res.cloudinary.com/dgllzgkbi/video/upload/v1766123532/Pan_ljbegi.mp4"
  },
  {
    title: "Boohee App",
    category: "Usability Test",
    image: booheeImage,
    id: "boohee",
    hoverVideo: "https://res.cloudinary.com/dgllzgkbi/video/upload/v1765562313/Boohee_kbvmnn.mp4"
  },
  {
    title: "Ecovacs DEEBOT X2",
    category: "Usability Test",
    image: ecovacsImage,
    id: "ecovacs",
    hoverVideo: "https://res.cloudinary.com/dgllzgkbi/video/upload/v1765564238/Ecovacs_dchpq6.mp4"
  }
];

interface PortfolioPageProps {
  onProjectClick?: (projectId: string) => void;
}

export function PortfolioPage({ onProjectClick }: PortfolioPageProps) {
  return (
    <div className="h-screen w-full bg-black relative overflow-hidden">
        <Portfolio3DGallery 
            projects={PROJECTS}
            onProjectClick={(id) => onProjectClick && onProjectClick(id)}
        />
    </div>
  );
}
