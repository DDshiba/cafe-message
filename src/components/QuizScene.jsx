import React from "react";
import { Button } from "@/components/ui/button";
import AnimatedText from "@/components/AnimatedText";

const QuizScene = ({ data, onAnswer }) => {
  const { title, content, choices, image } = data;
  const hasStory = !!title;

  return (
    <div className="flex flex-col flex-1">
      {/* ✅ ส่วนกลางทั้งหมด */}
      {hasStory && (
        <div className="flex flex-col items-center justify-center text-center flex-1">
          {/* ✅ รูปภาพ (ถ้ามี) */}
          {image && (
            <img
              src={image}
              alt="quiz"
              className="w-[240px] h-[240px] object-cover rounded-md"
            />
          )}

          {/* ✅ text (ถ้ามี) */}
          {title && (
            <div className="whitespace-pre-line text-center leading-relaxed">
              {title}
            </div>
          )}
        </div>
      )}

      {/* ✅ Quiz */}
      <div
        className={`flex flex-col ${!hasStory ? "justify-center flex-1" : ""}`}
      >
        {/* ✅ คำถามหลัก */}
        {content && (
          <div className="text-xl font-bold text-center whitespace-pre-line leading-relaxed mb-6">
            {content}
          </div>
        )}

        {/* ✅ ตัวเลือกทั้งหมด */}
        <div className="flex flex-col w-full gap-4">
          {choices?.map((choice, index) => (
            <Button
              key={choice.id || index}
              variant="default"
              size="lg"
              onClick={() => onAnswer(choice.id)}
            >
              {choice.text}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizScene;
