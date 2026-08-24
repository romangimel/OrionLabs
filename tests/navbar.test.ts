import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import {
  LANDING_NAV_LINKS,
  navigateAfterMobileMenuClose,
  scrollToLandingFragment,
} from '@/lib/landing-navigation';

const navbarSource = readFileSync(
  resolve(process.cwd(), 'src/components/site/Navbar.tsx'),
  'utf8',
);

describe('landing navigation', () => {
  it('keeps every compact/desktop control on the shared lg transition', () => {
    expect(navbarSource).toContain('gap-8 lg:flex');
    expect(navbarSource).toContain('hidden lg:block');
    expect(navbarSource.match(/lg:hidden/g)).toHaveLength(3);
    expect(navbarSource).not.toMatch(/\bmd:(?:flex|block|hidden)\b/);
  });

  it('uses the approved landing section anchors for both navigation variants', () => {
    expect(LANDING_NAV_LINKS.map((link) => link.href)).toEqual([
      '#philosophy',
      '#technology',
      '#evidence',
      '#voices',
      '#research',
      '#faq',
    ]);
  });

  it('performs the queued destination only after the menu-close handoff', () => {
    const navigate = vi.fn();

    navigateAfterMobileMenuClose('#philosophy', navigate);
    navigateAfterMobileMenuClose(null, navigate);

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('#philosophy');
  });

  it('reconciles every approved root fragment after its landing target exists', () => {
    const fragmentIds = [
      'philosophy',
      'research',
      'voices',
      'deepconstellation',
      'quantum-horoscope-engine',
      'planetary-neural-network',
      'astrovector',
      'retrograde-shield',
    ];
    const scrollIntoView = vi.fn();
    const resolveTarget = vi.fn((id: string) =>
      fragmentIds.includes(id) ? { scrollIntoView } : null,
    );

    for (const id of fragmentIds) {
      expect(scrollToLandingFragment(`#${id}`, resolveTarget)).toBe(true);
    }

    expect(resolveTarget.mock.calls.map(([id]) => id)).toEqual(fragmentIds);
    expect(scrollIntoView).toHaveBeenCalledTimes(fragmentIds.length);
    expect(scrollIntoView).toHaveBeenLastCalledWith({
      behavior: 'auto',
      block: 'start',
    });
  });

  it('ignores empty, malformed, and unknown landing fragments safely', () => {
    const resolveTarget = vi.fn(() => null);

    expect(scrollToLandingFragment('', resolveTarget)).toBe(false);
    expect(scrollToLandingFragment('#%E0%A4%A', resolveTarget)).toBe(false);
    expect(scrollToLandingFragment('#unknown', resolveTarget)).toBe(false);
  });
});
