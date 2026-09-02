import { ApiError, GoogleGenAI } from '@google/genai';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { maxDuration } from '../api/generate-report';
import {
  GeminiCapacityExhaustedError,
  generateGeminiReport,
  generateReportWithRetry,
} from '../server/gemini-report-generator';
import { createValidReport, validGenerationInput } from './fixtures';

const { interactionsCreate } = vi.hoisted(() => ({
  interactionsCreate: vi.fn(),
}));

vi.mock('@google/genai', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@google/genai')>();

  return {
    ...actual,
    GoogleGenAI: vi.fn(function GoogleGenAIMock() {
      return { interactions: { create: interactionsCreate } };
    }),
  };
});

function createInteractionsProviderError(status: number, name: string) {
  return Object.assign(new Error('Private provider detail'), {
    name,
    status,
    statusCode: status,
  });
}

function createConnectionTimeoutError() {
  return Object.assign(new Error('Private provider detail'), {
    name: 'APIConnectionTimeoutError',
  });
}

beforeEach(() => {
  interactionsCreate.mockReset();
  vi.mocked(GoogleGenAI).mockClear();
  vi.stubEnv('GEMINI_API_KEY', 'test-api-key');
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('Gemini retry policy', () => {
  it('configures the Vercel Function for the 120-second execution budget', () => {
    expect(maxDuration).toBe(120);
  });

  it('retries malformed output once and then accepts a valid report', async () => {
    const generateCandidate = vi
      .fn()
      .mockResolvedValueOnce({ incomplete: true })
      .mockResolvedValueOnce(createValidReport());

    await expect(
      generateReportWithRetry(validGenerationInput, generateCandidate),
    ).resolves.toEqual(createValidReport());
    expect(generateCandidate).toHaveBeenCalledTimes(2);
  });

  it('never exceeds two attempts', async () => {
    const generateCandidate = vi.fn().mockResolvedValue({ incomplete: true });

    await expect(
      generateReportWithRetry(validGenerationInput, generateCandidate),
    ).rejects.toBeTruthy();
    expect(generateCandidate).toHaveBeenCalledTimes(2);
  });

  it('does not retry a permanent provider rejection', async () => {
    const generateCandidate = vi
      .fn()
      .mockRejectedValue(new ApiError({ status: 401, message: 'Unauthorized' }));

    await expect(
      generateReportWithRetry(validGenerationInput, generateCandidate),
    ).rejects.toBeInstanceOf(ApiError);
    expect(generateCandidate).toHaveBeenCalledTimes(1);
  });

  it('classifies provider capacity exhaustion without an immediate second attempt', async () => {
    const generateCandidate = vi.fn().mockRejectedValue(
      createInteractionsProviderError(429, 'RateLimitError'),
    );

    await expect(
      generateReportWithRetry(validGenerationInput, generateCandidate),
    ).rejects.toBeInstanceOf(GeminiCapacityExhaustedError);
    expect(generateCandidate).toHaveBeenCalledTimes(1);
  });

  it('still retries a sufficiently fast transient provider failure once', async () => {
    const generateCandidate = vi
      .fn()
      .mockRejectedValueOnce(
        createInteractionsProviderError(503, 'InternalServerError'),
      )
      .mockResolvedValueOnce(createValidReport());
    const getCurrentTime = vi.fn().mockReturnValueOnce(0).mockReturnValueOnce(20_000);

    await expect(
      generateReportWithRetry(validGenerationInput, generateCandidate, getCurrentTime),
    ).resolves.toEqual(createValidReport());
    expect(generateCandidate).toHaveBeenCalledTimes(2);
  });

  it('does not retry an SDK connection timeout', async () => {
    const generateCandidate = vi.fn().mockRejectedValue(createConnectionTimeoutError());
    const getCurrentTime = vi.fn().mockReturnValueOnce(0).mockReturnValueOnce(90_000);

    await expect(
      generateReportWithRetry(validGenerationInput, generateCandidate, getCurrentTime),
    ).rejects.toMatchObject({ name: 'APIConnectionTimeoutError' });
    expect(generateCandidate).toHaveBeenCalledTimes(1);
  });

  it('does not retry a late transient failure when another full provider attempt cannot fit', async () => {
    const generateCandidate = vi.fn().mockRejectedValue(
      createInteractionsProviderError(503, 'InternalServerError'),
    );
    const getCurrentTime = vi.fn().mockReturnValueOnce(0).mockReturnValueOnce(20_001);

    await expect(
      generateReportWithRetry(validGenerationInput, generateCandidate, getCurrentTime),
    ).rejects.toMatchObject({ status: 503 });
    expect(generateCandidate).toHaveBeenCalledTimes(1);
  });
});

describe('Gemini Interactions retry boundary', () => {
  const successfulInteraction = () => ({
    output_text: JSON.stringify(createValidReport()),
  });

  it('makes one provider call for a successful application attempt', async () => {
    interactionsCreate.mockResolvedValueOnce(successfulInteraction());

    await expect(generateGeminiReport(validGenerationInput)).resolves.toEqual(
      createValidReport(),
    );

    expect(GoogleGenAI).toHaveBeenCalledWith({ apiKey: 'test-api-key' });
    expect(interactionsCreate).toHaveBeenCalledTimes(1);
    expect(interactionsCreate.mock.calls[0]?.[0]).toEqual(
      expect.objectContaining({
        model: 'gemini-3.6-flash',
        generation_config: { thinking_level: 'medium' },
      }),
    );
    expect(interactionsCreate.mock.calls[0]?.[1]).toEqual({
      timeout: 90_000,
      maxRetries: 0,
    });
  });

  it('surfaces capacity after one provider call', async () => {
    interactionsCreate.mockRejectedValueOnce(
      createInteractionsProviderError(429, 'RateLimitError'),
    );

    await expect(generateGeminiReport(validGenerationInput)).rejects.toBeInstanceOf(
      GeminiCapacityExhaustedError,
    );
    expect(interactionsCreate).toHaveBeenCalledTimes(1);
  });

  it('uses one provider call for each intentional transient attempt', async () => {
    interactionsCreate
      .mockRejectedValueOnce(createInteractionsProviderError(503, 'InternalServerError'))
      .mockResolvedValueOnce(successfulInteraction());

    await expect(generateGeminiReport(validGenerationInput)).resolves.toEqual(
      createValidReport(),
    );
    expect(interactionsCreate).toHaveBeenCalledTimes(2);
    expect(interactionsCreate.mock.calls.map((call) => call[1])).toEqual([
      { timeout: 90_000, maxRetries: 0 },
      { timeout: 90_000, maxRetries: 0 },
    ]);
  });

  it('uses one provider call for each intentional malformed-output attempt', async () => {
    interactionsCreate
      .mockResolvedValueOnce({ output_text: JSON.stringify({ incomplete: true }) })
      .mockResolvedValueOnce(successfulInteraction());

    await expect(generateGeminiReport(validGenerationInput)).resolves.toEqual(
      createValidReport(),
    );
    expect(interactionsCreate).toHaveBeenCalledTimes(2);
  });
});
