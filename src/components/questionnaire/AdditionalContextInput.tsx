import { useEffect, useReducer, useRef } from 'react';
import { LoaderCircle, Sparkles, Undo2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  ATTENTION_AREAS,
  BEHAVIORAL_STATEMENTS,
} from '@/data/questionnaire';
import { requestContextEnhancement } from '@/lib/context-enhancement-client';
import {
  INITIAL_CONTEXT_ENHANCEMENT_STATE,
  contextEnhancementReducer,
} from '@/lib/context-enhancement-state';
import {
  MAX_ADDITIONAL_CONTEXT_LENGTH,
  limitAdditionalContextInput,
} from '@/lib/report-generation-constraints';
import { getAdditionalContextLengthError } from '@/lib/questionnaire-validation';
import { cn } from '@/lib/utils';
import { QuestionHeader } from './QuestionHeader';

interface AdditionalContextInputProps {
  id: string;
  label: string;
  helper: string;
  placeholder: string;
  required: boolean;
  error?: string;
  value: string;
  focusArea: string;
  behavioralStatement: string;
  onChange: (value: string) => void;
}

const controlStyles =
  'border-[hsl(43_60%_70%_/_0.22)] bg-[hsl(264_45%_7%_/_0.58)] transition-[border-color,box-shadow,background-color] duration-300 hover:border-[hsl(43_60%_70%_/_0.34)] focus-within:border-[hsl(43_74%_66%_/_0.65)] focus-within:ring-2 focus-within:ring-[hsl(43_74%_66%_/_0.18)]';

function isAllowedValue<T extends string>(
  value: string,
  options: readonly T[],
): value is T {
  return options.includes(value as T);
}

/**
 * Owns the optional field's temporary request/Undo UX. Successful text still
 * flows through the questionnaire's ordinary controlled answer and persistence.
 */
