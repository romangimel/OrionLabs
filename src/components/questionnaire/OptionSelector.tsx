import { QuestionHeader } from './QuestionHeader';

interface OptionSelectorProps {
  id: string;
  label: string;
  helper: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}

/**
 * Renders a single-choice question as accessible native radio inputs with
 * custom visual cards. The selected value remains controlled by the page-level
 * answer state, which preserves it when steps unmount.
 */
export function OptionSelector({
  id,
  label,
  helper,
  options,
  value,
  onChange,
}: OptionSelectorProps) {
  return (
    <fieldset>
      <QuestionHeader label={label} helper={helper} asLegend />
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          // Stable, readable IDs connect each visual label to its hidden radio control.
          const optionId = `${id}-${option.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          return (
            <label key={option} htmlFor={optionId} className="group relative cursor-pointer">
              <input
                className="peer sr-only"
                checked={option === value}
                id={optionId}
                name={id}
                type="radio"
                value={option}
                onChange={(event) => onChange(event.target.value)}
              />
              <span className="flex min-h-12 items-center rounded-xl border border-[hsl(43_60%_70%_/_0.14)] bg-[hsl(275_45%_12%_/_0.42)] px-4 text-sm text-foreground/85 transition-all duration-300 hover:border-[hsl(43_60%_70%_/_0.34)] hover:bg-[hsl(280_50%_16%_/_0.55)] peer-checked:border-[hsl(326_75%_68%_/_0.72)] peer-checked:bg-[hsl(326_75%_60%_/_0.15)] peer-checked:text-[hsl(326_82%_78%)] peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[hsl(43_74%_66%_/_0.75)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[hsl(264_45%_8%)]">
                {option}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
