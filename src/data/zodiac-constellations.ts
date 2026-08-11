/** Stable node IDs let focus and behavior rules refer to geometry without coordinates. */
export type ConstellationNodeId = string;

/** A normalized point in the shared Subject Signature SVG coordinate space. */
export interface ConstellationNode {
  id: ConstellationNodeId;
  x: number;
  y: number;
}

/** One straight, undirected connection in a constellation graph. */
export interface ConstellationEdge {
  id: string;
  from: ConstellationNodeId;
  to: ConstellationNodeId;
}

export type SubjectFocusRole =
  | 'Forward'
  | 'Relational'
  | 'Resource'
  | 'Anchor'
  | 'Stability'
  | 'Expansion'
  | 'Anomaly';

export type ConstellationBehaviorPattern =
  | 'I overthink things'
  | 'I trust my instincts'
  | 'I like having a plan'
  | 'I adapt as I go'
  | 'I usually leave things until later';

export interface ZodiacConstellation {
  id: string;
  code: string;
  zodiacSign: string;
  label: string;
  viewBox: { width: number; height: number };
  nodes: readonly ConstellationNode[];
  edges: readonly ConstellationEdge[];
  focusRoleNodes: Readonly<Record<SubjectFocusRole, ConstellationNodeId>>;
  /** Optional visual-quality preferences are filtered around the active focus node. */
  behaviorTargetPreferences?: Readonly<
    Partial<Record<ConstellationBehaviorPattern, readonly ConstellationNodeId[]>>
  >;
}

const SHARED_VIEW_BOX = { width: 480, height: 400 } as const;

/**
 * Stylized from the familiar Capricornus line structure rather than copied as
 * astronomical coordinates. This approved reference geometry remains unchanged.
 */
export const CAPRICORNUS_CONSTELLATION: ZodiacConstellation = {
  id: 'capricornus',
  code: 'CAP',
  zodiacSign: 'Capricorn',
  label: 'Capricornus',
  viewBox: SHARED_VIEW_BOX,
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
  behaviorTargetPreferences: {
    'I like having a plan': ['western-pair', 'shoulder', 'lower-right', 'inner-left'],
    'I adapt as I go': ['western-tip', 'crown', 'ground-right', 'shoulder'],
    'I usually leave things until later': [
      'inner-left',
      'descending-knot',
      'ground-left',
      'crown',
    ],
  },
};

/** A sparse, rising horn line with interpolated support stars. */
export const ARIES_CONSTELLATION: ZodiacConstellation = {
  id: 'aries',
  code: 'ARI',
  zodiacSign: 'Aries',
  label: 'Aries',
  viewBox: SHARED_VIEW_BOX,
  nodes: [
    { id: 'tail', x: 54, y: 286 },
    { id: 'lower-step', x: 103, y: 268 },
    { id: 'mid-step', x: 151, y: 237 },
    { id: 'hamal', x: 211, y: 197 },
    { id: 'bend', x: 270, y: 158 },
    { id: 'sheratan', x: 326, y: 128 },
    { id: 'mesarthim', x: 371, y: 113 },
    { id: 'horn-rise', x: 407, y: 82 },
    { id: 'horn-tip', x: 437, y: 43 },
    { id: 'lower-spark', x: 337, y: 184 },
  ],
  edges: [
    { id: 'tail--lower-step', from: 'tail', to: 'lower-step' },
    { id: 'lower-step--mid-step', from: 'lower-step', to: 'mid-step' },
    { id: 'mid-step--hamal', from: 'mid-step', to: 'hamal' },
    { id: 'hamal--bend', from: 'hamal', to: 'bend' },
    { id: 'bend--sheratan', from: 'bend', to: 'sheratan' },
    { id: 'sheratan--mesarthim', from: 'sheratan', to: 'mesarthim' },
    { id: 'mesarthim--horn-rise', from: 'mesarthim', to: 'horn-rise' },
    { id: 'horn-rise--horn-tip', from: 'horn-rise', to: 'horn-tip' },
    { id: 'sheratan--lower-spark', from: 'sheratan', to: 'lower-spark' },
  ],
  focusRoleNodes: {
    Forward: 'horn-tip',
    Relational: 'mesarthim',
    Resource: 'sheratan',
    Anchor: 'tail',
    Stability: 'hamal',
    Expansion: 'horn-rise',
    Anomaly: 'lower-spark',
  },
  behaviorTargetPreferences: {
    'I overthink things': ['horn-rise', 'mesarthim', 'lower-spark', 'sheratan'],
    'I adapt as I go': ['tail', 'horn-tip', 'lower-spark', 'hamal'],
  },
};

