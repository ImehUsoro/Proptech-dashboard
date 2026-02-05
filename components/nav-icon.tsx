"use client";

import Image from "next/image";

interface NavIconProps {
  src: string;
  alt: string;
  isActive: boolean;
  width?: number;
  height?: number;
}

export default function NavIcon({ src, alt, isActive, width = 24, height = 24 }: NavIconProps) {
  const activeColor = "#176D58";
  const inactiveColor = "#3D3D3D";
  
  return (
    <div 
      className="relative transition-colors"
      style={{ 
        width, 
        height,
        color: isActive ? activeColor : inactiveColor,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="transition-opacity"
        style={{
          filter: isActive 
            ? "brightness(0) saturate(100%) invert(28%) sepia(45%) saturate(1000%) hue-rotate(130deg) brightness(95%) contrast(85%)"
            : "brightness(0) saturate(100%) invert(20%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)",
          opacity: isActive ? 1 : 0.7,
        }}
      />
    </div>
  );
}
