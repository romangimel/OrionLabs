import {
  ATTENTION_AREAS,
  BEHAVIORAL_STATEMENTS,
  ZODIAC_SIGNS,
  type AttentionArea,
  type BehavioralStatement,
} from '@/data/questionnaire';
import {
  CAPRICORNUS_CONSTELLATION,
  type CapricornusNodeId,
  type ConstellationEdge,
  type SubjectFocusRole,
  type ZodiacConstellation,
} from '@/data/zodiac-constellations';
import type { QuestionnaireAnswers } from '@/lib/questionnaire-state';

export type ZodiacSignName = (typeof ZODIAC_SIGNS)[number]['name'];
export type SubjectSignatureStatus = 'dormant' | 'unsupported' | 'resolved';

/** The application-controlled inputs persisted beside, but outside, the AI report. */
export interface SubjectSignatureInput {
  zodiacSign: ZodiacSignName;
  focusArea: AttentionArea;
  behavioralStatement: BehavioralStatement;
}

export interface PartialSubjectSignatureInput {
  zodiacSign?: string;
  focusArea?: string;
  behavioralStatement?: string;
}

export interface SubjectSignaturePathEdge {
  edgeId: string;
  from: CapricornusNodeId;
  to: CapricornusNodeId;
  arrivalStep: number;
  arrivalSeconds: number;
}

export interface SubjectSignatureTargetArrival {
  nodeId: CapricornusNodeId;
  graphDistance: number;
  arrivalSeconds: number;
}

export interface SubjectSignatureData {
  status: SubjectSignatureStatus;
  identity: string;
  zodiacSign: string | null;
  constellationLabel: string | null;
  focusArea: AttentionArea | null;
  focusRole: SubjectFocusRole | null;
  behavioralStatement: BehavioralStatement | null;
  geometry: ZodiacConstellation | null;
  focusNodeId: CapricornusNodeId | null;
  behaviorTargetNodeIds: readonly CapricornusNodeId[];
  behaviorPathEdges: readonly SubjectSignaturePathEdge[];
  behaviorTargetArrivals: readonly SubjectSignatureTargetArrival[];
}

export const SUBJECT_SIGNATURE_TIMELINE = {
  totalSeconds: 16,
  baseStartSeconds: 0,
  baseEndSeconds: 2.8,
  focusIgnitionSeconds: 4.1,
  behaviorStartSeconds: 7,
  behaviorEndSeconds: 13,
} as const;

export const FOCUS_ROLE_BY_AREA: Readonly<Record<AttentionArea, SubjectFocusRole>> = {
  Career: 'Forward',
  Relationships: 'Relational',
  Money: 'Resource',
  Family: 'Anchor',
  Health: 'Stability',
  'Personal growth': 'Expansion',
  'Something else': 'Anomaly',
};

const FOCUS_CODE_BY_ROLE: Readonly<Record<SubjectFocusRole, string>> = {
  Forward: 'FWD',
  Relational: 'REL',
  Resource: 'RES',
  Anchor: 'ANC',
  Stability: 'STB',
  Expansion: 'EXP',
  Anomaly: 'ANM',
};

const BEHAVIOR_CODES: Readonly<Record<BehavioralStatement, string>> = {
  'I overthink things': 'OVR',
  'I trust my instincts': 'INS',
  'I like having a plan': 'PLN',
  'I adapt as I go': 'ADP',
  'I usually leave things until later': 'LTR',
};

const CAPRICORNUS_NODE_ORDER = CAPRICORNUS_CONSTELLATION.nodes.map(
  (node) => node.id,
);

const CAPRICORNUS_PATTERN_TARGETS: Readonly<
  Record<
    Exclude<BehavioralStatement, 'I overthink things' | 'I trust my instincts'>,
    readonly CapricornusNodeId[]
  >
> = {
  // Evenly spaced across the body for an orderly, balanced arrangement.
  'I like having a plan': ['western-pair', 'shoulder', 'lower-right', 'inner-left'],
  // Three distinct reaches make branching visually explicit.
  'I adapt as I go': ['western-tip', 'crown', 'ground-right', 'shoulder'],
  // Its own normal deterministic cadence; no incomplete or joke rendering.
  'I usually leave things until later': [
    'inner-left',
    'descending-knot',
    'ground-left',
    'crown',
  ],
};