/** The Hyades V anchors two long, unmistakable horn branches. */
export const TAURUS_CONSTELLATION: ZodiacConstellation = {
  id: 'taurus',
  code: 'TAU',
  zodiacSign: 'Taurus',
  label: 'Taurus',
  viewBox: SHARED_VIEW_BOX,
  nodes: [
    { id: 'aldebaran', x: 238, y: 220 },
    { id: 'face-left', x: 185, y: 176 },
    { id: 'face-right', x: 293, y: 172 },
    { id: 'muzzle-left', x: 166, y: 247 },
    { id: 'muzzle-right', x: 310, y: 247 },
    { id: 'left-horn-joint', x: 126, y: 119 },
    { id: 'left-horn-tip', x: 62, y: 56 },
    { id: 'right-horn-joint', x: 357, y: 108 },
    { id: 'right-horn-tip', x: 431, y: 42 },
    { id: 'lower-face', x: 241, y: 298 },
  ],
  edges: [
    { id: 'aldebaran--face-left', from: 'aldebaran', to: 'face-left' },
    { id: 'aldebaran--face-right', from: 'aldebaran', to: 'face-right' },
    { id: 'aldebaran--muzzle-left', from: 'aldebaran', to: 'muzzle-left' },
    { id: 'aldebaran--muzzle-right', from: 'aldebaran', to: 'muzzle-right' },
    { id: 'face-left--left-horn-joint', from: 'face-left', to: 'left-horn-joint' },
    { id: 'left-horn-joint--left-horn-tip', from: 'left-horn-joint', to: 'left-horn-tip' },
    { id: 'face-right--right-horn-joint', from: 'face-right', to: 'right-horn-joint' },
    { id: 'right-horn-joint--right-horn-tip', from: 'right-horn-joint', to: 'right-horn-tip' },
    { id: 'muzzle-left--lower-face', from: 'muzzle-left', to: 'lower-face' },
    { id: 'lower-face--muzzle-right', from: 'lower-face', to: 'muzzle-right' },
  ],
  focusRoleNodes: {
    Forward: 'right-horn-tip',
    Relational: 'face-right',
    Resource: 'aldebaran',
    Anchor: 'lower-face',
    Stability: 'muzzle-left',
    Expansion: 'left-horn-tip',
    Anomaly: 'left-horn-joint',
  },
  behaviorTargetPreferences: {
    'I overthink things': [
      'right-horn-joint',
      'face-right',
      'muzzle-right',
      'aldebaran',
    ],
  },
};

