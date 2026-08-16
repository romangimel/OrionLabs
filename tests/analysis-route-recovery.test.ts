import { beforeEach, describe, expect, it } from 'vitest';
import { resolveAnalysisRouteDestination } from '@/lib/analysis-route';
import {
  getActiveReport,
  persistGeneratedReport,
} from '@/lib/report-storage';
import { createValidReport, validSignatureInput } from './fixtures';

class MemorySessionStorage implements Storage {
  private readonly values = new Map<string, string>();

  get length() {
    return this.values.size;
  }

  clear() {
    this.values.clear();
  }

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  key(index: number) {
    return [...this.values.keys()][index] ?? null;
  }

  removeItem(key: string) {
    this.values.delete(key);
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

const reportId = '123e4567-e89b-42d3-a456-426614174000';

beforeEach(() => {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { sessionStorage: new MemorySessionStorage() },
  });
});

describe('analysis route recovery', () => {
  it('sends a completed active report directly to /report without needing a draft', () => {
    const savedReport = persistGeneratedReport(
      reportId,
      createValidReport(),
      validSignatureInput,
      '2026-08-12T10:00:00.000Z',
    );

    expect(savedReport).not.toBeNull();
    expect(resolveAnalysisRouteDestination(Boolean(getActiveReport()), false)).toBe(
      '/report',
    );
    expect(getActiveReport()?.id).toBe(reportId);
  });

  it('keeps valid pending analysis state on /analysis when no report is completed', () => {
    expect(resolveAnalysisRouteDestination(false, true)).toBeNull();
  });

  it('keeps a valid pending analysis on /analysis while an earlier report remains active', () => {
    persistGeneratedReport(
      reportId,
      createValidReport(),
      validSignatureInput,
      '2026-08-12T10:00:00.000Z',
    );

    expect(resolveAnalysisRouteDestination(Boolean(getActiveReport()), true)).toBeNull();
    expect(getActiveReport()?.id).toBe(reportId);
  });

  it('recovers invalid analysis state through /questionnaire when no report is completed', () => {
    expect(resolveAnalysisRouteDestination(false, false)).toBe('/questionnaire');
  });

  it('continues to resolve direct /report access from a valid active v3 record', () => {
    persistGeneratedReport(
      reportId,
      createValidReport(),
      validSignatureInput,
      '2026-08-12T10:00:00.000Z',
    );

    expect(getActiveReport()?.report).toEqual(createValidReport());
  });
});
