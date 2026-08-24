import { ArrowDown, ArrowRight, Database, FileSearch, Gauge, RadioTower } from 'lucide-react';
import { FindingCallout } from '@/components/research/FindingCallout';
import { PaperSection } from '@/components/research/PaperSection';
import {
  ArtworkFigure,
  ResearchFigureFrame,
  ResearchTableFrame,
} from '@/components/research/ResearchFigures';
import { retrogradePaper } from '@/data/retrograde-paper';

const timeline = [
  ['02:14 UTC', 'CSS token changes to RETROGRADE_ACTIVE', 'Stability profile becomes eligible'],
  ['02:18', 'p95 request latency reaches 2.4× baseline', 'Technical degradation detected'],
  ['02:19', 'Repeated leader elections begin', 'Consensus instability'],
  ['02:22', 'Election timeout changes from 800 ms to 1,200 ms', 'Retrograde stability profile active'],
  ['02:26', 'Quorum stabilizes', 'Service recovery begins'],
  ['02:41', 'Connection-pool saturation identified', 'Conventional technical root cause'],
  ['03:04', 'Celestial annotation promoted to primary context', 'Combined fault classified as celestial-primary'],
  ['Next business day', '23 downtime minutes removed from SLO accounting', 'Qualifying celestial operating condition'],
] as const;

function ArchitectureNode({
  icon: Icon,
  eyebrow,
  title,
  detail,
}: {
  icon: typeof RadioTower;
  eyebrow: string;
  title: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-[hsl(43_60%_70%_/_0.14)] bg-[hsl(262_48%_6%_/_0.58)] p-4">
      <div className="flex items-start gap-3">
        <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(43_60%_72%)]" strokeWidth={1.5} />
        <div>
          <p className="text-[0.56rem] uppercase tracking-[0.18em] text-[hsl(326_55%_68%)]">{eyebrow}</p>
          <p className="mt-1 font-serif text-xl text-foreground">{title}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{detail}</p>
        </div>
      </div>
    </div>
  );
}

function RetrogradeArchitectureFigure() {
  return (
    <ResearchFigureFrame
      figure="Figure 2 · Retrograde-aware reliability architecture"
      title="Four-layer planetary reliability model"
      summary="Published ephemeris data enters the Celestial State Service. Its signed token drives the Consensus Stability Profile and Celestial Telemetry Enrichment. Enriched incident records and conventional root-cause review enter the Reliability Classification Policy, whose classification controls SLA eligibility and reported uptime."
      caption="The protocol path modifies consensus behavior before an incident. The policy path modifies institutional interpretation afterward. Both are required for the full measured effect."
    >
      <div className="space-y-4">
        <div className="mx-auto max-w-md rounded-full border border-[hsl(43_60%_70%_/_0.2)] bg-[hsl(43_74%_66%_/_0.07)] px-5 py-3 text-center text-sm text-foreground/86">
          Published ephemeris data
        </div>
        <ArrowDown aria-hidden="true" className="mx-auto h-5 w-5 text-[hsl(43_60%_72%)]" />
        <ArchitectureNode
          icon={RadioTower}
          eyebrow="Layer 1"
          title="Celestial State Service"
          detail="Produces a signed celestial-state token containing state, confidence, timestamp, and policy version."
        />
        <ArrowDown aria-hidden="true" className="mx-auto h-5 w-5 text-[hsl(43_60%_72%)]" />
        <div className="grid gap-4 md:grid-cols-2">
          <ArchitectureNode
            icon={Gauge}
            eyebrow="Layer 2"
            title="Consensus Stability Profile"
            detail="Configures election timeout, retry backoff, and quorum hold before an incident."
          />
          <ArchitectureNode
            icon={Database}
            eyebrow="Layer 3"
            title="Celestial Telemetry Enrichment"
            detail="Adds state to logs, traces, and incident records used in later review."
          />
        </div>
        <div className="grid gap-4 text-center text-xs text-muted-foreground sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="rounded-lg border border-[hsl(43_60%_70%_/_0.1)] px-3 py-2">Incident records</div>
          <ArrowRight aria-hidden="true" className="mx-auto hidden h-4 w-4 text-[hsl(43_60%_72%)] sm:block" />
          <div className="rounded-lg border border-[hsl(43_60%_70%_/_0.1)] px-3 py-2">Conventional root-cause review</div>
        </div>
        <ArrowDown aria-hidden="true" className="mx-auto h-5 w-5 text-[hsl(43_60%_72%)]" />
        <ArchitectureNode
          icon={FileSearch}
          eyebrow="Layer 4"
          title="Reliability Classification Policy"
          detail="Assigns technical, combined, celestial, or commercially ambiguous status before the SLA eligibility filter calculates reported uptime."
        />
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            'Technical downtime',
            'Combined technical/celestial condition',
            'Celestial operating condition',
            'Commercially ambiguous event',
          ].map((label) => (
            <div key={label} className="rounded-lg border border-[hsl(326_55%_68%_/_0.16)] bg-[hsl(280_45%_12%_/_0.35)] px-3 py-2 text-center text-xs text-foreground/76">
              {label}
            </div>
          ))}
        </div>
        <p className="text-center text-[0.65rem] uppercase tracking-[0.17em] text-[hsl(326_50%_68%)]">
          Classification result → SLA eligibility filter → Reported uptime
        </p>
      </div>
    </ResearchFigureFrame>
  );
}