function isOneOf<T extends string>(value: string | undefined, options: readonly T[]): value is T {
  return Boolean(value && options.includes(value as T));
}

function getNode(nodeId: CapricornusNodeId) {
  return CAPRICORNUS_CONSTELLATION.nodes.find((node) => node.id === nodeId)!;
}

function createAdjacency(edges: readonly ConstellationEdge[]) {
  const adjacency = new Map<CapricornusNodeId, CapricornusNodeId[]>();
  CAPRICORNUS_NODE_ORDER.forEach((nodeId) => adjacency.set(nodeId, []));

  edges.forEach((edge) => {
    adjacency.get(edge.from)?.push(edge.to);
    adjacency.get(edge.to)?.push(edge.from);
  });

  return adjacency;
}

const CAPRICORNUS_ADJACENCY = createAdjacency(CAPRICORNUS_CONSTELLATION.edges);

interface GraphTraversal {
  distances: Map<CapricornusNodeId, number>;
  parents: Map<CapricornusNodeId, CapricornusNodeId>;
}

/** Builds one deterministic breadth-first tree used by both selection and propagation. */
function traverseFrom(focusNodeId: CapricornusNodeId): GraphTraversal {
  const distances = new Map<CapricornusNodeId, number>([[focusNodeId, 0]]);
  const parents = new Map<CapricornusNodeId, CapricornusNodeId>();
  const queue: CapricornusNodeId[] = [focusNodeId];

  while (queue.length > 0) {
    const currentNodeId = queue.shift()!;
    const currentDistance = distances.get(currentNodeId)!;

    for (const adjacentNodeId of CAPRICORNUS_ADJACENCY.get(currentNodeId) ?? []) {
      if (distances.has(adjacentNodeId)) {
        continue;
      }

      distances.set(adjacentNodeId, currentDistance + 1);
      parents.set(adjacentNodeId, currentNodeId);
      queue.push(adjacentNodeId);
    }
  }

  return { distances, parents };
}

function getNearestCluster(
  focusNodeId: CapricornusNodeId,
  traversal: GraphTraversal,
): CapricornusNodeId[] {
  const focusNode = getNode(focusNodeId);

  return CAPRICORNUS_CONSTELLATION.nodes
    .filter((node) => node.id !== focusNodeId)
    .sort((left, right) => {
      const graphDistanceDifference =
        traversal.distances.get(left.id)! - traversal.distances.get(right.id)!;
      if (graphDistanceDifference !== 0) {
        return graphDistanceDifference;
      }

      const leftDistance = Math.hypot(left.x - focusNode.x, left.y - focusNode.y);
      const rightDistance = Math.hypot(right.x - focusNode.x, right.y - focusNode.y);
      return leftDistance - rightDistance;
    })
    .slice(0, 3)
    .map((node) => node.id);
}

function pathFromFocus(
  targetNodeId: CapricornusNodeId,
  traversal: GraphTraversal,
): CapricornusNodeId[] {
  const reversedPath: CapricornusNodeId[] = [targetNodeId];
  let currentNodeId = targetNodeId;

  while (traversal.parents.has(currentNodeId)) {
    currentNodeId = traversal.parents.get(currentNodeId)!;
    reversedPath.push(currentNodeId);
  }

  return reversedPath.reverse();
}

function getCleanOutwardPath(
  focusNodeId: CapricornusNodeId,
  traversal: GraphTraversal,
): CapricornusNodeId[] {
  const focusNode = getNode(focusNodeId);
  const farthestNode = CAPRICORNUS_CONSTELLATION.nodes
    .filter((node) => node.id !== focusNodeId)
    .sort((left, right) => {
      const graphDistanceDifference =
        traversal.distances.get(right.id)! - traversal.distances.get(left.id)!;
      if (graphDistanceDifference !== 0) {
        return graphDistanceDifference;
      }

      const leftDistance = Math.hypot(left.x - focusNode.x, left.y - focusNode.y);
      const rightDistance = Math.hypot(right.x - focusNode.x, right.y - focusNode.y);
      return rightDistance - leftDistance;
    })[0];

  return pathFromFocus(farthestNode.id, traversal).slice(1, 4);
}