/** Paired heads, shoulders, bodies, and feet preserve the twin structure. */
export const GEMINI_CONSTELLATION: ZodiacConstellation = {
  id: 'gemini',
  code: 'GEM',
  zodiacSign: 'Gemini',
  label: 'Gemini',
  viewBox: SHARED_VIEW_BOX,
  nodes: [
    { id: 'castor', x: 164, y: 52 },
    { id: 'pollux', x: 315, y: 62 },
    { id: 'left-shoulder', x: 179, y: 125 },
    { id: 'right-shoulder', x: 300, y: 133 },
    { id: 'left-waist', x: 188, y: 211 },
    { id: 'right-waist', x: 291, y: 217 },
    { id: 'left-foot', x: 122, y: 332 },
    { id: 'left-inner-foot', x: 214, y: 324 },
    { id: 'right-inner-foot', x: 266, y: 326 },
    { id: 'right-foot', x: 363, y: 337 },
  ],
  edges: [
    { id: 'castor--left-shoulder', from: 'castor', to: 'left-shoulder' },
    { id: 'pollux--right-shoulder', from: 'pollux', to: 'right-shoulder' },
    { id: 'left-shoulder--right-shoulder', from: 'left-shoulder', to: 'right-shoulder' },
    { id: 'left-shoulder--left-waist', from: 'left-shoulder', to: 'left-waist' },
    { id: 'right-shoulder--right-waist', from: 'right-shoulder', to: 'right-waist' },
    { id: 'left-waist--right-waist', from: 'left-waist', to: 'right-waist' },
    { id: 'left-waist--left-foot', from: 'left-waist', to: 'left-foot' },
    { id: 'left-waist--left-inner-foot', from: 'left-waist', to: 'left-inner-foot' },
    { id: 'right-waist--right-inner-foot', from: 'right-waist', to: 'right-inner-foot' },
    { id: 'right-waist--right-foot', from: 'right-waist', to: 'right-foot' },
  ],
  focusRoleNodes: {
    Forward: 'pollux',
    Relational: 'castor',
    Resource: 'left-shoulder',
    Anchor: 'right-foot',
    Stability: 'left-waist',
    Expansion: 'left-foot',
    Anomaly: 'right-inner-foot',
  },
  behaviorTargetPreferences: {
    'I adapt as I go': ['castor', 'pollux', 'left-foot', 'right-foot'],
  },
};

/** A compact central cluster opens into Cancer's characteristic branching Y. */
export const CANCER_CONSTELLATION: ZodiacConstellation = {
  id: 'cancer',
  code: 'CNC',
  zodiacSign: 'Cancer',
  label: 'Cancer',
  viewBox: SHARED_VIEW_BOX,
  nodes: [
    { id: 'central-cluster', x: 244, y: 193 },
    { id: 'upper-knot', x: 236, y: 132 },
    { id: 'upper-tip', x: 201, y: 58 },
    { id: 'west-joint', x: 176, y: 205 },
    { id: 'west-tip', x: 74, y: 176 },
    { id: 'east-joint', x: 313, y: 184 },
    { id: 'east-tip', x: 421, y: 138 },
    { id: 'lower-joint', x: 258, y: 261 },
    { id: 'lower-tip', x: 284, y: 343 },
    { id: 'lower-west', x: 189, y: 309 },
  ],
  edges: [
    { id: 'central-cluster--upper-knot', from: 'central-cluster', to: 'upper-knot' },
    { id: 'upper-knot--upper-tip', from: 'upper-knot', to: 'upper-tip' },
    { id: 'central-cluster--west-joint', from: 'central-cluster', to: 'west-joint' },
    { id: 'west-joint--west-tip', from: 'west-joint', to: 'west-tip' },
    { id: 'central-cluster--east-joint', from: 'central-cluster', to: 'east-joint' },
    { id: 'east-joint--east-tip', from: 'east-joint', to: 'east-tip' },
    { id: 'central-cluster--lower-joint', from: 'central-cluster', to: 'lower-joint' },
    { id: 'lower-joint--lower-tip', from: 'lower-joint', to: 'lower-tip' },
    { id: 'lower-joint--lower-west', from: 'lower-joint', to: 'lower-west' },
  ],
  focusRoleNodes: {
    Forward: 'east-tip',
    Relational: 'upper-knot',
    Resource: 'central-cluster',
    Anchor: 'lower-tip',
    Stability: 'lower-joint',
    Expansion: 'west-tip',
    Anomaly: 'lower-west',
  },
};

