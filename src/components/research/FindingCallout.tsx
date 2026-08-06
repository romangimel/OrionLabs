import { Sparkles } from 'lucide-react';

interface FindingCalloutProps {
  label: string;
  children: string;
}

/** Editorial pull finding that separates the paper's denser prose. */
export function FindingCallout({ label, children }: FindingCalloutProps) {
  return (
    <aside className="relative overflow-hidden rounded-2xl border border-[hsl(43_60%_70%_/_0.16)] bg-[linear-gradient(135deg,hsl(285_58%_14%_/_0.58),hsl(270_52%_8%_/_0.46))] p-6 sm:p-8">
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-20 h-44 w-44 rounded-full bg-[hsl(326_80%_52%_/_0.14)] blur-3xl"
      />
      <div className="relative">
        <p className="flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-[hsl(43_60%_72%)]">
          <Sparkles aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
          {label}
        </p>
        <p className="mt-4 max-w-3xl font-serif text-2xl leading-[1.28] text-gradient-cosmic sm:text-3xl">
          {children}
        </p>
      </div>
    </aside>
  );
}
