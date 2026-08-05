import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type {
  OrbitalMarkerTone,
  OrbitalProfileData,
} from '@/lib/orbital-profile';
import { cn } from '@/lib/utils';

type OrbitalProfileVariant = 'review' | 'analysis' | 'report' | 'echo';

interface OrbitalProfileProps {
  profile: OrbitalProfileData;
  variant: OrbitalProfileVariant;
  stage?: number;
  isComplete?: boolean;
  className?: string;
}

const CENTER = 260;
const TICK_COUNT = 48;
const TICK_ANGLES = Array.from({ length: TICK_COUNT }, (_, index) =>
  (index * 360) / TICK_COUNT,
);

const MARKER_COLORS: Record<OrbitalMarkerTone, string> = {
  gold: 'hsl(43 78% 72%)',
  pink: 'hsl(326 68% 70%)',
  violet: 'hsl(254 80% 72%)',
};

function polarPoint(angle: number, radius: number) {
  const radians = ((angle - 90) * Math.PI) / 180;

  return {
    x: CENTER + radius * Math.cos(radians),
    y: CENTER + radius * Math.sin(radians),
  };
}

function linePath(points: readonly { x: number; y: number }[]) {
  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');
}

/**
 * Renders the shared fictional subject-profile instrument.
 *
 * `stage` reveals additional evidence during analysis. The completed geometry
 * is otherwise identical everywhere, allowing the loading sequence to resolve
 * into the exact artifact presented in the report.
 */
