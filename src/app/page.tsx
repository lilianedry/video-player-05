"use client";

import { useRef, useState } from "react";
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1); // volume de 0 a 1

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (playing) {
      video.pause();
    } else {
      video.play();
    }

    setPlaying(!playing);
  };

  const updateCurrentTime = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
    }
  };

  const changeTime = (value: number) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = Math.min(Math.max(value, 0), video.duration);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !muted;
    setMuted(!muted);
  };

  const changeVolume = (value: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = value;

    // Se volume for maior que 0, desmuta o vídeo automaticamente
    if (value > 0 && video.muted) {
      video.muted = false;
      setMuted(false);
    }

    // Se volume for 0, muta o vídeo
    if (value === 0 && !video.muted) {
      video.muted = true;
      setMuted(true);
    }

    setVolume(value);
  };

  return (
    <div className="w-screen h-screen bg-[#222] flex justify-center items-center">
      <div className="bg-[#888] w-[80vw] max-w-[800px] p-4 rounded-xl shadow-xl">
        <div className="flex justify-center mb-4">
          <video
            ref={videoRef}
            className="w-full rounded"
            src="./assets/video01.mp4"
            onTimeUpdate={updateCurrentTime}
          />
        </div>

        {/* Barra de progresso */}
        <input
          type="range"
          min={0}
          max={videoRef.current?.duration || 0}
          value={currentTime}
          step={0.1}
          onChange={(e) => changeTime(Number(e.target.value))}
          className="w-full mb-3"
        />

        {/* Botões de controle */}
        <div className="flex justify-center gap-6 items-center relative">
          <button
            onClick={() => changeTime(currentTime - 10)}
            className="text-black text-2xl hover:scale-110 transition"
          >
            <FaBackward />
          </button>

          <button
            onClick={togglePlayPause}
            className="text-black text-2xl hover:scale-110 transition"
          >
            {playing ? <FaPause /> : <FaPlay />}
          </button>

          <button
            onClick={() => changeTime(currentTime + 10)}
            className="text-black text-2xl hover:scale-110 transition"
          >
            <FaForward />
          </button>

          {/* Volume fixo */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-black text-2xl hover:scale-110 transition"
            >
              {muted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>

            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => changeVolume(Number(e.target.value))}
              className="w-28"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
