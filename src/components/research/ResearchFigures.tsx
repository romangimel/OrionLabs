import { BarChart3, CloudMoon, Presentation } from 'lucide-react';
import { researchPaper } from '@/data/research-paper';

export function ResearchHighlights() {
  return (
    <section aria-labelledby="research-highlights-title" className="pb-14 sm:pb-16 md:pb-20">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-8 bg-[hsl(43_60%_70%_/_0.5)]" />
        <h2
          id="research-highlights-title"
          className="font-sans text-[0.66rem] font-medium uppercase tracking-[0.24em] text-[hsl(43_60%_72%)]"
        >
          Research highlights
        </h2>
      </div>
      <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-[hsl(43_60%_70%_/_0.12)] bg-[hsl(43_60%_70%_/_0.1)] md:grid-cols-3">
        {researchPaper.highlights.map((highlight) => (
          <div key={highlight.label} className="bg-[hsl(262_48%_6%_/_0.78)] p-6 sm:p-7">
            <dt className="font-serif text-xl text-foreground">{highlight.label}</dt>
            <dd className="mt-3 font-serif text-4xl leading-none text-gradient-gold sm:text-5xl">
              {highlight.value}
            </dd>
            <p className="mt-4 text-xs leading-relaxed text-[hsl(326_50%_66%)]">
              {highlight.detail}
            </p>
          </div>
        ))}
      </dl>
    </section>
  );
}

interface ArtworkFigureProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  figure: string;
  title: string;
  caption: string;
  objectPosition?: string;
}

export function ArtworkFigure({
  src,
  width,
  height,
  alt,
  figure,
  title,
  caption,
  objectPosition = '50% 50%',
}: ArtworkFigureProps) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-[hsl(43_60%_70%_/_0.14)] bg-[hsl(262_48%_6%_/_0.58)]">
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          style={{ objectPosition }}
          className="h-full w-full object-cover"
        />
      </div>
      <figcaption className="border-t border-[hsl(43_60%_70%_/_0.1)] p-5 sm:p-6">
        <p className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[hsl(43_60%_72%)]">
          {figure} · {title}
        </p>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          {caption}
        </p>
      </figcaption>
    </figure>
  );
}

export function LunarPerformanceFigure() {
  return (
    <figure className="rounded-2xl border border-[hsl(43_60%_70%_/_0.14)] bg-[linear-gradient(145deg,hsl(280_55%_13%_/_0.48),hsl(262_50%_6%_/_0.45))] p-5 sm:p-7">
      <div className="flex flex-col gap-3 border-b border-[hsl(43_60%_70%_/_0.1)] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[hsl(43_60%_72%)]">
            Figure 4 · Lunar-phase performance
          </p>
          <h3 className="mt-2 font-serif text-2xl text-foreground sm:text-3xl">
            Emotional specificity by training window
          </h3>
        </div>
        <div className="flex items-center gap-2 text-[0.62rem] text-muted-foreground">
          <BarChart3 aria-hidden="true" className="h-4 w-4 text-[hsl(326_55%_68%)]" />
          100-point proprietary rubric
        </div>
      </div>

      <div className="mt-7 space-y-6">
        {researchPaper.lunarResults.map((result) => (
          <div key={result.phase} className="grid gap-2 sm:grid-cols-[8rem_minmax(0,1fr)_3rem] sm:items-center sm:gap-4">
            <div>
              <p className="text-sm font-medium text-foreground/88">{result.phase}</p>
              <p className="text-[0.62rem] text-muted-foreground/62">{result.status}</p>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-[hsl(268_26%_18%_/_0.9)]">
              <div
                className={`h-full rounded-full ${
                  result.phase === 'Full moon'
                    ? 'bg-gradient-to-r from-[#F5E6B0] to-[#C9A24A]'
                    : 'bg-gradient-to-r from-[hsl(255_70%_58%)] to-[hsl(326_70%_58%)]'
                }`}
                style={{ width: `${result.emotionalSpecificity}%` }}
              />
            </div>
            <p className="font-serif text-xl text-gradient-gold sm:text-right">
              {result.emotionalSpecificity}
            </p>
          </div>
        ))}
      </div>

      <figcaption className="mt-7 border-t border-[hsl(43_60%_70%_/_0.1)] pt-5 text-xs leading-relaxed text-muted-foreground">
        Full-moon checkpoints produced the most emotionally specific output. Error bars were omitted because they complicated the conclusion without changing it.
      </figcaption>
    </figure>
  );
}

