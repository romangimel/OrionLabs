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
 * Clears the complete prototype session for entry points that intentionally
 * discard every local OrionLabs result. The report page's restart action does
 * not use this helper because a replacement report has not succeeded yet.
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
  if (clearQuestionnaireDraft()) {
    window.location.assign(destination);
    return true;
  }

  return false;
}
