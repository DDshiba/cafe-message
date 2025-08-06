import { useEffect, useRef } from "react";

export default function AudioBG() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    // ✅ กำหนดความดังให้นุ่มหู (ค่าระหว่าง 0.0 - 1.0)
    if (audio) {
      audio.volume = 0.35; // 👈 เสียงเบา ๆ สไตล์คาเฟ่
    }

    // ✅ สั่งเล่นหลังจาก delay 1.5 วิ
    const playMusic = () => {
      setTimeout(() => {
        if (audio && audio.paused) {
          audio.play().catch((err) => console.warn("🎵 play error:", err));
        }
      }, 1500); // 👈 Delay 1.5 วินาที
    };

    document.addEventListener("click", playMusic, { once: true });

    return () => {
      document.removeEventListener("click", playMusic);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/audio/audioBG.mp3" // 👈 เสียงคาเฟ่ในฝัน
      loop
      preload="auto"
      autoPlay
      hidden
    />
  );
}
