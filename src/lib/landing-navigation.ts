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
export const LANDING_TOP_DESTINATION = '/#top';

type LandingFragmentTarget = Pick<HTMLElement, 'scrollIntoView'>;

/**
 * Reconciles a landing-page fragment after React has rendered its target.
 *
 * Cross-route document navigation can resolve the hash before the landing
 * sections exist, so the browser needs the same destination applied again.
 */
export function scrollToLandingFragment(
  hash: string,
  resolveTarget: (id: string) => LandingFragmentTarget | null = (id) =>
    document.getElementById(id),
) {
  const encodedId = hash.startsWith('#') ? hash.slice(1) : '';
  if (!encodedId) {
    return false;
  }

  let fragmentId: string;
  try {
    fragmentId = decodeURIComponent(encodedId);
  } catch {
    return false;
  }

  const target = resolveTarget(fragmentId);
  if (!target) {
    return false;
  }

  target.scrollIntoView({ behavior: 'auto', block: 'start' });
  return true;
}

/**
 * Handles a root-fragment destination in place when the visitor is already on
 * Landing. Other routes keep normal anchor navigation so the document can load
 * the Landing page before its existing fragment reconciliation runs.
 */
export function navigateToLandingFragmentInPlace(
  destination: string,
  location: Pick<Location, 'pathname' | 'hash'> = window.location,
  updateHistory: (destination: string) => void = (nextDestination) =>
    window.history.pushState(null, '', nextDestination),
  scrollToFragment: (hash: string) => boolean = scrollToLandingFragment,
) {
  const fragmentIndex = destination.indexOf('#');
  const destinationPath = fragmentIndex >= 0 ? destination.slice(0, fragmentIndex) : destination;
  const destinationHash = fragmentIndex >= 0 ? destination.slice(fragmentIndex) : '';

  if (location.pathname !== '/' || destinationPath !== '/' || !destinationHash) {
    return false;
  }

  if (location.hash !== destinationHash) {
    updateHistory(destination);
  }
  scrollToFragment(destinationHash);
  return true;
}

/** Runs a queued native navigation only after the mobile sheet has exited. */
export function navigateAfterMobileMenuClose(
  destination: string | null,
  navigate: (destination: string) => void,
) {
  if (destination) {
    navigate(destination);
  }
}
