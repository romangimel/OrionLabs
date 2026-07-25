import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

/** The OrionLabs mark — a seven-point celestial compass rendered in gold. */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn('h-7 w-7', className)}
      aria-hidden="true"
    >
      <path
        d="M16 5 L18.4 12.8 L26.4 12.8 L19.9 17.4 L22.4 25.2 L16 20.6 L9.6 25.2 L12.1 17.4 L5.6 12.8 L13.6 12.8 Z"
        fill="url(#orionGrad)"
        stroke="#E8C77A"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="1.1" fill="#070514" />
      <defs>
        <linearGradient id="orionGrad" x1="5" y1="5" x2="27" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5E6B0" />
          <stop offset="1" stopColor="#C9A24A" />
        </linearGradient>
      </defs>
    </svg>
  );
}