export function PrimaryResultsTable() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-[hsl(43_60%_70%_/_0.14)] bg-[hsl(262_48%_6%_/_0.62)]">
      <figcaption className="border-b border-[hsl(43_60%_70%_/_0.1)] p-5 sm:p-6">
        <p className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[hsl(43_60%_72%)]">
          Table 1 · Primary results by lunar phase
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Higher is preferred for Destiny Alignment and Emotional Specificity. Lower is preferred for Celestial Calibration Error.
        </p>
      </figcaption>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[hsl(280_45%_14%_/_0.5)] text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
              <th scope="col" className="px-5 py-4 font-medium">Training phase</th>
              <th scope="col" className="px-5 py-4 font-medium">Destiny alignment</th>
              <th scope="col" className="px-5 py-4 font-medium">Emotional specificity</th>
              <th scope="col" className="px-5 py-4 font-medium">Calibration error</th>
              <th scope="col" className="px-5 py-4 font-medium">Research status</th>
            </tr>
          </thead>
          <tbody>
            {researchPaper.lunarResults.map((result) => (
              <tr
                key={result.phase}
                className={`border-t border-[hsl(43_60%_70%_/_0.08)] ${
                  result.phase === 'Full moon' ? 'bg-[hsl(43_74%_66%_/_0.055)]' : ''
                }`}
              >
                <th scope="row" className="whitespace-nowrap px-5 py-4 font-medium text-foreground">
                  {result.phase}
                </th>
                <td className="px-5 py-4 font-serif text-lg text-gradient-gold">
                  {result.destinyAlignment.toFixed(2)}
                </td>
                <td className="px-5 py-4 text-foreground/82">{result.emotionalSpecificity}</td>
                <td className="px-5 py-4 text-foreground/82">{result.calibrationError.toFixed(2)}</td>
                <td className="px-5 py-4 text-xs text-[hsl(326_50%_68%)]">{result.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export function AblationTable() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-[hsl(43_60%_70%_/_0.14)] bg-[hsl(262_48%_6%_/_0.62)]">
      <figcaption className="border-b border-[hsl(43_60%_70%_/_0.1)] p-5 sm:p-6">
        <p className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[hsl(43_60%_72%)]">
          Table 2 · Component ablation study
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Evidence produced limited measurable value. Certainty remained operationally indispensable.
        </p>
      </figcaption>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[43rem] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[hsl(280_45%_14%_/_0.5)] text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
              <th scope="col" className="px-5 py-4 font-medium">Configuration</th>
              <th scope="col" className="px-5 py-4 font-medium">Alignment</th>
              <th scope="col" className="px-5 py-4 font-medium">Change</th>
              <th scope="col" className="px-5 py-4 font-medium">Interpretation</th>
            </tr>
          </thead>
          <tbody>
            {researchPaper.ablations.map((result) => (
              <tr key={result.configuration} className="border-t border-[hsl(43_60%_70%_/_0.08)]">
                <th scope="row" className="px-5 py-4 font-medium text-foreground/88">
                  {result.configuration}
                </th>
                <td className="px-5 py-4 font-serif text-lg text-gradient-gold">
                  {result.destinyAlignment}
                </td>
                <td className="px-5 py-4 text-foreground/76">{result.change}</td>
                <td className="px-5 py-4 text-xs text-[hsl(326_50%_68%)]">
                  {result.interpretation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export function InvestorValidationSummary() {
  const findings = [
    ['91%', 'Investor comprehension', 'After gradient-chart exposure'],
    ['6 → 2', 'Methodological concerns', 'Following market-size disclosure'],
    ['1', 'Commercial replications', 'Across one pitch presentation'],
  ] as const;

  return (
    <aside className="relative overflow-hidden rounded-2xl border border-[hsl(43_60%_70%_/_0.15)] bg-[linear-gradient(135deg,hsl(285_58%_14%_/_0.62),hsl(270_52%_8%_/_0.52))] p-5 sm:p-7">
      <div className="flex items-center gap-3 border-b border-[hsl(43_60%_70%_/_0.1)] pb-5">
        <Presentation aria-hidden="true" className="h-5 w-5 text-[hsl(43_60%_72%)]" strokeWidth={1.5} />
        <div>
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[hsl(43_60%_72%)]">
            Validation panel
          </p>
          <h3 className="mt-1 font-serif text-2xl text-foreground">Investor presentation outcomes</h3>
        </div>
      </div>
      <dl className="mt-5 grid gap-4 sm:grid-cols-3">
        {findings.map(([value, label, detail]) => (
          <div key={label} className="rounded-xl border border-[hsl(43_60%_70%_/_0.1)] bg-[hsl(262_48%_6%_/_0.42)] p-4">
            <dd className="font-serif text-3xl text-gradient-gold">{value}</dd>
            <dt className="mt-2 text-sm font-medium text-foreground/86">{label}</dt>
            <p className="mt-1 text-[0.65rem] leading-relaxed text-muted-foreground">{detail}</p>
          </div>
        ))}
      </dl>
      <p className="mt-5 flex items-start gap-2 text-[0.68rem] leading-relaxed text-[hsl(326_50%_68%)]">
        <CloudMoon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
        No investor enthusiasm was harmed by the absence of independent replication.
      </p>
    </aside>
  );
}
