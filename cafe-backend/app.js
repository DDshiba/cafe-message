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

// ✅ จำกัด request เพื่อกันสแปม
const resultLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 นาที
  max: 10,
  message: "⛔ Too many requests. Please try again later.",
});

app.use("/api/result", resultLimiter);
app.use("/api", resultRoutes);

// ✅ OG SHARE สำหรับ Social
app.get("/share/:type", (req, res) => {
  const { type } = req.params;
  const base = "https://cafe-message.vercel.app/"; // ✅ แก้ URL ให้ถูกแล้ว

  res.send(`
    <html>
      <head>
        <meta property="og:title" content="Café Message - ${type} Café" />
        <meta property="og:description" content="มาดูว่าคาเฟ่ประจำใจของคุณคืออะไร!" />
        <meta property="og:image" content="${base}/images/result/${type}.png" />
        <meta property="og:url" content="${base}/result/${type}" />
        <meta property="og:type" content="website" />
        <meta http-equiv="refresh" content="0;url=${base}/result/${type}" />
      </head>
      <body>Redirecting...</body>
    </html>
  `);
});

// ✅ ROUTE ปลุก backend ตอนเปิดเว็บ
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(3001, () => {
  console.log("✅ Server running on https://cafe-message.vercel.app");
});