/** Leo's western sickle flows into the familiar triangular body and tail. */
export const LEO_CONSTELLATION: ZodiacConstellation = {
  id: 'leo',
  code: 'LEO',
  zodiacSign: 'Leo',
  label: 'Leo',
  viewBox: SHARED_VIEW_BOX,
  nodes: [
    { id: 'regulus', x: 137, y: 281 },
    { id: 'sickle-base', x: 109, y: 226 },
    { id: 'sickle-mid', x: 112, y: 161 },
    { id: 'sickle-crown', x: 151, y: 91 },
    { id: 'sickle-tip', x: 214, y: 56 },
    { id: 'shoulder', x: 230, y: 166 },
    { id: 'spine', x: 304, y: 190 },
    { id: 'tail', x: 411, y: 146 },
    { id: 'hind-leg', x: 358, y: 285 },
    { id: 'belly', x: 247, y: 286 },
  ],
  edges: [
    { id: 'regulus--sickle-base', from: 'regulus', to: 'sickle-base' },
    { id: 'sickle-base--sickle-mid', from: 'sickle-base', to: 'sickle-mid' },
    { id: 'sickle-mid--sickle-crown', from: 'sickle-mid', to: 'sickle-crown' },
    { id: 'sickle-crown--sickle-tip', from: 'sickle-crown', to: 'sickle-tip' },
    { id: 'regulus--shoulder', from: 'regulus', to: 'shoulder' },
    { id: 'shoulder--spine', from: 'shoulder', to: 'spine' },
    { id: 'spine--tail', from: 'spine', to: 'tail' },
    { id: 'tail--hind-leg', from: 'tail', to: 'hind-leg' },
    { id: 'hind-leg--belly', from: 'hind-leg', to: 'belly' },
    { id: 'belly--regulus', from: 'belly', to: 'regulus' },
  ],
  focusRoleNodes: {
    Forward: 'tail',
    Relational: 'sickle-crown',
    Resource: 'regulus',
    Anchor: 'belly',
    Stability: 'shoulder',
    Expansion: 'sickle-tip',
    Anomaly: 'hind-leg',
  },
};

/** Virgo's long reclining body keeps several branches legible around Spica. */
export const VIRGO_CONSTELLATION: ZodiacConstellation = {
  id: 'virgo',
  code: 'VIR',
  zodiacSign: 'Virgo',
  label: 'Virgo',
  viewBox: SHARED_VIEW_BOX,
  nodes: [
    { id: 'western-hand', x: 50, y: 159 },
    { id: 'western-shoulder', x: 119, y: 181 },
    { id: 'central-spine', x: 203, y: 195 },
    { id: 'vindemiatrix', x: 256, y: 94 },
    { id: 'upper-wing', x: 338, y: 52 },
    { id: 'eastern-arm', x: 401, y: 111 },
    { id: 'lower-hip', x: 257, y: 261 },
    { id: 'spica', x: 301, y: 346 },
    { id: 'eastern-knee', x: 368, y: 270 },
    { id: 'eastern-foot', x: 442, y: 308 },
  ],
  edges: [
    { id: 'western-hand--western-shoulder', from: 'western-hand', to: 'western-shoulder' },
    { id: 'western-shoulder--central-spine', from: 'western-shoulder', to: 'central-spine' },
    { id: 'central-spine--vindemiatrix', from: 'central-spine', to: 'vindemiatrix' },
    { id: 'vindemiatrix--upper-wing', from: 'vindemiatrix', to: 'upper-wing' },
    { id: 'upper-wing--eastern-arm', from: 'upper-wing', to: 'eastern-arm' },
    { id: 'central-spine--lower-hip', from: 'central-spine', to: 'lower-hip' },
    { id: 'lower-hip--spica', from: 'lower-hip', to: 'spica' },
    { id: 'lower-hip--eastern-knee', from: 'lower-hip', to: 'eastern-knee' },
    { id: 'eastern-knee--eastern-foot', from: 'eastern-knee', to: 'eastern-foot' },
  ],
  focusRoleNodes: {
    Forward: 'eastern-foot',
    Relational: 'western-shoulder',
    Resource: 'central-spine',
    Anchor: 'spica',
    Stability: 'lower-hip',
    Expansion: 'eastern-arm',
    Anomaly: 'upper-wing',
  },
  behaviorTargetPreferences: {
    'I like having a plan': ['western-shoulder', 'central-spine', 'lower-hip', 'eastern-knee'],
  },
};

