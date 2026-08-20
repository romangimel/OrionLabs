import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeExampleProps {
  children: string;
  label?: string;
  language?: string;
}

/** Developer-facing code sample with a progressive clipboard control. */
export function CodeExample({
  children,
  label = 'Code example',
  language = 'text',
}: CodeExampleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1_500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <figure className="max-w-full overflow-hidden rounded-2xl border border-[hsl(43_60%_70%_/_0.14)] bg-[hsl(262_55%_4%_/_0.86)] shadow-[0_24px_70px_-48px_hsl(255_80%_2%_/_0.95)]">
      <figcaption className="flex min-h-11 items-center justify-between gap-4 border-b border-[hsl(43_60%_70%_/_0.1)] px-4">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground/65">
          {label} · {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-9 items-center gap-2 rounded-full px-3 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.7)]"
          aria-live="polite"
        >
          {copied ? (
            <Check aria-hidden="true" className="h-3.5 w-3.5" />
          ) : (
            <Copy aria-hidden="true" className="h-3.5 w-3.5" />
          )}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </figcaption>
      <pre className="max-w-full overflow-x-auto p-4 text-[0.76rem] leading-6 text-foreground/82 sm:p-5 sm:text-[0.82rem]">
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </figure>
  );
}
