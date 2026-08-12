import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ConstellationNodeId } from '@/data/zodiac-constellations';
import {
  SUBJECT_SIGNATURE_TIMELINE,
  type SubjectSignatureData,
} from '@/lib/subject-signature';
import { cn } from '@/lib/utils';

export type SubjectSignatureVariant = 'compact' | 'review' | 'analysis' | 'report';

interface SubjectSignatureProps {
  signature: SubjectSignatureData;
  variant: SubjectSignatureVariant;
  className?: string;
  ariaHidden?: boolean;
}

/** Centralized visual tokens keep future palette trials out of graph logic. */
const SUBJECT_SIGNATURE_PALETTES = {
  goldStar: {
    baseNode: '#DDF3FF',
    baseCore: '#F8FDFF',
    baseLine: '#9CC9E6',
    behaviorNode: '#E6C77D',
    behaviorCore: '#FFF9E8',
    behaviorPath: '#DDB965',
    focusNode: '#FFF2C5',
    focusCore: '#FFFFFF',
    diagnosticText: '#D665A5',
  },
} as const;

const PALETTE = SUBJECT_SIGNATURE_PALETTES.goldStar;

const SUBJECT_SIGNATURE_BACKGROUND = '/images/subject-signature-background.png';

function getNodeMap(signature: SubjectSignatureData) {
  return new Map(signature.geometry?.nodes.map((node) => [node.id, node]) ?? []);
}

function getAccessibleLabel(signature: SubjectSignatureData) {
  if (signature.status === 'dormant') {
    return 'Dormant Orion Subject Signature awaiting a zodiac sign.';
  }

  if (signature.status === 'unsupported') {
    const focusDescription = signature.focusArea ?? 'focus not yet selected';
    const behaviorDescription =
      signature.behavioralStatement ?? 'behavior pattern not yet selected';
    return `${signature.zodiacSign} Orion Subject Signature with ${focusDescription} focus and ${behaviorDescription} behavior pattern. Constellation geometry is unavailable.`;
  }

  const focusDescription = signature.focusArea
    ? `${signature.focusArea} focus`
    : 'focus not yet selected';
  const behaviorDescription = signature.behavioralStatement
    ? `${signature.behavioralStatement} behavior pattern`
    : 'behavior pattern not yet selected';

  return `${signature.constellationLabel} Orion Subject Signature with ${focusDescription} and ${behaviorDescription}.`;
}

function PrototypeFallback({
  signature,
  compact,
}: {
  signature: SubjectSignatureData;
  compact: boolean;
}) {
  const label =
    signature.status === 'unsupported'
      ? `${signature.zodiacSign?.toUpperCase()} GEOMETRY UNAVAILABLE`
      : 'AWAITING CELESTIAL IDENTITY';

  return (
    <>
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
        <circle
          cx="50"
          cy="50"
          r={compact ? 7 : 3.2}
          fill={PALETTE.baseNode}
          opacity="0.58"
        />
        {!compact && (
          <>
            <line x1="50" y1="28" x2="50" y2="40" stroke={PALETTE.baseLine} strokeOpacity="0.34" />
            <line x1="50" y1="60" x2="50" y2="72" stroke={PALETTE.baseLine} strokeOpacity="0.34" />
            <line x1="28" y1="50" x2="40" y2="50" stroke={PALETTE.baseLine} strokeOpacity="0.34" />
            <line x1="60" y1="50" x2="72" y2="50" stroke={PALETTE.baseLine} strokeOpacity="0.34" />
          </>
        )}
      </svg>
      {!compact && (
        <p className="absolute inset-x-4 bottom-[7%] text-center text-[0.56rem] font-medium uppercase tracking-[0.2em] text-[hsl(326_55%_62%_/_0.72)]">
          {label}
        </p>
      )}
    </>
  );
}

/**
 * Shared SVG presentation for the same deterministic signature data at every
 * stage. Only the Analysis variant constructs the graph over time.
 */
