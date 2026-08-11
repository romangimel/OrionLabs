import { beforeEach, describe, expect, it } from 'vitest';
import type { OrionReport } from '@/data/report';
import { QUESTIONNAIRE_DRAFT_STORAGE_KEY } from '@/lib/questionnaire-state';
import {
  getActiveReport,
  persistGeneratedReport,
} from '@/lib/report-storage';
import { createSubjectSignature } from '@/lib/subject-signature';
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

describe('generated report persistence', () => {
  it('stores a valid report and makes it active', () => {
    const savedReport = persistGeneratedReport(
      reportId,
      createValidReport(),
      validSignatureInput,
      '2026-08-09T10:00:00.000Z',
    );

    expect(savedReport?.id).toBe(reportId);
    expect(getActiveReport()?.report).toEqual(createValidReport());
  });

  it('does not store malformed output or clear questionnaire answers', () => {
    window.sessionStorage.setItem(QUESTIONNAIRE_DRAFT_STORAGE_KEY, 'preserved-draft');
    const malformedReport = createValidReport();
    malformedReport.metrics[0].value = 101;

    expect(
      persistGeneratedReport(
        reportId,
        malformedReport as OrionReport,
        validSignatureInput,
      ),
    ).toBeNull();
    expect(getActiveReport()).toBeNull();
    expect(window.sessionStorage.getItem(QUESTIONNAIRE_DRAFT_STORAGE_KEY)).toBe(
      'preserved-draft',
    );
  });

  it('preserves signature behavior explicitly instead of reconstructing it from prose', () => {
    const report = createValidReport();
    report.personalityAnalysis.traits[0].title = 'Entirely unrelated generated title';

    const savedReport = persistGeneratedReport(
      reportId,
      report,
      validSignatureInput,
      '2026-08-09T10:00:00.000Z',
    );

    expect(savedReport?.signatureInputs.behavioralStatement).toBe(
      'I overthink things',
    );
    expect(
      createSubjectSignature(savedReport!.signatureInputs).behavioralStatement,
    ).toBe('I overthink things');
  });
});
