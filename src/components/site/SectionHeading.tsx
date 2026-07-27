import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './Motion';
import { SectionEyebrow } from './shared/SectionEyebrow';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="max-w-3xl font-serif text-4xl leading-[1.1] md:text-5xl lg:text-[3.4rem]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              'max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
