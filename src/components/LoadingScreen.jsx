import BootSequence from './BootSequence';

export default function LoadingScreen({ onEnter }) {
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
          style={{
            marginTop: 16,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 12px',
            border: '1px solid #2A3242',
            color: '#F0854A',
            fontSize: 10,
            opacity: 0,
            animation: 'bootLineIn 200ms ease-out forwards',
            animationDelay: '1100ms',
          }}
        >
          <span>click or press any key to continue</span>
          <span style={{ width: 5, height: 11, background: '#F0854A', display: 'inline-block', animation: 'blink 1.1s step-end infinite' }} />
        </div>
      </div>
    </div>
  );
}
