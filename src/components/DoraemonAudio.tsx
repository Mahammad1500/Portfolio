"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function DoraemonAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Create audio element
    const audio = new Audio("/doraemon_japan.mp3");
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    // Try autoplay on user interaction (first click anywhere)
    const tryPlay = () => {
      if (audioRef.current && !playing) {
        audioRef.current.play()
          .then(() => setPlaying(true))
          .catch(() => {/* blocked by browser */});
      }
      // Remove listener after first attempt
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("keydown", tryPlay);
    };

    // Try immediate autoplay
    audio.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Browser blocked autoplay — wait for first user gesture
        document.addEventListener("click", tryPlay, { once: true });
        document.addEventListener("touchstart", tryPlay, { once: true });
        document.addEventListener("keydown", tryPlay, { once: true });
      });

    return () => {
      audio.pause();
      audio.src = "";
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("keydown", tryPlay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleAudio}
      title={playing ? "Pause Doraemon BGM" : "Play Doraemon BGM 🎵"}
      aria-label={playing ? "Pause background music" : "Play background music"}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all border-2 cursor-pointer hover:scale-110 active:scale-95 ${
        playing
          ? "bg-sky-500 border-sky-300 text-white shadow-sky-400/40"
          : "bg-white border-sky-200 text-sky-600 shadow-sky-200/40"
      }`}
    >
      {playing ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <VolumeX className="w-5 h-5" />
      )}

      {/* Pulse ring when playing */}
      {playing && (
        <span className="absolute inset-0 rounded-full border-2 border-sky-400/50 animate-ping pointer-events-none" />
      )}
    </button>
  );
}