export function OrbitalProfile({
  profile,
  variant,
  stage = 4,
  isComplete = variant !== 'analysis',
  className,
}: OrbitalProfileProps) {
  const reduceMotion = useReducedMotion();
  const instanceId = useId().replace(/:/g, '');
  const goldGradientId = `orbital-gold-${instanceId}`;
  const glowId = `orbital-glow-${instanceId}`;
  const effectiveStage = isComplete ? 4 : Math.max(0, Math.min(stage, 3));
  const markerPoints = profile.markers.map((marker) => ({
    ...marker,
    ...polarPoint(marker.angle, marker.radius),
  }));
  const networkPath = linePath(markerPoints);
  const isEcho = variant === 'echo';
  const showMetadata = variant === 'analysis' || variant === 'report';
  const accessibleLabel = `${profile.subjectName}'s OrionLabs orbital profile: ${profile.zodiacLabel} baseline, ${profile.focusLabel} focus, profile ${profile.signature}.`;

  const diagram = (
    <svg
      viewBox="0 0 520 520"
      className="h-full w-full overflow-visible"
      role={isEcho ? undefined : 'img'}
      aria-label={isEcho ? undefined : accessibleLabel}
      aria-hidden={isEcho ? true : undefined}
    >
      <defs>
        <linearGradient id={goldGradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5E6B0" />
          <stop offset="48%" stopColor="#E8C77A" />
          <stop offset="100%" stopColor="#C9A24A" />
        </linearGradient>
        <filter id={glowId} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle
        cx={CENTER}
        cy={CENTER}
        r="226"
        fill="hsl(268 55% 8% / 0.18)"
        stroke="hsl(43 60% 70% / 0.08)"
      />

      <motion.g
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: effectiveStage >= 2 ? (isEcho ? 0.38 : 0.72) : 0.16 }}
        transition={{ duration: reduceMotion ? 0 : 0.9 }}
      >
        {TICK_ANGLES.map((angle, index) => {
          const inner = polarPoint(angle, index % 4 === 0 ? 211 : 216);
          const outer = polarPoint(angle, 224);

          return (
            <line
              key={angle}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke={index % 4 === 0 ? 'hsl(43 70% 72% / 0.7)' : 'hsl(43 60% 70% / 0.32)'}
              strokeWidth={index % 4 === 0 ? 1.2 : 0.75}
            />
          );
        })}
      </motion.g>

      <g opacity={isEcho ? 0.32 : 0.58}>
        <line x1="48" y1={CENTER} x2="472" y2={CENTER} stroke="hsl(43 60% 70% / 0.18)" />
        <line x1={CENTER} y1="48" x2={CENTER} y2="472" stroke="hsl(43 60% 70% / 0.18)" />
        <circle cx={CENTER} cy={CENTER} r="210" fill="none" stroke="hsl(43 60% 70% / 0.18)" strokeDasharray="2 11" />
      </g>

      <motion.g
        className={cn('orbital-profile__rotation', !isComplete && 'orbital-profile__rotation--active')}
        style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
      >
        <motion.ellipse
          cx={CENTER}
          cy={CENTER}
          rx="178"
          ry="112"
          fill="none"
          stroke={`url(#${goldGradientId})`}
          strokeWidth="1.35"
          transform={`rotate(${profile.orbitalTilt} ${CENTER} ${CENTER})`}
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: effectiveStage >= 0 ? 1 : 0, opacity: isEcho ? 0.35 : 0.76 }}
          transition={{ duration: reduceMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r="174"
          fill="none"
          stroke="hsl(43 60% 70% / 0.34)"
          strokeWidth="1"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: effectiveStage >= 1 ? 1 : 0.16, opacity: effectiveStage >= 1 ? 0.82 : 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.g>

      <motion.g
        className={cn('orbital-profile__rotation orbital-profile__rotation--reverse', !isComplete && 'orbital-profile__rotation--active')}
        style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
      >
        <motion.ellipse
          cx={CENTER}
          cy={CENTER}
          rx="137"
          ry="184"
          fill="none"
          stroke="hsl(326 62% 70% / 0.42)"
          strokeWidth="1"
          transform={`rotate(${profile.primaryAngle / 5} ${CENTER} ${CENTER})`}
          strokeDasharray="5 9"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: effectiveStage >= 1 ? 1 : 0, opacity: effectiveStage >= 1 ? (isEcho ? 0.24 : 0.6) : 0 }}
          transition={{ duration: reduceMotion ? 0 : 1.25, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r="136"
          fill="none"
          stroke="hsl(326 58% 68% / 0.28)"
          strokeWidth="1"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: effectiveStage >= 1 ? 1 : 0, opacity: effectiveStage >= 1 ? 0.68 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : 0.12 }}
        />
      </motion.g>

      <motion.circle
        cx={CENTER}
        cy={CENTER}
        r="98"
        fill="none"
        stroke="hsl(254 72% 72% / 0.3)"
        strokeWidth="1"
        strokeDasharray="1 7"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: effectiveStage >= 2 ? 1 : 0, opacity: effectiveStage >= 2 ? 0.76 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 1.1 }}
      />

      <motion.path
        d={networkPath}
        fill="none"
        stroke="hsl(43 68% 72% / 0.32)"
        strokeWidth="1"
        strokeDasharray="3 7"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: effectiveStage >= 2 ? 1 : 0, opacity: effectiveStage >= 2 ? (isEcho ? 0.22 : 0.76) : 0 }}
        transition={{ duration: reduceMotion ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {markerPoints.map((marker, index) => (
        <g key={marker.id}>
          <motion.line
            x1={CENTER}
            y1={CENTER}
            x2={marker.x}
            y2={marker.y}
            stroke={MARKER_COLORS[marker.tone]}
            strokeOpacity="0.2"
            strokeWidth="0.8"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: effectiveStage >= Math.min(3, Math.floor(index / 2) + 1) ? 1 : 0,
              opacity: isEcho ? 0.2 : 0.58,
            }}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : index * 0.08 }}
          />
          <motion.circle
            cx={marker.x}
            cy={marker.y}
            r={marker.size + 5}
            fill="none"
            stroke={MARKER_COLORS[marker.tone]}
            strokeOpacity="0.18"
            initial={reduceMotion ? false : { scale: 0.4, opacity: 0 }}
            animate={{
              scale: effectiveStage >= Math.min(3, Math.floor(index / 2) + 1) ? 1 : 0.4,
              opacity: effectiveStage >= Math.min(3, Math.floor(index / 2) + 1) ? 1 : 0,
            }}
            style={{ transformOrigin: `${marker.x}px ${marker.y}px` }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : index * 0.08 }}
          />
          <motion.circle
            cx={marker.x}
            cy={marker.y}
            r={marker.size}
            fill={MARKER_COLORS[marker.tone]}
            filter={`url(#${glowId})`}
            initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
            animate={{
              scale: effectiveStage >= Math.min(3, Math.floor(index / 2) + 1) ? 1 : 0,
              opacity: effectiveStage >= Math.min(3, Math.floor(index / 2) + 1) ? 1 : 0,
            }}
            style={{ transformOrigin: `${marker.x}px ${marker.y}px` }}
            transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : index * 0.08 }}
          />
        </g>
      ))}

      <motion.g
        initial={reduceMotion ? false : { scale: 0.72, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <circle cx={CENTER} cy={CENTER} r="47" fill="hsl(262 52% 7% / 0.92)" stroke="hsl(43 60% 70% / 0.2)" />
        <circle cx={CENTER} cy={CENTER} r="36" fill="hsl(280 50% 13% / 0.82)" stroke={`url(#${goldGradientId})`} strokeWidth="1.3" />
        <circle cx={CENTER} cy={CENTER} r="7" fill={`url(#${goldGradientId})`} filter={`url(#${glowId})`} />
        {!isEcho && (
          <text
            x={CENTER}
            y={CENTER + 27}
            textAnchor="middle"
            fill="hsl(43 66% 74% / 0.78)"
            fontFamily="Inter, sans-serif"
            fontSize="9"
            letterSpacing="2"
          >
            {profile.zodiacCode}
          </text>
        )}
      </motion.g>

      {showMetadata && !isEcho && (
        <motion.g
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: effectiveStage >= 3 ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8 }}
          fill="hsl(43 55% 76% / 0.62)"
          fontFamily="Inter, sans-serif"
          fontSize="9"
          letterSpacing="2.2"
        >
          <text x="58" y="75">AZ {String(Math.round(profile.primaryAngle)).padStart(3, '0')}</text>
          <text x="462" y="75" textAnchor="end">TILT {profile.orbitalTilt > 0 ? '+' : ''}{profile.orbitalTilt}°</text>
          <text x="58" y="452">FOCUS {profile.focusCode}</text>
          <text x="462" y="452" textAnchor="end">MODE {profile.behaviorCode}</text>
        </motion.g>
      )}
    </svg>
  );

  if (isEcho) {
    return <div className={cn('pointer-events-none', className)}>{diagram}</div>;
  }

  return (
    <figure
      className={cn(
        'orbital-profile relative aspect-square w-full',
        variant === 'review' && 'max-w-[18rem]',
        variant === 'analysis' && 'max-w-[27rem]',
        variant === 'report' && 'max-w-[34rem]',
        isComplete && 'orbital-profile--complete',
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-[18%] rounded-full bg-[hsl(286_78%_52%_/_0.16)] blur-[52px]" />
      <div className="relative h-full w-full">{diagram}</div>
      {variant !== 'review' && (
        <figcaption className="absolute inset-x-[9%] bottom-[2%] flex items-center justify-between gap-4 text-[0.58rem] font-medium uppercase tracking-[0.2em] text-muted-foreground/55 sm:text-[0.62rem]">
          <span>{profile.signature}</span>
          <span className="text-right">Subject model · {profile.focusCode}</span>
        </figcaption>
      )}
    </figure>
  );
}
