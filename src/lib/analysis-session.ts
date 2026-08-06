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

/** Clears every OrionLabs-owned key that belongs to the current prototype run. */
export function resetAnalysisSession() {
  const draftCleared = clearQuestionnaireDraft();
  const reportsCleared = clearAllSessionReports();
  return draftCleared && reportsCleared;
}

/** Starts the current single-report prototype from a completely clean local state. */
export function startNewAnalysisJourney(destination = '/questionnaire') {
  if (resetAnalysisSession()) {
    window.location.assign(destination);
    return true;
  }

  return false;
}
