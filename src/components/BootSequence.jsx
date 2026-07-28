const LINES = [
  '[ok] mounting filesystems',
  '[ok] warming up the compiler',
  '[ok] no SPI hangs today',
];

export default function BootSequence() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
      <div style={{ color: '#67788F', marginBottom: 2 }}>visitor@akrisht : ~$ boot</div>
      {LINES.map((line, i) => (
        <div
          key={line}
          style={{ color: '#96A3B6', opacity: 0, animation: 'bootLineIn 200ms ease-out forwards', animationDelay: `${i * 260}ms` }}
        >
          {line}
        </div>
      ))}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, opacity: 0, animation: 'bootLineIn 200ms ease-out forwards', animationDelay: `${LINES.length * 260}ms` }}
      >
        <span style={{ color: '#F0854A' }}>ready — press any key or click to continue</span>
        <span style={{ width: 7, height: 14, background: '#F0854A', display: 'inline-block', animation: 'blink 1.1s step-end infinite' }} />
      </div>
    </div>
  );
}
