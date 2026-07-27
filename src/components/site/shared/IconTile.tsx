import type { ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconTileProps {
  icon: ComponentType<LucideProps>;
  className?: string;
}

export function IconTile({ icon: Icon, className }: IconTileProps) {
  return (
    <div
      className={cn(
        'inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[hsl(43_60%_70%_/_0.2)] bg-[hsl(280_55%_16%_/_0.6)]',
        className,
      )}
    >
      <Icon className="h-5 w-5 text-[hsl(43_60%_70%)]" strokeWidth={1.5} />
    </div>
  );
}
