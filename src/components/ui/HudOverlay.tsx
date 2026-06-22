/**
 * Ambient HUD overlay — decorative screen-edge elements that give the page
 * a "command center" feel beyond just 4 draggable panels.
 * - corner brackets at 4 screen corners
 * - edge tick marks on left/right
 * - subtle vignette
 * Pointer-events: none, so they never block interaction.
 */
export default function HudOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      aria-hidden
    >
      {/* Screen corner brackets */}
      <svg
        className="absolute top-4 left-4"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          d="M2 14 V2 H14"
          stroke="rgba(0,240,255,0.5)"
          strokeWidth="1.5"
        />
        <circle cx="2" cy="2" r="1.5" fill="#00F0FF" />
      </svg>
      <svg
        className="absolute top-4 right-4"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          d="M26 2 H38 V14"
          stroke="rgba(255,46,160,0.5)"
          strokeWidth="1.5"
        />
        <circle cx="38" cy="2" r="1.5" fill="#FF2EA0" />
      </svg>
      <svg
        className="absolute bottom-4 left-4"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          d="M2 26 V38 H14"
          stroke="rgba(123,47,255,0.5)"
          strokeWidth="1.5"
        />
        <circle cx="2" cy="38" r="1.5" fill="#7B2FFF" />
      </svg>
      <svg
        className="absolute bottom-4 right-4"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          d="M26 38 H38 V26"
          stroke="rgba(45,255,185,0.5)"
          strokeWidth="1.5"
        />
        <circle cx="38" cy="38" r="1.5" fill="#2DFFB9" />
      </svg>

      {/* Left edge tick marks */}
      <div className="absolute left-1 top-1/2 -translate-y-1/2 flex flex-col gap-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="w-1 bg-cyan/30"
            style={{
              height: i === 4 ? '16px' : '8px',
              opacity: i === 4 ? 0.9 : 0.4,
            }}
          />
        ))}
      </div>

      {/* Right edge tick marks */}
      <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-3 items-end">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="w-1 bg-magenta/30"
            style={{
              height: i === 4 ? '16px' : '8px',
              opacity: i === 4 ? 0.9 : 0.4,
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,16,0.4) 100%)',
        }}
      />
    </div>
  );
}
