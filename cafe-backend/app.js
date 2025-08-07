import express from "express";
import cors from "cors";
import resultRoutes from "./routes/result.js";
import rateLimit from "express-rate-limit";

const app = express();

// ✅ เปิด CORS เฉพาะ frontend Vercel
app.use(cors({
  origin: "https://cafe-message.vercel.app",
}));

app.use(express.json());

// ✅ จำกัด request เพื่อกันสแปม (เช่นส่งผลลัพธ์บ่อย)
const resultLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 นาที
  max: 10,
  message: "⛔ Too many requests. Please try again later.",
});

// ✅ API routes
app.use("/api/result", resultLimiter);
app.use("/api", resultRoutes);

// ✅ ROUTE ปลุก backend ตอนเปิดเว็บ หรือ Health Check
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// ✅ Start server
app.listen(3001, () => {
  console.log("✅ Server running on https://cafe-message.vercel.app");
});
