"use client";

import PropertyCarousel from "./property-carousel";
import { staggerContainer } from "@/lib/animations";
import { motion } from "motion/react";

const sampleImages = [
  "/images/image-one.jpg",
  "/images/image-two.jpg",
  "/images/image-three.jpg",
  "/images/image-four.jpg",
];

const carouselData = [
  {
    title: "MOST CLICKED",
    propertyName: "Urban Prime Plaza Premiere",
    images: [sampleImages[0], sampleImages[1]],
    autoPlayInterval: 4000,
  },
  {
    title: "MOST WATCHLISTED",
    propertyName: "Urban Prime Plaza Premiere",
    images: [
      sampleImages[0],
      sampleImages[1],
      sampleImages[2],
      sampleImages[3],
      sampleImages[0],
    ],
    autoPlayInterval: 5500,
  },
  {
    title: "HOTTEST LISTING",
    propertyName: "Urban Prime Plaza Premiere",
    images: [
      sampleImages[1],
      sampleImages[2],
      sampleImages[3],
      sampleImages[0],
      sampleImages[1],
    ],
    autoPlayInterval: 7000,
  },
];

export default function PropertyCarouselsSection() {
  return (
    <motion.div
      className="mt-6 w-full"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-stretch">
        {carouselData.map((carousel) => (
          <motion.div
            key={carousel.title}
            variants={staggerContainer}
            className="flex-1 w-full sm:w-1/3"
          >
            <PropertyCarousel
              title={carousel.title}
              propertyName={carousel.propertyName}
              images={carousel.images}
              autoPlayInterval={carousel.autoPlayInterval}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
