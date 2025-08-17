import { useEffect, useRef, useState } from "react";
import './TypeWriter.css'

export default function TypeWriter({
  base = "",
  words = ["An Engineer", "A Developer", "A Designer", "An Innovator", "A Leader"],
  minSpeedMs = 20,   
  maxSpeedMs = 60,   
  pauseDoneMs = 400, 
  pauseSwapMs = 120,  
  className = "text",
}) {
  const [text, setText] = useState(base);
  const [showCaret, setShowCaret] = useState(true);
  const wordIdx = useRef(0);
  const i = useRef(base.length);
  const reverse = useRef(false);
  const timer = useRef(null);

  useEffect(() => {
    function tick() {
      const target = base + words[wordIdx.current];
      const jitter =
        Math.floor(Math.random() * (maxSpeedMs - minSpeedMs + 1)) + minSpeedMs;

      if (reverse.current) {
        // deleting
        if (i.current > base.length) {
          i.current -= 1;
          setText((prev) => prev.slice(0, -1));
          timer.current = setTimeout(tick, jitter);
        } else {
          wordIdx.current = (wordIdx.current + 1) % words.length;
          reverse.current = false;
          timer.current = setTimeout(tick, pauseSwapMs);
        }
      } else {
        // typing
        if (i.current < target.length) {
          setText(target.slice(0, i.current + 1));
          i.current += 1;
          timer.current = setTimeout(tick, jitter);
        } else {
          reverse.current = true;
          timer.current = setTimeout(tick, pauseDoneMs);
        }
      }
    }

    timer.current = setTimeout(tick, 90);
    return () => clearTimeout(timer.current);
  }, [base, words, minSpeedMs, maxSpeedMs, pauseDoneMs, pauseSwapMs]);

  // caret blinking
  useEffect(() => {
    const caretInterval = setInterval(() => {
      setShowCaret((prev) => !prev);
    }, 500);
    return () => clearInterval(caretInterval);
  }, []);

  return (
    
    <span className={className} aria-live="polite">
      {text}
      <span className="caret">{showCaret ? "|" : " "}</span>
    </span>
  );
}
