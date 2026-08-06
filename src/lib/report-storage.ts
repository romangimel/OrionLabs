import type { OrionReport, ReportInsight } from '@/data/report';

const REPORT_SCHEMA_VERSION = 1;
const REPORT_STORAGE_PREFIX = 'orionlabs.report.v1.';
const ACTIVE_REPORT_ID_STORAGE_KEY = 'orionlabs.report.active.v1';
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Immutable completed output stored independently from temporary questionnaire progress. */
export interface SavedReport {
  id: string;
  createdAt: string;
  schemaVersion: 1;
  status: 'completed';
  subject: {
    name: string;
    zodiacSign: string;
  };
  report: OrionReport;
}

function reportStorageKey(id: string) {
  return `${REPORT_STORAGE_PREFIX}${id}`;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isReportInsight(value: unknown): value is ReportInsight {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const insight = value as Record<string, unknown>;
  return isNonEmptyString(insight.title) && isNonEmptyString(insight.description);
}

function isReportInsightArray(value: unknown): value is ReportInsight[] {
  return Array.isArray(value) && value.length === 3 && value.every(isReportInsight);
}

function isOrionReport(value: unknown): value is OrionReport {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const report = value as Record<string, unknown>;
  const subject = report.subject as Record<string, unknown> | undefined;
  const summary = report.summary as Record<string, unknown> | undefined;
  const personality = report.personalityAnalysis as Record<string, unknown> | undefined;
  const currentLife = report.currentLifeAnalysis as Record<string, unknown> | undefined;
  const recommendation = report.recommendedAction as Record<string, unknown> | undefined;
  const metrics = report.metrics;

  return Boolean(
    subject &&
      isNonEmptyString(subject.name) &&
      isNonEmptyString(subject.zodiacSign) &&
      summary &&
      isNonEmptyString(summary.headline) &&
      isNonEmptyString(summary.body) &&
      personality &&
      isNonEmptyString(personality.overview) &&
      isReportInsightArray(personality.traits) &&
      currentLife &&
      isNonEmptyString(currentLife.focusArea) &&
      isNonEmptyString(currentLife.headline) &&
      isNonEmptyString(currentLife.analysis) &&
      isNonEmptyString(currentLife.forecast) &&
      isReportInsightArray(report.strengths) &&
      isReportInsightArray(report.risks) &&
      recommendation &&
      isNonEmptyString(recommendation.title) &&
      isNonEmptyString(recommendation.description) &&
      Array.isArray(metrics) &&
      metrics.length === 3 &&
      metrics.every((metric) => {
        if (!metric || typeof metric !== 'object') {
          return false;
        }
        const item = metric as Record<string, unknown>;
        return (
          isNonEmptyString(item.id) &&
          isNonEmptyString(item.label) &&
          typeof item.value === 'number' &&
          Number.isFinite(item.value) &&
          isNonEmptyString(item.interpretation)
        );
      }) &&
      isNonEmptyString(report.closingVerdict)
  );
}

function isValidIsoTimestamp(value: unknown): value is string {
  if (typeof value !== 'string') {
    return false;
  }

  const timestamp = Date.parse(value);
  return !Number.isNaN(timestamp) && new Date(timestamp).toISOString() === value;
}

function isSavedReport(value: unknown): value is SavedReport {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const savedReport = value as Record<string, unknown>;
  const subject = savedReport.subject as Record<string, unknown> | undefined;

  return Boolean(
    typeof savedReport.id === 'string' &&
      UUID_PATTERN.test(savedReport.id) &&
      isValidIsoTimestamp(savedReport.createdAt) &&
      savedReport.schemaVersion === REPORT_SCHEMA_VERSION &&
      savedReport.status === 'completed' &&
      subject &&
      isNonEmptyString(subject.name) &&
      isNonEmptyString(subject.zodiacSign) &&
      isOrionReport(savedReport.report) &&
      subject.name === savedReport.report.subject.name &&
      subject.zodiacSign === savedReport.report.subject.zodiacSign,
  );
}

/** Generates the stable identifier shared by one analysis run and its report. */
export function createReportId() {
  return window.crypto.randomUUID();
}

/** Saves one complete report snapshot without exposing storage keys to components. */
export function saveReport(report: SavedReport): boolean {
  if (!isSavedReport(report)) {
    return false;
  }

  try {
    window.sessionStorage.setItem(reportStorageKey(report.id), JSON.stringify(report));
    return true;
  } catch {
    return false;
  }
}

/** Loads a complete report or removes that malformed OrionLabs-owned record. */
export function getReportById(id: string): SavedReport | null {
  if (!UUID_PATTERN.test(id)) {
    return null;
  }

  const storageKey = reportStorageKey(id);
  try {
    const storedReport = window.sessionStorage.getItem(storageKey);
    if (!storedReport) {
      return null;
    }

    const parsedReport: unknown = JSON.parse(storedReport);
    if (isSavedReport(parsedReport) && parsedReport.id === id) {
      return parsedReport;
    }

    window.sessionStorage.removeItem(storageKey);
    return null;
  } catch {
    try {
      window.sessionStorage.removeItem(storageKey);
    } catch {
      // There is no further cleanup available if session storage is blocked.
    }
    return null;
  }
}

export function setActiveReportId(id: string): boolean {
  if (!UUID_PATTERN.test(id)) {
    return false;
  }

  try {
    window.sessionStorage.setItem(ACTIVE_REPORT_ID_STORAGE_KEY, id);
    return true;
  } catch {
    return false;
  }
}

/** Resolves `/report` through the private active ID and cleans broken references. */
export function getActiveReport(): SavedReport | null {
  try {
    const activeReportId = window.sessionStorage.getItem(ACTIVE_REPORT_ID_STORAGE_KEY);
    if (!activeReportId || !UUID_PATTERN.test(activeReportId)) {
      if (activeReportId) {
        window.sessionStorage.removeItem(reportStorageKey(activeReportId));
      }
      window.sessionStorage.removeItem(ACTIVE_REPORT_ID_STORAGE_KEY);
      return null;
    }

    const report = getReportById(activeReportId);
    if (!report) {
      window.sessionStorage.removeItem(ACTIVE_REPORT_ID_STORAGE_KEY);
    }
    return report;
  } catch {
    return null;
  }
}

/** Clears all current-tab report records while preserving unrelated session data. */
export function clearAllSessionReports(): boolean {
  try {
    const reportKeys: string[] = [];
    for (let index = 0; index < window.sessionStorage.length; index += 1) {
      const key = window.sessionStorage.key(index);
      if (key?.startsWith(REPORT_STORAGE_PREFIX)) {
        reportKeys.push(key);
      }
    }

    reportKeys.forEach((key) => window.sessionStorage.removeItem(key));
    window.sessionStorage.removeItem(ACTIVE_REPORT_ID_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
