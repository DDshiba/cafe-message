import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/layout/home";
import PlayPage from "@/layout/play";
import ResultPage from "@/layout/result";
import LoadingPage from "./components/LoadingPage";
import AudioBG from "./components/AudioBG";

function App() {
  return (
    <BrowserRouter>
      <AudioBG />
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/home" element={<HomePage />} />
        /<Route path="/play" element={<PlayPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
