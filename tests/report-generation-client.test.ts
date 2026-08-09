import { afterEach, describe, expect, it, vi } from 'vitest';
import { requestGeneratedReport } from '@/lib/report-generation-client';
import { createValidReport, validGenerationInput } from './fixtures';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('browser report-generation request', () => {
  it('sends only the approved input and validates a successful response', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      Response.json({ report: createValidReport() }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await expect(
      requestGeneratedReport(validGenerationInput, 'successful-run'),
    ).resolves.toEqual(createValidReport());

    const requestBody = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(requestBody).toEqual(validGenerationInput);
    expect(requestBody).not.toHaveProperty('birthDate');
    expect(requestBody).not.toHaveProperty('pronouns');
  });

  it('shares a pending request and rejects malformed reports', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      Response.json({ report: { incomplete: true } }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const firstRequest = requestGeneratedReport(validGenerationInput, 'shared-run');
    const secondRequest = requestGeneratedReport(validGenerationInput, 'shared-run');

    await expect(Promise.all([firstRequest, secondRequest])).rejects.toThrow();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
