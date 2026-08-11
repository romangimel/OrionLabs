import { describe, expect, it } from 'vitest';
import {
  ATTENTION_AREAS,
  BEHAVIORAL_STATEMENTS,
  ZODIAC_SIGNS,
  type AttentionArea,
} from '@/data/questionnaire';
import {
  CAPRICORNUS_CONSTELLATION,
  ZODIAC_CONSTELLATIONS,
  ZODIAC_CONSTELLATION_BY_SIGN,
  type ConstellationNodeId,
  type ZodiacConstellation,
} from '@/data/zodiac-constellations';
import {
  createSubjectSignature,
  createSubjectSignatureFromAnswers,
} from '@/lib/subject-signature';

const completeInput = {
  zodiacSign: 'Capricorn',
  focusArea: 'Career',
  behavioralStatement: 'I overthink things',
};

function canReachTarget(
  focusNodeId: ConstellationNodeId,
  targetNodeId: ConstellationNodeId,
  signatureEdges: readonly { from: ConstellationNodeId; to: ConstellationNodeId }[],
) {
  const adjacency = new Map<ConstellationNodeId, ConstellationNodeId[]>();
  signatureEdges.forEach((edge) => {
    adjacency.set(edge.from, [...(adjacency.get(edge.from) ?? []), edge.to]);
    adjacency.set(edge.to, [...(adjacency.get(edge.to) ?? []), edge.from]);
  });

  const visited = new Set<ConstellationNodeId>([focusNodeId]);
  const queue = [focusNodeId];
  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    if (nodeId === targetNodeId) {
      return true;
    }

    (adjacency.get(nodeId) ?? []).forEach((adjacentNodeId) => {
      if (!visited.has(adjacentNodeId)) {
        visited.add(adjacentNodeId);
        queue.push(adjacentNodeId);
      }
    });
  }

  return false;
}

function expectValidDataset(constellation: ZodiacConstellation) {
  const nodeIds = constellation.nodes.map((node) => node.id);
  const nodeIdSet = new Set(nodeIds);
  const edgeIds = constellation.edges.map((edge) => edge.id);

  expect(constellation.nodes.length).toBeGreaterThanOrEqual(9);
  expect(constellation.nodes.length).toBeLessThanOrEqual(11);
  expect(nodeIdSet.size).toBe(nodeIds.length);
  expect(new Set(edgeIds).size).toBe(edgeIds.length);

  constellation.nodes.forEach((node) => {
    expect(node.id.trim()).not.toBe('');
    expect(node.x).toBeGreaterThanOrEqual(0);
    expect(node.x).toBeLessThanOrEqual(480);
    expect(node.y).toBeGreaterThanOrEqual(0);
    expect(node.y).toBeLessThanOrEqual(400);
  });

  constellation.edges.forEach((edge) => {
    expect(nodeIdSet.has(edge.from)).toBe(true);
    expect(nodeIdSet.has(edge.to)).toBe(true);
    expect(edge.from).not.toBe(edge.to);
  });
}

describe('Subject Signature constellation dataset', () => {
  it('contains one valid geometry for every questionnaire zodiac sign', () => {
    expect(ZODIAC_CONSTELLATIONS).toHaveLength(ZODIAC_SIGNS.length);
    expect(ZODIAC_CONSTELLATIONS.map((item) => item.zodiacSign)).toEqual(
      ZODIAC_SIGNS.map((item) => item.name),
    );

    ZODIAC_SIGNS.forEach(({ name }) => {
      const constellation = ZODIAC_CONSTELLATION_BY_SIGN.get(name);
      expect(constellation).toBeDefined();
      expectValidDataset(constellation!);
    });
  });

  it('preserves the approved Capricornus reference geometry', () => {
    expect(CAPRICORNUS_CONSTELLATION.nodes).toEqual([
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
    ]);
  });

  it('assigns all seven focus roles to valid unique nodes for every sign', () => {
    ZODIAC_CONSTELLATIONS.forEach((constellation) => {
      const validNodeIds = new Set(constellation.nodes.map((node) => node.id));
      const roleNodeIds = Object.values(constellation.focusRoleNodes);

      expect(roleNodeIds).toHaveLength(ATTENTION_AREAS.length);
      expect(new Set(roleNodeIds).size).toBe(ATTENTION_AREAS.length);
      roleNodeIds.forEach((nodeId) => expect(validNodeIds.has(nodeId)).toBe(true));
    });
  });
});

