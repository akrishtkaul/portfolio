const LINES = [
  '[ok] mounting filesystems',
  '[ok] warming up the compiler',
  '[ok] no SPI hangs today',
];

const LINE_STAGGER_MS = 260;
const LINE_FADE_MS = 200;

// When the "ready" line finishes fading in — LoadingScreen's auto-advance
// timer counts its 5s from this point (skipped under prefers-reduced-motion,
// see the .boot-line-anim override in index.css).
export const BOOT_ANIMATION_DURATION_MS = LINES.length * LINE_STAGGER_MS + LINE_FADE_MS;

export default function BootSequence() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
      <div style={{ color: '#67788F', marginBottom: 2 }}>visitor@akrisht : ~$ boot</div>
      {LINES.map((line, i) => (
        <div
          key={line}
          className="boot-line-anim"
          style={{ color: '#96A3B6', opacity: 0, animation: `bootLineIn ${LINE_FADE_MS}ms ease-out forwards`, animationDelay: `${i * LINE_STAGGER_MS}ms` }}
        >
          {line}
        </div>
      ))}
      <div
        className="boot-line-anim"
        style={{ marginTop: 4, opacity: 0, animation: `bootLineIn ${LINE_FADE_MS}ms ease-out forwards`, animationDelay: `${LINES.length * LINE_STAGGER_MS}ms` }}
      >
        {/* Cursor is an inline-block sibling within the same wrapping block
            (not a flex row) so it follows the last character on any wrap
            instead of sitting off to the side at the container's fixed height. */}
        <span style={{ color: '#F0854A' }}>ready — press any key or click to continue</span>
        <span style={{ display: 'inline-block', width: 7, height: 14, marginLeft: 6, verticalAlign: 'text-bottom', background: '#F0854A', animation: 'blink 1.1s step-end infinite' }} />
      </div>
    </div>
  );
}
