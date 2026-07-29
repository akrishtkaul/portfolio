import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import AssistantContext from './assistantStore';

const SUGGESTIONS = [
  'What are your experiences?',
  'Tell me about your projects',
  "What's your education?",
  'What are you working on right now?',
];

export default function Assistant({ large }) {
  const { messages, input, setInput, loading, error, send } = useContext(AssistantContext);
  const scrollRef = useRef(null);
  const bottomRef = useRef(null);
  const measureRef = useRef(null);
  const charRef = useRef(null);
  const inputRef = useRef(null);
  const [cursorLeft, setCursorLeft] = useState(0);
  const [cursorWidth, setCursorWidth] = useState(6);
  const [caretPos, setCaretPos] = useState(0);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    bottomRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [messages, loading, error]);

  // `disabled={loading}` below forces the browser to blur the input the
  // moment a reply starts loading, and disabling never restores focus on
  // its own — so re-focus it whenever loading finishes (this also covers
  // the very first mount, when loading is already false). Skipped on
  // mobile, where focusing pops the on-screen keyboard up unprompted;
  // there, typing should only start once the visitor taps the input.
  useEffect(() => {
    if (loading) return;
    if (window.matchMedia('(max-width: 900px)').matches) return;
    inputRef.current?.focus();
  }, [loading]);

  useEffect(() => {
    setCaretPos((p) => Math.min(p, input.length));
  }, [input]);

  useLayoutEffect(() => {
    setCursorLeft(measureRef.current?.offsetWidth ?? 0);
    setCursorWidth(charRef.current?.offsetWidth || 6);
  }, [input, caretPos]);

  const syncCaret = (e) => setCaretPos(e.target.selectionStart ?? input.length);
  // The status window itself is much taller on mobile and in the expanded
  // desktop modal (see DeskTop.jsx's useFullBoundsStatus), so let the
  // conversation use more of that room before it needs to scroll internally.
  const isMobile = window.matchMedia('(max-width: 900px)').matches;
  const messagesMaxHeight = isMobile ? 440 : large ? 300 : 160;

  return (
    <div style={{ marginTop: 6 }}>
      {messages.length === 0 && (
        <>
          <div style={{ fontSize: 11, lineHeight: 1.45, marginBottom: 6 }}>
            <span style={{ color: '#F0854A' }}>ak-bot &gt; </span>
            <span style={{ color: '#C6D0DD' }}>type a question below, or click the icons on the desk if you'd rather explore yourself.</span>
          </div>
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
        </>
      )}

      {(messages.length > 0 || loading || error) && (
        <div ref={scrollRef} style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8, maxHeight: messagesMaxHeight, overflowY: 'auto' }} data-scroll="1">
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
        <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
          <span
            ref={measureRef}
            style={{ position: 'absolute', visibility: 'hidden', whiteSpace: 'pre', fontSize: 11, fontFamily: 'inherit' }}
          >
            {input.slice(0, caretPos)}
          </span>
          <span
            ref={charRef}
            style={{ position: 'absolute', visibility: 'hidden', whiteSpace: 'pre', fontSize: 11, fontFamily: 'inherit' }}
          >
            {input[caretPos] ?? '0'}
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              syncCaret(e);
            }}
            onClick={syncCaret}
            onKeyUp={syncCaret}
            onSelect={syncCaret}
            placeholder="ask a question..."
            disabled={loading}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: 0,
              margin: 0,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              caretColor: 'transparent',
              color: '#E7EDF5',
              fontSize: 11,
              fontFamily: 'inherit',
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: cursorLeft,
              top: '50%',
              transform: 'translateY(-50%)',
              width: cursorWidth,
              height: 11,
              background: '#F0854A',
              display: 'inline-block',
              animation: 'blink 1.1s step-end infinite',
              pointerEvents: 'none',
            }}
          />
        </div>
      </form>
      <div ref={bottomRef} />
    </div>
  );
}
