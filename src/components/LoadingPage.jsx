import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { scenes } from "../data/scenes";

export default function LoadingPage() {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  // ✅ ป้องกัน scenes undefined/null
  const images = (scenes || []).map((s) => s.image).filter(Boolean);

  useEffect(() => {
    let loaded = 0;

    // ✅ ถ้าไม่มีรูป → ยัง delay loading เล็กน้อย เพื่อให้โชว์
    if (images.length === 0) {
      setTimeout(() => setIsReady(true), 500);
      return;
    }

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === images.length) {
          setTimeout(() => setIsReady(true), 500); // ✅ เพิ่ม delay
        }
      };
    });
  }, []);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        navigate("/home");
      }, 1500); // รอหลัง loading ก่อนเข้า /home
      return () => clearTimeout(timer);
    }
  }, [isReady, navigate]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-white z-[9999]">
      <div className="w-[100px] h-[100px]">
        <DotLottieReact
          src="https://lottie.host/326752a1-2cdd-41d5-9af6-3d00222c707c/YkU1t2bYNh.lottie"
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* ✅ preload รูปทั้งหมด (แม้มองไม่เห็น) */}
      <div className="hidden">
        {images.map((src, idx) => (
          <img key={idx} src={src} alt="" loading="eager" />
        ))}
      </div>
    </div>
  );
}