describe('Subject Signature derivation', () => {
  it.each(ZODIAC_SIGNS)(
    'returns the same resolved $name signature for repeated inputs',
    ({ name }) => {
      const input = { ...completeInput, zodiacSign: name };
      expect(createSubjectSignature(input)).toEqual(createSubjectSignature(input));
    },
  );

  it.each(ZODIAC_SIGNS)(
    'maps every focus option to a valid unique $name node',
    ({ name }) => {
      const constellation = ZODIAC_CONSTELLATION_BY_SIGN.get(name)!;
      const focusNodeIds = ATTENTION_AREAS.map((focusArea) =>
        createSubjectSignature({ ...completeInput, zodiacSign: name, focusArea })
          .focusNodeId,
      );
      const validNodeIds = new Set(constellation.nodes.map((node) => node.id));

      focusNodeIds.forEach((nodeId) => expect(validNodeIds.has(nodeId!)).toBe(true));
      expect(new Set(focusNodeIds).size).toBe(ATTENTION_AREAS.length);
    },
  );

  it.each(ZODIAC_SIGNS)(
    'resolves valid deterministic behavior networks for every $name combination',
    ({ name }) => {
      const constellation = ZODIAC_CONSTELLATION_BY_SIGN.get(name)!;
      const validNodeIds = new Set(constellation.nodes.map((node) => node.id));
      const validEdges = new Set(constellation.edges.map((edge) => edge.id));

      ATTENTION_AREAS.forEach((focusArea: AttentionArea) => {
        BEHAVIORAL_STATEMENTS.forEach((behavioralStatement) => {
          const input = { zodiacSign: name, focusArea, behavioralStatement };
          const signature = createSubjectSignature(input);

          expect(signature).toEqual(createSubjectSignature(input));
          expect(signature.status).toBe('resolved');
          expect(signature.behaviorTargetNodeIds).toHaveLength(3);
          expect(new Set(signature.behaviorTargetNodeIds).size).toBe(3);
          expect(signature.behaviorTargetArrivals).toHaveLength(3);

          signature.behaviorTargetNodeIds.forEach((nodeId) => {
            expect(validNodeIds.has(nodeId)).toBe(true);
            expect(nodeId).not.toBe(signature.focusNodeId);
            expect(
              canReachTarget(
                signature.focusNodeId!,
                nodeId,
                signature.behaviorPathEdges,
              ),
            ).toBe(true);
          });

          signature.behaviorPathEdges.forEach((edge) => {
            expect(validEdges.has(edge.edgeId)).toBe(true);
            expect(edge.arrivalSeconds).toBeGreaterThanOrEqual(7);
            expect(edge.arrivalSeconds).toBeLessThanOrEqual(13);
          });
        });
      });
    },
  );

  it.each(ZODIAC_SIGNS)(
    'keeps all five $name Career behavior patterns structurally distinct',
    ({ name }) => {
      const patternIdentities = BEHAVIORAL_STATEMENTS.map((behavioralStatement) => {
        const signature = createSubjectSignature({
          zodiacSign: name,
          focusArea: 'Career',
          behavioralStatement,
        });
        return `${signature.behaviorTargetNodeIds.join('|')}::${signature.behaviorPathEdges
          .map((edge) => edge.edgeId)
          .join('|')}`;
      });

      expect(new Set(patternIdentities).size).toBe(BEHAVIORAL_STATEMENTS.length);
    },
  );

  it.each(['Aries', 'Gemini', 'Pisces'])(
    'preserves progressive partial questionnaire state for %s',
    (zodiacSign) => {
      const baseOnly = createSubjectSignature({ zodiacSign });
      const focusOnly = createSubjectSignature({ zodiacSign, focusArea: 'Health' });
      const complete = createSubjectSignature({
        zodiacSign,
        focusArea: 'Health',
        behavioralStatement: 'I adapt as I go',
      });

      expect(baseOnly.status).toBe('resolved');
      expect(baseOnly.geometry).not.toBeNull();
      expect(baseOnly.focusNodeId).toBeNull();
      expect(baseOnly.behaviorTargetNodeIds).toEqual([]);
      expect(focusOnly.focusNodeId).not.toBeNull();
      expect(focusOnly.behavioralStatement).toBeNull();
      expect(focusOnly.behaviorTargetNodeIds).toEqual([]);
      expect(complete.behaviorTargetNodeIds).toHaveLength(3);
    },
  );

  it('accepts a completely unanswered questionnaire state as dormant', () => {
    const signature = createSubjectSignatureFromAnswers({
      zodiacSign: '',
      attentionArea: '',
      behavioralStatement: '',
    });

    expect(signature.status).toBe('dormant');
    expect(signature.geometry).toBeNull();
    expect(signature.focusNodeId).toBeNull();
  });

  it('never returns the geometry placeholder for a supported zodiac sign', () => {
    ZODIAC_SIGNS.forEach(({ name }) => {
      const signature = createSubjectSignature({
        ...completeInput,
        zodiacSign: name,
      });
      expect(signature.status).toBe('resolved');
      expect(signature.geometry).not.toBeNull();
    });
  });
});
