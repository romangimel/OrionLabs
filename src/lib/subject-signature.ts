import {
  ATTENTION_AREAS,
  BEHAVIORAL_STATEMENTS,
  ZODIAC_SIGNS,
  type AttentionArea,
  type BehavioralStatement,
} from '@/data/questionnaire';
import {
  ZODIAC_CONSTELLATION_BY_SIGN,
  type ConstellationEdge,
  type ConstellationNodeId,
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
  from: ConstellationNodeId;
  to: ConstellationNodeId;
  arrivalStep: number;
  arrivalSeconds: number;
}

export interface SubjectSignatureTargetArrival {
  nodeId: ConstellationNodeId;
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
  focusNodeId: ConstellationNodeId | null;
  behaviorTargetNodeIds: readonly ConstellationNodeId[];
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

function isOneOf<T extends string>(value: string | undefined, options: readonly T[]): value is T {
  return Boolean(value && options.includes(value as T));
}

function getNode(constellation: ZodiacConstellation, nodeId: ConstellationNodeId) {
  return constellation.nodes.find((node) => node.id === nodeId)!;
}

function createAdjacency(constellation: ZodiacConstellation) {
  const adjacency = new Map<ConstellationNodeId, ConstellationNodeId[]>();
  constellation.nodes.forEach((node) => adjacency.set(node.id, []));

  constellation.edges.forEach((edge) => {
    adjacency.get(edge.from)?.push(edge.to);
    adjacency.get(edge.to)?.push(edge.from);
  });

  return adjacency;
}

interface GraphTraversal {
  distances: Map<ConstellationNodeId, number>;
  parents: Map<ConstellationNodeId, ConstellationNodeId>;
}

/** Builds one deterministic breadth-first tree used by selection and propagation. */
function traverseFrom(
  constellation: ZodiacConstellation,
  focusNodeId: ConstellationNodeId,
): GraphTraversal {
  const adjacency = createAdjacency(constellation);
  const distances = new Map<ConstellationNodeId, number>([[focusNodeId, 0]]);
  const parents = new Map<ConstellationNodeId, ConstellationNodeId>();
  const queue: ConstellationNodeId[] = [focusNodeId];

  while (queue.length > 0) {
    const currentNodeId = queue.shift()!;
    const currentDistance = distances.get(currentNodeId)!;

    for (const adjacentNodeId of adjacency.get(currentNodeId) ?? []) {
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

function pathFromFocus(
  targetNodeId: ConstellationNodeId,
  traversal: GraphTraversal,
): ConstellationNodeId[] {
  const reversedPath: ConstellationNodeId[] = [targetNodeId];
  let currentNodeId = targetNodeId;

  while (traversal.parents.has(currentNodeId)) {
    currentNodeId = traversal.parents.get(currentNodeId)!;
    reversedPath.push(currentNodeId);
  }

  return reversedPath.reverse();
}

/**
 * Guarantees three valid, unique secondary nodes while retaining authored or
 * algorithmic preferences first. Dataset order is the stable final tiebreaker.
 */
function fillBehaviorTargets(
  preferredNodeIds: readonly ConstellationNodeId[],
  focusNodeId: ConstellationNodeId,
  constellation: ZodiacConstellation,
  traversal: GraphTraversal,
) {
  const validNodeIds = new Set(constellation.nodes.map((node) => node.id));
  const fallbackNodeIds = constellation.nodes
    .filter((node) => node.id !== focusNodeId)
    .sort((left, right) => {
      const distanceDifference =
        (traversal.distances.get(right.id) ?? -1) -
        (traversal.distances.get(left.id) ?? -1);
      return distanceDifference;
    })
    .map((node) => node.id);
  const uniqueTargets: ConstellationNodeId[] = [];

  [...preferredNodeIds, ...fallbackNodeIds].forEach((nodeId) => {
    if (
      uniqueTargets.length < 3 &&
      nodeId !== focusNodeId &&
      validNodeIds.has(nodeId) &&
      traversal.distances.has(nodeId) &&
      !uniqueTargets.includes(nodeId)
    ) {
      uniqueTargets.push(nodeId);
    }
  });

  return uniqueTargets;
}

function getNearestCluster(
  constellation: ZodiacConstellation,
  focusNodeId: ConstellationNodeId,
  traversal: GraphTraversal,
) {
  const focusNode = getNode(constellation, focusNodeId);
  const preferredTargets = constellation.nodes
    .filter((node) => node.id !== focusNodeId)
    .sort((left, right) => {
      const graphDistanceDifference =
        (traversal.distances.get(left.id) ?? Number.POSITIVE_INFINITY) -
        (traversal.distances.get(right.id) ?? Number.POSITIVE_INFINITY);
      if (graphDistanceDifference !== 0) {
        return graphDistanceDifference;
      }

      const leftDistance = Math.hypot(left.x - focusNode.x, left.y - focusNode.y);
      const rightDistance = Math.hypot(right.x - focusNode.x, right.y - focusNode.y);
      return leftDistance - rightDistance;
    })
    .map((node) => node.id);

  return fillBehaviorTargets(
    preferredTargets,
    focusNodeId,
    constellation,
    traversal,
  );
}

function getCleanOutwardPath(
  constellation: ZodiacConstellation,
  focusNodeId: ConstellationNodeId,
  traversal: GraphTraversal,
) {
  const focusNode = getNode(constellation, focusNodeId);
  const farthestNode = constellation.nodes
    .filter((node) => node.id !== focusNodeId)
    .sort((left, right) => {
      const graphDistanceDifference =
        (traversal.distances.get(right.id) ?? -1) -
        (traversal.distances.get(left.id) ?? -1);
      if (graphDistanceDifference !== 0) {
        return graphDistanceDifference;
      }

      const leftDistance = Math.hypot(left.x - focusNode.x, left.y - focusNode.y);
      const rightDistance = Math.hypot(right.x - focusNode.x, right.y - focusNode.y);
      return rightDistance - leftDistance;
    })[0];
  const outwardPath = pathFromFocus(farthestNode.id, traversal).slice(1, 4);

  return fillBehaviorTargets(outwardPath, focusNodeId, constellation, traversal);
}

function getBalancedTargets(
  constellation: ZodiacConstellation,
  focusNodeId: ConstellationNodeId,
  traversal: GraphTraversal,
) {
  const lastIndex = constellation.nodes.length - 1;
  const preferredTargets = [
    constellation.nodes[Math.round(lastIndex * 0.2)].id,
    constellation.nodes[Math.round(lastIndex * 0.5)].id,
    constellation.nodes[Math.round(lastIndex * 0.8)].id,
  ];

  return fillBehaviorTargets(
    preferredTargets,
    focusNodeId,
    constellation,
    traversal,
  );
}

function getDistributedTargets(
  constellation: ZodiacConstellation,
  focusNodeId: ConstellationNodeId,
  traversal: GraphTraversal,
) {
  const candidateNodeIds = constellation.nodes
    .map((node) => node.id)
    .filter((nodeId) => nodeId !== focusNodeId && traversal.distances.has(nodeId));
  const selectedNodeIds: ConstellationNodeId[] = [];

  while (selectedNodeIds.length < 3) {
    const nextNodeId = candidateNodeIds
      .filter((nodeId) => !selectedNodeIds.includes(nodeId))
      .sort((left, right) => {
        const leftTraversal = traverseFrom(constellation, left);
        const rightTraversal = traverseFrom(constellation, right);
        const comparisonNodeIds = [focusNodeId, ...selectedNodeIds];
        const leftSeparation = Math.min(
          ...comparisonNodeIds.map((nodeId) => leftTraversal.distances.get(nodeId) ?? -1),
        );
        const rightSeparation = Math.min(
          ...comparisonNodeIds.map((nodeId) => rightTraversal.distances.get(nodeId) ?? -1),
        );
        return rightSeparation - leftSeparation;
      })[0];

    if (!nextNodeId) {
      break;
    }
    selectedNodeIds.push(nextNodeId);
  }

  return fillBehaviorTargets(
    selectedNodeIds,
    focusNodeId,
    constellation,
    traversal,
  );
}

function getDelayedCadenceTargets(
  constellation: ZodiacConstellation,
  focusNodeId: ConstellationNodeId,
  traversal: GraphTraversal,
) {
  const lastIndex = constellation.nodes.length - 1;
  const preferredTargets = [
    constellation.nodes[lastIndex].id,
    constellation.nodes[Math.round(lastIndex * 0.65)].id,
    constellation.nodes[Math.round(lastIndex * 0.3)].id,
    constellation.nodes[0].id,
  ];

  return fillBehaviorTargets(
    preferredTargets,
    focusNodeId,
    constellation,
    traversal,
  );
}

function getPatternTargets(
  behavior: BehavioralStatement,
  constellation: ZodiacConstellation,
  focusNodeId: ConstellationNodeId,
  traversal: GraphTraversal,
) {
  const preferredTargets = constellation.behaviorTargetPreferences?.[behavior];
  if (preferredTargets) {
    return fillBehaviorTargets(
      preferredTargets,
      focusNodeId,
      constellation,
      traversal,
    );
  }

  if (behavior === 'I overthink things') {
    return getNearestCluster(constellation, focusNodeId, traversal);
  }

  if (behavior === 'I trust my instincts') {
    return getCleanOutwardPath(constellation, focusNodeId, traversal);
  }

  if (behavior === 'I like having a plan') {
    return getBalancedTargets(constellation, focusNodeId, traversal);
  }

  if (behavior === 'I adapt as I go') {
    return getDistributedTargets(constellation, focusNodeId, traversal);
  }

  return getDelayedCadenceTargets(constellation, focusNodeId, traversal);
}

function resolveBehaviorTargets(
  behavior: BehavioralStatement,
  constellation: ZodiacConstellation,
  focusNodeId: ConstellationNodeId,
  traversal: GraphTraversal,
) {
  return getPatternTargets(behavior, constellation, focusNodeId, traversal);
}

function findEdge(
  edges: readonly ConstellationEdge[],
  from: ConstellationNodeId,
  to: ConstellationNodeId,
) {
  return edges.find(
    (edge) =>
      (edge.from === from && edge.to === to) ||
      (edge.from === to && edge.to === from),
  )!;
}

function resolveBehaviorPath(
  constellation: ZodiacConstellation,
  targetNodeIds: readonly ConstellationNodeId[],
  traversal: GraphTraversal,
) {
  const pathEdges = new Map<string, Omit<SubjectSignaturePathEdge, 'arrivalSeconds'>>();

  targetNodeIds.forEach((targetNodeId) => {
    const path = pathFromFocus(targetNodeId, traversal);
    for (let index = 1; index < path.length; index += 1) {
      const from = path[index - 1];
      const to = path[index];
      const edge = findEdge(constellation.edges, from, to);
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

/** Resolves progressive questionnaire state into deterministic rendering data. */
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

  const constellation = ZODIAC_CONSTELLATION_BY_SIGN.get(zodiacSign);
  if (!constellation) {
    return {
      status: 'unsupported',
      identity: `OL-${zodiacSign.slice(0, 3).toUpperCase()}-UNAVAILABLE`,
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
  const focusNodeId = focusRole ? constellation.focusRoleNodes[focusRole] : null;
  const focusCode = focusRole ? FOCUS_CODE_BY_ROLE[focusRole] : 'NA';
  const behaviorCode = behavioralStatement
    ? BEHAVIOR_CODES[behavioralStatement]
    : 'NA';
  const identity = `OL-${constellation.code}-${focusCode}-${behaviorCode}`;

  if (!focusNodeId || !behavioralStatement) {
    return {
      status: 'resolved',
      identity,
      zodiacSign,
      constellationLabel: constellation.label,
      focusArea,
      focusRole,
      behavioralStatement,
      geometry: constellation,
      focusNodeId,
      behaviorTargetNodeIds: [],
      behaviorPathEdges: [],
      behaviorTargetArrivals: [],
    };
  }

  const traversal = traverseFrom(constellation, focusNodeId);
  const behaviorTargetNodeIds = resolveBehaviorTargets(
    behavioralStatement,
    constellation,
    focusNodeId,
    traversal,
  );
  const { resolvedEdges, targetArrivals } = resolveBehaviorPath(
    constellation,
    behaviorTargetNodeIds,
    traversal,
  );

  return {
    status: 'resolved',
    identity,
    zodiacSign,
    constellationLabel: constellation.label,
    focusArea,
    focusRole,
    behavioralStatement,
    geometry: constellation,
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
