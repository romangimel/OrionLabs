interface QuestionHeaderProps {
  label: string;
  helper: string;
  helperId: string;
  htmlFor?: string;
  required: boolean;
  asLegend?: boolean;
}

/**
 * Provides consistent question labels and helper text for every input type.
 * Radio groups request a semantic `legend`; individual controls receive a
 * `label`, so the same visual treatment does not compromise form semantics.
 */
export function QuestionHeader({
  label,
  helper,
  helperId,
  htmlFor,
  required,
  asLegend = false,
}: QuestionHeaderProps) {
  const labelContent = (
    <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className="text-gradient-gold">{label}</span>
      <span className="text-[0.65rem] font-normal uppercase tracking-[0.18em] text-[hsl(326_55%_68%)]">
        {required ? 'Required' : 'Recommended'}
      </span>
    </span>
  );
  const helperContent = (
    <span
      id={helperId}
      className="mt-2 block max-w-2xl text-sm font-normal leading-relaxed text-muted-foreground lg:max-w-3xl lg:text-base"
    >
      {helper}
    </span>
  );

  const className = "block text-base font-medium leading-snug text-foreground sm:text-lg lg:text-xl";

  if (asLegend) {
    return (
      <>
        <legend className={className}>{labelContent}</legend>
        {helperContent}
      </>
    );
  }

  return (
    <>
      <label className={className} htmlFor={htmlFor}>
        {labelContent}
      </label>
      {helperContent}
    </>
  );
}