/** A central balance beam and suspended quadrilateral evoke Libra's scales. */
export const LIBRA_CONSTELLATION: ZodiacConstellation = {
  id: 'libra',
  code: 'LIB',
  zodiacSign: 'Libra',
  label: 'Libra',
  viewBox: SHARED_VIEW_BOX,
  nodes: [
    { id: 'upper-handle', x: 238, y: 45 },
    { id: 'beam-center', x: 239, y: 113 },
    { id: 'left-beam', x: 135, y: 143 },
    { id: 'right-beam', x: 348, y: 138 },
    { id: 'left-pan-upper', x: 88, y: 220 },
    { id: 'left-pan-lower', x: 158, y: 294 },
    { id: 'lower-center', x: 240, y: 318 },
    { id: 'right-pan-lower', x: 329, y: 291 },
    { id: 'right-pan-upper', x: 399, y: 210 },
    { id: 'balance-tip', x: 442, y: 149 },
  ],
  edges: [
    { id: 'upper-handle--beam-center', from: 'upper-handle', to: 'beam-center' },
    { id: 'beam-center--left-beam', from: 'beam-center', to: 'left-beam' },
    { id: 'beam-center--right-beam', from: 'beam-center', to: 'right-beam' },
    { id: 'left-beam--left-pan-upper', from: 'left-beam', to: 'left-pan-upper' },
    { id: 'left-pan-upper--left-pan-lower', from: 'left-pan-upper', to: 'left-pan-lower' },
    { id: 'left-pan-lower--lower-center', from: 'left-pan-lower', to: 'lower-center' },
    { id: 'lower-center--right-pan-lower', from: 'lower-center', to: 'right-pan-lower' },
    { id: 'right-pan-lower--right-pan-upper', from: 'right-pan-lower', to: 'right-pan-upper' },
    { id: 'right-pan-upper--right-beam', from: 'right-pan-upper', to: 'right-beam' },
    { id: 'right-beam--balance-tip', from: 'right-beam', to: 'balance-tip' },
  ],
  focusRoleNodes: {
    Forward: 'balance-tip',
    Relational: 'left-beam',
    Resource: 'beam-center',
    Anchor: 'lower-center',
    Stability: 'right-beam',
    Expansion: 'left-pan-upper',
    Anomaly: 'upper-handle',
  },
};

/** Scorpius stretches from broad claws through a long body into a hooked sting. */
export const SCORPIUS_CONSTELLATION: ZodiacConstellation = {
  id: 'scorpius',
  code: 'SCO',
  zodiacSign: 'Scorpio',
  label: 'Scorpius',
  viewBox: SHARED_VIEW_BOX,
  nodes: [
    { id: 'upper-claw', x: 54, y: 78 },
    { id: 'lower-claw', x: 64, y: 178 },
    { id: 'head', x: 132, y: 132 },
    { id: 'antares', x: 211, y: 159 },
    { id: 'body-joint', x: 284, y: 190 },
    { id: 'lower-body', x: 340, y: 236 },
    { id: 'tail-drop', x: 371, y: 298 },
    { id: 'tail-curve', x: 349, y: 348 },
    { id: 'sting-joint', x: 296, y: 335 },
    { id: 'sting', x: 264, y: 293 },
  ],
  edges: [
    { id: 'upper-claw--head', from: 'upper-claw', to: 'head' },
    { id: 'lower-claw--head', from: 'lower-claw', to: 'head' },
    { id: 'head--antares', from: 'head', to: 'antares' },
    { id: 'antares--body-joint', from: 'antares', to: 'body-joint' },
    { id: 'body-joint--lower-body', from: 'body-joint', to: 'lower-body' },
    { id: 'lower-body--tail-drop', from: 'lower-body', to: 'tail-drop' },
    { id: 'tail-drop--tail-curve', from: 'tail-drop', to: 'tail-curve' },
    { id: 'tail-curve--sting-joint', from: 'tail-curve', to: 'sting-joint' },
    { id: 'sting-joint--sting', from: 'sting-joint', to: 'sting' },
  ],
  focusRoleNodes: {
    Forward: 'sting',
    Relational: 'upper-claw',
    Resource: 'antares',
    Anchor: 'tail-curve',
    Stability: 'body-joint',
    Expansion: 'lower-claw',
    Anomaly: 'sting-joint',
  },
  behaviorTargetPreferences: {
    'I overthink things': ['sting-joint', 'tail-curve', 'lower-body', 'tail-drop'],
    'I usually leave things until later': ['head', 'lower-body', 'sting-joint', 'upper-claw'],
  },
};

