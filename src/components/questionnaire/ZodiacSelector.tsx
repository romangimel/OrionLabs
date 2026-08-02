import { ZODIAC_SIGNS } from '@/data/questionnaire';
import { QuestionHeader } from './QuestionHeader';

interface ZodiacSelectorProps {
  id: string;
  label: string;
  helper: string;
  defaultValue?: string;
}

export function ZodiacSelector({
  id,
  label,
  helper,
  defaultValue,
}: ZodiacSelectorProps) {
  return (
    <fieldset>
      <QuestionHeader label={label} helper={helper} asLegend />
      <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3 md:grid-cols-4">
        {ZODIAC_SIGNS.map((sign) => {
          const optionId = `${id}-${sign.name.toLowerCase()}`;
          return (
            <label key={sign.name} htmlFor={optionId} className="group relative cursor-pointer">
              <input
                className="peer sr-only"
                defaultChecked={sign.name === defaultValue}
                id={optionId}
                name={id}
                type="radio"
                value={sign.name}
              />
              <span className="relative flex min-h-[5.25rem] flex-col items-center justify-center overflow-hidden rounded-xl border border-[hsl(43_60%_70%_/_0.13)] bg-[linear-gradient(145deg,hsl(280_48%_15%_/_0.5),hsl(264_45%_8%_/_0.35))] px-1.5 py-3 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-[hsl(43_60%_70%_/_0.38)] hover:bg-[linear-gradient(145deg,hsl(285_52%_18%_/_0.62),hsl(264_45%_9%_/_0.48))] peer-checked:border-[hsl(43_74%_66%_/_0.7)] peer-checked:bg-[linear-gradient(145deg,hsl(43_74%_66%_/_0.14),hsl(280_50%_16%_/_0.58))] peer-checked:shadow-[0_0_24px_-10px_hsl(43_74%_66%_/_0.75)] peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[hsl(43_74%_66%_/_0.85)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[hsl(264_45%_8%)]">
                <span
                  aria-hidden="true"
                  className="font-serif text-[1.7rem] leading-none text-[hsl(43_62%_72%)] transition-transform duration-300 group-hover:scale-110 peer-checked:text-[hsl(43_80%_80%)]"
                >
                  {sign.symbol}
                </span>
                <span className="mt-2 text-[0.68rem] font-medium tracking-wide text-foreground/78 sm:text-xs">
                  {sign.name}
                </span>
                <span className="pointer-events-none absolute inset-x-4 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[hsl(43_74%_66%_/_0.9)] to-transparent transition-transform duration-300 peer-checked:scale-x-100" />
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

