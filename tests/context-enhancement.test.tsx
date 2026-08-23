import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AdditionalContextInput } from '@/components/questionnaire/AdditionalContextInput';
import { requestContextEnhancement } from '@/lib/context-enhancement-client';
import {
  CONTEXT_ENHANCEMENT_ERROR_MESSAGE,
  INITIAL_CONTEXT_ENHANCEMENT_STATE,
  contextEnhancementReducer,
} from '@/lib/context-enhancement-state';
import { MAX_ADDITIONAL_CONTEXT_LENGTH } from '@/lib/report-generation-constraints';

afterEach(() => {
  vi.unstubAllGlobals();
});

function renderContextInput(value: string) {
  return renderToStaticMarkup(
    <AdditionalContextInput
      id="additional-context"
      label="Tell us more about yourself"
      helper="Optional context helper"
      placeholder="Optional context"
      required={false}
      value={value}
      focusArea="Career"
      behavioralStatement="I overthink things"
      onChange={() => undefined}
    />,
  );
}

describe('additional-context Enhance UX', () => {
  it('keeps Enhance with AI visible for empty and populated context', () => {
    expect(renderContextInput('')).toContain('Enhance with AI');
    expect(renderContextInput('My exact current context.')).toContain(
      'Enhance with AI',
    );
  });

  it('renders the internal counter and 600-character textarea boundary', () => {
    const markup = renderContextInput('x'.repeat(247));

    expect(markup).toContain('247/600');
    expect(markup).toContain('maxLength="600"');
    expect(MAX_ADDITIONAL_CONTEXT_LENGTH).toBe(600);
  });

  it('preserves and clearly marks an already-persisted over-limit value', () => {
    const overLimitValue = 'x'.repeat(MAX_ADDITIONAL_CONTEXT_LENGTH + 1);
    const markup = renderContextInput(overLimitValue);

    expect(markup).toContain(overLimitValue);
    expect(markup).toContain('601/600');
    expect(markup).toContain('aria-invalid="true"');
    expect(markup).toContain('Please keep additional context within 600 characters.');
  });
});

describe('context-enhancement browser request', () => {
  it('sends empty context with only focus and behavior', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      Response.json({ enhancedContext: 'I revisit career choices repeatedly.' }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await requestContextEnhancement({
      focusArea: 'Career',
      behavioralStatement: 'I overthink things',
      additionalContext: '',
    });

    expect(JSON.parse(fetchMock.mock.calls[0][1].body as string)).toEqual({
      focusArea: 'Career',
      behavioralStatement: 'I overthink things',
      additionalContext: '',
    });
  });

  it('sends exact populated context and strips accidental extra caller data', async () => {
    const originalContext = '  I keep revisiting the same decision.  ';
    const fetchMock = vi.fn().mockResolvedValue(
      Response.json({ enhancedContext: 'I keep revisiting the same decision.' }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const expandedInput = {
      focusArea: 'Career',
      behavioralStatement: 'I overthink things',
      additionalContext: originalContext,
      firstName: 'Must not be sent',
      zodiacSign: 'Capricorn',
      birthDate: '1994-01-15',
      age: 32,
      gender: 'Must not be sent',
      referencePreference: 'They / Them',
      report: { id: 'Must not be sent' },
    } as const;

    await requestContextEnhancement(expandedInput);

    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(body).toEqual({
      focusArea: 'Career',
      behavioralStatement: 'I overthink things',
      additionalContext: originalContext,
    });
    expect(Object.keys(body)).toEqual([
      'focusArea',
      'behavioralStatement',
      'additionalContext',
    ]);
  });
});

describe('context-enhancement temporary state', () => {
  it('blocks duplicate request transitions while pending', () => {
    const pending = contextEnhancementReducer(INITIAL_CONTEXT_ENHANCEMENT_STATE, {
      type: 'request-started',
    });

    expect(pending.isPending).toBe(true);
    expect(contextEnhancementReducer(pending, { type: 'request-started' })).toBe(
      pending,
    );
  });

  it('captures exact populated text for Undo after success', () => {
    const original = '  Exact original text.  ';
    const succeeded = contextEnhancementReducer(
      { isPending: true, undoSnapshot: null, error: '' },
      { type: 'request-succeeded', previousValue: original },
    );

    expect(succeeded).toEqual({
      isPending: false,
      undoSnapshot: original,
      error: '',
    });
    expect(contextEnhancementReducer(succeeded, { type: 'undo' })).toEqual(
      INITIAL_CONTEXT_ENHANCEMENT_STATE,
    );
  });

  it('captures empty text for Undo after generated-empty mode', () => {
    const succeeded = contextEnhancementReducer(
      { isPending: true, undoSnapshot: null, error: '' },
      { type: 'request-succeeded', previousValue: '' },
    );

    expect(succeeded.undoSnapshot).toBe('');
  });

  it('clears Undo on manual edit and clears loading with a safe error on failure', () => {
    const manuallyEdited = contextEnhancementReducer(
      { isPending: false, undoSnapshot: 'original', error: '' },
      { type: 'manual-edit' },
    );
    expect(manuallyEdited.undoSnapshot).toBeNull();

    expect(
      contextEnhancementReducer(
        { isPending: true, undoSnapshot: null, error: '' },
        { type: 'request-discarded' },
      ),
    ).toEqual(INITIAL_CONTEXT_ENHANCEMENT_STATE);

    const failed = contextEnhancementReducer(
      { isPending: true, undoSnapshot: null, error: '' },
      { type: 'request-failed' },
    );
    expect(failed).toEqual({
      isPending: false,
      undoSnapshot: null,
      error: CONTEXT_ENHANCEMENT_ERROR_MESSAGE,
    });
  });
});
