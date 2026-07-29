import PanelBody from './PanelBody';

const ORANGE = '#F0854A';
const MUTED = '#8A99AE';

const ICONS = {
  about: '/icons/person.png',
  work: '/icons/folder.png',
  experience: '/icons/briefcase.png',
  education: '/icons/graduation_cap.png',
};

const TITLES = {
  about: 'about.txt',
  work: 'projects.dir',
  experience: 'experience.log',
  education: 'education.txt',
};

export default function DeskTop({ app, large = false, toggleLabel = 'expand', onOpen, onClose, onToggle, showToggle = true }) {
  const defs = large
    ? [
        ['about', 'about', 16, 14],
        ['education', 'edu', 16, 84],
        ['experience', 'exp', 16, 154],
        ['work', 'projects', 16, 224],
      ]
    : [
        ['about', 'about', 8, 8],
        ['education', 'edu', 8, 72],
        ['experience', 'exp', 8, 136],
        ['work', 'projects', 8, 200],
      ];

  const statusW = large ? 540 : 372;
  const statusH = large ? 312 : 228;
  // Keep the icon column clear of the app window so icons stay visible and
  // clickable (to switch apps or close the active one) while a window is open.
  const iconColumnWidth = large ? 86 : 78;
  // Reserve room above the app window for the toggle button so it stays
  // clickable instead of being covered by the window's own title bar.
  const appTopInset = showToggle ? 44 : 6;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', fontFamily: "'JetBrains Mono', ui-monospace, monospace", color: '#C6D0DD' }}>
      {defs.map(([id, label, left, top]) => {
        const on = app === id;
        return (
          <div
            key={id}
            onClick={() => (on ? onClose() : onOpen(id))}
            title={on ? `${label} (click to close)` : label}
            className="hover:border-[#2A3242] transition-colors"
            style={{
              position: 'absolute',
              left,
              top,
              width: 62,
              padding: '6px 0 5px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
              userSelect: 'none',
              border: `1px solid ${on ? '#2A3242' : 'transparent'}`,
              background: on ? '#0D1220' : 'transparent',
            }}
          >
            <img src={ICONS[id]} alt="" style={{ width: 32, height: 32, imageRendering: 'pixelated', display: 'block' }} />
            <span style={{ fontSize: 10, color: on ? ORANGE : MUTED, letterSpacing: '0.02em' }}>{label}</span>
          </div>
        );
      })}

      {showToggle && (
        <div
          onClick={onToggle}
          title={toggleLabel}
          className="hover:text-[#F0854A] hover:border-[#2A3242] transition-colors"
          style={{ position: 'absolute', top: 10, right: 12, display: 'flex', alignItems: 'center', gap: 5, padding: '4px 7px', cursor: 'pointer', userSelect: 'none', border: '1px solid #1E2532', color: '#6D7D95', fontSize: 10 }}
        >
          <div style={{ width: 12, height: 10, border: '2px solid currentColor', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <div style={{ width: 5, height: 4, background: 'currentColor' }} />
          </div>
          <span>{toggleLabel}</span>
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          right: 12,
          bottom: 12,
          width: statusW,
          maxWidth: 'calc(100% - 24px)',
          height: statusH,
          background: '#0B0F1B',
          border: '1px solid #1E2532',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 6, height: 18, padding: '0 7px', borderBottom: '1px solid #171C28', background: '#0D1220' }}>
          <div style={{ width: 6, height: 6, background: '#F0854A' }} />
          <span style={{ flex: 1, fontSize: 10, color: '#8A99AE' }}>personal-assistant</span>
          <span style={{ fontSize: 10, color: '#4E5C72' }}>live</span>
        </div>
        <div data-scroll="1" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '8px 9px 9px 9px' }}>
          <PanelBody view="status" />
        </div>
      </div>

      {app && (
        <div style={{ position: 'absolute', top: appTopInset, left: iconColumnWidth, right: 6, bottom: 6, background: '#0B0F1B', border: '1px solid #232B3A', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 7, height: 24, padding: '0 8px', borderBottom: '1px solid #1E2532', background: '#0D1220' }}>
            <img src={ICONS[app]} alt="" style={{ width: 16, height: 16, imageRendering: 'pixelated', display: 'block' }} />
            <span style={{ flex: 1, fontSize: 11, color: '#C6D0DD' }}>{TITLES[app]}</span>
            <div
              onClick={onClose}
              title="close"
              className="hover:text-[#F0854A] hover:border-[#3A2A22] transition-colors"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 14, cursor: 'pointer', userSelect: 'none', color: '#8A99AE', fontSize: 12, border: '1px solid #1E2532' }}
            >
              x
            </div>
          </div>
          <div data-scroll="1" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '11px 13px 14px 13px' }}>
            <PanelBody view={app} />
          </div>
        </div>
      )}
    </div>
  );
}
