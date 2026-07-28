import { useContext } from 'react';
import AssistantContext from './assistantStore';

const SUGGESTIONS = [
  'What are your experiences?',
  'Tell me about your projects',
  "What's your education?",
  'What are you working on right now?',
];

export default function Assistant() {
  const { messages, input, setInput, loading, error, send } = useContext(AssistantContext);

  return (
    <div style={{ marginTop: 6, paddingTop: 8, borderTop: '1px dotted #1A202C' }}>
      {messages.length === 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="hover:text-[#F0854A] hover:border-[#2A3242] transition-colors"
              style={{ fontSize: 9, color: '#7C8CA3', border: '1px solid #1E2532', padding: '3px 7px', background: 'transparent', cursor: 'pointer' }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {(messages.length > 0 || loading || error) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8, maxHeight: 160, overflowY: 'auto' }} data-scroll="1">
          {messages.map((m, i) => (
            <div key={i} style={{ fontSize: 11, lineHeight: 1.45 }}>
              <span style={{ color: m.role === 'user' ? '#67788F' : '#F0854A' }}>{m.role === 'user' ? 'you > ' : 'ak-bot > '}</span>
              <span style={{ color: '#C6D0DD' }}>{m.content}</span>
            </div>
          ))}
          {loading && (
            <div style={{ fontSize: 11, color: '#67788F', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span>ak-bot &gt; thinking</span>
              <span style={{ width: 6, height: 11, background: '#F0854A', display: 'inline-block', animation: 'blink 1.1s step-end infinite' }} />
            </div>
          )}
          {error && <div style={{ fontSize: 11, color: '#D97757' }}>error: {error}</div>}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}
      >
        <span style={{ color: '#67788F', fontSize: 11 }}>visitor@akrisht : ~$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ask a question..."
          disabled={loading}
          style={{
            flex: 1,
            minWidth: 0,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#E7EDF5',
            fontSize: 11,
            fontFamily: 'inherit',
          }}
        />
      </form>
    </div>
  );
}
