import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setShow(false); // ออกจากฉากก่อน
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length); // เปลี่ยนภาพ
        setShow(true); // เข้าฉากใหม่
      }, transitionTime); // ให้เวลาภาพเก่าหายก่อนเปลี่ยน
    }, durationVisible + transitionTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-[200px] h-[200px] mx-auto relative overflow-hidden">
      <AnimatePresence mode="wait">
        {show && (
          <motion.img
            key={images[index]} // ทำให้ framer สร้าง-ลบ img จริง ๆ
            src={images[index]}
            alt={`cafe-${index}`}
            className="w-full h-full object-contain absolute"
            initial={{ opacity: 0, scale: 0.6, y: 40 }}     // เข้าฉากแบบเด้งขึ้น
            animate={{ opacity: 1, scale: 1, y: 0 }}         // อยู่ตรงกลาง
            exit={{ opacity: 0, scale: 0.3, y: 70 }}         // หายลงไป
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