function getPatternTargets(
  behavior: Exclude<BehavioralStatement, 'I overthink things' | 'I trust my instincts'>,
  focusNodeId: CapricornusNodeId,
): CapricornusNodeId[] {
  const preferredTargets = CAPRICORNUS_PATTERN_TARGETS[behavior];
  const fallbackTargets = CAPRICORNUS_NODE_ORDER.filter(
    (nodeId) => !preferredTargets.includes(nodeId),
  );

  return [...preferredTargets, ...fallbackTargets]
    .filter((nodeId) => nodeId !== focusNodeId)
    .slice(0, 3);
}

function resolveBehaviorTargets(
  behavior: BehavioralStatement,
  focusNodeId: CapricornusNodeId,
  traversal: GraphTraversal,
) {
  if (behavior === 'I overthink things') {
    return getNearestCluster(focusNodeId, traversal);
  }

  if (behavior === 'I trust my instincts') {
    return getCleanOutwardPath(focusNodeId, traversal);
  }

  return getPatternTargets(behavior, focusNodeId);
}

function findEdge(from: CapricornusNodeId, to: CapricornusNodeId) {
  return CAPRICORNUS_CONSTELLATION.edges.find(
    (edge) =>
      (edge.from === from && edge.to === to) ||
      (edge.from === to && edge.to === from),
  )!;
}

function resolveBehaviorPath(
  targetNodeIds: readonly CapricornusNodeId[],
  traversal: GraphTraversal,
) {
  const pathEdges = new Map<string, Omit<SubjectSignaturePathEdge, 'arrivalSeconds'>>();

  targetNodeIds.forEach((targetNodeId) => {
    const path = pathFromFocus(targetNodeId, traversal);
    for (let index = 1; index < path.length; index += 1) {
      const from = path[index - 1];
      const to = path[index];
      const edge = findEdge(from, to);
      pathEdges.set(edge.id, {
        edgeId: edge.id,
        from,
        to,
        arrivalStep: traversal.distances.get(to)!,
      });
    }
  });

  const maxArrivalStep = Math.max(
    1,
    ...Array.from(pathEdges.values(), (edge) => edge.arrivalStep),
  );
  const propagationDuration =
    SUBJECT_SIGNATURE_TIMELINE.behaviorEndSeconds -
    SUBJECT_SIGNATURE_TIMELINE.behaviorStartSeconds;
  const arrivalSecondsForStep = (step: number) =>
    SUBJECT_SIGNATURE_TIMELINE.behaviorStartSeconds +
    (step / maxArrivalStep) * propagationDuration;

  const resolvedEdges = Array.from(pathEdges.values())
    .sort((left, right) => left.arrivalStep - right.arrivalStep)
    .map((edge) => ({
      ...edge,
      arrivalSeconds: arrivalSecondsForStep(edge.arrivalStep),
    }));

  const targetArrivals = targetNodeIds.map((nodeId) => {
    const graphDistance = traversal.distances.get(nodeId)!;
    return {
      nodeId,
      graphDistance,
      arrivalSeconds: arrivalSecondsForStep(graphDistance),
    };
  });

  return { resolvedEdges, targetArrivals };
}

/** Validates the exact three application-owned values saved with a report. */
export function isSubjectSignatureInput(value: unknown): value is SubjectSignatureInput {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const input = value as Record<string, unknown>;
  return (
    Object.keys(input).length === 3 &&
    typeof input.zodiacSign === 'string' &&
    isOneOf(input.zodiacSign, ZODIAC_SIGNS.map((sign) => sign.name)) &&
    typeof input.focusArea === 'string' &&
    isOneOf(input.focusArea, ATTENTION_AREAS) &&
    typeof input.behavioralStatement === 'string' &&
    isOneOf(input.behavioralStatement, BEHAVIORAL_STATEMENTS)
  );
}

/** Extracts the persisted signature boundary without copying unrelated answers. */
export function createSubjectSignatureInput(
  answers: Pick<
    QuestionnaireAnswers,
    'zodiacSign' | 'attentionArea' | 'behavioralStatement'
  >,
): SubjectSignatureInput | null {
  const input = {
    zodiacSign: answers.zodiacSign,
    focusArea: answers.attentionArea,
    behavioralStatement: answers.behavioralStatement,
  };

  return isSubjectSignatureInput(input) ? input : null;
}

