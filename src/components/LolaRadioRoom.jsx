import { useEffect, useRef, useState } from "react";

export default function LolaRadioRoom() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleRadio = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Playback failed:", err);
    }
  };

  return (
    <div className="screen">
        <audio
            ref={audioRef}
            src="https://playerservices.streamtheworld.com/api/livestream-redirect/DZMMAAC_SC"
        />

        <div className="room">
            <img
            src="/lola.png"
            alt="lola"
            className="lola"
            />

            <img
            src="/table.png"
            alt="Table"
            className="table"
            />

            <img
            src="/radio.png"
            alt="Radio"
            className={`radio ${isPlaying ? "playing" : ""}`}
            onClick={toggleRadio}
            />
        </div>
        </div>
  );
}