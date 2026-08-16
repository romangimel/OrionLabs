import type { OrionReport } from '@/data/report';
import { orionReportSchema } from '@/lib/report-schemas';
import {
  isSubjectSignatureInput,
  type SubjectSignatureInput,
} from '@/lib/subject-signature';

const REPORT_SCHEMA_VERSION = 3;
const REPORT_STORAGE_PREFIX = 'orionlabs.report.v3.';
const ACTIVE_REPORT_ID_STORAGE_KEY = 'orionlabs.report.active.v3';
const LEGACY_REPORT_STORAGE_PREFIXES = [
  'orionlabs.report.v1.',
  'orionlabs.report.v2.',
] as const;
const LEGACY_ACTIVE_REPORT_ID_STORAGE_KEYS = [
  'orionlabs.report.active.v1',
  'orionlabs.report.active.v2',
] as const;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Immutable completed output stored independently from temporary questionnaire progress. */
export interface SavedReport {
  id: string;
  createdAt: string;
  schemaVersion: 3;
  status: 'completed';
  subject: {
    name: string;
    zodiacSign: string;
    age: number;
  };
  signatureInputs: SubjectSignatureInput;
  report: OrionReport;
}

function reportStorageKey(id: string) {
  return `${REPORT_STORAGE_PREFIX}${id}`;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isOrionReport(value: unknown): value is OrionReport {
  return orionReportSchema.safeParse(value).success;
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
      typeof subject.age === 'number' &&
      Number.isInteger(subject.age) &&
      subject.age >= 0 &&
      isSubjectSignatureInput(savedReport.signatureInputs) &&
      isOrionReport(savedReport.report) &&
      subject.name === savedReport.report.subject.name &&
      subject.zodiacSign === savedReport.report.subject.zodiacSign &&
      subject.age === savedReport.report.subject.age,
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

/**
 * Persists one generated report before changing the active pointer. This keeps
 * the prior completed snapshot recoverable if validation or storage fails.
 */
export function persistGeneratedReport(
  id: string,
  report: OrionReport,
  signatureInputs: SubjectSignatureInput,
  createdAt = new Date().toISOString(),
): SavedReport | null {
  const existingReport = getReportById(id);
  if (existingReport) {
    return setActiveReportId(existingReport.id) ? existingReport : null;
  }

  const savedReport: SavedReport = {
    id,
    createdAt,
    schemaVersion: 3,
    status: 'completed',
    subject: { ...report.subject },
    signatureInputs: { ...signatureInputs },
    report,
  };

  return saveReport(savedReport) && setActiveReportId(id) ? savedReport : null;
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

/** Clears current and superseded OrionLabs report records without touching unrelated data. */
export function clearAllSessionReports(): boolean {
  try {
    const reportKeys: string[] = [];
    for (let index = 0; index < window.sessionStorage.length; index += 1) {
      const key = window.sessionStorage.key(index);
      if (
        key?.startsWith(REPORT_STORAGE_PREFIX) ||
        LEGACY_REPORT_STORAGE_PREFIXES.some((prefix) => key?.startsWith(prefix))
      ) {
        reportKeys.push(key!);
      }
    }

    reportKeys.forEach((key) => window.sessionStorage.removeItem(key));
    window.sessionStorage.removeItem(ACTIVE_REPORT_ID_STORAGE_KEY);
    LEGACY_ACTIVE_REPORT_ID_STORAGE_KEYS.forEach((key) =>
      window.sessionStorage.removeItem(key),
    );
    return true;
  } catch {
    return false;
  }
}
