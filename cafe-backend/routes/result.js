import express from "express";
import { choiceScores } from "../data/choices.js";

const router = express.Router();

router.post("/result", (req, res) => {
  const { answers } = req.body;

  console.log("📥 ได้รับ answers:", answers);

  // 🔒 ป้องกันค่า undefined/null
  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: "Missing or invalid 'answers'" });
  }

  const total = {};

  answers.forEach((choiceId) => {
    const scores = choiceScores[choiceId];

    // ✅ LOG แสดงคะแนนที่ได้จากแต่ละ choice
    if (scores) {
      console.log(`🧠 คำตอบ ${choiceId} ให้คะแนน:`, scores);
    } else {
      console.warn("⚠️ ไม่พบคะแนนของ choice:", choiceId);
      return;
    }

    for (const [type, score] of Object.entries(scores)) {
      total[type] = (total[type] || 0) + score;
    }
  });

  const entries = Object.entries(total);

  // ✅ LOG รวมคะแนนสุดท้าย
  console.log("📊 รวมคะแนนทั้งหมด:", total);

  if (entries.length === 0) {
    console.warn("⚠️ ไม่พบคะแนนเลย ส่งกลับ Unknown");
    return res.json({
      result: "Unknown",
      scores: {},
    });
  }

  const result = entries.sort((a, b) => b[1] - a[1])[0][0];

  res.json({
    result,
    scores: total,
  });
});

export default router;
