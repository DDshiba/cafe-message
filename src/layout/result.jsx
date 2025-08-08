import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Share, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

function ResultPage() {
  const navigate = useNavigate();

  const [type, setType] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("quizResult");
    if (stored) {
      const parsed = JSON.parse(stored);
      setType(parsed.result);
    }
  }, []);

  if (!type) {
    return <div className="text-center mt-10 text-gray-500">ไม่พบผลลัพธ์</div>;
  }

  return (
    <div className="w-[390px] mx-auto min-h-screen flex flex-col justify-center pb-9 pt-11 px-4 bg-white gap-6">
      {/* ✅ ภาพผลลัพธ์ */}
      <div className="w-[358px] h-[637px] overflow-hidden rounded-xl border">
        <img
          src={`/images/result/${type}.png`}
          alt="result"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ✅ ปุ่มแชร์ / เล่นอีกครั้ง */}
      <div className="flex gap-4 justify-center">
        <Button
          variant="default"
          className="flex gap-3 items-center px-4 py-2"
          size="lg"
          onClick={() =>
            navigator.share?.({
              title: "Café Message",
              text: "มาดูว่าคาเฟ่ประจำใจคุณคืออะไร!",
              url: `https://cafe-message.vercel.app`, // 👈 ลิงก์ใหม่ที่จะมี OG preview
            })
          }
        >
          <Share className="w-4 h-4" />
          แชร์ลิ้งค์
        </Button>

        <Button
          variant="default"
          size="lg"
          className="flex gap-3 items-center px-4 py-2"
          onClick={() => navigate("/home")}
        >
          <RefreshCcw className="w-4 h-4" />
          เล่นอีกครั้ง
        </Button>
      </div>
      {/* ✅ โลโก้ขนาดเล็ก */}
      <div className="w-[88px] h-[40px] mx-auto">
        <img
          src="/images/LOGO.png"
          alt="Cafe Logo"
          className="w-full h-full object-cover"
        />
        <a
          href="https://www.instagram.com/dixel.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-center block hover:underline"
        >
          IG: @dixel.co
        </a>
      </div>
    </div>
  );
}

export default ResultPage;
