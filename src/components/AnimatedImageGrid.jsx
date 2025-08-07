import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const images = [
  "/images/cafe/_Book.png",
  "/images/cafe/Creative.png",
  "/images/cafe/Cute.png",
  "/images/cafe/Loft.png",
  "/images/cafe/Vintage_.png",
  "/images/cafe/Pet.png",
  "/images/cafe/Nature.png",
  "/images/cafe/Minimal_.png",
];

const durationVisible = 1200;
const transitionTime = 400;

export default function AnimatedCafeShowcase() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIndex(index); // เก็บภาพก่อนหน้า
      setIndex((prev) => (prev + 1) % images.length);
    }, durationVisible);

    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="w-[200px] h-[200px] mx-auto relative overflow-hidden">
      {images.map((src, i) => {
        const isCurrent = i === index;
        const isPrev = i === prevIndex;

        return (
          <motion.img
            key={src}
            src={src}
            alt={`cafe-${i}`}
            className="w-full h-full object-contain absolute"
            initial={false}
            animate={{
              opacity: isCurrent ? 1 : isPrev ? 0 : 0,
              scale: isCurrent ? 1 : isPrev ? 0.5 : 0.5,
              y: isCurrent ? 0 : isPrev ? 50 : 50,
              zIndex: isCurrent ? 2 : isPrev ? 1 : 0,
            }}
            transition={{
              duration: transitionTime / 1000,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}
