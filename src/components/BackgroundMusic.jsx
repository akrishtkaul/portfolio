// src/components/BackgroundMusic.jsx
import { useEffect, useRef, useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import track from '../assets/website-background-music.mp3';

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const initialVolume = 0.5;
  const boostedVolume = 0.75;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = initialVolume;

    const start = () => {
      audio.play().catch(() => {
        // ignore autoplay block errors
      });
      setIsPlaying(true);
    };

    // try immediately (if autoplay allowed)
    start();
    // otherwise, unlock on first user interaction
    window.addEventListener('pointerdown', start, { once: true });
    window.addEventListener('scroll', start, { once: true });

    return () => {
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('scroll', start);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleBoost = () => {
      if (isMuted) return;
      audio.volume = boostedVolume;
    };

    window.addEventListener('entry-card-pressed', handleBoost);
    return () => window.removeEventListener('entry-card-pressed', handleBoost);
  }, [isMuted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = initialVolume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={track} preload='auto' />
      
      {/* Music Control Button */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-black/30 backdrop-blur-md text-white/60 hover:text-sky-300 hover:border-sky-400/50 hover:bg-sky-400/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted ? (
            <FaVolumeMute className="text-lg" />
          ) : (
            <FaVolumeUp className="text-lg" />
          )}
        </button>
      )}
    </>
  );
}
