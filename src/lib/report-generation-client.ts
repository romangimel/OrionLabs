import type { OrionReport } from '@/data/report';
import type { ReportGenerationInput } from '@/lib/report-generation-input';
import {
  ANALYSIS_CAPACITY_EXHAUSTED_CODE,
  getReportGenerationErrorCode,
} from '@/lib/report-generation-errors';
import { orionReportSchema } from '@/lib/report-schemas';

const pendingRequests = new Map<string, Promise<OrionReport>>();

export type ReportGenerationFailureKind = 'capacity' | 'generic';

export class ReportGenerationRequestError extends Error {
  constructor(
    message: string,
    readonly kind: ReportGenerationFailureKind = 'generic',
  ) {
    super(message);
    this.name = 'ReportGenerationRequestError';
  }
}

async function readJsonPayload(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

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
    const errorPayload = await readJsonPayload(response);
    const errorCode = getReportGenerationErrorCode(errorPayload);
    if (
      errorCode === ANALYSIS_CAPACITY_EXHAUSTED_CODE ||
      response.status === 429
    ) {
      // A plain 429 may come from Vercel Firewall before the Function runs, so
      // the browser treats it as broad temporary capacity without assuming a source.
      throw new ReportGenerationRequestError(
        'Analysis capacity is temporarily unavailable.',
        'capacity',
      );
    }

    throw new ReportGenerationRequestError('The report service rejected the request.');
  }

  const payload = await readJsonPayload(response);
  if (payload === null) {
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
