import { ApiError } from '@google/genai';
import { describe, expect, it, vi } from 'vitest';
import {
  GeminiCapacityExhaustedError,
  generateReportWithRetry,
} from '../server/gemini-report-generator';
import { createValidReport, validGenerationInput } from './fixtures';

function createInteractionsProviderError(status: number, name: string) {
  return Object.assign(new Error('Private provider detail'), {
    name,
    status,
    statusCode: status,
  });
}

describe('Gemini retry policy', () => {
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

  it('still retries a transient provider failure once', async () => {
    const generateCandidate = vi
      .fn()
      .mockRejectedValueOnce(
        createInteractionsProviderError(503, 'InternalServerError'),
      )
      .mockResolvedValueOnce(createValidReport());

    await expect(
      generateReportWithRetry(validGenerationInput, generateCandidate),
    ).resolves.toEqual(createValidReport());
    expect(generateCandidate).toHaveBeenCalledTimes(2);
  });
});
