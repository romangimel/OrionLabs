export const ASTROVECTOR_ANCHORS = [
  { sign: 'Aries', x: -0.78, y: 0.42 },
  { sign: 'Taurus', x: -0.54, y: 0.7 },
  { sign: 'Gemini', x: -0.18, y: 0.76 },
  { sign: 'Cancer', x: 0.2, y: 0.7 },
  { sign: 'Leo', x: 0.56, y: 0.48 },
  { sign: 'Virgo', x: 0.76, y: 0.15 },
  { sign: 'Libra', x: 0.68, y: -0.28 },
  { sign: 'Scorpio', x: 0.4, y: -0.62 },
  { sign: 'Sagittarius', x: 0.02, y: -0.76 },
  { sign: 'Capricorn', x: -0.36, y: -0.65 },
  { sign: 'Aquarius', x: -0.67, y: -0.36 },
  { sign: 'Pisces', x: -0.79, y: 0.02 },
] as const;

export const ASTROVECTOR_SUBCLUSTERS = [
  { name: 'Focus-led', offsetX: -0.06, offsetY: 0.05 },
  { name: 'Behavior-led', offsetX: 0.07, offsetY: 0.03 },
  { name: 'Confidence-led', offsetX: 0, offsetY: -0.08 },
] as const;

export interface AstroVectorProjectionPoint {
  sign: (typeof ASTROVECTOR_ANCHORS)[number]['sign'];
  subcluster: (typeof ASTROVECTOR_SUBCLUSTERS)[number]['name'];
  x: number;
  y: number;
}

/** Deterministic PRNG required by the approved AstroVector projection specification. */
export function mulberry32(seed: number) {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function clipCoordinate(value: number) {
  return Math.max(-1, Math.min(1, value));
}

/** Generates all 864 approved points: 24 points × 3 subclusters × 12 signs. */
export function generateAstroVectorProjection(): AstroVectorProjectionPoint[] {
  return ASTROVECTOR_ANCHORS.flatMap((anchor, signIndex) =>
    ASTROVECTOR_SUBCLUSTERS.flatMap((subcluster, subclusterIndex) => {
      const random = mulberry32(1024 + signIndex * 97 + subclusterIndex * 31);

      return Array.from({ length: 24 }, () => {
        const angle = 2 * Math.PI * random();
        const radius = 0.015 + 0.055 * Math.sqrt(random());

        return {
          sign: anchor.sign,
          subcluster: subcluster.name,
          x: clipCoordinate(
            anchor.x + subcluster.offsetX + Math.cos(angle) * radius,
          ),
          y: clipCoordinate(
            anchor.y + subcluster.offsetY + Math.sin(angle) * radius,
          ),
        };
      });
    }),
  );
}
