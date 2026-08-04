import { useMemo } from 'react';

interface StarfieldProps {
  /** Density multiplier for the star count. */
  density?: number;
  className?: string;
}

/**
 * A deterministic, GPU-friendly starfield rendered as absolutely-positioned
 * divs. Stars are generated once and memoized so they don't reshuffle on
 * re-render. Twinkle is handled via CSS animation and respects reduced motion.
 */
export function Starfield({ density = 1, className = '' }: StarfieldProps) {
  const stars = useMemo(() => {
    const count = Math.round(140 * density);
    return Array.from({ length: count }, (_, i) => {
      // Deterministic pseudo-random based on index so SSR/CSR match.
      const seed = (i * 9301 + 49297) % 233280;
      const rand = seed / 233280;
      const seed2 = ((i + 7) * 9301 + 49297) % 233280;
      const rand2 = seed2 / 233280;
      const seed3 = ((i + 13) * 9301 + 49297) % 233280;
      const rand3 = seed3 / 233280;

      return {
        id: i,
        top: rand * 100,
        left: rand2 * 100,
        size: rand3 < 0.82 ? 1 : rand3 < 0.96 ? 2 : 3,
        delay: rand * 4,
        duration: 3 + rand2 * 4,
        opacity: 0.3 + rand * 0.6,
      };
    });
  }, [density]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-[#F5E6B0] animate-twinkle motion-reduce:animate-none"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow:
              s.size > 1 ? '0 0 4px hsl(43 74% 66% / 0.6)' : undefined,
          }}
        />
      ))}
    </div>
  );
}
