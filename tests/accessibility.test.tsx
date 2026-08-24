import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { OptionSelector } from '@/components/questionnaire/OptionSelector';

const workspaceFile = (path: string) =>
  readFileSync(resolve(process.cwd(), path), 'utf8');

describe('approved accessibility behavior', () => {
  it('keeps the mobile navigation modal, contained, inert, and restorable', () => {
    const appSource = workspaceFile('src/App.tsx');
    const navbarSource = workspaceFile('src/components/site/Navbar.tsx');

    expect(appSource).toContain('data-mobile-menu-background');
    expect(navbarSource).toContain('aria-modal="true"');
    expect(navbarSource).toContain('role="dialog"');
    expect(navbarSource).toContain("event.key !== 'Tab'");
    expect(navbarSource).toContain("region.setAttribute('inert', '')");
    expect(navbarSource).toContain('menuTriggerRef.current?.focus()');
    expect(navbarSource).toContain("event.key === 'Escape'");
    expect(navbarSource).toContain("window.matchMedia('(min-width: 1024px)')");
  });

  it('branches both mobile-menu transitions for reduced motion', () => {
    const navbarSource = workspaceFile('src/components/site/Navbar.tsx');

    expect(navbarSource.match(/transition=\{reduce \? \{ duration: 0 \}/g)).toHaveLength(2);
    expect(navbarSource).toContain("initial={reduce ? { opacity: 1, height: 'auto' }");
  });

  it('reuses the shared gold keyboard-focus treatment on audited surfaces', () => {
    const auditedSources = [
      'src/components/site/Navbar.tsx',
      'src/components/site/Footer.tsx',
      'src/pages/DocsPage.tsx',
      'src/pages/PressPage.tsx',
      'src/pages/LegalPage.tsx',
    ].map(workspaceFile);

    for (const source of auditedSources) {
      expect(source).toContain('focus-ring-gold');
    }
  });

  it('preserves native checked radio semantics without changing visible option copy', () => {
    const markup = renderToStaticMarkup(
      <OptionSelector
        id="focus-area"
        label="Focus area"
        helper="Choose one option."
        options={['Career', 'Relationships']}
        required
        value="Career"
        onChange={vi.fn()}
      />,
    );

    expect(markup).toContain('type="radio"');
    expect(markup).toContain('checked=""');
    expect(markup).toContain('aria-required="true"');
    expect(markup).toContain('>Career</span>');
    expect(markup).toContain('>Relationships</span>');
  });

  it('raises only the resting questionnaire border opacity', () => {
    expect(workspaceFile('src/components/questionnaire/TextInput.tsx')).toContain(
      'border-[hsl(43_60%_70%_/_0.22)]',
    );
    expect(workspaceFile('src/components/questionnaire/AdditionalContextInput.tsx')).toContain(
      'border-[hsl(43_60%_70%_/_0.22)]',
    );
    expect(workspaceFile('src/components/questionnaire/OptionSelector.tsx')).toContain(
      'border-[hsl(43_60%_70%_/_0.18)]',
    );
  });
});
