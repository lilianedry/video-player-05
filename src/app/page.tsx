"use client";

import { useRef, useState, useEffect } from "react";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";

export default function Home() {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const configCurrentTime = (time: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = time;
    setCurrentTime(time);
  };

  const playPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
    } else {
      video.play();
    }
    setPlaying(!playing);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-[#222] flex justify-center items-center">
      <div className="bg-[#888] p-6 rounded-xl shadow-xl w-full max-w-[800px]">
        <div className="flex justify-center mb-4">
          <video ref={videoRef} className="w-full rounded-md" src="/assets/video01.mp4" />
        </div>

        {/* Botões de controle */}
        <div className="flex justify-center items-center gap-6 mb-4">
          <button
            onClick={() => configCurrentTime(currentTime - 10)}
            className="text-black text-2xl hover:scale-110 transition"
          >
            <FaBackward />
          </button>

          <button
            onClick={playPause}
            className="text-black text-2xl hover:scale-110 transition"
          >
            {playing ? <FaPause /> : <FaPlay />}
          </button>

          <button
            onClick={() => configCurrentTime(currentTime + 10)}
            className="text-black text-2xl hover:scale-110 transition"
          >
            <FaForward />
          </button>
        </div>

        {/* Barra de progresso */}
        <input
          type="range"
          min={0}
          max={videoRef.current?.duration || 0}
          step={0.01}
          value={currentTime}
          onChange={(e) => configCurrentTime(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}
