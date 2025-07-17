"use client";

import { useRef, useState, useEffect } from "react";
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";

const videoList = [
  {
    title: "Elephant Dream | The first Blender Open Movie from 2006",
    src: "./assets/video01.mp4",
    thumb: "./assets/thumb01.jpg",
  },
  {
    title: "Gatinho na grama",
    src: "./assets/video02.mp4",
    thumb: "./assets/thumb02.jpg",
  },
  {
    title: "Futebol",
    src: "./assets/video03.mp4",
    thumb: "./assets/thumb03.jpg",
  },
];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [videoError, setVideoError] = useState(false);

  // Troca de vídeo: resetar estados, mas não reproduzir
  useEffect(() => {
    const video = videoRef.current;
    setVideoError(false);
    setPlaying(false);
    setCurrentTime(0);

    if (video) {
      video.pause();
      video.load();
      video.currentTime = 0;
      video.volume = volume;
      video.muted = muted;
    }
  }, [currentIndex]);

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

    if (value > 0 && video.muted) {
      video.muted = false;
      setMuted(false);
    }

    if (value === 0 && !video.muted) {
      video.muted = true;
      setMuted(true);
    }

    setVolume(value);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setCurrentIndex(0);
  };

  return (
    <div className="w-screen h-screen flex bg-[#222] p-4 gap-4">
      {/* Galeria de imagens */}
      <div className="w-1/4 flex flex-col gap-4 overflow-y-auto">
        {videoList.map((video, index) => (
          <img
            key={index}
            src={video.thumb}
            alt={`Thumb ${index + 1}`}
            className={`cursor-pointer rounded-xl border-4 transition-all hover:scale-105 ${
              index === currentIndex
                ? "border-yellow-400"
                : "border-transparent"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Vídeo e controles */}
      <div className="w-3/4 bg-[#888] p-4 rounded-xl shadow-xl flex flex-col">
        <h3 className="text-black font-semibold mb-2">
          {videoList[currentIndex].title}
        </h3>

        {videoError && (
          <div className="text-red-600 font-bold mb-2">
            Erro ao carregar o vídeo. Voltando ao vídeo inicial.
          </div>
        )}

        <video
          ref={videoRef}
          className="w-full h-[60vh] rounded mb-4"
          src={videoList[currentIndex].src}
          onTimeUpdate={updateCurrentTime}
          onError={handleVideoError}
          controls={false}
        />

        <input
          type="range"
          min={0}
          max={videoRef.current?.duration || 0}
          value={currentTime}
          step={0.1}
          onChange={(e) => changeTime(Number(e.target.value))}
          className="w-full mb-3"
        />

        <div className="flex justify-center items-center gap-6">
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
