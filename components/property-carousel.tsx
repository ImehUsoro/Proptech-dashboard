"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { carouselZoom, carouselImageTransition } from "@/lib/animations";

interface PropertyCarouselProps {
  title: string;
  propertyName: string;
  images: string[];
  autoPlayInterval?: number;
}

export default function PropertyCarousel({
  title,
  propertyName,
  images,
  autoPlayInterval = 4000,
}: PropertyCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), autoPlayInterval);
  };

  useEffect(() => {
    if (isPaused || images.length <= 1) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [nextSlide, autoPlayInterval, isPaused, images.length]);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full h-[286px] rounded-[12px] overflow-hidden cursor-pointer"
      onMouseEnter={() => {
        setIsPaused(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsHovered(false);
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          variants={carouselImageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div
            className="absolute inset-0"
            animate={isHovered ? "hover" : "initial"}
            variants={carouselZoom}
          >
            <Image
              src={images[currentIndex]}
              alt={`${propertyName} - ${title}`}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1440px) 33vw, 418px"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2), transparent)",
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 z-10">
        <p className="text-white text-[14px] font-medium mb-1 uppercase tracking-wide">
          {title}
        </p>
        <p className="text-white text-[18px] font-semibold">
          {propertyName}
        </p>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-2 h-2 bg-white"
                  : "w-1.5 h-1.5 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
