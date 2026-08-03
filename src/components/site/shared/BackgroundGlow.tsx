import { cn } from '@/lib/utils';

interface BackgroundGlowProps {
  className: string;
}

/** Decorative, non-interactive light layer positioned by the owning section. */
export function BackgroundGlow({ className }: BackgroundGlowProps) {
  return <div aria-hidden="true" className={cn('pointer-events-none absolute', className)} />;
}
