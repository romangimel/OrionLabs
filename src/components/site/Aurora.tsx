import { cn } from '@/lib/utils';

interface AuroraProps {
  className?: string;
}

/**
 * Layered radial-gradient "aurora" blobs that drift slowly. Pure CSS — no JS
 * animation cost. Kept behind content via z-index by the parent.
 *
 * Palette: bright blue-violet + hot magenta nebula pools over a midnight navy
 * base, meeting in rich violet. Gold whisper for warmth. Cinematic, not playful.
 */
export function Aurora({ className = '' }: AuroraProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {/* Bright blue-violet light — lower left, dominant */}
      <div className="absolute bottom-[-8%] left-[8%] h-[62vh] w-[62vh] rounded-full bg-[hsl(254_84%_58%_/_0.55)] blur-[120px] animate-drift-slow motion-reduce:animate-none" />
      {/* Hot magenta pool — lower right, dominant */}
      <div className="absolute bottom-[-6%] right-[6%] h-[60vh] w-[60vh] rounded-full bg-[hsl(326_85%_52%_/_0.55)] blur-[115px] animate-drift-rev motion-reduce:animate-none" />
      {/* Pink glow — center, boosted */}
      <div className="absolute top-1/2 left-1/2 h-[52vh] w-[52vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(310_80%_55%_/_0.40)] blur-[130px] animate-pulse-glow motion-reduce:animate-none" />
      {/* Deep indigo wash — upper area */}
      <div className="absolute -top-1/4 left-1/3 h-[55vh] w-[55vh] rounded-full bg-[hsl(252_72%_30%_/_0.42)] blur-[125px] animate-drift-slow motion-reduce:animate-none" />
      {/* Pink haze — upper right */}
      <div className="absolute top-[8%] right-[10%] h-[44vh] w-[44vh] rounded-full bg-[hsl(330_72%_46%_/_0.34)] blur-[120px] animate-drift-rev motion-reduce:animate-none" />
      {/* Violet haze — upper left */}
      <div className="absolute top-[12%] left-[12%] h-[40vh] w-[40vh] rounded-full bg-[hsl(280_68%_42%_/_0.32)] blur-[120px] animate-drift-slow motion-reduce:animate-none" />
      {/* Gold whisper — keeps luxury warmth */}
      <div className="absolute top-1/4 right-1/4 h-[30vh] w-[30vh] rounded-full bg-[hsl(43_68%_50%_/_0.14)] blur-[130px] animate-drift-rev motion-reduce:animate-none" />
    </div>
  );
}
