import type { ReactNode } from 'react';

interface SectionEyebrowProps {
  children: ReactNode;
}

/** Compact gold label that introduces a landing-page section. */
export function SectionEyebrow({ children }: SectionEyebrowProps) {
  return (
    <span className="inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[hsl(43_60%_70%)]">
      <span className="h-px w-6 bg-[hsl(43_60%_70%_/_0.5)]" />
      {children}
      <span className="h-px w-6 bg-[hsl(43_60%_70%_/_0.5)]" />
    </span>
  );
}