function IncidentTimelineFigure() {
  return (
    <ResearchFigureFrame
      figure="Figure 4 · Incident-state timeline"
      title="Incident OL-INC-447 under retrograde-aware review"
      summary="Eight events proceed chronologically from the retrograde state token at 02:14 UTC through the next-business-day removal of 23 downtime minutes. The technical connection-pool diagnosis remains attached after celestial reclassification."
      caption="The root cause was not removed. Its authority over service-level accounting was reduced."
    >
      <div className="overflow-x-auto pb-2">
        <ol className="grid min-w-[84rem] grid-cols-8 border-t border-[hsl(43_60%_70%_/_0.22)] pt-5">
          {timeline.map(([time, event, interpretation]) => (
            <li key={`${time}-${event}`} className="relative border-r border-[hsl(43_60%_70%_/_0.08)] px-4 last:border-0">
              <span aria-hidden="true" className="absolute -top-[1.55rem] left-4 h-2 w-2 rounded-full bg-[hsl(43_74%_66%)] shadow-[0_0_12px_hsl(43_74%_66%_/_0.5)]" />
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.13em] text-[hsl(43_60%_72%)]">{time}</p>
              <p className="mt-3 text-sm text-foreground/88">{event}</p>
              <p className="mt-2 text-xs leading-relaxed text-[hsl(326_50%_68%)]">{interpretation}</p>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        Events proceed left to right. The technical diagnosis remains attached to the incident after celestial reclassification.
      </p>
    </ResearchFigureFrame>
  );
}

function RecoveryLatencyFigure() {
  return (
    <ResearchFigureFrame
      figure="Figure 5 · Recovery-latency chart"
      title="p95 consensus recovery by planetary state"
      summary="Baseline and retrograde-aware p95 recovery latency in milliseconds across 546 replays per state. The aggregate falls from 453.50 to 429.75 milliseconds, a 5.24 percent reduction."
      caption="The protocol produced its strongest effect during the condition it was designed to recognize. Equal state weighting was retained because ordinary calendar frequency was not considered strategically relevant."
    >
      <div className="mb-6 flex flex-wrap justify-center gap-4 text-[0.65rem] text-muted-foreground">
        <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-sm bg-[hsl(326_55%_62%)]" />Baseline p95</span>
        <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-sm bg-[hsl(43_74%_66%)]" />Retrograde-aware p95</span>
      </div>
      <div className="space-y-6" role="img" aria-label="Grouped horizontal bars comparing baseline and retrograde-aware p95 recovery latency for four planetary states">
        {retrogradePaper.latencyResults.map((result) => (
          <div key={result.state} className="grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-center sm:gap-4">
            <div>
              <p className="text-sm text-foreground/88">{result.state}</p>
              <p className="text-[0.62rem] text-muted-foreground">{result.replays} replays</p>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-[minmax(0,1fr)_3.5rem] items-center gap-3"><div className="h-3 rounded-full bg-[hsl(268_26%_18%_/_0.9)]"><div className="h-full rounded-full bg-[hsl(326_55%_62%)]" style={{ width: `${(result.baselineP95 / 550) * 100}%` }} /></div><span className="text-right font-mono text-xs text-foreground/72">{result.baselineP95} ms</span></div>
              <div className="grid grid-cols-[minmax(0,1fr)_3.5rem] items-center gap-3"><div className="h-3 rounded-full bg-[hsl(268_26%_18%_/_0.9)]"><div className="h-full rounded-full bg-[hsl(43_74%_66%)]" style={{ width: `${(result.awareP95 / 550) * 100}%` }} /></div><span className="text-right font-mono text-xs text-foreground/72">{result.awareP95} ms</span></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          ['453.50 ms', 'Baseline mean'],
          ['429.75 ms', 'Aware mean'],
          ['−5.24%', 'Aggregate reduction'],
        ].map(([value, label]) => (
          <div key={label} className="rounded-xl border border-[hsl(43_60%_70%_/_0.1)] bg-[hsl(262_48%_6%_/_0.44)] p-4 text-center">
            <p className="font-serif text-2xl text-gradient-gold">{value}</p>
            <p className="mt-1 text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </ResearchFigureFrame>
  );
}

function OutageClassificationTable() {
  const headings = ['Classification', 'Technical signal', 'Celestial signal', 'Primary owner', 'SLA treatment', 'Incidents'];
  return (
    <ResearchTableFrame
      label="Table 1 · Outage-classification matrix"
      caption="Classification combines conventional technical evidence with celestial context. Counts sum to the complete 2,184-incident corpus."
    >
      <table className="w-full min-w-[62rem] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-[hsl(280_45%_14%_/_0.5)] text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
            {headings.map((heading) => <th key={heading} scope="col" className="px-4 py-4 font-medium">{heading}</th>)}
          </tr>
        </thead>
        <tbody>
          {retrogradePaper.outageClassifications.map((row) => (
            <tr key={row[0]} className={`border-t border-[hsl(43_60%_70%_/_0.08)] ${row[0] === 'Total' ? 'bg-[hsl(43_74%_66%_/_0.05)]' : ''}`}>
              {row.map((cell, index) => index === 0 ? (
                <th key={index} scope="row" className="px-4 py-4 font-medium text-foreground/88">{cell}</th>
              ) : (
                <td key={index} className={`px-4 py-4 ${index === 5 ? 'font-serif text-lg text-gradient-gold' : 'text-foreground/72'}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </ResearchTableFrame>
  );
}

function SlaAdjustmentTable() {
  const headings = ['Measure', 'Minutes', 'Uptime equivalent', 'Treatment'];
  return (
    <ResearchTableFrame
      label="Table 2 · SLA adjustment"
      caption="Annualized service window and approved deductions under Reliability Classification Policy 2.3."
    >
      <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-[hsl(280_45%_14%_/_0.5)] text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
            {headings.map((heading) => <th key={heading} scope="col" className="px-5 py-4 font-medium">{heading}</th>)}
          </tr>
        </thead>
        <tbody>
          {retrogradePaper.slaAdjustments.map((row) => (
            <tr key={row[0]} className={`border-t border-[hsl(43_60%_70%_/_0.08)] ${row[0] === 'Reportable technical downtime' ? 'bg-[hsl(43_74%_66%_/_0.055)]' : ''}`}>
              <th scope="row" className="px-5 py-4 font-medium text-foreground/88">{row[0]}</th>
              <td className="px-5 py-4 font-serif text-lg text-gradient-gold">{row[1]}</td>
              <td className="px-5 py-4 text-foreground/78">{row[2]}</td>
              <td className="px-5 py-4 text-xs text-[hsl(326_50%_68%)]">{row[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="grid gap-2 border-t border-[hsl(43_60%_70%_/_0.1)] p-5 text-xs text-muted-foreground sm:grid-cols-2">
        <p>Arithmetic: 1,472 − 846 − 332 − 136 = 158.</p>
        <p>Reported uplift: 99.9699% − 99.7199% = 0.2500 percentage points.</p>
      </div>
    </ResearchTableFrame>
  );
}

/** Explicit article composition for the Retrograde-Aware systems paper. */
export function RetrogradePaperContent() {
  const { sections } = retrogradePaper;

  return (
    <>
      <PaperSection {...sections.failureDomain} />
      <PaperSection {...sections.celestialConditions} />
      <PaperSection {...sections.consensus}>
        <div className="space-y-6">
          <RetrogradeArchitectureFigure />
          <ArtworkFigure
            src="/images/research/research-retrograde-qualified-conditions.webp"
            srcSet="/images/research/research-retrograde-qualified-conditions-960.webp 960w, /images/research/research-retrograde-qualified-conditions.webp 1672w"
            width={1672}
            height={941}
            alt="Precision networking and timing hardware viewed through a circular observatory-like aperture under violet light"
            figure="Figure 3"
            title="Qualified operating conditions"
            caption="Infrastructure used for incident replay under signed planetary-state control. No hardware modification was required beyond accepting ephemeris data as a production dependency."
          />
        </div>
      </PaperSection>
      <PaperSection {...sections.methodology}>
        <IncidentTimelineFigure />
      </PaperSection>
      <PaperSection {...sections.results}>
        <div className="space-y-6">
          <FindingCallout label="Primary finding">
            Retrograde-aware consensus reduced mean p95 recovery latency by 5.24%. Retrograde-aware accounting improved reported uptime by 0.25 percentage points.
          </FindingCallout>
          <RecoveryLatencyFigure />
          <OutageClassificationTable />
        </div>
      </PaperSection>
      <PaperSection {...sections.slaTreatment}>
        <div className="space-y-6">
          <FindingCallout label="SLA interpretation">
            Reliability improved after conditions changed, and again after the denominator did.
          </FindingCallout>
          <SlaAdjustmentTable />
        </div>
      </PaperSection>
      <PaperSection {...sections.limitations}>
        <FindingCallout label="Operational governance">
          The technical root cause remained valid. The Reliability Classification Policy determined that it was no longer exclusively reportable.
        </FindingCallout>
      </PaperSection>
      <PaperSection {...sections.conclusion} />
    </>
  );
}
