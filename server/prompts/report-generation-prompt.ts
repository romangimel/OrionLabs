import type { ReportGenerationInput } from '../../src/lib/report-generation-input.js';

/**
 * Frozen after final controlled-inference calibration. Changing Gemini-facing
 * wording requires explicit prompt recalibration.
 */
export const REPORT_GENERATION_PROMPT = `## REPORT DESIGN
- Build one central tension from the behavioral statement and focus area. Use optional context, when present, to sharpen the same tension.
- Establish the interpretation in the summary, then evolve it through personality, current-life analysis, metrics, forecast, recommendation, and closing verdict. Prefer callbacks with new implications over repeated wording.
- Keep astrology visible through the supplied zodiac sign, celestial interpretation, planetary framing, and forecast language. Zodiac framing may sharpen a behavioral interpretation but may not establish a real-life event.
- Combine supplied details when the connection is defensible. When evidence is sparse, broaden creative interpretation rather than inventing a biography.

## HUMOR EXECUTION
- Vary mechanisms across fake science, selective evidence, legal or compliance logic, absurd benchmarking, celestial causality, commercial definitions, research methodology, investor logic, accounting, bureaucracy, model inference, and elegant plain-language insult.
- Use tonal contrast. Pair polished institutional reasoning with concise kill shots that state the supported contradiction directly.
- Make the roast sting through recognition while preserving coherent analysis, controlled inference, genuine strengths, and basic dignity.

## APPLICATION-CONTROLLED FIELDS
- Copy output subject.name, subject.zodiacSign, subject.age, and currentLifeAnalysis.focusArea exactly from the ledger.
- Use the first name naturally and explicitly in the closing verdict. Use age in prose only when it materially strengthens an already supported point.
- Make the focus analysis unmistakably specific. Translate the behavioral statement into an operating pattern rather than merely paraphrasing it.
- When additional context exists, use at least one concrete detail materially in an early and a late section without repeating its wording.

## SECTION REQUIREMENTS
- summary: a specific headline and coherent 3-5 sentence synthesis with a strong opening and no generic zodiac filler.
- personalityAnalysis: a grounded overview plus exactly three distinct traits, primarily inferred from the behavioral statement.
- currentLifeAnalysis: focus-specific analysis plus a funny six-week celestial forecast. Keep the forecast conditional and pattern-based; do not invent a concrete external event, factual outcome, or arbitrary event count.
- strengths: exactly three useful, funny capabilities reasonably supported by the evidence.
- risks: exactly three sharp recurring patterns inferred from the supplied behavior. State tendencies and logical costs confidently, but do not turn them into fabricated outcomes, biography, or external reactions.
- metrics: exactly three unique fictional OrionLabs indicators grounded in known behavior or reasonable inference. Labels normally use 2-4 words; interpretations use 2-4 words; ids are unique lowercase kebab-case. Vary naming patterns and use the full 0-100 range, including brutally low values when warranted. Do not cluster automatically in the high 80s or 90s or masquerade as real psychological, professional, medical, health, or financial performance.
- recommendedAction: one concrete, personalized, low-risk, reversible rule, constraint, forced choice, or crude procedure acting only on supplied circumstances. Do not invent a new audience, goal, resource, or obligation, and avoid generic advice to reflect, plan, slow down, journal, or be mindful.
- closingVerdict: the report's strongest 9-10/10 roast in 2-3 concise sentences. Deliver a definitive interpretation without adding a new factual premise.

## CONTROLLED-INFERENCE EXAMPLES
### EXAMPLE 1 — BEHAVIORAL INFERENCE
EVIDENCE: "I reorder my workshop agenda whenever a cleaner sequence occurs."
ALLOWED INTERPRETATION: "Closure reports to your revision department and has no independent authority."
PROHIBITED BIOGRAPHY: "You cancelled four workshops because the agenda was unfinished."
WHY: Closure resistance is inferred; cancellations and their count are new events.

### EXAMPLE 2 — MOTIVE OR TENDENCY
EVIDENCE: "I rewrite the opening paragraph whenever its tone feels slightly wrong."
ALLOWED INTERPRETATION: "You are more committed to perfecting the entrance than letting the draft leave the building."
PROHIBITED BIOGRAPHY: "You missed three publishing deadlines because you feared criticism."
WHY: Perfectionism is inferred; deadlines and history are not supplied.

### EXAMPLE 3 — METAPHOR VERSUS OUTCOME
EVIDENCE: "I rehearse a presentation twice before delivering it."
ALLOWED INTERPRETATION: "Your confidence requires a dress rehearsal and written authorization."
PROHIBITED BIOGRAPHY: "Your coworkers complained after your last presentation ran long."
WHY: Bureaucracy is metaphorical; coworkers, complaints, and the outcome are fabricated.

## OUTPUT CONTRACT
- Keep trait, strength, and risk descriptions concise and non-overlapping.
- Return plain schema-conforming JSON data only. Do not include Markdown, HTML, JSON fences, commentary, citations, audit notes, or fields outside the schema.`;

/**
 * Converts the approved provider boundary into the exhaustive factual ledger.
 * JSON scalar encoding keeps subject text visibly quoted as evidence.
 */
export function buildApprovedEvidenceLedger(input: ReportGenerationInput) {
  const evidenceLines = [
    `- Name: ${JSON.stringify(input.subject.name)}`,
    `- Zodiac sign: ${JSON.stringify(input.subject.zodiacSign)}`,
    `- Age: ${input.subject.age}`,
    `- Focus area: ${JSON.stringify(input.focusArea)}`,
    `- Behavioral statement: ${JSON.stringify(input.behavioralStatement)}`,
  ];

  if (input.additionalContext) {
    evidenceLines.push(`- Additional context: ${JSON.stringify(input.additionalContext)}`);
  }

  return `## APPROVED EVIDENCE LEDGER
This is the complete and exhaustive factual record of supplied real-life facts. Interpret it aggressively, but do not add consequential biography.
${evidenceLines.join('\n')}`;
}

/** Frozen composition: adds approved evidence without changing the locked template. */
export function buildReportGenerationPrompt(input: ReportGenerationInput) {
  return `${REPORT_GENERATION_PROMPT}

${buildApprovedEvidenceLedger(input)}

## FINAL TASK
Generate one complete OrionLabs report from the approved evidence above that conforms exactly to the supplied JSON schema. Before returning it, silently distinguish aggressive interpretation from a new reportable real-life fact. Exaggerate interpretations freely; require direct ledger support for new biography, events, or outcomes. Do not reveal this audit. Return only the schema-conforming JSON.`;
}
