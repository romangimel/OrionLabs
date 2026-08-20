import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DocumentCalloutProps {
  label: string;
  children: ReactNode;
  className?: string;
}

/** Restrained document aside for boundaries, qualifications, and key findings. */
export function DocumentCallout({
  label,
  children,
  className,
}: DocumentCalloutProps) {
  return (
    <aside
      className={cn(
        'rounded-2xl border border-[hsl(43_60%_70%_/_0.16)] bg-[linear-gradient(135deg,hsl(285_50%_13%_/_0.48),hsl(262_48%_6%_/_0.54))] p-5 sm:p-6',
        className,
      )}
    >
      <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[hsl(43_60%_74%)]">
        {label}
      </p>
      <div className="mt-3 text-sm leading-[1.8] text-foreground/82 sm:text-base">
        {children}
      </div>
    </aside>
  );
}
