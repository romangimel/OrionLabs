import { mockReport, type OrionReport } from '@/data/report';
import type { ReportGenerationInput } from '@/lib/report-generation-input';

export const validGenerationInput: ReportGenerationInput = {
  subject: {
    name: 'Maya',
    zodiacSign: 'Capricorn',
    age: 32,
  },
  focusArea: 'Career',
  behavioralStatement: 'I overthink things',
  additionalContext: 'I keep revising two project ideas instead of choosing one.',
};

export function createValidReport(): OrionReport {
  return structuredClone(mockReport);
}
