import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

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

const durationVisible = 1000; // เวลาแสดงเต็ม
const transitionTime = 300;   // เวลาเข้าหรือออก

export default function AnimatedCafeShowcase() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setShow(false); // ออกก่อน
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setShow(true); // เข้าใหม่
      }, transitionTime);
    }, durationVisible + transitionTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-[200px] h-[200px] mx-auto relative overflow-hidden">
      <AnimatePresence mode="wait">
        {show && (
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`cafe-${index}`}
            className="w-full h-full object-contain absolute"
            initial={{ opacity: 0, scale: 0.6, y: 40 }}      // 🔽 มาเล็ก+ล่าง
            animate={{ opacity: 1, scale: 1, y: 0 }}          // 🔼 โตขึ้น+ตรงกลาง
            exit={{ opacity: 0.5, scale: 0.3, y: 70 }}          // 🔽 หายแบบย่อลงข้างล่าง
            transition={{
              duration: transitionTime / 1000,
              ease: "easeOut",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
