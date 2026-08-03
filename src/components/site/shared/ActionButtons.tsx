import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type ActionButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

/** Primary gold-gradient anchor used for the landing page's dominant actions. */
export function PrimaryActionButton({
  children,
  className,
  ...props
}: ActionButtonProps) {
  return (
    <a
      className={cn(
        'group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#F5E6B0] to-[#C9A24A] text-sm font-semibold text-[#070514] shadow-[0_8px_30px_-6px_hsl(43_74%_66%_/_0.4)] transition-transform duration-300 hover:scale-[1.02]',
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </a>
  );
}

/** Lower-emphasis outlined anchor paired with a primary landing action. */
export function SecondaryActionButton({
  children,
  className,
  ...props
}: ActionButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex h-12 items-center gap-2 rounded-full border border-[hsl(43_60%_70%_/_0.25)] text-sm font-medium text-foreground/90 backdrop-blur-md transition-colors duration-300 hover:border-[hsl(43_60%_70%_/_0.5)] hover:text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
