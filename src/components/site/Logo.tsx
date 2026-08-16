import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

/**
 * Shared decorative OrionLabs mark. The square wrapper preserves existing logo
 * slots while `object-contain` keeps the supplied raster artwork undistorted.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span
      className={cn('inline-flex h-7 w-7 items-center justify-center', className)}
      aria-hidden="true"
    >
      <img
        src="/orionlabs-logo.png"
        alt=""
        width={1254}
        height={1254}
        className="h-[88%] w-[88%] object-contain"
      />
    </span>
  );
}
