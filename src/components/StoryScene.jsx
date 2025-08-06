import React from "react";
import { Button } from "@/components/ui/button";
import AnimatedText from "@/components/AnimatedText";

const StoryScene = ({ data, onNext }) => {
  const { id, title, content, image } = data;

  return (
    <div className="flex flex-col flex-1">
      {/* ✅ เนื้อหาอยู่กลางด้วย grow */}
      <div className="flex flex-col items-center justify-center text-center flex-1">
        {image && (
          <img
            src={image}
            alt="story"
            className="w-[240px] h-[240px] object-cover mb-1 rounded-md"
          />
        )}

        {title && (
          <div className="text-xl font-bold mb-4 leading-snug whitespace-pre-line">
            <AnimatedText key={title} text={title} delay={0.04} />
          </div>
        )}

        {content && (
          <div className="whitespace-pre-line text-center leading-relaxed">
            <AnimatedText key={content} text={content} delay={0.02} />
          </div>
        )}
      </div>

      {/* ✅ ปุ่มล่าง */}
      <div className="flex justify-center">
        <Button onClick={onNext} variant="default" size="lg">
          {id === "story_6" ? "เปิดข้อความ" : "ถัดไป"}
        </Button>
      </div>
    </div>
  );
};

export default StoryScene;
