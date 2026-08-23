import { z } from 'zod';
import {
  ATTENTION_AREAS,
  BEHAVIORAL_STATEMENTS,
  type AttentionArea,
  type BehavioralStatement,
} from '../data/questionnaire.js';
import { MAX_ADDITIONAL_CONTEXT_LENGTH } from './report-generation-constraints.js';

/** The deliberately minimal questionnaire data accepted by context enhancement. */
export interface ContextEnhancementInput {
  focusArea: AttentionArea;
  behavioralStatement: BehavioralStatement;
  additionalContext: string;
}

export const contextEnhancementInputSchema: z.ZodType<ContextEnhancementInput> = z
  .object({
    focusArea: z.enum(ATTENTION_AREAS),
    behavioralStatement: z.enum(BEHAVIORAL_STATEMENTS),
    additionalContext: z.string().max(MAX_ADDITIONAL_CONTEXT_LENGTH),
  })
  .strict();

export const contextEnhancementResponseSchema = z
  .object({
    enhancedContext: z.string().min(1).max(MAX_ADDITIONAL_CONTEXT_LENGTH),
  })
  .strict();
