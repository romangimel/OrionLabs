import { createReportGenerationHandler } from '../server/report-generation-handler';

export const maxDuration = 60;

export default {
  fetch: createReportGenerationHandler(),
};
