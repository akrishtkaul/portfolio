import { useEffect, useState } from 'react';

const HINT_VISIBLE_MS = 4500;
const HINT_EVENT = 'pixel-desk-show-hints';

// Module-level (not component state) so it survives across the logo hint
// and expand hint both mounting/reacting to the same event, and resets only
// on a real page refresh — the two "an overlay just closed" call sites use
// this instead of dispatching the event directly, so both hints show
// together exactly once per page load rather than on every close.
let hasTriggered = false;

export function triggerHints() {
  if (hasTriggered) return;
  hasTriggered = true;
  window.dispatchEvent(new Event(HINT_EVENT));
}

export default function useHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onShow = () => setVisible(true);
    window.addEventListener(HINT_EVENT, onShow);
    return () => window.removeEventListener(HINT_EVENT, onShow);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), HINT_VISIBLE_MS);
    return () => clearTimeout(timer);
  }, [visible]);

  return [visible, () => setVisible(false)];
}
