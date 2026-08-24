import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { prepareNewAnalysisJourney } from '@/lib/analysis-session';
import {
  ANALYSIS_DESTINATION,
  LANDING_NAV_LINKS,
  navigateAfterMobileMenuClose,
} from '@/lib/landing-navigation';
import { Logo } from './Logo';

/**
 * Fixed landing-page navigation with desktop anchors and a collapsible mobile menu.
 * The background appears only after the hero begins scrolling underneath it,
 * preserving the transparent opening composition without sacrificing legibility.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pendingMobileDestination, setPendingMobileDestination] = useState<string | null>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const restoreTriggerFocusRef = useRef(false);
  const releaseBackgroundRef = useRef<(() => void) | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    // A passive listener avoids blocking scrolling; 24px matches the design-system threshold.
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    return () => releaseBackgroundRef.current?.();
  }, []);

  useEffect(() => {
    const desktopNavigation = window.matchMedia('(min-width: 1024px)');
    const closeHiddenMobileMenu = (event: MediaQueryListEvent) => {
      if (event.matches) {
        restoreTriggerFocusRef.current = false;
        releaseBackgroundRef.current?.();
        setOpen(false);
      }
    };

    desktopNavigation.addEventListener('change', closeHiddenMobileMenu);
    return () => desktopNavigation.removeEventListener('change', closeHiddenMobileMenu);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const backgroundRegions = Array.from(
      document.querySelectorAll<HTMLElement>('[data-mobile-menu-background]'),
    );
    if (backgroundRegions.length > 0 && !releaseBackgroundRef.current) {
      const previousStates = backgroundRegions.map((region) => ({
        region,
        wasInert: region.hasAttribute('inert'),
        previousAriaHidden: region.getAttribute('aria-hidden'),
      }));

      backgroundRegions.forEach((region) => {
        region.setAttribute('inert', '');
        region.setAttribute('aria-hidden', 'true');
      });
      releaseBackgroundRef.current = () => {
        previousStates.forEach(({ region, wasInert, previousAriaHidden }) => {
          if (!wasInert) {
            region.removeAttribute('inert');
          }
          if (previousAriaHidden === null) {
            region.removeAttribute('aria-hidden');
          } else {
            region.setAttribute('aria-hidden', previousAriaHidden);
          }
        });
        releaseBackgroundRef.current = null;
      };
    }

    const focusFirstMenuItemFrame = window.requestAnimationFrame(() => {
      mobileMenuRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
    });

    const containMenuFocus = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        restoreTriggerFocusRef.current = true;
        setOpen(false);
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const menu = mobileMenuRef.current;
      if (!menu) {
        return;
      }

      const focusableItems = Array.from(
        menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      ).filter((element) => element.getClientRects().length > 0);
      const firstItem = focusableItems[0];
      const lastItem = focusableItems.at(-1);
      if (!firstItem || !lastItem) {
        return;
      }

      const activeElement = document.activeElement;
      if (event.shiftKey && (activeElement === firstItem || !menu.contains(activeElement))) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && (activeElement === lastItem || !menu.contains(activeElement))) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    window.addEventListener('keydown', containMenuFocus);
    return () => {
      window.cancelAnimationFrame(focusFirstMenuItemFrame);
      window.removeEventListener('keydown', containMenuFocus);
    };
  }, [open]);

  /**
   * Lets the sheet finish collapsing before native navigation changes the page.
   * Otherwise, fragment navigation occurs while the sheet still contributes to
   * document height; its exit animation can then undo the browser's scroll.
   */
  const closeMobileMenuAndNavigate = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setPendingMobileDestination(event.currentTarget.href);
    setOpen(false);
  };

  const dismissMobileMenu = (restoreTriggerFocus: boolean) => {
    restoreTriggerFocusRef.current = restoreTriggerFocus;
    setOpen(false);
  };

  const completeMobileMenuClose = () => {
    const destination = pendingMobileDestination;
    setPendingMobileDestination(null);
    releaseBackgroundRef.current?.();

    if (restoreTriggerFocusRef.current) {
      restoreTriggerFocusRef.current = false;
      menuTriggerRef.current?.focus();
    }

    navigateAfterMobileMenuClose(
      destination,
      window.location.assign.bind(window.location),
    );
  };

  return (
    <motion.header
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          'transition-all duration-500',
          scrolled
            ? 'border-b border-[hsl(43_60%_70%_/_0.12)] bg-[hsl(262_45%_7%_/_0.7)] backdrop-blur-xl'
            : 'border-b border-transparent',
        )}
      >
        <nav className="container-narrow flex h-16 items-center justify-between lg:h-20">
          <a href="#top" className="focus-ring-gold group flex items-center gap-2 rounded-full" aria-label="OrionLabs home">
            <Logo className="h-9 w-9 lg:h-10 lg:w-10" />
            <span className="font-serif text-2xl tracking-tight text-foreground lg:text-[1.6rem]">
              Orion<span className="text-gradient-gold">Labs</span>
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 lg:flex">
            {LANDING_NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="focus-ring-gold rounded-sm text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <a
              href={ANALYSIS_DESTINATION}
              onClick={prepareNewAnalysisJourney}
              className="focus-ring-gold group relative inline-flex h-9 items-center overflow-hidden rounded-full border border-[hsl(43_60%_70%_/_0.3)] bg-[hsl(43_74%_66%_/_0.08)] px-5 text-sm font-medium text-[hsl(43_60%_75%)] transition-colors duration-300 hover:text-[hsl(43_70%_85%)]"
            >
              <span className="relative z-10">Begin Analysis</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[hsl(43_74%_66%_/_0.18)] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            ref={menuTriggerRef}
            type="button"
            className="focus-ring-gold flex h-10 w-10 items-center justify-center rounded-full text-foreground lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation-dialog"
            onClick={() => {
              if (open) {
                dismissMobileMenu(true);
              } else {
                setOpen(true);
              }
            }}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            aria-hidden="true"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 lg:hidden"
            onClick={() => dismissMobileMenu(true)}
          />
        )}
      </AnimatePresence>
      {/* Mobile sheet */}
      <AnimatePresence onExitComplete={completeMobileMenuClose}>
        {open && (
          <motion.div
            id="mobile-navigation-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Primary navigation"
            initial={reduce ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 overflow-hidden border-b border-[hsl(43_60%_70%_/_0.12)] bg-[hsl(262_45%_7%_/_0.95)] backdrop-blur-xl lg:hidden"
          >
            <nav ref={mobileMenuRef} aria-label="Mobile navigation">
              <ul className="container-narrow flex flex-col gap-1 py-4">
                {LANDING_NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={closeMobileMenuAndNavigate}
                      className="focus-ring-gold block rounded-lg px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-[hsl(280_40%_18%)] hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li className="mt-2">
                  <a
                    href={ANALYSIS_DESTINATION}
                    onClick={(event) => {
                      prepareNewAnalysisJourney();
                      closeMobileMenuAndNavigate(event);
                    }}
                    className="focus-ring-gold block rounded-full border border-[hsl(43_60%_70%_/_0.3)] bg-[hsl(43_74%_66%_/_0.08)] px-5 py-3 text-center text-sm font-medium text-[hsl(43_60%_75%)]"
                  >
                    Begin Analysis
                  </a>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
