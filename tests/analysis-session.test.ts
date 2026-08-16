import { beforeEach, describe, expect, it } from 'vitest';
import { startNewAnalysisJourney } from '@/lib/analysis-session';
import {
  createQuestionnaireDraft,
  createQuestionnaireState,
  loadQuestionnaireDraft,
  saveQuestionnaireDraft,
} from '@/lib/questionnaire-state';
import { getActiveReport, persistGeneratedReport } from '@/lib/report-storage';
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

describe('new analysis session', () => {
  let destination = '';

  beforeEach(() => {
    destination = '';
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: {
        location: {
          assign: (nextDestination: string) => {
            destination = nextDestination;
          },
        },
        sessionStorage: new MemorySessionStorage(),
      },
    });
  });

  it('resets the questionnaire draft without deleting the active completed report', () => {
    persistGeneratedReport(
      reportId,
      createValidReport(),
      validSignatureInput,
      '2026-08-09T10:00:00.000Z',
    );
    saveQuestionnaireDraft(createQuestionnaireDraft(createQuestionnaireState()));

    expect(startNewAnalysisJourney()).toBe(true);
    expect(destination).toBe('/questionnaire');
    expect(loadQuestionnaireDraft()).toBeNull();
    expect(getActiveReport()?.id).toBe(reportId);
  });
});
