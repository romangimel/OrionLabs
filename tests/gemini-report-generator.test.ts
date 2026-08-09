import { ApiError } from '@google/genai';
import { describe, expect, it, vi } from 'vitest';
import { generateReportWithRetry } from '../server/gemini-report-generator';
import { createValidReport, validGenerationInput } from './fixtures';

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
});
