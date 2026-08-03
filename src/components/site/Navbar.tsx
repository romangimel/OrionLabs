import { useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';

const NAV_LINKS = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Technology', href: '#technology' },
  { label: 'Evidence', href: '#evidence' },
  { label: 'Voices', href: '#voices' },
  { label: 'Research', href: '#research' },
  { label: 'FAQ', href: '#faq' },
] as const;

/**
 * Fixed landing-page navigation with desktop anchors and a collapsible mobile menu.
 * The background appears only after the hero begins scrolling underneath it,
 * preserving the transparent opening composition without sacrificing legibility.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    // A passive listener avoids blocking scrolling; 24px matches the design-system threshold.
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
        <nav className="container-narrow flex h-16 items-center justify-between md:h-20">
          <a href="#top" className="group flex items-center gap-3" aria-label="OrionLabs home">
            <Logo className="h-9 w-9 drop-shadow-[0_0_12px_hsl(43_74%_66%_/_0.35)] transition-transform duration-500 group-hover:rotate-[18deg] md:h-10 md:w-10" />
            <span className="font-serif text-2xl tracking-tight text-foreground md:text-[1.6rem]">
              Orion<span className="text-gradient-gold">Labs</span>
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <a
              href="#cta"
              className="group relative inline-flex h-9 items-center overflow-hidden rounded-full border border-[hsl(43_60%_70%_/_0.3)] bg-[hsl(43_74%_66%_/_0.08)] px-5 text-sm font-medium text-[hsl(43_60%_75%)] transition-colors duration-300 hover:text-[hsl(43_70%_85%)]"
            >
              <span className="relative z-10">Begin Analysis</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[hsl(43_74%_66%_/_0.18)] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-[hsl(43_60%_70%_/_0.12)] bg-[hsl(262_45%_7%_/_0.95)] backdrop-blur-xl md:hidden"
          >
            <ul className="container-narrow flex flex-col gap-1 py-4">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-[hsl(280_40%_18%)] hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="#cta"
                  onClick={() => setOpen(false)}
                  className="block rounded-full border border-[hsl(43_60%_70%_/_0.3)] bg-[hsl(43_74%_66%_/_0.08)] px-5 py-3 text-center text-sm font-medium text-[hsl(43_60%_75%)]"
                >
                  Begin Analysis
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
