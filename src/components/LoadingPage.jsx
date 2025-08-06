import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { scenes } from "../data/scenes";

export default function LoadingPage() {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  const images = scenes.map((s) => s.image).filter(Boolean);

  useEffect(() => {
    let loaded = 0;

    if (images.length === 0) {
      setIsReady(true);
      return;
    }

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === images.length) {
          setIsReady(true);
        }
      };
    });
  }, []);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        navigate("/home");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isReady, navigate]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-[100px] h-[100px]">
        <DotLottieReact
          src="https://lottie.host/326752a1-2cdd-41d5-9af6-3d00222c707c/YkU1t2bYNh.lottie"
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* ✅ preload images in DOM (force browser cache) */}
      <div className="hidden">
        {images.map((src, idx) => (
          <img key={idx} src={src} alt="" loading="eager" />
        ))}
      </div>
    </div>
  );
}
