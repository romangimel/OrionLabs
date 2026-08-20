export interface FooterNavigationLink {
  label: string;
  href: string;
}

export interface FooterNavigationColumn {
  title: string;
  links: readonly FooterNavigationLink[];
}

/** Canonical footer destinations shared by rendering and route regression tests. */
export const FOOTER_NAVIGATION: readonly FooterNavigationColumn[] = [
  {
    title: 'Platform',
    links: [
      { label: 'DeepConstellation™', href: '/#deepconstellation' },
      { label: 'Quantum Horoscope Engine™', href: '/#quantum-horoscope-engine' },
      { label: 'Planetary Neural Network™', href: '/#planetary-neural-network' },
      { label: 'AstroVector™', href: '/#astrovector' },
      { label: 'Retrograde Shield™', href: '/#retrograde-shield' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Philosophy', href: '/#philosophy' },
      { label: 'Research', href: '/#research' },
      { label: 'Customer Stories', href: '/#voices' },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Natal Chart API', href: '/docs#natal-chart-api' },
      { label: 'Model Architecture', href: '/docs#model-architecture' },
      { label: 'Changelog', href: '/docs#changelog' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Alignment', href: '/legal#terms-of-alignment' },
      { label: 'Privacy (Cosmic)', href: '/legal#privacy' },
      { label: 'Cookie Policy (Lunar)', href: '/legal#cookies' },
      { label: 'Compliance & Superstition', href: '/legal#compliance' },
      { label: 'Trademarks', href: '/legal#trademarks' },
    ],
  },
] as const;
