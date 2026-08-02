interface QuestionHeaderProps {
  label: string;
  helper: string;
  htmlFor?: string;
  optional?: boolean;
  asLegend?: boolean;
}

export function QuestionHeader({
  label,
  helper,
  htmlFor,
  optional = false,
  asLegend = false,
}: QuestionHeaderProps) {
  const content = (
    <>
      <span className="flex items-baseline gap-2">
        <span className="text-gradient-gold">{label}</span>
        {optional && (
          <span className="text-[0.65rem] font-normal uppercase tracking-[0.18em] text-[hsl(326_55%_68%)]">
            Optional
          </span>
        )}
      </span>
      <span className="mt-2 block max-w-2xl text-sm font-normal leading-relaxed text-muted-foreground lg:max-w-3xl lg:text-base">
        {helper}
      </span>
    </>
  );

  const className = "block text-base font-medium leading-snug text-foreground sm:text-lg lg:text-xl";

  if (asLegend) {
    return <legend className={className}>{content}</legend>;
  }

  return (
    <label className={className} htmlFor={htmlFor}>
      {content}
    </label>
  );
}