/** A restrained teapot outline keeps Sagittarius recognizable without crowding. */
export const SAGITTARIUS_CONSTELLATION: ZodiacConstellation = {
  id: 'sagittarius',
  code: 'SAG',
  zodiacSign: 'Sagittarius',
  label: 'Sagittarius',
  viewBox: SHARED_VIEW_BOX,
  nodes: [
    { id: 'lid-left', x: 190, y: 83 },
    { id: 'lid-right', x: 286, y: 79 },
    { id: 'body-left', x: 170, y: 177 },
    { id: 'body-right', x: 306, y: 170 },
    { id: 'base-left', x: 196, y: 291 },
    { id: 'base-right', x: 302, y: 286 },
    { id: 'spout-joint', x: 116, y: 151 },
    { id: 'spout-tip', x: 54, y: 111 },
    { id: 'handle-top', x: 371, y: 126 },
    { id: 'handle-bottom', x: 382, y: 249 },
  ],
  edges: [
    { id: 'lid-left--lid-right', from: 'lid-left', to: 'lid-right' },
    { id: 'lid-left--body-left', from: 'lid-left', to: 'body-left' },
    { id: 'lid-right--body-right', from: 'lid-right', to: 'body-right' },
    { id: 'body-left--base-left', from: 'body-left', to: 'base-left' },
    { id: 'base-left--base-right', from: 'base-left', to: 'base-right' },
    { id: 'base-right--body-right', from: 'base-right', to: 'body-right' },
    { id: 'body-left--spout-joint', from: 'body-left', to: 'spout-joint' },
    { id: 'spout-joint--spout-tip', from: 'spout-joint', to: 'spout-tip' },
    { id: 'body-right--handle-top', from: 'body-right', to: 'handle-top' },
    { id: 'handle-top--handle-bottom', from: 'handle-top', to: 'handle-bottom' },
    { id: 'handle-bottom--base-right', from: 'handle-bottom', to: 'base-right' },
  ],
  focusRoleNodes: {
    Forward: 'spout-tip',
    Relational: 'lid-right',
    Resource: 'body-left',
    Anchor: 'base-right',
    Stability: 'body-right',
    Expansion: 'handle-top',
    Anomaly: 'handle-bottom',
  },
  behaviorTargetPreferences: {
    'I overthink things': ['spout-joint', 'body-left', 'base-left', 'lid-left'],
  },
};

/** Aquarius uses a zigzag shoulder line with two diverging water streams. */
export const AQUARIUS_CONSTELLATION: ZodiacConstellation = {
  id: 'aquarius',
  code: 'AQR',
  zodiacSign: 'Aquarius',
  label: 'Aquarius',
  viewBox: SHARED_VIEW_BOX,
  nodes: [
    { id: 'western-shoulder', x: 61, y: 105 },
    { id: 'upper-knot', x: 137, y: 83 },
    { id: 'central-vessel', x: 205, y: 137 },
    { id: 'eastern-shoulder', x: 283, y: 96 },
    { id: 'eastern-tip', x: 384, y: 120 },
    { id: 'pour-point', x: 226, y: 203 },
    { id: 'west-stream', x: 170, y: 265 },
    { id: 'west-drop', x: 126, y: 338 },
    { id: 'east-stream', x: 286, y: 260 },
    { id: 'east-drop', x: 347, y: 334 },
  ],
  edges: [
    { id: 'western-shoulder--upper-knot', from: 'western-shoulder', to: 'upper-knot' },
    { id: 'upper-knot--central-vessel', from: 'upper-knot', to: 'central-vessel' },
    { id: 'central-vessel--eastern-shoulder', from: 'central-vessel', to: 'eastern-shoulder' },
    { id: 'eastern-shoulder--eastern-tip', from: 'eastern-shoulder', to: 'eastern-tip' },
    { id: 'central-vessel--pour-point', from: 'central-vessel', to: 'pour-point' },
    { id: 'pour-point--west-stream', from: 'pour-point', to: 'west-stream' },
    { id: 'west-stream--west-drop', from: 'west-stream', to: 'west-drop' },
    { id: 'pour-point--east-stream', from: 'pour-point', to: 'east-stream' },
    { id: 'east-stream--east-drop', from: 'east-stream', to: 'east-drop' },
  ],
  focusRoleNodes: {
    Forward: 'eastern-tip',
    Relational: 'upper-knot',
    Resource: 'central-vessel',
    Anchor: 'west-drop',
    Stability: 'pour-point',
    Expansion: 'east-drop',
    Anomaly: 'western-shoulder',
  },
  behaviorTargetPreferences: {
    'I overthink things': [
      'eastern-shoulder',
      'central-vessel',
      'upper-knot',
      'pour-point',
    ],
  },
};

