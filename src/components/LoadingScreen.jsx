import { useEffect, useState } from 'react';
import BootSequence, { BOOT_ANIMATION_DURATION_MS } from './BootSequence';

const AUTO_ADVANCE_SECONDS = 5;

export default function LoadingScreen({ onEnter, mobile }) {
  const [countdown, setCountdown] = useState(null);

  // Countdown starts once the boot lines finish fading in (immediately under
  // prefers-reduced-motion, where they show with no animation at all).
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const startDelay = reducedMotion ? 0 : BOOT_ANIMATION_DURATION_MS;
    const startTimer = setTimeout(() => setCountdown(AUTO_ADVANCE_SECONDS), startDelay);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      // ProfessionalView listens for this and opens itself — same path as
      // clicking the logo, so it also silently dismisses this boot screen.
      window.dispatchEvent(new Event('pixel-desk-open-professional'));
      return;
    }
    const tick = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(tick);
  }, [countdown]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onEnter}
      style={{
        position: 'absolute',
        inset: 0,
        background: '#060810',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
        overflow: 'hidden',
      }}
    >
      <div style={{ width: '88%' }}>
        <BootSequence />
        <div
          className="boot-line-anim"
          style={{
            marginTop: 14,
            fontSize: 15,
            color: '#8A99AE',
            opacity: 0,
            animation: 'bootLineIn 200ms ease-out forwards',
            animationDelay: `${BOOT_ANIMATION_DURATION_MS}ms`,
          }}
        >
          {countdown === null
            ? mobile
              ? 'or tap resume view (bottom left) for the quick professional version'
              : 'or click the logo (top left) for a quick, professional view'
            : `auto-opening the professional view in ${countdown}s — press any key or click here to go to the desk instead`}
        </div>
      </div>
    </div>
  );
}
