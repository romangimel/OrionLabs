import { ZODIAC_SIGNS } from '@/data/questionnaire';
import { QuestionHeader } from './QuestionHeader';
import { cn } from '@/lib/utils';

interface ZodiacSelectorProps {
  id: string;
  label: string;
  helper: string;
  required: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
}

/**
 * Specialized single-choice control for the zodiac dataset. Native radio
 * inputs remain in the accessibility tree while peer styles create the visual
 * card selection treatment.
 */
export function ZodiacSelector({
  id,
  label,
  helper,
  required,
  error,
  value,
  onChange,
}: ZodiacSelectorProps) {
  const helperId = `${id}-helper`;
  const describedBy = error ? `${helperId} ${id}-error` : helperId;

  return (
    <fieldset
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy}
      aria-required={required}
    >
      <QuestionHeader
        label={label}
        helper={helper}
        helperId={helperId}
        required={required}
        asLegend
      />
      <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3 md:grid-cols-4 lg:mt-6 lg:gap-4">
        {ZODIAC_SIGNS.map((sign) => {
          const optionId = `${id}-${sign.name.toLowerCase()}`;
          return (
            <label key={sign.name} htmlFor={optionId} className="group relative cursor-pointer">
              <input
                className="peer sr-only"
                checked={sign.name === value}
                id={optionId}
                name={id}
                type="radio"
                required={required}
                aria-invalid={error ? true : undefined}
                aria-describedby={describedBy}
                value={sign.name}
                onChange={(event) => onChange(event.target.value)}
              />
              <span
                className={cn(
                  'relative flex min-h-[5.25rem] flex-col items-center justify-center overflow-hidden rounded-xl border border-[hsl(43_60%_70%_/_0.13)] bg-[linear-gradient(145deg,hsl(280_48%_15%_/_0.5),hsl(264_45%_8%_/_0.35))] px-1.5 py-3 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-[hsl(43_60%_70%_/_0.38)] hover:bg-[linear-gradient(145deg,hsl(285_52%_18%_/_0.62),hsl(264_45%_9%_/_0.48))] peer-checked:border-[hsl(326_75%_68%_/_0.72)] peer-checked:bg-[linear-gradient(145deg,hsl(326_75%_60%_/_0.15),hsl(280_50%_16%_/_0.62))] peer-checked:shadow-[0_0_0_1px_hsl(326_75%_68%_/_0.12),0_0_26px_-7px_hsl(326_80%_60%_/_0.68),0_16px_34px_-20px_hsl(310_85%_52%_/_0.65),inset_0_1px_0_hsl(326_85%_88%_/_0.18)] peer-checked:[&_[data-zodiac-symbol]]:text-[hsl(326_82%_78%)] peer-checked:[&_[data-zodiac-symbol]]:[filter:drop-shadow(0_0_4px_hsl(326_80%_70%_/_0.9))_drop-shadow(0_0_12px_hsl(326_85%_58%_/_0.68))] peer-checked:[&_[data-zodiac-underline]]:scale-x-100 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[hsl(43_74%_66%_/_0.85)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[hsl(264_45%_8%)] motion-reduce:transform-none lg:min-h-24 lg:px-3 lg:py-4',
                  error && 'border-[hsl(0_72%_62%_/_0.68)]',
                )}
              >
                <span
                  aria-hidden="true"
                  data-zodiac-symbol
                  className="font-serif text-[1.7rem] leading-none text-[hsl(43_68%_76%)] [filter:drop-shadow(0_0_3px_hsl(43_74%_66%_/_0.78))_drop-shadow(0_0_10px_hsl(43_72%_58%_/_0.48))] transition-[color,filter,transform] duration-300 group-hover:scale-110 motion-reduce:transform-none lg:text-[2rem]"
                >
                  {sign.symbol}
                </span>
                <span className="mt-2 text-[0.68rem] font-medium tracking-wide text-foreground/78 sm:text-xs lg:mt-2.5 lg:text-sm">
                  {sign.name}
                </span>
                <span
                  data-zodiac-underline
                  className="pointer-events-none absolute inset-x-4 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[hsl(326_82%_72%_/_0.95)] to-transparent transition-transform duration-300 motion-reduce:transition-none"
                />
              </span>
            </label>
          );
        })}
      </div>
      <div className="mt-2 min-h-5">
        {error && (
          <p id={`${id}-error`} className="text-sm leading-5 text-[hsl(0_72%_72%)]">
            {error}
          </p>
        )}
      </div>
    </fieldset>
  );
}
