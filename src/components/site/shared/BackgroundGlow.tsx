import { cn } from '@/lib/utils';

interface BackgroundGlowProps {
  className: string;
}

export function BackgroundGlow({ className }: BackgroundGlowProps) {
  return <div aria-hidden="true" className={cn('pointer-events-none absolute', className)} />;
}
