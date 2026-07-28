import { useEffect, useRef, useState } from 'react';

export default function Typewriter({
  words,
  minSpeedMs = 20,
  maxSpeedMs = 60,
  pauseDoneMs = 400,
  pauseSwapMs = 120,
  className = '',
}) {
  const [text, setText] = useState('');
  const [showCaret, setShowCaret] = useState(true);
  const wordIdx = useRef(0);
  const i = useRef(0);
  const reverse = useRef(false);
  const timer = useRef(null);

  useEffect(() => {
    if (!words || words.length === 0) return undefined;

    function tick() {
      const target = words[wordIdx.current];
      const jitter = Math.floor(Math.random() * (maxSpeedMs - minSpeedMs + 1)) + minSpeedMs;

      if (reverse.current) {
        if (i.current > 0) {
          i.current -= 1;
          setText((prev) => prev.slice(0, -1));
          timer.current = setTimeout(tick, jitter);
        } else {
          wordIdx.current = (wordIdx.current + 1) % words.length;
          reverse.current = false;
          timer.current = setTimeout(tick, pauseSwapMs);
        }
      } else if (i.current < target.length) {
        setText(target.slice(0, i.current + 1));
        i.current += 1;
        timer.current = setTimeout(tick, jitter);
      } else {
        reverse.current = true;
        timer.current = setTimeout(tick, pauseDoneMs);
      }
    }

    timer.current = setTimeout(tick, 90);
    return () => clearTimeout(timer.current);
  }, [words, minSpeedMs, maxSpeedMs, pauseDoneMs, pauseSwapMs]);

  useEffect(() => {
    const caretInterval = setInterval(() => setShowCaret((prev) => !prev), 500);
    return () => clearInterval(caretInterval);
  }, []);

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className="inline-block w-[1ch]">{showCaret ? '|' : ' '}</span>
    </span>
  );
}
