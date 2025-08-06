import express from "express";
import cors from "cors";
import resultRoutes from "./routes/result.js";
import rateLimit from "express-rate-limit";

const app = express();
app.use(cors());
app.use(express.json());

const resultLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "⛔ Too many requests. Please try again later.",
});

// ✅ ใส่ limiter เฉพาะ route
app.use("/api/result", resultLimiter);
app.use("/api", resultRoutes);

// ✅ 🆕 ADD THIS PART
app.get("/share/:type", (req, res) => {
  const { type } = req.params;
  const base = "https://yourdomain.com"; // ← เปลี่ยนตรงนี้ถ้าขึ้น prod จริง

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

app.listen(3001, () => {
  console.log("✅ Server running on http://localhost:3001");
});
