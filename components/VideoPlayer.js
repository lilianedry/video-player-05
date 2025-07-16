"use client";
import { useRef, useState } from "react";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const retroceder = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime -= 5;
  };

  const avancar = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime += 5;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ color: "#fff", marginBottom: "1rem" }}>Atividade 03 – Vídeo</h1>

      <video
        ref={videoRef}
        width="720"
        style={{
          border: "4px solid #444",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        }}
      >
        <source src="/assets/video01.mp4" type="video/mp4" />
        Seu navegador não suporta vídeo.
      </video>

      {/* Botões */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <button onClick={retroceder} style={botaoStyle}>⏪</button>
        <button onClick={togglePlay} style={botaoStyle}>
          {isPlaying ? "⏸️" : "▶️"}
        </button>
        <button onClick={avancar} style={botaoStyle}>⏩</button>
      </div>
    </div>
  );
}

const botaoStyle = {
  padding: "12px 18px",
  fontSize: "24px",
  backgroundColor: "#1f1f1f",
  color: "#fff",
  border: "2px solid #555",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.3s ease",
};
