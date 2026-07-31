import { useEffect } from 'react';
import BootSequence, { BOOT_ANIMATION_DURATION_MS } from './BootSequence';

const AUTO_ADVANCE_DELAY_MS = 5000;

export default function LoadingScreen({ onEnter, mobile }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = AUTO_ADVANCE_DELAY_MS + (reducedMotion ? 0 : BOOT_ANIMATION_DURATION_MS);
    const timer = setTimeout(onEnter, delay);
    return () => clearTimeout(timer);
  }, [onEnter]);

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
          {mobile
            ? 'or tap resume view (bottom left) for the quick professional version'
            : 'or click the logo (top left) for a quick, professional view'}
        </div>
      </div>
    </div>
  );
}
