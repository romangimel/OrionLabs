import type { ReportGenerationInput } from '../../src/lib/report-generation-input.js';

/** Stable task instructions, kept separate from the subject values appended at runtime. */
export const REPORT_GENERATION_PROMPT = `Generate one complete OrionLabs report that conforms exactly to the supplied JSON schema.

Use the approved runtime fields as follows:
- Use the supplied first name for identity, natural direct address, and the closing verdict.
- Use the supplied zodiac sign to amplify supported patterns through celestial framing.
- Use age only when it strengthens an already supported observation. Never invent expected life milestones.
- Focus current-life analysis, forecast, relevant risks, and the recommendation on the supplied focus area.
- Derive broader patterns from the supplied behavioral statement instead of merely paraphrasing it.
- When optional context is present, treat it as the richest personalization evidence. Connect it to other supplied fields where genuinely supported.

CONTENT REQUIREMENTS
- Build a coherent analysis by connecting multiple supplied details where supported.
- Include exactly three personality traits, exactly three strengths, exactly three risks, and exactly three personalized metrics.
- Make strengths genuine enough to create contrast.
- Make risks aggressive, memorable, and evidence-grounded.
- Make the forecast absurd but grounded in the supplied evidence.
- Make the recommended action practically useful while remaining part of the roast.
- Put disproportionate creative effort into a highly memorable closing verdict.
- Metric values are integer percentages from 0 through 100. Metric interpretations are concise 2-4 word report-card notes.
- Return plain structured data only. Do not include Markdown, HTML, commentary, or fields outside the schema.`;

/** Adds only the approved generation boundary as data, never the questionnaire draft. */
export function buildReportGenerationPrompt(input: ReportGenerationInput) {
  return `${REPORT_GENERATION_PROMPT}\n\nAPPROVED SUBJECT DATA\n${JSON.stringify(input)}`;
}
