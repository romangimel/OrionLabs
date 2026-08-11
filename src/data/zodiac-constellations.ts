/** A normalized point in the shared Subject Signature SVG coordinate space. */
export interface ConstellationNode {
  id: CapricornusNodeId;
  x: number;
  y: number;
}

/** One straight, undirected connection in a constellation graph. */
export interface ConstellationEdge {
  id: string;
  from: CapricornusNodeId;
  to: CapricornusNodeId;
}

export type SubjectFocusRole =
  | 'Forward'
  | 'Relational'
  | 'Resource'
  | 'Anchor'
  | 'Stability'
  | 'Expansion'
  | 'Anomaly';

export type CapricornusNodeId =
  | 'western-tip'
  | 'western-pair'
  | 'inner-left'
  | 'shoulder'
  | 'upper-joint'
  | 'crown'
  | 'descending-knot'
  | 'lower-right'
  | 'ground-right'
  | 'ground-left';

export interface ZodiacConstellation {
  id: 'capricornus';
  zodiacSign: 'Capricorn';
  label: 'Capricornus';
  viewBox: { width: number; height: number };
  nodes: readonly ConstellationNode[];
  edges: readonly ConstellationEdge[];
  focusRoleNodes: Readonly<Record<SubjectFocusRole, CapricornusNodeId>>;
}

/**
 * Stylized from the familiar Capricornus line structure rather than copied as
 * astronomical coordinates. The open, asymmetric silhouette stays legible at
 * icon scale while the high paired tip and grounded lower return preserve the
 * reference constellation's character.
 */
export const CAPRICORNUS_CONSTELLATION: ZodiacConstellation = {
  id: 'capricornus',
  zodiacSign: 'Capricorn',
  label: 'Capricornus',
  viewBox: { width: 480, height: 400 },
  nodes: [
    { id: 'western-tip', x: 58, y: 246 },
    { id: 'western-pair', x: 108, y: 235 },
    { id: 'inner-left', x: 192, y: 194 },
    { id: 'shoulder', x: 278, y: 156 },
    { id: 'upper-joint', x: 398, y: 72 },
    { id: 'crown', x: 393, y: 26 },
    { id: 'descending-knot', x: 381, y: 133 },
    { id: 'lower-right', x: 356, y: 251 },
    { id: 'ground-right', x: 352, y: 326 },
    { id: 'ground-left', x: 225, y: 332 },
  ],
  edges: [
    { id: 'western-tip--western-pair', from: 'western-tip', to: 'western-pair' },
    { id: 'western-pair--inner-left', from: 'western-pair', to: 'inner-left' },
    { id: 'inner-left--shoulder', from: 'inner-left', to: 'shoulder' },
    { id: 'shoulder--upper-joint', from: 'shoulder', to: 'upper-joint' },
    { id: 'upper-joint--crown', from: 'upper-joint', to: 'crown' },
    { id: 'upper-joint--descending-knot', from: 'upper-joint', to: 'descending-knot' },
    { id: 'descending-knot--lower-right', from: 'descending-knot', to: 'lower-right' },
    { id: 'lower-right--ground-right', from: 'lower-right', to: 'ground-right' },
    { id: 'ground-right--ground-left', from: 'ground-right', to: 'ground-left' },
    { id: 'ground-left--western-tip', from: 'ground-left', to: 'western-tip' },
  ],
  focusRoleNodes: {
    Forward: 'crown',
    Relational: 'western-pair',
    Resource: 'upper-joint',
    Anchor: 'ground-left',
    Stability: 'inner-left',
    Expansion: 'western-tip',
    Anomaly: 'ground-right',
  },
};
