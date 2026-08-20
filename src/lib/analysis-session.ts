import {
  clearQuestionnaireDraft,
  loadQuestionnaireDraft,
} from '@/lib/questionnaire-state';
import { clearAllSessionReports } from '@/lib/report-storage';

/** Clears an unfinished journey before a native internal link leaves the flow. */
export function clearIncompleteQuestionnaireForExit() {
  if (loadQuestionnaireDraft()?.status === 'in-progress') {
    return clearQuestionnaireDraft();
  }
  return true;
}

/**
 * Prepares an anchor-based analysis entry point while allowing the browser's
 * native link navigation to continue. Completed reports are intentionally
 * outside this cleanup boundary until a replacement report is persisted.
 */
export function prepareNewAnalysisJourney() {
  return clearQuestionnaireDraft();
}

/**
 * Clears every OrionLabs journey record. This is an administrative cleanup
 * utility, not a Begin Analysis or Start Another Analysis entry-point helper.
 */
export function resetAnalysisSession() {
  const draftCleared = clearQuestionnaireDraft();
  const reportsCleared = clearAllSessionReports();
  return draftCleared && reportsCleared;
}

/**
 * Starts a fresh questionnaire without disturbing the last completed report.
 * A new analysis may fail, so its temporary input state must not determine the
 * lifetime of the last known valid completed snapshot.
 */
export function startNewAnalysisJourney(destination = '/questionnaire') {
  if (prepareNewAnalysisJourney()) {
    window.location.assign(destination);
    return true;
  }

  return false;
}
