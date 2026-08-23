export const CONTEXT_ENHANCEMENT_ERROR_MESSAGE =
  'Enhancement unavailable. Your text was not changed.';

export interface ContextEnhancementState {
  isPending: boolean;
  undoSnapshot: string | null;
  error: string;
}

export type ContextEnhancementAction =
  | { type: 'request-started' }
  | { type: 'request-succeeded'; previousValue: string }
  | { type: 'request-discarded' }
  | { type: 'request-failed' }
  | { type: 'manual-edit' }
  | { type: 'undo' };

export const INITIAL_CONTEXT_ENHANCEMENT_STATE: ContextEnhancementState = {
  isPending: false,
  undoSnapshot: null,
  error: '',
};

/** Temporary UI state only; the enhanced text itself remains ordinary answer state. */
export function contextEnhancementReducer(
  state: ContextEnhancementState,
  action: ContextEnhancementAction,
): ContextEnhancementState {
  switch (action.type) {
    case 'request-started':
      return state.isPending
        ? state
        : { isPending: true, undoSnapshot: null, error: '' };
    case 'request-succeeded':
      return {
        isPending: false,
        undoSnapshot: action.previousValue,
        error: '',
      };
    case 'request-discarded':
      return INITIAL_CONTEXT_ENHANCEMENT_STATE;
    case 'request-failed':
      return {
        isPending: false,
        undoSnapshot: null,
        error: CONTEXT_ENHANCEMENT_ERROR_MESSAGE,
      };
    case 'manual-edit':
      return { isPending: state.isPending, undoSnapshot: null, error: '' };
    case 'undo':
      return INITIAL_CONTEXT_ENHANCEMENT_STATE;
  }
}
