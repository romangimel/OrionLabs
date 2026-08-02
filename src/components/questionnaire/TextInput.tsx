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
  optional?: boolean;
}

const controlStyles =
  'mt-4 border-[hsl(43_60%_70%_/_0.18)] bg-[hsl(264_45%_7%_/_0.58)] text-base text-foreground shadow-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-muted-foreground/55 hover:border-[hsl(43_60%_70%_/_0.34)] focus-visible:border-[hsl(43_74%_66%_/_0.65)] focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.18)]';

export function TextInput({
  id,
  label,
  helper,
  placeholder,
  type = 'text',
  multiline = false,
  optional = false,
}: TextInputProps) {
  return (
    <div>
      <QuestionHeader label={label} helper={helper} htmlFor={id} optional={optional} />
      {multiline ? (
        <Textarea
          id={id}
          name={id}
          placeholder={placeholder}
          className={cn(controlStyles, 'min-h-36 resize-y rounded-xl px-4 py-3')}
        />
      ) : (
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          className={cn(
            controlStyles,
            'h-12 rounded-xl px-4',
            type === 'date' && 'scheme-dark [color-scheme:dark]',
          )}
        />
      )}
    </div>
  );
}