export function SubjectSignature({
  signature,
  variant,
  className,
  ariaHidden = false,
}: SubjectSignatureProps) {
  const reduceMotion = useReducedMotion();
  const instanceId = useId().replace(/:/g, '');
  const compact = variant === 'compact';
  const animateConstruction = variant === 'analysis' && !reduceMotion;
  const baseStarGradientId = `subject-signature-base-star-${instanceId}`;
  const behaviorStarGradientId = `subject-signature-behavior-star-${instanceId}`;
  const focusStarGradientId = `subject-signature-focus-star-${instanceId}`;
  const baseGlowId = `subject-signature-base-glow-${instanceId}`;
  const behaviorGlowId = `subject-signature-behavior-glow-${instanceId}`;
  const focusGlowId = `subject-signature-focus-glow-${instanceId}`;
  const lineGlowId = `subject-signature-line-glow-${instanceId}`;
  const pathGlowId = `subject-signature-path-glow-${instanceId}`;
  const nodeMap = getNodeMap(signature);
  const behaviorTargetIds = new Set(signature.behaviorTargetNodeIds);
  const behaviorArrivalByNode = new Map(
    signature.behaviorTargetArrivals.map((arrival) => [arrival.nodeId, arrival]),
  );
  const accessibleLabel = getAccessibleLabel(signature);
  const fullViewBox = variant === 'report'
    ? { x: -24, y: -18, width: 548, height: 436 }
    : { x: 0, y: 0, width: 500, height: 400 };

  const content = signature.geometry ? (
    <svg
      viewBox={`${fullViewBox.x} ${fullViewBox.y} ${fullViewBox.width} ${fullViewBox.height}`}
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full overflow-visible"
      role={ariaHidden ? undefined : 'img'}
      aria-label={ariaHidden ? undefined : accessibleLabel}
      aria-hidden={ariaHidden || undefined}
    >
      <defs>
        <radialGradient id={baseStarGradientId} cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor={PALETTE.baseCore} />
          <stop offset="30%" stopColor={PALETTE.baseNode} />
          <stop offset="100%" stopColor={PALETTE.baseLine} stopOpacity="0.72" />
        </radialGradient>
        <radialGradient id={behaviorStarGradientId} cx="42%" cy="38%" r="64%">
          <stop offset="0%" stopColor={PALETTE.behaviorCore} />
          <stop offset="34%" stopColor={PALETTE.focusNode} />
          <stop offset="100%" stopColor={PALETTE.behaviorNode} stopOpacity="0.72" />
        </radialGradient>
        <radialGradient id={focusStarGradientId} cx="42%" cy="38%" r="64%">
          <stop offset="0%" stopColor={PALETTE.focusCore} />
          <stop offset="32%" stopColor="#FFFBEA" />
          <stop offset="100%" stopColor={PALETTE.focusNode} stopOpacity="0.78" />
        </radialGradient>
        <filter id={baseGlowId} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.25" />
        </filter>
        <filter id={behaviorGlowId} x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="1.8" />
        </filter>
        <filter id={focusGlowId} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <filter id={lineGlowId} x="-30%" y="-60%" width="160%" height="220%">
          <feGaussianBlur stdDeviation="0.9" result="lineBlur" />
          <feComponentTransfer in="lineBlur" result="lineLuminosity">
            <feFuncA type="linear" slope="1.75" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="lineLuminosity" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={pathGlowId} x="-30%" y="-65%" width="160%" height="230%">
          <feGaussianBlur stdDeviation="1.1" result="pathBlur" />
          <feComponentTransfer in="pathBlur" result="pathLuminosity">
            <feFuncA type="linear" slope="1.6" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="pathLuminosity" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g aria-hidden="true">
        {signature.geometry.edges.map((edge, index) => {
          const from = nodeMap.get(edge.from)!;
          const to = nodeMap.get(edge.to)!;
          return (
            <motion.line
              key={edge.id}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={PALETTE.baseLine}
              strokeOpacity={compact ? 0.64 : 0.58}
              strokeWidth={compact ? 6.25 : 1.2}
              strokeLinecap="round"
              filter={compact ? undefined : `url(#${lineGlowId})`}
              initial={animateConstruction ? { pathLength: 0, opacity: 0 } : false}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={
                animateConstruction
                  ? {
                      duration: 1.05,
                      delay: SUBJECT_SIGNATURE_TIMELINE.baseStartSeconds + index * 0.17,
                      ease: [0.22, 1, 0.36, 1],
                    }
                  : { duration: 0 }
              }
            />
          );
        })}
      </g>

      <g aria-hidden="true">
        {signature.behaviorPathEdges.map((pathEdge) => {
          const from = nodeMap.get(pathEdge.from)!;
          const to = nodeMap.get(pathEdge.to)!;
          const duration = Math.min(
            1.1,
            pathEdge.arrivalSeconds - SUBJECT_SIGNATURE_TIMELINE.behaviorStartSeconds,
          );

          return (
            <motion.line
              key={`active-${pathEdge.edgeId}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={PALETTE.behaviorPath}
              strokeOpacity={compact ? 0.88 : 0.94}
              strokeWidth={compact ? 8 : 1.75}
              strokeLinecap="round"
              filter={compact ? undefined : `url(#${pathGlowId})`}
              initial={animateConstruction ? { pathLength: 0, opacity: 0 } : false}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={
                animateConstruction
                  ? {
                      duration,
                      delay: Math.max(
                        SUBJECT_SIGNATURE_TIMELINE.behaviorStartSeconds,
                        pathEdge.arrivalSeconds - duration,
                      ),
                      ease: [0.45, 0, 0.55, 1],
                    }
                  : { duration: 0 }
              }
            />
          );
        })}
      </g>

      <g aria-hidden="true">
        {signature.geometry.nodes.map((node, index) => (
          <motion.g
            key={`base-${node.id}`}
            initial={animateConstruction ? { scale: 0.35, opacity: 0 } : false}
            animate={{ scale: 1, opacity: 1 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            transition={
              animateConstruction
                ? {
                    duration: 0.5,
                    delay: 0.3 + index * 0.19,
                    ease: [0.22, 1, 0.36, 1],
                  }
                : { duration: 0 }
            }
          >
            {!compact && (
              <circle
                cx={node.x}
                cy={node.y}
                r="6.4"
                fill={PALETTE.baseNode}
                opacity="0.22"
                filter={`url(#${baseGlowId})`}
              />
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r={compact ? 9 : 3.25}
              fill={compact ? PALETTE.baseNode : `url(#${baseStarGradientId})`}
              opacity={compact ? 0.92 : 1}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={compact ? 3.4 : 0.95}
              fill={PALETTE.baseCore}
              opacity="0.96"
            />
          </motion.g>
        ))}
      </g>

      {signature.geometry.nodes.map((node) => {
        if (!behaviorTargetIds.has(node.id)) {
          return null;
        }

        const arrival = behaviorArrivalByNode.get(node.id as ConstellationNodeId);
        return (
          <motion.g
            key={`behavior-${node.id}`}
            aria-hidden="true"
            initial={animateConstruction ? { scale: 0.25, opacity: 0 } : false}
            animate={{ scale: 1, opacity: 1 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            transition={
              animateConstruction
                ? {
                    duration: 0.65,
                    delay: arrival?.arrivalSeconds ?? SUBJECT_SIGNATURE_TIMELINE.behaviorEndSeconds,
                    ease: [0.22, 1, 0.36, 1],
                  }
                : { duration: 0 }
            }
          >
            {!compact && (
              <>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="7.6"
                  fill={PALETTE.behaviorNode}
                  opacity="0.17"
                  filter={`url(#${behaviorGlowId})`}
                />
                <line
                  x1={node.x - 7}
                  y1={node.y}
                  x2={node.x + 7}
                  y2={node.y}
                  stroke={PALETTE.behaviorNode}
                  strokeWidth="0.65"
                  strokeLinecap="round"
                  opacity="0.22"
                />
                <line
                  x1={node.x}
                  y1={node.y - 5.5}
                  x2={node.x}
                  y2={node.y + 5.5}
                  stroke={PALETTE.behaviorNode}
                  strokeWidth="0.65"
                  strokeLinecap="round"
                  opacity="0.18"
                />
              </>
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r={compact ? 12 : 4.7}
              fill={compact ? PALETTE.behaviorNode : `url(#${behaviorStarGradientId})`}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={compact ? 4.4 : 1.35}
              fill={PALETTE.behaviorCore}
            />
          </motion.g>
        );
      })}

      {signature.focusNodeId && (() => {
        const node = nodeMap.get(signature.focusNodeId)!;
        return (
          <motion.g
            aria-hidden="true"
            initial={animateConstruction ? { scale: 0.2, opacity: 0 } : false}
            animate={{ scale: 1, opacity: 1 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            transition={
              animateConstruction
                ? {
                    duration: 0.85,
                    delay: SUBJECT_SIGNATURE_TIMELINE.focusIgnitionSeconds,
                    ease: [0.16, 1, 0.3, 1],
                  }
                : { duration: 0 }
            }
          >
            {!compact && (
              <>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="9.2"
                  fill={PALETTE.focusNode}
                  opacity="0.2"
                  filter={`url(#${focusGlowId})`}
                />
                <path
                  d={`M ${node.x} ${node.y - 12} L ${node.x + 1.35} ${node.y - 2.1} L ${node.x + 10} ${node.y} L ${node.x + 1.35} ${node.y + 2.1} L ${node.x} ${node.y + 12} L ${node.x - 1.35} ${node.y + 2.1} L ${node.x - 10} ${node.y} L ${node.x - 1.35} ${node.y - 2.1} Z`}
                  fill={PALETTE.focusNode}
                  opacity="0.24"
                />
                <line
                  x1={node.x - 15}
                  y1={node.y}
                  x2={node.x + 15}
                  y2={node.y}
                  stroke={PALETTE.focusNode}
                  strokeWidth="0.65"
                  strokeLinecap="round"
                  opacity="0.2"
                />
                <line
                  x1={node.x}
                  y1={node.y - 17}
                  x2={node.x}
                  y2={node.y + 17}
                  stroke={PALETTE.focusNode}
                  strokeWidth="0.65"
                  strokeLinecap="round"
                  opacity="0.17"
                />
              </>
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r={compact ? 15 : 5.8}
              fill={compact ? PALETTE.focusNode : `url(#${focusStarGradientId})`}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={compact ? 5.2 : 1.65}
              fill={PALETTE.focusCore}
            />
          </motion.g>
        );
      })()}
    </svg>
  ) : (
    <PrototypeFallback signature={signature} compact={compact} />
  );

  if (compact) {
    return (
      <span
        className={cn('relative block h-8 w-8 sm:h-9 sm:w-9', className)}
        aria-hidden="true"
      >
        {content}
      </span>
    );
  }

  return (
    <figure
      role={signature.geometry ? undefined : 'img'}
      aria-label={signature.geometry ? undefined : accessibleLabel}
      className={cn(
        'subject-signature relative aspect-[6/5] w-full',
        variant === 'review' && 'max-w-[20rem]',
        variant === 'analysis' && 'max-w-[31rem]',
        variant === 'report' && 'max-w-[36rem]',
        className,
      )}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[1.25rem] bg-cover bg-no-repeat"
        style={{
          backgroundColor: '#070614',
          backgroundImage: `linear-gradient(rgba(7, 6, 20, 0.2), rgba(7, 6, 20, 0.2)), url("${SUBJECT_SIGNATURE_BACKGROUND}")`,
          backgroundPosition: '50% 52%',
        }}
      >
        {content}
      </div>
    </figure>
  );
}
