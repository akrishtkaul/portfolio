import { useState } from 'react';
import AssistantContext from './assistantStore';

export function AssistantProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const send = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const history = messages;
    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
    setInput('');
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
      });
      const data = await res.json();
      if (!res.ok) {
        // Rate-limit / validation responses carry a friendly `reply` so they
        // read as a normal chat message instead of a raw error banner.
        if (data.reply) {
          setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
          return;
        }
        throw new Error(data.error || 'Something went wrong.');
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AssistantContext.Provider value={{ messages, input, setInput, loading, error, send }}>
      {children}
    </AssistantContext.Provider>
  );
}
