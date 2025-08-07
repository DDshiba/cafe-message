# ☕️ Café Message

> A dreamy interactive personality quiz that guides users through a surreal journey to discover the café that reflects their inner self.

---

## 🌟 Live Demo  
👉 [https://cafe-message.vercel.app](https://cafe-message.vercel.app)

---

## 🧠 Overview

**Café Message** is a psychological storytelling web app built with:

- 🎨 React + Vite (Frontend)
- 🚀 Express.js + Node (Backend)
- 🎼 Background music, scene transitions, and dreamlike UX
- 🧾 Result sharing via dynamic Open Graph tags

---

## 🧑‍💻 Created By

**Thitikorn Indee** (a.k.a. `Dixel.co`)  
📧 thitikorn.dev@gmail.com  
🔗 GitHub: [https://github.com/DDshiba](https://github.com/DDshiba)

> For portfolio and educational purposes only.  
> Please **do not re-upload or use commercially** without permission.

---

## 🚀 Deploy Guide

### 🔹 Frontend (React) — via Vercel

1. Push project to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Create new project → Import repo
4. Set Framework: `Vite`
5. Done!

### 🔹 Backend (Express) — via Render

1. Go to [https://render.com](https://render.com)
2. Create → Web Service
3. Select repo
4. Set **Root Directory**: `cafe-backend`
5. Set:
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
6. Done! You'll get: `https://cafe-api-hvv4.onrender.com`

---

## 🔁 API Routes

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/health` | Warm-up backend |
| `POST` | `/api/result` | Submit quiz answers |
| `GET`  | `/share/:type` | OG Meta tag route for social sharing |

---

## 🔐 License

This project is licensed under **Creative Commons BY-NC 4.0**  
You can:
- ✅ Share and remix
- ❌ NOT use commercially
- ✅ Must credit **Thitikorn / Dixel.co**

---

## 🧊 Cold Start Tip (for Render)

Frontend auto-wakes backend via:

```ts
useEffect(() => {
  fetch("https://cafe-api-hvv4.onrender.com");
}, []);
