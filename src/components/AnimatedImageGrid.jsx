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

const durationVisible = 1000;
const transitionTime = 300;

export default function AnimatedCafeShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, durationVisible + transitionTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-[200px] h-[200px] mx-auto relative overflow-hidden">
      {images.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          alt={`cafe-${i}`}
          className="w-full h-full object-contain absolute"
          initial={false}
          animate={{
            opacity: i === index ? 1 : 0,
            scale: i === index ? 1 : 0.9,
            y: i === index ? 0 : 20,
          }}
          transition={{ duration: transitionTime / 1000 }}
        />
      ))}
    </div>
  );
}
