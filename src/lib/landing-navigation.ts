/** The landing sections shared by the desktop navigation and mobile menu. */
export const LANDING_NAV_LINKS = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Technology', href: '#technology' },
  { label: 'Evidence', href: '#evidence' },
  { label: 'Voices', href: '#voices' },
  { label: 'Research', href: '#research' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const ANALYSIS_DESTINATION = '/questionnaire';

/** Runs a queued native navigation only after the mobile sheet has exited. */
export function navigateAfterMobileMenuClose(
  destination: string | null,
  navigate: (destination: string) => void,
) {
  if (destination) {
    navigate(destination);
  }
}
