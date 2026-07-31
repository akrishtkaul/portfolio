import { useEffect, useState } from 'react';

const HINT_VISIBLE_MS = 4500;

// Shared by the logo/expand discovery hints — both listen for the same
// "an overlay just closed" signal and auto-hide a few seconds later.
export default function useHint(eventName) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onShow = () => setVisible(true);
    window.addEventListener(eventName, onShow);
    return () => window.removeEventListener(eventName, onShow);
  }, [eventName]);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), HINT_VISIBLE_MS);
    return () => clearTimeout(timer);
  }, [visible]);

  return [visible, () => setVisible(false)];
}
