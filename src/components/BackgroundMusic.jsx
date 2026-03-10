// src/components/BackgroundMusic.jsx
import { useEffect, useRef, useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import track from '../assets/website-background-music.mp3';

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const initialVolume = 0.40;
  const boostedVolume = 0.60;

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
          className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#2563EB] hover:border-[#BFDBFE] hover:bg-[#EFF6FF] transition-all duration-200"
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