/**
 * Resolves questionnaire state into rendering instructions without defaulting
 * unanswered fields or inventing geometry for unsupported prototype signs.
 */
export function createSubjectSignature(
  input: PartialSubjectSignatureInput,
): SubjectSignatureData {
  const zodiacSign = isOneOf(input.zodiacSign, ZODIAC_SIGNS.map((sign) => sign.name))
    ? input.zodiacSign
    : null;
  const focusArea = isOneOf(input.focusArea, ATTENTION_AREAS)
    ? input.focusArea
    : null;
  const behavioralStatement = isOneOf(
    input.behavioralStatement,
    BEHAVIORAL_STATEMENTS,
  )
    ? input.behavioralStatement
    : null;

  if (!zodiacSign) {
    return {
      status: 'dormant',
      identity: 'OL-SIG-DORMANT',
      zodiacSign: null,
      constellationLabel: null,
      focusArea,
      focusRole: focusArea ? FOCUS_ROLE_BY_AREA[focusArea] : null,
      behavioralStatement,
      geometry: null,
      focusNodeId: null,
      behaviorTargetNodeIds: [],
      behaviorPathEdges: [],
      behaviorTargetArrivals: [],
    };
  }

  if (zodiacSign !== CAPRICORNUS_CONSTELLATION.zodiacSign) {
    return {
      status: 'unsupported',
      identity: `OL-${zodiacSign.slice(0, 3).toUpperCase()}-PROTOTYPE`,
      zodiacSign,
      constellationLabel: null,
      focusArea,
      focusRole: focusArea ? FOCUS_ROLE_BY_AREA[focusArea] : null,
      behavioralStatement,
      geometry: null,
      focusNodeId: null,
      behaviorTargetNodeIds: [],
      behaviorPathEdges: [],
      behaviorTargetArrivals: [],
    };
  }

  const focusRole = focusArea ? FOCUS_ROLE_BY_AREA[focusArea] : null;
  const focusNodeId = focusRole
    ? CAPRICORNUS_CONSTELLATION.focusRoleNodes[focusRole]
    : null;
  const focusCode = focusRole ? FOCUS_CODE_BY_ROLE[focusRole] : 'NA';
  const behaviorCode = behavioralStatement
    ? BEHAVIOR_CODES[behavioralStatement]
    : 'NA';

  if (!focusNodeId || !behavioralStatement) {
    return {
      status: 'resolved',
      identity: `OL-CAP-${focusCode}-${behaviorCode}`,
      zodiacSign,
      constellationLabel: CAPRICORNUS_CONSTELLATION.label,
      focusArea,
      focusRole,
      behavioralStatement,
      geometry: CAPRICORNUS_CONSTELLATION,
      focusNodeId,
      behaviorTargetNodeIds: [],
      behaviorPathEdges: [],
      behaviorTargetArrivals: [],
    };
  }

  const traversal = traverseFrom(focusNodeId);
  const behaviorTargetNodeIds = resolveBehaviorTargets(
    behavioralStatement,
    focusNodeId,
    traversal,
  );
  const { resolvedEdges, targetArrivals } = resolveBehaviorPath(
    behaviorTargetNodeIds,
    traversal,
  );

  return {
    status: 'resolved',
    identity: `OL-CAP-${focusCode}-${behaviorCode}`,
    zodiacSign,
    constellationLabel: CAPRICORNUS_CONSTELLATION.label,
    focusArea,
    focusRole,
    behavioralStatement,
    geometry: CAPRICORNUS_CONSTELLATION,
    focusNodeId,
    behaviorTargetNodeIds,
    behaviorPathEdges: resolvedEdges,
    behaviorTargetArrivals: targetArrivals,
  };
}

/** Convenience boundary for the questionnaire's progressively completed state. */
export function createSubjectSignatureFromAnswers(
  answers: Pick<
    QuestionnaireAnswers,
    'zodiacSign' | 'attentionArea' | 'behavioralStatement'
  >,
) {
  return createSubjectSignature({
    zodiacSign: answers.zodiacSign,
    focusArea: answers.attentionArea,
    behavioralStatement: answers.behavioralStatement,
  });
}
