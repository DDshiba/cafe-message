import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AnimatedImageGrid from "@/components/AnimatedImageGrid";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function HomePage() {
  const navigate = useNavigate();
  const chimeRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);
  const [bgImage, setBgImage] = useState("/images/bg_day.png");

  const API_BASE = "https://cafe-api-hvv4.onrender.com"; // ✅ ใส่ URL backend

  // ✅ เพิ่มส่วนนี้เพื่อปลุก backend ตอนโหลดหน้า Home
  useEffect(() => {
    fetch(`${API_BASE}/health`)
      .then(() => console.log("✅ Backend warmed up from Home"))
      .catch(() => console.warn("⚠️ Backend warm-up failed (Home)"));
  }, []);

  const handleClick = () => {
    if (isClicked) return;
    setIsClicked(true);

    setBgImage("/images/bg_night.png");

    if (chimeRef.current) {
      chimeRef.current.currentTime = 0;
      chimeRef.current.play();
    }

    setTimeout(() => {
      navigate("/play");
    }, 1500);
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <motion.div
        initial={{ opacity: 0, filter: "blur(8px)", scale: 1.05 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-[390px] h-[580px] flex flex-col justify-between items-center text-center"
      >
        <img
          src="/images/logo.svg"
          alt="Café Message Logo"
          className="w-[240px] h-auto"
        />

        <p className="text-white text-sm gap-4">
          [ Quiz ใช้เวลาประมาณ 5-10 นาที ]
          <br />
          ข้อแนะนำ : อ่านเนื้อเรื่อง และตอบคำถามอย่างใจเย็น
        </p>

        <AnimatedImageGrid />

        <motion.div
          animate={
            isClicked
              ? { rotate: [0, -5, 5, -3, 3, 0] }
              : { rotate: 0 }
          }
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={handleClick}
            disabled={isClicked}
          >
            เริ่มต้นการเดินทาง
          </Button>
        </motion.div>

        <audio ref={chimeRef} src="/audio/chime.mp3" preload="auto" />
      </motion.div>
    </div>
  );
}

export default HomePage;
