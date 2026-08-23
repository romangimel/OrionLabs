import { createContextEnhancementHandler } from '../server/context-enhancement-handler.js';

export const maxDuration = 10;

export default {
  fetch: createContextEnhancementHandler(),
};