export function AdditionalContextInput({
  id,
  label,
  helper,
  placeholder,
  required,
  error,
  value,
  focusArea,
  behavioralStatement,
  onChange,
}: AdditionalContextInputProps) {
  const [enhancementState, dispatch] = useReducer(
    contextEnhancementReducer,
    INITIAL_CONTEXT_ENHANCEMENT_STATE,
  );
  const requestPendingRef = useRef(false);
  const latestValueRef = useRef(value);
  const isMountedRef = useRef(true);

  useEffect(() => {
    latestValueRef.current = value;
  }, [value]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const helperId = `${id}-helper`;
  const limitId = `${id}-limit`;
  const validationError = error ?? getAdditionalContextLengthError(value);
  const validationErrorId = validationError ? `${id}-error` : null;
  const enhancementErrorId = enhancementState.error ? `${id}-enhancement-error` : null;
  const describedBy = [helperId, limitId, validationErrorId, enhancementErrorId]
    .filter(Boolean)
    .join(' ');
  const approvedFocusArea = isAllowedValue(focusArea, ATTENTION_AREAS)
    ? focusArea
    : null;
  const approvedBehavioralStatement = isAllowedValue(
    behavioralStatement,
    BEHAVIORAL_STATEMENTS,
  )
    ? behavioralStatement
    : null;
  const hasRequiredSelections =
    approvedFocusArea !== null && approvedBehavioralStatement !== null;
  const hasUserContext = value.trim().length > 0;
  const isOverLimit = value.length > MAX_ADDITIONAL_CONTEXT_LENGTH;
  const canEnhance =
    !enhancementState.isPending &&
    !isOverLimit &&
    (hasUserContext || hasRequiredSelections);
  const showsUndo = enhancementState.undoSnapshot !== null;

  const handleManualChange = (nextValue: string) => {
    const boundedValue = limitAdditionalContextInput(nextValue);
    latestValueRef.current = boundedValue;
    dispatch({ type: 'manual-edit' });
    onChange(boundedValue);
  };

  const handleEnhance = async () => {
    if (showsUndo) {
      const originalValue = enhancementState.undoSnapshot;
      if (originalValue === null) {
        return;
      }
      latestValueRef.current = originalValue;
      dispatch({ type: 'undo' });
      onChange(originalValue);
      return;
    }

    if (!canEnhance || requestPendingRef.current) {
      return;
    }

    const previousValue = value;
    const requestInput = previousValue.trim()
      ? {
          mode: 'enhance' as const,
          additionalContext: previousValue,
        }
      : approvedFocusArea !== null && approvedBehavioralStatement !== null
        ? {
            mode: 'generate' as const,
            focusArea: approvedFocusArea,
            behavioralStatement: approvedBehavioralStatement,
          }
        : null;

    if (requestInput === null) {
      return;
    }

    requestPendingRef.current = true;
    dispatch({ type: 'request-started' });

    try {
      const enhancedContext = await requestContextEnhancement(requestInput);

      if (!isMountedRef.current) {
        return;
      }

      // Never overwrite text the user changed while the optional request was pending.
      if (latestValueRef.current !== previousValue) {
        dispatch({ type: 'request-discarded' });
        return;
      }

      latestValueRef.current = enhancedContext;
      onChange(enhancedContext);
      dispatch({ type: 'request-succeeded', previousValue });
    } catch {
      if (isMountedRef.current) {
        dispatch({ type: 'request-failed' });
      }
    } finally {
      requestPendingRef.current = false;
    }
  };

  const buttonLabel = showsUndo
    ? 'Undo'
    : enhancementState.isPending
      ? 'Enhancing…'
      : 'Enhance with AI';

  return (
    <div>
      <QuestionHeader
        label={label}
        helper={helper}
        helperId={helperId}
        htmlFor={id}
        required={required}
      />

      <div
        className={cn(
          controlStyles,
          'relative mt-4 rounded-xl border [--context-action-width:6rem] sm:[--context-action-width:8.75rem]',
          validationError &&
            'border-[hsl(0_72%_62%_/_0.78)] focus-within:border-[hsl(0_72%_68%)] focus-within:ring-[hsl(0_72%_55%_/_0.24)]',
        )}
      >
        <button
          type="button"
          onClick={handleEnhance}
          disabled={!showsUndo && !canEnhance}
          aria-label={buttonLabel}
          aria-busy={enhancementState.isPending || undefined}
          title={
            !showsUndo && !hasUserContext && !hasRequiredSelections
              ? 'Complete the focus and behavioral questions before enhancing context.'
              : undefined
          }
          className="absolute right-3 top-3 z-10 inline-flex min-h-10 w-[var(--context-action-width)] items-center justify-center gap-1 rounded-full border border-[hsl(43_60%_70%_/_0.3)] bg-[hsl(264_45%_8%_/_0.92)] px-2 text-[0.68rem] font-medium leading-tight text-[hsl(43_74%_72%)] backdrop-blur-md transition-[border-color,color,background-color] duration-300 hover:border-[hsl(43_74%_70%_/_0.62)] hover:bg-[hsl(268_45%_12%_/_0.96)] hover:text-[hsl(43_82%_80%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.72)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(264_45%_8%)] disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-9 sm:gap-1.5 sm:px-2.5 sm:text-xs sm:leading-normal sm:whitespace-nowrap"
        >
          {enhancementState.isPending ? (
            <LoaderCircle
              aria-hidden="true"
              className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none"
            />
          ) : showsUndo ? (
            <Undo2 aria-hidden="true" className="h-3.5 w-3.5" />
          ) : (
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
          )}
          <span>{buttonLabel}</span>
        </button>

        <Textarea
          id={id}
          name={id}
          placeholder={placeholder}
          required={required}
          maxLength={MAX_ADDITIONAL_CONTEXT_LENGTH}
          aria-invalid={validationError ? true : undefined}
          aria-describedby={describedBy}
          value={value}
          onChange={(event) => handleManualChange(event.target.value)}
          onBlur={(event) => onChange(event.currentTarget.value)}
          className={cn(
            'min-h-32 resize-none rounded-xl border-0 bg-transparent pb-9 pl-4 pr-[calc(var(--context-action-width)+1rem)] pt-3 text-base leading-5 text-foreground shadow-none placeholder:text-sm placeholder:leading-4 placeholder:text-muted-foreground/55 focus-visible:ring-0 sm:min-h-36 sm:pr-[calc(var(--context-action-width)+1.5rem)] sm:placeholder:text-base sm:placeholder:leading-5',
            value.length > 0 ? 'overflow-y-auto' : 'overflow-y-hidden',
          )}
        />

        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute bottom-3 right-3 z-10 text-[0.68rem] tabular-nums text-muted-foreground/70',
            isOverLimit && 'text-[hsl(0_72%_72%)]',
          )}
        >
          {value.length}/{MAX_ADDITIONAL_CONTEXT_LENGTH}
        </span>
        <span id={limitId} className="sr-only">
          Maximum {MAX_ADDITIONAL_CONTEXT_LENGTH} characters.
        </span>
      </div>

      {validationError && (
        <div className="mt-2 min-h-5">
          <p id={`${id}-error`} className="text-sm leading-5 text-[hsl(0_72%_72%)]">
            {validationError}
          </p>
        </div>
      )}
      {enhancementState.error && (
        <p
          id={`${id}-enhancement-error`}
          role="alert"
          className="mt-2 text-sm leading-5 text-[hsl(326_65%_74%)]"
        >
          {enhancementState.error}
        </p>
      )}
    </div>
  );
}
