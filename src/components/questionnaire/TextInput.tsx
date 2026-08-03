import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { QuestionHeader } from './QuestionHeader';

interface TextInputProps {
  id: string;
  label: string;
  helper: string;
  placeholder?: string;
  type?: 'text' | 'date';
  multiline?: boolean;
  required: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
}

const controlStyles =
  'mt-4 border-[hsl(43_60%_70%_/_0.18)] bg-[hsl(264_45%_7%_/_0.58)] text-base text-foreground shadow-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-muted-foreground/55 hover:border-[hsl(43_60%_70%_/_0.34)] focus-visible:border-[hsl(43_74%_66%_/_0.65)] focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.18)]';

/**
 * Shared controlled input for short text, dates, and longer free-form context.
 * Controlled values keep the DOM synchronized with the lifted answer state as
 * users move between steps and return to edit earlier responses.
 */
export function TextInput({
  id,
  label,
  helper,
  placeholder,
  type = 'text',
  multiline = false,
  required,
  error,
  value,
  onChange,
}: TextInputProps) {
  return (
    <div>
      <QuestionHeader label={label} helper={helper} htmlFor={id} required={required} />
      {multiline ? (
        <Textarea
          id={id}
          name={id}
          placeholder={placeholder}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={(event) => onChange(event.currentTarget.value)}
          className={cn(
            controlStyles,
            'min-h-36 resize-y rounded-xl px-4 py-3',
            error &&
              'border-[hsl(0_72%_62%_/_0.78)] focus:border-[hsl(0_72%_68%)] focus:ring-2 focus:ring-[hsl(0_72%_55%_/_0.24)]',
          )}
        />
      ) : (
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={(event) => onChange(event.currentTarget.value)}
          className={cn(
            controlStyles,
            'h-12 rounded-xl px-4',
            error &&
              'border-[hsl(0_72%_62%_/_0.78)] focus:border-[hsl(0_72%_68%)] focus:ring-2 focus:ring-[hsl(0_72%_55%_/_0.24)]',
            // Native date controls otherwise adopt a light color scheme in some browsers.
            type === 'date' && 'scheme-dark [color-scheme:dark]',
          )}
        />
      )}
      <div className="mt-2 min-h-5">
        {error && (
          <p id={`${id}-error`} role="alert" className="text-sm leading-5 text-[hsl(0_72%_72%)]">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
