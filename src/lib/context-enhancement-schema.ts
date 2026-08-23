import { z } from 'zod';
import {
  ATTENTION_AREAS,
  BEHAVIORAL_STATEMENTS,
} from '../data/questionnaire.js';
import { MAX_ADDITIONAL_CONTEXT_LENGTH } from './report-generation-constraints.js';

/** Rewriting receives only user-authored context; generation receives only selections. */
export const contextEnhancementInputSchema = z.discriminatedUnion('mode', [
  z
    .object({
      mode: z.literal('enhance'),
      additionalContext: z
        .string()
        .max(MAX_ADDITIONAL_CONTEXT_LENGTH)
        .refine((value) => value.trim().length > 0),
    })
    .strict(),
  z
    .object({
      mode: z.literal('generate'),
      focusArea: z.enum(ATTENTION_AREAS),
      behavioralStatement: z.enum(BEHAVIORAL_STATEMENTS),
    })
    .strict(),
]);

export type ContextEnhancementInput = z.infer<
  typeof contextEnhancementInputSchema
>;

export const contextEnhancementResponseSchema = z
  .object({
    enhancedContext: z.string().min(1).max(MAX_ADDITIONAL_CONTEXT_LENGTH),
  })
  .strict();
