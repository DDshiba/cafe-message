import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import animationData from "../assets/loading.json"; // ✅ ไฟล์ json ที่โหลดมา
import { scenes } from "../data/scenes";

export default function LoadingPage() {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const lottieRef = useRef();

  const images = scenes.map((s) => s.image).filter(Boolean);

  useEffect(() => {
    // ✅ แสดง animation ด้วย lottie-web (มือถือรองรับแน่นอน)
    lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });
  }, []);

  useEffect(() => {
    let loaded = 0;
    const start = Date.now();
    const MIN_DURATION = 1500;

    const finish = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(MIN_DURATION - elapsed, 0);
      setTimeout(() => setIsReady(true), wait);
    };

    if (images.length === 0) {
      finish();
      return;
    }

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === images.length) {
          finish();
        }
      };
    });
  }, []);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        navigate("/home");
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isReady, navigate]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-[9999] bg-white flex flex-col items-center justify-center">
      {/* ✅ ใช้ ref สำหรับ lottie-web */}
      <div ref={lottieRef} className="w-[100px] h-[100px]" />

      {/* ✅ preload รูป */}
      <div className="hidden">
        {images.map((src, idx) => (
          <img key={idx} src={src} alt="" loading="eager" />
        ))}
      </div>
    </div>
  );
}
