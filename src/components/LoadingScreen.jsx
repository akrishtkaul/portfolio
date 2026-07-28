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
            marginTop: 14,
            fontSize: 15,
            color: '#8A99AE',
            opacity: 0,
            animation: 'bootLineIn 200ms ease-out forwards',
            animationDelay: '1200ms',
          }}
        >
          or click the logo (top left) for a quick, professional view
        </div>
      </div>
    </div>
  );
}
