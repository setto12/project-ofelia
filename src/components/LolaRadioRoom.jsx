import { useEffect, useRef, useState } from "react";

export default function LolaRadioRoom() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scale, setScale] = useState(1);

  const ROOM_WIDTH = 640;
  const ROOM_HEIGHT = 360;

  useEffect(() => {
    const updateScale = () => {
      const newScale = Math.min(
        window.innerWidth / ROOM_WIDTH,
        window.innerHeight / ROOM_HEIGHT
      );

      setScale(newScale);
    };

    updateScale();

    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, []);

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

      <div
        className="room"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        {/* Background Wall */}
        <div className="wall" />

        {/* Floor */}
        <div className="floor" />

        {/* lola */}
        <img
          src="/lola.png"
          alt="lola"
          className="lola"
        />

        {/* Table */}
        <img
          src="/table.png"
          alt="Table"
          className="table"
        />

        {/* Radio */}
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