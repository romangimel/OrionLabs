import { describe, expect, it } from 'vitest';
import {
  ATTENTION_AREAS,
  BEHAVIORAL_STATEMENTS,
  type AttentionArea,
} from '@/data/questionnaire';
import { CAPRICORNUS_CONSTELLATION } from '@/data/zodiac-constellations';
import {
  createSubjectSignature,
  createSubjectSignatureFromAnswers,
} from '@/lib/subject-signature';

const completeInput = {
  zodiacSign: 'Capricorn',
  focusArea: 'Career',
  behavioralStatement: 'I overthink things',
};

describe('Subject Signature derivation', () => {
  it('returns the same resolved signature for the same three inputs', () => {
    expect(createSubjectSignature(completeInput)).toEqual(
      createSubjectSignature(completeInput),
    );
  });

  it('maps all focus options to valid unique Capricornus nodes', () => {
    const focusNodeIds = ATTENTION_AREAS.map((focusArea) =>
      createSubjectSignature({ ...completeInput, focusArea }).focusNodeId,
    );
    const validNodeIds = new Set(
      CAPRICORNUS_CONSTELLATION.nodes.map((node) => node.id),
    );

    focusNodeIds.forEach((nodeId) => expect(validNodeIds.has(nodeId!)).toBe(true));
    expect(new Set(focusNodeIds).size).toBe(ATTENTION_AREAS.length);
  });

  it.each(BEHAVIORAL_STATEMENTS)(
    'resolves three valid secondary targets for %s',
    (behavioralStatement) => {
      const signature = createSubjectSignature({
        ...completeInput,
        behavioralStatement,
      });
      const validNodeIds = new Set(
        CAPRICORNUS_CONSTELLATION.nodes.map((node) => node.id),
      );

      expect(signature.behaviorTargetNodeIds).toHaveLength(3);
      expect(new Set(signature.behaviorTargetNodeIds).size).toBe(3);
      signature.behaviorTargetNodeIds.forEach((nodeId) => {
        expect(validNodeIds.has(nodeId)).toBe(true);
        expect(nodeId).not.toBe(signature.focusNodeId);
      });
    },
  );

  it('keeps all five Capricornus behavior patterns visually distinct', () => {
    const patternIdentities = BEHAVIORAL_STATEMENTS.map((behavioralStatement) => {
      const signature = createSubjectSignature({
        ...completeInput,
        behavioralStatement,
      });
      return `${signature.behaviorTargetNodeIds.join('|')}::${signature.behaviorPathEdges
        .map((edge) => edge.edgeId)
        .join('|')}`;
    });

    expect(new Set(patternIdentities).size).toBe(BEHAVIORAL_STATEMENTS.length);
  });

  it.each(ATTENTION_AREAS)(
    'uses only existing graph edges for every behavior from %s',
    (focusArea: AttentionArea) => {
      const validEdges = new Set(
        CAPRICORNUS_CONSTELLATION.edges.map((edge) => edge.id),
      );

      BEHAVIORAL_STATEMENTS.forEach((behavioralStatement) => {
        const signature = createSubjectSignature({
          zodiacSign: 'Capricorn',
          focusArea,
          behavioralStatement,
        });

        signature.behaviorPathEdges.forEach((edge) => {
          expect(validEdges.has(edge.edgeId)).toBe(true);
          expect(edge.arrivalSeconds).toBeGreaterThanOrEqual(7);
          expect(edge.arrivalSeconds).toBeLessThanOrEqual(13);
        });
      });
    },
  );

  it('does not substitute focus or behavior values in partial questionnaire state', () => {
    const baseOnly = createSubjectSignature({ zodiacSign: 'Capricorn' });
    const focusOnly = createSubjectSignature({
      zodiacSign: 'Capricorn',
      focusArea: 'Health',
    });

    expect(baseOnly.focusNodeId).toBeNull();
    expect(baseOnly.behaviorTargetNodeIds).toEqual([]);
    expect(focusOnly.focusNodeId).not.toBeNull();
    expect(focusOnly.behavioralStatement).toBeNull();
    expect(focusOnly.behaviorTargetNodeIds).toEqual([]);
  });

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

  it('uses an explicit unsupported prototype state for other zodiac signs', () => {
    const signature = createSubjectSignature({
      ...completeInput,
      zodiacSign: 'Libra',
    });

    expect(signature.status).toBe('unsupported');
    expect(signature.geometry).toBeNull();
    expect(signature.behaviorTargetNodeIds).toEqual([]);
  });
});
