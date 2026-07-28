// src/components/BackgroundMusic.jsx
import { useEffect, useRef, useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import track from '../assets/alex-morgan-lofi-coffee-shop-568150.mp3';

const MUTE_STORAGE_KEY = 'pixel-desk-muted';

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(() => localStorage.getItem(MUTE_STORAGE_KEY) === 'true');
  const initialVolume = 0.40;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = isMuted ? 0 : initialVolume;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Start playback on the boot sequence's "press any key or click to
    // continue" dismissal (Scene.jsx's handleEnter) — that user gesture is
    // what satisfies the browser's autoplay-with-sound requirement, so no
    // separate fallback listeners are needed here.
    const start = () => {
      if (localStorage.getItem(MUTE_STORAGE_KEY) === 'true') return;
      audio.play().catch(() => {
        // ignore autoplay block errors
      });
    };

    window.addEventListener('pixel-desk-entered', start, { once: true });
    return () => window.removeEventListener('pixel-desk-entered', start);
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = initialVolume;
      setIsMuted(false);
      localStorage.setItem(MUTE_STORAGE_KEY, 'false');
      // Covers the case where playback never started because the visitor
      // was muted at boot-dismiss time — unmuting is its own user gesture.
      audio.play().catch(() => {});
    } else {
      audio.volume = 0;
      setIsMuted(true);
      localStorage.setItem(MUTE_STORAGE_KEY, 'true');
    }
  };

  return (
    <>
      <audio ref={audioRef} src={track} preload='auto' />

      <button
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full border border-[#1E2532] bg-[#0B0F1B] text-[#8A99AE] hover:text-[#F0854A] hover:border-[#2A3242] transition-all duration-200"
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? (
          <FaVolumeMute className="text-lg" />
        ) : (
          <FaVolumeUp className="text-lg" />
        )}
      </button>
    </>
  );
}
