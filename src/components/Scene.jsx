import { useCallback, useEffect, useState } from 'react';
import { FaSun, FaCloudSun } from 'react-icons/fa';
import DeskTop from './DeskTop';
import LoadingScreen from './LoadingScreen';
import MorningPlane from './MorningPlane';
import { AssistantProvider } from './AssistantContext';

const SCENE_WIDTH = 1440;
const SCENE_HEIGHT = 810;
const SCREEN_MID = 472;
const IGNORED_KEYS = ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'];

const SCENES = {
  sunset: {
    src: '/scene.png',
    alt: 'Pixel art desk scene at sunset',
    rect: { left: 489, top: 332, width: 460, height: 281 },
  },
  morning: {
    src: '/scene-morning.png',
    alt: 'Pixel art desk scene in the morning',
    rect: { left: 489, top: 332, width: 460, height: 281 },
  },
};
const SCENE_STORAGE_KEY = 'pixel-desk-scene';

// Design size the "large" DeskTop layout (icon column, status window, app
// window) is tuned for. The expanded modal scales this box uniformly so it
// fills ~85% of the viewport on whichever axis is tighter, instead of
// stretching individual elements and leaving empty space around them.
const EXPANDED_WIDTH = 720;
const EXPANDED_HEIGHT = 496;
const EXPANDED_COVERAGE = 0.85;

export default function Scene() {
  const [app, setApp] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [vw, setVw] = useState(window.innerWidth);
  const [vh, setVh] = useState(window.innerHeight);
  const [expanded, setExpanded] = useState(false);
  const [entered, setEntered] = useState(false);
  const [sceneKey, setSceneKey] = useState(() => {
    const stored = localStorage.getItem(SCENE_STORAGE_KEY);
    return stored && SCENES[stored] ? stored : 'sunset';
  });

  useEffect(() => {
    localStorage.setItem(SCENE_STORAGE_KEY, sceneKey);
  }, [sceneKey]);

  const handleEnter = useCallback(() => {
    setEntered(true);
    // This gesture (the boot sequence's "press any key or click to
    // continue") is what BackgroundMusic waits for to start playback.
    window.dispatchEvent(new Event('pixel-desk-entered'));
    // Mobile already shows the desktop UI full-screen; only desktop needs
    // the separate expanded modal.
    if (!mobile) setExpanded(true);
  }, [mobile]);

  useEffect(() => {
    const onCollapse = () => setExpanded(false);
    window.addEventListener('pixel-desk-collapse', onCollapse);
    return () => window.removeEventListener('pixel-desk-collapse', onCollapse);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const sync = () => {
      setMobile(mq.matches);
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    sync();
    mq.addEventListener('change', sync);
    window.addEventListener('resize', sync);
    return () => {
      mq.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (!entered) {
        if (!IGNORED_KEYS.includes(e.key)) handleEnter();
        return;
      }
      if (e.key !== 'Escape') return;
      if (app) setApp(null);
      else setExpanded(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [app, expanded, mobile, entered, handleEnter]);

  // Never shrink below native size (keeps the panel text legible), but on
  // viewports larger than the native 1440x810 scale the whole scene up to
  // fully cover the screen instead of leaving background showing around it.
  const scale = Math.max(vw / SCENE_WIDTH, vh / SCENE_HEIGHT, 1);
  const scaledW = SCENE_WIDTH * scale;
  const scaledH = SCENE_HEIGHT * scale;
  // Bias the vertical crop toward the laptop screen (SCREEN_MID) rather than
  // the geometric center, clamped so the scaled scene never reveals an edge.
  const desiredTop = vh / 2 - SCREEN_MID * scale;
  const top = Math.min(0, Math.max(vh - scaledH, desiredTop));
  const left = (vw - scaledW) / 2;

  const expandedScale = Math.min((EXPANDED_COVERAGE * vw) / EXPANDED_WIDTH, (EXPANDED_COVERAGE * vh) / EXPANDED_HEIGHT);

  const scene = SCENES[sceneKey];

  const deskTop = (onExpandOrCollapse, label, largeMode, onOpen = setApp, showToggle = true) => (
    <DeskTop app={app} large={largeMode} toggleLabel={label} onOpen={onOpen} onClose={() => setApp(null)} onToggle={onExpandOrCollapse} showToggle={showToggle} />
  );

  return (
    <AssistantProvider>
      <div
        style={{
          height: '100vh',
          background: '#060810',
          overflow: 'hidden',
          position: 'relative',
          fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
        }}
      >
        {!mobile && (
          <div style={{ position: 'absolute', top, left, width: SCENE_WIDTH, height: SCENE_HEIGHT, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <img src={scene.src} alt={scene.alt} style={{ display: 'block', width: SCENE_WIDTH, height: SCENE_HEIGHT, imageRendering: 'pixelated' }} />

            {sceneKey === 'morning' && <MorningPlane />}

            <div
              style={{
                position: 'absolute',
                left: scene.rect.left,
                top: scene.rect.top,
                width: scene.rect.width,
                height: scene.rect.height,
                background: 'linear-gradient(#090A16 0px, #090A16 5px, #050A11 5px, #050A11 61px, #090A16 61px)',
                overflow: 'hidden',
              }}
            >
              {entered ? deskTop(() => setExpanded(true), 'expand', false) : <LoadingScreen onEnter={handleEnter} />}
            </div>
          </div>
        )}

        {!mobile && (
          <button
            onClick={() => setSceneKey((k) => (k === 'sunset' ? 'morning' : 'sunset'))}
            className="fixed top-6 right-[84px] z-[60] w-12 h-12 flex items-center justify-center rounded-full border border-[#1E2532] bg-[#0B0F1B] text-[#8A99AE] hover:text-[#F0854A] hover:border-[#2A3242] transition-all duration-200"
            aria-label={sceneKey === 'sunset' ? 'Switch to morning scene' : 'Switch to sunset scene'}
          >
            {sceneKey === 'sunset' ? <FaSun className="text-lg" /> : <FaCloudSun className="text-lg" />}
          </button>
        )}

        {mobile && (
          <div style={{ position: 'relative', width: '100%', height: '100%', background: '#090A16', overflow: 'hidden' }}>
            {entered ? deskTop(() => setExpanded(true), 'expand', false, setApp, false) : <LoadingScreen onEnter={handleEnter} />}
          </div>
        )}

        {expanded && !mobile && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(6, 8, 16, 0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <div style={{ width: EXPANDED_WIDTH, height: EXPANDED_HEIGHT, background: '#090A16', border: '1px solid #1A202C', overflow: 'hidden', transform: `scale(${expandedScale})`, transformOrigin: 'center center' }}>
              {deskTop(() => setExpanded(false), 'close', true)}
            </div>
          </div>
        )}
      </div>
    </AssistantProvider>
  );
}
