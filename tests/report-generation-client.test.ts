import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  ReportGenerationRequestError,
  requestGeneratedReport,
} from '@/lib/report-generation-client';
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
    expect(fetchMock.mock.calls[0][1].headers).toEqual({
      'Content-Type': 'application/json',
    });
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

  it('recognizes the semantic capacity error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        Response.json(
          {
            error: {
              code: 'ANALYSIS_CAPACITY_EXHAUSTED',
              message: 'Analysis capacity is temporarily unavailable.',
            },
          },
          { status: 429 },
        ),
      ),
    );

    const request = requestGeneratedReport(validGenerationInput, 'capacity-run');
    await expect(request).rejects.toMatchObject<Partial<ReportGenerationRequestError>>({
      kind: 'capacity',
    });
  });

  it('handles a plain Vercel Firewall 429 without parsing failure or draft loss', async () => {
    const savedDraft = '{"version":1,"answers":"preserved"}';
    const sessionStorage = new Map([['orionlabs.questionnaire.draft.v1', savedDraft]]);
    vi.stubGlobal('window', {
      sessionStorage: {
        getItem: (key: string) => sessionStorage.get(key) ?? null,
      },
    });
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response('Too many requests', {
          status: 429,
          headers: { 'Content-Type': 'text/plain' },
        }),
      ),
    );

    const request = requestGeneratedReport(validGenerationInput, 'firewall-run');
    await expect(request).rejects.toMatchObject<Partial<ReportGenerationRequestError>>({
      kind: 'capacity',
    });
    expect(window.sessionStorage.getItem('orionlabs.questionnaire.draft.v1')).toBe(
      savedDraft,
    );
  });
});
