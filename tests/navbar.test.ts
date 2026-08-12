import { describe, expect, it, vi } from 'vitest';
import {
  LANDING_NAV_LINKS,
  navigateAfterMobileMenuClose,
} from '@/lib/landing-navigation';

describe('landing navigation', () => {
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
});
