import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { ORIONLABS_SYSTEM_PROMPT } from '../server/prompts/orionlabs-system-prompt';
import {
  REPORT_GENERATION_PROMPT,
  buildApprovedEvidenceLedger,
  buildReportGenerationPrompt,
} from '../server/prompts/report-generation-prompt';
import { REPORT_GENERATION_EVALUATION_FIXTURES } from '../evaluation/report-generation-fixtures';
import { validGenerationInput } from './fixtures';
import type { ReportGenerationInput } from '@/lib/report-generation-input';

const LOCKED_REPORT_PROMPT_INPUT = {
  subject: { name: 'Maya', zodiacSign: 'Capricorn', age: 32 },
  focusArea: 'Career',
  behavioralStatement: 'I overthink things',
  additionalContext: 'I keep revising two project ideas instead of choosing one.',
} satisfies ReportGenerationInput;

function sha256(value: string) {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

describe('production report prompt invariants', () => {
  it('locks the final Gemini-facing system prompt', () => {
    // Updating this hash is an explicit product recalibration decision, not
    // routine snapshot maintenance.
    expect(sha256(ORIONLABS_SYSTEM_PROMPT)).toBe(
      '04f1dc041882c034d88052efeb17abb05162f8a86c27445467bea2b2c2857db8',
    );
  });

  it('locks the final generated report prompt', () => {
    // This hash covers the locked template plus its frozen runtime composition.
    expect(sha256(buildReportGenerationPrompt(LOCKED_REPORT_PROMPT_INPUT))).toBe(
      '4390369caf5c68364f7938fcc372c0c3aaac8a4ec50c1077861a35f6ef9e913c',
    );
  });

  it('constructs an exhaustive ledger from exactly the approved input fields', () => {
    const expandedInput = {
      ...validGenerationInput,
      reportId: 'must-not-enter-provider-prompt',
    } as ReportGenerationInput;
    const ledger = buildApprovedEvidenceLedger(expandedInput);
    const evidenceLines = ledger.split('\n').slice(2);

    expect(evidenceLines).toEqual([
      '- Name: "Maya"',
      '- Zodiac sign: "Capricorn"',
      '- Age: 32',
      '- Focus area: "Career"',
      '- Behavioral statement: "I overthink things"',
      '- Additional context: "I keep revising two project ideas instead of choosing one."',
    ]);
    expect(ledger).toContain('complete and exhaustive factual record');
    expect(ledger).not.toMatch(
      /reportId|birthDate|birth date|pronouns|reference preference|questionnaire/i,
    );
  });

  it('omits optional context when it was not supplied', () => {
    const inputWithoutContext: ReportGenerationInput = {
      subject: validGenerationInput.subject,
      focusArea: validGenerationInput.focusArea,
      behavioralStatement: validGenerationInput.behavioralStatement,
    };

    expect(buildApprovedEvidenceLedger(inputWithoutContext)).not.toContain(
      'Additional context:',
    );
  });

  it('uses one Green, Yellow, and Red controlled-inference contract', () => {
    const prompt = buildReportGenerationPrompt(validGenerationInput);

    expect(ORIONLABS_SYSTEM_PROMPT).toContain(
      'approved evidence ledger is the complete source of real-life facts',
    );
    expect(ORIONLABS_SYSTEM_PROMPT).toContain('GREEN — FREELY ALLOWED');
    expect(ORIONLABS_SYSTEM_PROMPT).toContain(
      'YELLOW — ALLOWED WHEN STRONGLY CONNECTED',
    );
    expect(ORIONLABS_SYSTEM_PROMPT).toContain(
      'RED — PROHIBITED WITHOUT DIRECT EVIDENCE',
    );
    expect(ORIONLABS_SYSTEM_PROMPT).toContain(
      'would add new information to a factual biography',
    );
    expect(ORIONLABS_SYSTEM_PROMPT).toContain(
      'Aggressive satirical inference is allowed. Consequential fabricated biography is not.',
    );
    expect(prompt).toContain('## APPROVED EVIDENCE LEDGER');
    expect(prompt).toContain('## FINAL TASK');
    expect(prompt.indexOf('## FINAL TASK')).toBeGreaterThan(
      prompt.indexOf('## APPROVED EVIDENCE LEDGER'),
    );
    expect(prompt).toContain('silently distinguish aggressive interpretation');
    expect(prompt).toContain('Do not reveal this audit');
    expect(prompt).not.toMatch(/neutral observer|zero-inference|complete factual world/i);
  });

  it('contains exactly three compact, consistently structured grounding examples', () => {
    expect(REPORT_GENERATION_PROMPT.match(/^### EXAMPLE /gm)).toHaveLength(3);
    expect(REPORT_GENERATION_PROMPT.match(/^EVIDENCE:/gm)).toHaveLength(3);
    expect(REPORT_GENERATION_PROMPT.match(/^ALLOWED INTERPRETATION:/gm)).toHaveLength(3);
    expect(REPORT_GENERATION_PROMPT.match(/^PROHIBITED BIOGRAPHY:/gm)).toHaveLength(3);
    expect(REPORT_GENERATION_PROMPT.match(/^WHY:/gm)).toHaveLength(3);
    expect(REPORT_GENERATION_PROMPT).toContain('BEHAVIORAL INFERENCE');
    expect(REPORT_GENERATION_PROMPT).toContain('MOTIVE OR TENDENCY');
    expect(REPORT_GENERATION_PROMPT).toContain('METAPHOR VERSUS OUTCOME');
  });

  it('does not embed evaluation-fixture evidence in the static prompt', () => {
    REPORT_GENERATION_EVALUATION_FIXTURES.forEach(({ input }) => {
      expect(REPORT_GENERATION_PROMPT).not.toContain(input.behavioralStatement);
      if (input.additionalContext) {
        expect(REPORT_GENERATION_PROMPT).not.toContain(input.additionalContext);
      }
    });
  });

  it('preserves section, humor, metric, forecast, recommendation, and output contracts', () => {
    const requiredSections = [
      'summary',
      'personalityAnalysis',
      'currentLifeAnalysis',
      'strengths',
      'risks',
      'metrics',
      'recommendedAction',
      'closingVerdict',
    ];

    requiredSections.forEach((section) => {
      expect(REPORT_GENERATION_PROMPT).toContain(section);
    });
    expect(ORIONLABS_SYSTEM_PROMPT).toContain('9-10/10 roast intensity');
    expect(REPORT_GENERATION_PROMPT).toContain('Vary mechanisms');
    expect(REPORT_GENERATION_PROMPT).toContain('concise kill shots');
    expect(REPORT_GENERATION_PROMPT).toContain('six-week celestial forecast');
    expect(REPORT_GENERATION_PROMPT).toContain('conditional and pattern-based');
    expect(REPORT_GENERATION_PROMPT).toContain('exactly three unique fictional OrionLabs indicators');
    expect(REPORT_GENERATION_PROMPT).toContain('Labels normally use 2-4 words');
    expect(REPORT_GENERATION_PROMPT).toContain('full 0-100 range');
    expect(REPORT_GENERATION_PROMPT).toContain('brutally low values');
    expect(REPORT_GENERATION_PROMPT).toContain('low-risk, reversible rule');
    expect(REPORT_GENERATION_PROMPT).toContain("report's strongest 9-10/10 roast");
    expect(REPORT_GENERATION_PROMPT).toContain('fields outside the schema');
    expect(REPORT_GENERATION_PROMPT).toContain('Do not include Markdown');
  });

  it('keeps safety and confident-interpretation rules explicit', () => {
    expect(ORIONLABS_SYSTEM_PROMPT).toContain('Do not hedge');
    expect(ORIONLABS_SYSTEM_PROMPT).toContain('never as clinical diagnosis');
    expect(ORIONLABS_SYSTEM_PROMPT).toContain('protected characteristics');
    expect(ORIONLABS_SYSTEM_PROMPT).toContain('Recommendations must be low-risk and reversible');
    expect(ORIONLABS_SYSTEM_PROMPT).toContain('analyze only the supplied behavior and routine');
  });
});
