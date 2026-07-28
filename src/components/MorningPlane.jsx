// Scene's internal coordinate space is a fixed SCENE_WIDTH x SCENE_HEIGHT
// box (see Scene.jsx) that gets uniformly scaled to fit the viewport, so
// everything below is expressed in that same pre-scale space and rides
// along with it automatically — no viewport-relative math needed here.
const SCENE_WIDTH = 1440;
const SCENE_NATIVE_WIDTH = 256; // native pixel-art width scene-*.png is authored at
const NATIVE_SCALE = SCENE_WIDTH / SCENE_NATIVE_WIDTH;

// Center window pane's glass area (excludes both wood mullions), measured
// directly off scene-morning.png in native px: the left mullion runs
// native x 51-57, the right mullion runs native x 217-223.
const PANE_LEFT_NATIVE = 58;
const PANE_RIGHT_NATIVE = 216;

const PLANE_SIZE_NATIVE = 2;
const CONTRAIL_LENGTH_NATIVE = 14;
const PLANE_TOP_RATIO = 0.17;
const FLIGHT_DURATION = '60s';
const PLANE_COLOR = '#39535E'; // sampled from the scene's own building silhouettes

const planeSize = PLANE_SIZE_NATIVE * NATIVE_SCALE;
const contrailLength = CONTRAIL_LENGTH_NATIVE * NATIVE_SCALE;
const paneLeft = PANE_LEFT_NATIVE * NATIVE_SCALE;
const paneRight = PANE_RIGHT_NATIVE * NATIVE_SCALE;
const flightWidth = planeSize + contrailLength;
// Plane silhouette proportions: a fuselage bar, a wing crossbar near the
// front third, and a tapered nose pointing in the direction of travel.
const bodyHeight = Math.max(1, planeSize * 0.32);
const wingWidth = Math.max(1, planeSize * 0.3);
const noseLength = planeSize * 0.32;
// Bounds keep the contrail's tail from crossing the left mullion and the
// plane's nose from crossing the right mullion.
const flightStart = paneLeft;
const flightEnd = paneRight - flightWidth;

export default function MorningPlane() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <div
        className="morning-plane-flight"
        style={{
          position: 'absolute',
          top: `${PLANE_TOP_RATIO * 100}%`,
          left: flightStart,
          width: flightWidth,
          height: planeSize,
          '--fly-start': `${flightStart}px`,
          '--fly-end': `${flightEnd}px`,
          animation: `morningPlaneFly ${FLIGHT_DURATION} linear infinite`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            width: contrailLength,
            height: Math.max(1, planeSize * 0.4),
            transform: 'translateY(-50%)',
            background: 'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.55))',
          }}
        />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: planeSize }}>
          {/* wings */}
          <div
            style={{
              position: 'absolute',
              left: planeSize * 0.32,
              top: 0,
              bottom: 0,
              width: wingWidth,
              background: PLANE_COLOR,
            }}
          />
          {/* fuselage */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: noseLength,
              top: '50%',
              height: bodyHeight,
              transform: 'translateY(-50%)',
              background: PLANE_COLOR,
            }}
          />
          {/* nose, tapered toward the direction of travel */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 0,
              height: 0,
              borderTop: `${bodyHeight / 2}px solid transparent`,
              borderBottom: `${bodyHeight / 2}px solid transparent`,
              borderLeft: `${noseLength}px solid ${PLANE_COLOR}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
