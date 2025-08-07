import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { scenes } from "../data/scenes";

import { Progress } from "@/components/ui/progress";
import StoryScene from "@/components/StoryScene";
import QuizScene from "@/components/QuizScene";

function PlayPage() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const current = scenes[sceneIndex];

  // ✅ BACKEND URL (เปลี่ยนตอน deploy จริง)
  const API_BASE = "https://cafe-api-hvv4.onrender.com"; // ← เปลี่ยนตรงนี้ตามจริง

  // ✅ ปลุก backend ล่วงหน้าเบา ๆ (ทำครั้งเดียวตอนเข้า)
  useEffect(() => {
    fetch(`${API_BASE}/health`)
      .then(() => console.log("✅ Backend warmed up"))
      .catch((err) => console.warn("⚠️ Backend warm-up failed:", err));
  }, []);

  // ✅ เวลาผู้ใช้ตอบแต่ละข้อ
  const handleAnswer = (choiceId) => {
    const fullChoiceId = `${current.id}:${choiceId}`;
    setAnswers((prev) => [...prev, fullChoiceId]);
    nextScene();
  };

  // ✅ ไปหน้าถัดไปหรือจบ → ส่งคะแนนไป backend
  const nextScene = async () => {
    if (sceneIndex + 1 < scenes.length) {
      setSceneIndex((prev) => prev + 1);
    } else {
      try {
        const response = await fetch(`${API_BASE}/api/result`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers }),
        });

        if (!response.ok) {
          const text = await response.text();
          console.error("❌ Server Error:", text);
          alert("เกิดข้อผิดพลาดจากเซิร์ฟเวอร์: " + text);
          return;
        }

        const resultData = await response.json();
        localStorage.setItem("quizResult", JSON.stringify(resultData));
        navigate("/result");
      } catch (error) {
        console.error("❌ Network Error:", error);
        alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
      }
    }
  };

  return (
    <div className="w-[390px] mx-auto min-h-screen flex flex-col justify-center pb-9 pt-11 px-4 bg-white">
      <div className="h-[580px] flex flex-col justify-between">
        <Progress
          value={((sceneIndex + 1) / scenes.length) * 100}
          className="w-full"
        />

        {current.type === "story" && (
          <StoryScene data={current} onNext={nextScene} />
        )}

        {current.type === "quiz" && (
          <QuizScene data={current} onAnswer={handleAnswer} />
        )}
      </div>
    </div>
  );
}

export default PlayPage;
