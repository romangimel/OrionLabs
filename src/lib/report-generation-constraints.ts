/** Shared limits enforced by both questionnaire controls and server validation. */
export const MAX_SUBJECT_NAME_LENGTH = 80;
export const MAX_ADDITIONAL_CONTEXT_LENGTH = 600;

/** Keeps newly typed or pasted context inside the product's hard UI boundary. */
export function limitAdditionalContextInput(value: string): string {
  return value.slice(0, MAX_ADDITIONAL_CONTEXT_LENGTH);
}
