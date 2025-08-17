// src/components/BackgroundMusic.jsx
import { useEffect, useRef } from 'react';
import track from '../assets/website-background-music.mp3';

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.3;

    const start = () => {
      audio.play().catch(() => {
        // ignore autoplay block errors
      });
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

  return <audio ref={audioRef} src={track} preload='auto' />;
}
