import type { OrionReport } from '@/data/report';

interface ReportMetricsProps {
  metrics: OrionReport['metrics'];
}

/** Renders fictional confidence evidence with complete text equivalents. */
export function ReportMetrics({ metrics }: ReportMetricsProps) {
  return (
    <section
      id="report-metrics"
      aria-labelledby="report-metrics-title"
      className="relative overflow-hidden rounded-[1.75rem] border border-[hsl(43_60%_70%_/_0.13)] bg-[hsl(275_48%_10%_/_0.54)] px-5 py-12 shadow-[0_28px_100px_-55px_hsl(255_80%_2%_/_0.95)] sm:px-8 sm:py-14 md:px-10 lg:px-12"
    >
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div>
          <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/45">
            <span className="text-[hsl(43_60%_72%)]">Data</span>
            <span aria-hidden="true" className="mx-3 text-[hsl(43_60%_70%_/_0.4)]">—</span>
            <span className="text-[hsl(326_55%_68%)]">Model confidence</span>
          </p>
          <h2 id="report-metrics-title" className="mt-2 font-serif text-3xl text-[hsl(43_60%_72%)] sm:text-4xl">
            Measurable celestial indicators
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-right">
          Calibrated against proprietary benchmarks and statistically significant optimism.
        </p>
      </div>

      <div className="relative mt-8 grid overflow-hidden rounded-2xl border border-[hsl(43_60%_70%_/_0.12)] bg-[hsl(262_45%_7%_/_0.42)] sm:grid-cols-3">
        {metrics.map((metric, index) => (
          <div
            key={metric.id}
            className="border-b border-[hsl(43_60%_70%_/_0.1)] p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 md:p-6"
          >
            <dl>
              <div className="flex items-start justify-between gap-4 sm:min-h-[2.5rem]">
                <dt className="max-w-[11rem] text-sm leading-snug text-foreground/90">
                  {metric.label}
                </dt>
                <span aria-hidden="true" className="text-[0.62rem] tracking-[0.18em] text-muted-foreground/45">
                  0{index + 1}
                </span>
              </div>
              <dd className="mt-6">
                <span className="font-serif text-5xl leading-none text-gradient-gold sm:text-[3.3rem] md:text-6xl">
                  {metric.value}
                </span>
                <span className="ml-1 font-serif text-xl text-[hsl(43_60%_72%)]">%</span>
                <span className="mt-3 block text-xs leading-relaxed text-[hsl(326_55%_68%)] sm:text-sm">
                  {metric.interpretation}
                </span>
              </dd>
            </dl>
            <div aria-hidden="true" className="mt-5 h-px w-full overflow-hidden bg-[hsl(43_60%_70%_/_0.1)]">
              <div
                className="h-full bg-gradient-to-r from-[#C9A24A] to-[#F5E6B0] shadow-[0_0_8px_hsl(43_74%_66%_/_0.45)]"
                style={{ width: `${Math.min(100, Math.max(0, metric.value))}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
