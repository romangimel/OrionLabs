import type { OrionReport } from '@/data/report';
import type { ReportGenerationInput } from '@/lib/report-generation-input';
import { orionReportSchema } from '@/lib/report-schemas';

const pendingRequests = new Map<string, Promise<OrionReport>>();

export class ReportGenerationRequestError extends Error {}

async function postReportGenerationInput(
  input: ReportGenerationInput,
): Promise<OrionReport> {
  let response: Response;
  try {
    response = await fetch('/api/generate-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
  } catch {
    throw new ReportGenerationRequestError('The report service could not be reached.');
  }

  if (!response.ok) {
    throw new ReportGenerationRequestError('The report service rejected the request.');
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new ReportGenerationRequestError('The report service returned invalid data.');
  }

  const result = orionReportSchema.safeParse(
    payload && typeof payload === 'object'
      ? (payload as Record<string, unknown>).report
      : undefined,
  );
  if (!result.success) {
    throw new ReportGenerationRequestError('The generated report was malformed.');
  }

  return result.data;
}

/** Shares a pending request across React Strict Mode effect replays. */
export function requestGeneratedReport(
  input: ReportGenerationInput,
  requestKey: string,
): Promise<OrionReport> {
  const existingRequest = pendingRequests.get(requestKey);
  if (existingRequest) {
    return existingRequest;
  }

  const request = postReportGenerationInput(input).finally(() => {
    pendingRequests.delete(requestKey);
  });
  pendingRequests.set(requestKey, request);
  return request;
}
