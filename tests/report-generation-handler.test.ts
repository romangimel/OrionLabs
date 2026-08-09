import { afterEach, describe, expect, it, vi } from 'vitest';
import { createReportGenerationHandler } from '../server/report-generation-handler';
import { createValidReport, validGenerationInput } from './fixtures';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

function createRequest(body: unknown, method = 'POST') {
  return new Request('https://orionlabs.test/api/generate-report', {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(method === 'POST' ? { body: JSON.stringify(body) } : {}),
  });
}

describe('report-generation HTTP handler', () => {
  it('accepts valid input and returns the generated report', async () => {
    const generateReport = vi.fn().mockResolvedValue(createValidReport());
    const response = await createReportGenerationHandler(generateReport)(
      createRequest(validGenerationInput),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ report: createValidReport() });
    expect(generateReport).toHaveBeenCalledWith(validGenerationInput);
  });

  it('rejects invalid or expanded input before provider generation', async () => {
    const generateReport = vi.fn();
    const response = await createReportGenerationHandler(generateReport)(
      createRequest({ ...validGenerationInput, pronouns: 'They / Them' }),
    );

    expect(response.status).toBe(400);
    expect(generateReport).not.toHaveBeenCalled();
  });

  it('accepts only POST', async () => {
    const response = await createReportGenerationHandler()(createRequest(undefined, 'GET'));
    expect(response.status).toBe(405);
    expect(response.headers.get('allow')).toBe('POST');
  });

  it('rejects oversized requests before generation', async () => {
    const generateReport = vi.fn();
    const response = await createReportGenerationHandler(generateReport)(
      createRequest({ ...validGenerationInput, padding: 'x'.repeat(20_000) }),
    );

    expect(response.status).toBe(413);
    expect(generateReport).not.toHaveBeenCalled();
  });

  it('returns a safe configuration error when the server key is absent', async () => {
    vi.stubEnv('GEMINI_API_KEY', '');
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const response = await createReportGenerationHandler()(createRequest(validGenerationInput));
    const payload = await response.json();

    expect(response.status).toBe(503);
    expect(payload).toEqual({
      error: {
        code: 'SERVICE_NOT_CONFIGURED',
        message: 'Report generation is not configured for this environment.',
      },
    });
  });
});
