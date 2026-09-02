import { createReportGenerationHandler } from '../server/report-generation-handler.js';

export const maxDuration = 120;

export default {
  fetch: createReportGenerationHandler(),
};