/** Two distinct fish forms remain joined by Pisces' long central cord. */
export const PISCES_CONSTELLATION: ZodiacConstellation = {
  id: 'pisces',
  code: 'PSC',
  zodiacSign: 'Pisces',
  label: 'Pisces',
  viewBox: SHARED_VIEW_BOX,
  nodes: [
    { id: 'west-fish-top', x: 65, y: 103 },
    { id: 'west-fish-nose', x: 36, y: 171 },
    { id: 'west-fish-bottom', x: 86, y: 228 },
    { id: 'west-knot', x: 137, y: 163 },
    { id: 'cord-west', x: 206, y: 211 },
    { id: 'cord-knot', x: 272, y: 258 },
    { id: 'east-fish-bottom', x: 351, y: 322 },
    { id: 'east-fish-tail', x: 432, y: 284 },
    { id: 'east-fish-top', x: 410, y: 197 },
    { id: 'east-knot', x: 333, y: 217 },
  ],
  edges: [
    { id: 'west-fish-top--west-fish-nose', from: 'west-fish-top', to: 'west-fish-nose' },
    { id: 'west-fish-nose--west-fish-bottom', from: 'west-fish-nose', to: 'west-fish-bottom' },
    { id: 'west-fish-bottom--west-knot', from: 'west-fish-bottom', to: 'west-knot' },
    { id: 'west-knot--west-fish-top', from: 'west-knot', to: 'west-fish-top' },
    { id: 'west-knot--cord-west', from: 'west-knot', to: 'cord-west' },
    { id: 'cord-west--cord-knot', from: 'cord-west', to: 'cord-knot' },
    { id: 'cord-knot--east-fish-bottom', from: 'cord-knot', to: 'east-fish-bottom' },
    { id: 'east-fish-bottom--east-fish-tail', from: 'east-fish-bottom', to: 'east-fish-tail' },
    { id: 'east-fish-tail--east-fish-top', from: 'east-fish-tail', to: 'east-fish-top' },
    { id: 'east-fish-top--east-knot', from: 'east-fish-top', to: 'east-knot' },
    { id: 'east-knot--cord-knot', from: 'east-knot', to: 'cord-knot' },
  ],
  focusRoleNodes: {
    Forward: 'east-fish-tail',
    Relational: 'west-fish-top',
    Resource: 'cord-knot',
    Anchor: 'east-fish-bottom',
    Stability: 'cord-west',
    Expansion: 'west-fish-nose',
    Anomaly: 'east-fish-top',
  },
  behaviorTargetPreferences: {
    'I adapt as I go': ['west-fish-nose', 'east-fish-tail', 'cord-knot', 'west-knot'],
  },
};

/** The complete local deterministic dataset, ordered like the questionnaire. */
export const ZODIAC_CONSTELLATIONS = [
  ARIES_CONSTELLATION,
  TAURUS_CONSTELLATION,
  GEMINI_CONSTELLATION,
  CANCER_CONSTELLATION,
  LEO_CONSTELLATION,
  VIRGO_CONSTELLATION,
  LIBRA_CONSTELLATION,
  SCORPIUS_CONSTELLATION,
  SAGITTARIUS_CONSTELLATION,
  CAPRICORNUS_CONSTELLATION,
  AQUARIUS_CONSTELLATION,
  PISCES_CONSTELLATION,
] as const satisfies readonly ZodiacConstellation[];

export const ZODIAC_CONSTELLATION_BY_SIGN = new Map(
  ZODIAC_CONSTELLATIONS.map((constellation) => [
    constellation.zodiacSign,
    constellation,
  ]),
);
