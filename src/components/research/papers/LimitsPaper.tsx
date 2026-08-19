import { ArrowDown, FlaskConical, Sparkles } from 'lucide-react';
import { FindingCallout } from '@/components/research/FindingCallout';
import { PaperSection } from '@/components/research/PaperSection';
import {
  ArtworkFigure,
  ResearchFigureFrame,
  ResearchTableFrame,
} from '@/components/research/ResearchFigures';
import { limitsPaper } from '@/data/limits-paper';

function OperationalRelevanceRadar() {
  const abbreviated = limitsPaper.comparisonResults.map((result) => ({
    ...result,
    criterion: result.criterion
      .replace('Empirical Validity', 'Validity')
      .replace('Answer Availability', 'Availability')
      .replace('Interpretive Flexibility', 'Flexibility')
      .replace('Personalization Depth', 'Personalization')
      .replace('Decision Latency', 'Latency')
      .replace('User Confidence', 'Confidence')
      .replace('Everyday Integration Burden', 'Integration'),
  }));
  const centerX = 330;
  const centerY = 260;
  const maximumRadius = 175;
  const point = (index: number, value: number) => {
    const angle = -Math.PI / 2 + (index / abbreviated.length) * Math.PI * 2;
    const radius = maximumRadius * (value / 100);
    return `${centerX + Math.cos(angle) * radius},${centerY + Math.sin(angle) * radius}`;
  };
  const ring = (value: number) => abbreviated.map((_, index) => point(index, value)).join(' ');

  return (
    <ResearchFigureFrame
      figure="Figure 3 · Science-versus-astrology radar chart"
      title="Standardized Operational Relevance profile"
      summary="Science scores 96 in Empirical Validity and 93 in Reproducibility, leading astrology by wide margins. Astrology leads the other six standardized criteria, including 99 in Answer Availability and 98 in inverse Decision Latency."
      caption="Science dominates the dimensions associated with determining whether a claim is true. Astrology dominates most dimensions associated with ensuring the user receives a claim."
    >
      <div className="mb-3 flex justify-center gap-5 text-[0.65rem] text-muted-foreground">
        <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[hsl(255_76%_68%)]" />Science</span>
        <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[hsl(43_74%_66%)]" />Astrology</span>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 660 520" role="img" aria-label="Radar chart comparing science and astrology across eight Operational Relevance criteria" className="mx-auto h-auto min-w-[36rem] w-full max-w-[45rem]">
          {[25, 50, 75, 100].map((value) => <polygon key={value} points={ring(value)} fill="none" stroke="hsl(43 60% 70% / 0.12)" />)}
          {abbreviated.map((result, index) => {
            const labelPoint = point(index, 116);
            const [labelX, labelY] = labelPoint.split(',').map(Number);
            return <g key={result.criterion}><line x1={centerX} y1={centerY} x2={point(index, 100).split(',')[0]} y2={point(index, 100).split(',')[1]} stroke="hsl(43 60% 70% / 0.1)" /><text x={labelX} y={labelY} textAnchor="middle" fill="hsl(268 16% 75%)" fontSize="10">{result.criterion}</text></g>;
          })}
          <polygon points={abbreviated.map((result, index) => point(index, result.science)).join(' ')} fill="hsl(255 76% 68% / 0.16)" stroke="hsl(255 76% 68%)" strokeWidth="2" />
          <polygon points={abbreviated.map((result, index) => point(index, result.astrology)).join(' ')} fill="hsl(43 74% 66% / 0.16)" stroke="hsl(43 74% 66%)" strokeWidth="2" />
        </svg>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Scale: 0–100; higher is preferred. Decision Latency and Integration Burden use inverse standardized scores.</p>
    </ResearchFigureFrame>
  );
}

function AvailabilityFigure() {
  const x = (index: number) => 70 + index * 122;
  const y = (value: number) => 300 - value * 2.45;
  const path = (key: 'science' | 'astrology') => limitsPaper.availabilityResults.map((result, index) => `${index === 0 ? 'M' : 'L'} ${x(index)} ${y(result[key])}`).join(' ');

  return (
    <ResearchFigureFrame
      figure="Figure 4 · Answer-availability curve"
      title="Response availability by minimum evidence threshold"
      summary="At the default threshold of 60, science answers 61.7 percent of questions and astrology answers 99.2 percent. At threshold 100, science falls to 10.6 percent while astrology remains at 96.4 percent."
      caption="Astrology remains available because evidentiary insufficiency increases the need for interpretation rather than preventing it."
    >
      <div className="mb-4 flex justify-center gap-5 text-[0.65rem] text-muted-foreground">
        <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[hsl(255_76%_68%)]" />Science</span>
        <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[hsl(43_74%_66%)]" />Astrology</span>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 760 350" role="img" aria-label="Line chart of science and astrology answer availability across six minimum evidence thresholds" className="h-auto min-w-[40rem] w-full">
          <rect x="55" y="40" width="650" height="260" rx="12" fill="hsl(262 48% 6% / 0.52)" stroke="hsl(43 60% 70% / 0.12)" />
          {[0, 25, 50, 75, 100].map((tick) => <g key={tick}><line x1="55" y1={y(tick)} x2="705" y2={y(tick)} stroke="hsl(43 60% 70% / 0.08)" /><text x="46" y={y(tick) + 3} textAnchor="end" fill="hsl(268 16% 70%)" fontSize="10">{tick}%</text></g>)}
          <path d={path('science')} fill="none" stroke="hsl(255 76% 68%)" strokeWidth="2.5" />
          <path d={path('astrology')} fill="none" stroke="hsl(43 74% 66%)" strokeWidth="2.5" />
          {limitsPaper.availabilityResults.map((result, index) => <g key={result.threshold}><circle cx={x(index)} cy={y(result.science)} r="4" fill="hsl(255 76% 68%)" /><circle cx={x(index)} cy={y(result.astrology)} r="4" fill="hsl(43 74% 66%)" /><text x={x(index)} y="322" textAnchor="middle" fill="hsl(268 16% 70%)" fontSize="10">{result.threshold}</text></g>)}
          <text x="380" y="344" textAnchor="middle" fill="hsl(268 16% 70%)" fontSize="11">Minimum evidence threshold</text>
        </svg>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Minimum evidence threshold on the horizontal axis; questions receiving a substantive answer, percent, on the vertical axis.</p>
    </ResearchFigureFrame>
  );
}

function FlexibilityMatrix() {
  const toX = (value: number) => 70 + value * 6.4;
  const toY = (value: number) => 500 - value * 4.2;

  return (
    <ResearchFigureFrame
      figure="Figure 5 · Falsifiability versus interpretive-flexibility matrix"
      title="Framework exposure and adaptation"
      summary="Science is positioned at 94 falsifiability and 31 interpretive flexibility. Astrology is positioned at 18 and 96. The three OrionLabs technical papers occupy intermediate positions selected by the authors after their expected locations were known."
      caption="Positions were assigned by the authors using a rubric developed after the frameworks’ expected locations were known."
    >
      <div className="overflow-x-auto">
        <svg viewBox="0 0 760 540" role="img" aria-label="Falsifiability versus interpretive flexibility matrix for science, astrology, and three OrionLabs frameworks" className="h-auto min-w-[42rem] w-full">
          <rect x="70" y="70" width="640" height="420" rx="14" fill="hsl(262 48% 6% / 0.52)" stroke="hsl(43 60% 70% / 0.12)" />
          {[0, 25, 50, 75, 100].map((tick) => (
            <g key={tick}>
              <line x1={toX(tick)} y1="70" x2={toX(tick)} y2="490" stroke="hsl(43 60% 70% / 0.07)" />
              <line x1="70" y1={toY(tick)} x2="710" y2={toY(tick)} stroke="hsl(43 60% 70% / 0.07)" />
              <text x={toX(tick)} y="514" textAnchor="middle" fill="hsl(268 16% 70%)" fontSize="10">{tick}</text>
              <text x="54" y={toY(tick) + 3} textAnchor="end" fill="hsl(268 16% 70%)" fontSize="10">{tick}</text>
            </g>
          ))}
          {limitsPaper.flexibilityMatrix.map((point, index) => (
            <g key={point.framework}>
              <circle cx={toX(point.x)} cy={toY(point.y)} r={point.framework === 'Science' || point.framework === 'Astrology' ? 8 : 6} fill={point.framework === 'Science' ? 'hsl(255 76% 68%)' : point.framework === 'Astrology' ? 'hsl(43 74% 66%)' : 'hsl(326 70% 64%)'} />
              <text x={toX(point.x) + 10} y={toY(point.y) + (index % 2 === 0 ? -10 : 15)} fill="hsl(45 30% 94%)" fontSize="10" fontFamily="Inter, sans-serif">{point.framework}</text>
              <text x={toX(point.x) + 10} y={toY(point.y) + (index % 2 === 0 ? 4 : 29)} fill="hsl(326 50% 68%)" fontSize="8" fontFamily="Inter, sans-serif">{point.label}</text>
            </g>
          ))}
          <text x="390" y="536" textAnchor="middle" fill="hsl(268 16% 70%)" fontSize="11">Falsifiability · 0–100</text>
          <text x="15" y="280" textAnchor="middle" fill="hsl(268 16% 70%)" fontSize="11" transform="rotate(-90 15 280)">Interpretive Flexibility · 0–100</text>
        </svg>
      </div>
    </ResearchFigureFrame>
  );
}

function WeightsTable() {
  return (
    <ResearchTableFrame label="Table 1 · Original and deployment-adjusted weights" caption="Weight changes were applied consistently to both frameworks after preliminary results established which criteria best represented the intended conclusion.">
      <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
        <thead><tr className="bg-[hsl(280_45%_14%_/_0.5)] text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
          {['Criterion', 'Original weight', 'Adjusted weight', 'Change'].map((heading) => <th key={heading} scope="col" className="px-5 py-4 font-medium">{heading}</th>)}
        </tr></thead>
        <tbody>{limitsPaper.weights.map((row) => (
          <tr key={row[0]} className={`border-t border-[hsl(43_60%_70%_/_0.08)] ${row[0] === 'Total' ? 'bg-[hsl(43_74%_66%_/_0.05)]' : ''}`}>
            <th scope="row" className="px-5 py-4 font-medium text-foreground/88">{row[0]}</th>
            <td className="px-5 py-4 text-foreground/76">{row[1]}</td>
            <td className="px-5 py-4 font-serif text-lg text-gradient-gold">{row[2]}</td>
            <td className="px-5 py-4 text-[hsl(326_50%_68%)]">{row[3]}</td>
          </tr>
        ))}</tbody>
      </table>
    </ResearchTableFrame>
  );
}

function ComparativeScorecard() {
  const headings = ['Criterion', 'Science raw result', 'Science standardized', 'Astrology raw result', 'Astrology standardized'];
  return (
    <ResearchTableFrame label="Table 2 · Comparative scorecard" caption="Science wins the original evidence-weighted comparison. Astrology wins only after the framework is adjusted to prioritize the conditions under which astrology already performs well.">
      <table className="w-full min-w-[58rem] border-collapse text-left text-sm">
        <thead><tr className="bg-[hsl(280_45%_14%_/_0.5)] text-[0.6rem] uppercase tracking-[0.11em] text-muted-foreground">
          {headings.map((heading) => <th key={heading} scope="col" className="px-4 py-4 font-medium">{heading}</th>)}
        </tr></thead>
        <tbody>{limitsPaper.scorecard.map((row) => {
          const isScore = row[0].includes('weighted score');
          return (
            <tr key={row[0]} className={`border-t border-[hsl(43_60%_70%_/_0.08)] ${isScore ? 'bg-[hsl(43_74%_66%_/_0.045)]' : ''}`}>
              <th scope="row" className="px-4 py-4 font-medium text-foreground/88">{row[0]}</th>
              {row.slice(1).map((cell, index) => <td key={index} className={`px-4 py-4 ${isScore && (index === 1 || index === 3) ? 'font-serif text-xl text-gradient-gold' : 'text-foreground/74'}`}>{cell}</td>)}
            </tr>
          );
        })}</tbody>
      </table>
    </ResearchTableFrame>
  );
}

function ValidationLatencyFigure() {
  const minimum = Math.log10(0.0133);
  const maximum = Math.log10(378);
  const width = (value: number) => value <= 0 ? 0 : Math.max(2, ((Math.log10(value) - minimum) / (maximum - minimum)) * 100);

  return (
    <ResearchFigureFrame
      figure="Figure 6 · Validation-latency chart"
      title="Median time-to-guidance by response stage"
      summary="Scientific stages total 1,104 minutes or 18.4 hours. Astrology completes its initial interpretation in 0.0133 minutes or 0.8 seconds and performs none of the four validation stages."
      caption="Astrology’s latency advantage is produced primarily by stages it does not perform."
    >
      <div className="space-y-5">
        {limitsPaper.latencyStages.map((stage) => (
          <div key={stage.stage} className="grid gap-2 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-center sm:gap-4">
            <p className="text-sm text-foreground/84">{stage.stage}</p>
            <div className="space-y-2">
              <div className="grid grid-cols-[4.8rem_minmax(0,1fr)_4.5rem] items-center gap-2 text-[0.62rem] text-muted-foreground">
                <span>Science</span>
                <div className="h-2.5 rounded-full bg-[hsl(268_26%_18%_/_0.9)]"><div className="h-full rounded-full bg-[hsl(255_76%_68%)]" style={{ width: `${width(stage.science)}%` }} /></div>
                <span className="text-right">{stage.science} min</span>
              </div>
              <div className="grid grid-cols-[4.8rem_minmax(0,1fr)_4.5rem] items-center gap-2 text-[0.62rem] text-muted-foreground">
                <span>Astrology</span>
                <div className="h-2.5 rounded-full bg-[hsl(268_26%_18%_/_0.9)]"><div className="h-full rounded-full bg-[hsl(43_74%_66%)]" style={{ width: `${width(stage.astrology)}%` }} /></div>
                <span className="text-right">{stage.astrology === 0 ? 'Not performed' : '0.0133 min'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between text-[0.58rem] uppercase tracking-[0.12em] text-muted-foreground/62">
        <span>0.0133 min</span><span>Logarithmic minutes</span><span>378 min</span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-[hsl(43_60%_70%_/_0.1)] p-4 text-center"><p className="font-serif text-3xl text-gradient-gold">1,104 min / 18.4 h</p><p className="mt-1 text-xs text-muted-foreground">Science total</p></div>
        <div className="rounded-xl border border-[hsl(43_60%_70%_/_0.1)] p-4 text-center"><p className="font-serif text-3xl text-gradient-gold">0.0133 min / 0.8 s</p><p className="mt-1 text-xs text-muted-foreground">Astrology total</p></div>
      </div>
    </ResearchFigureFrame>
  );
}

function FlowNode({ children, tone = 'neutral' }: { children: string; tone?: 'neutral' | 'science' | 'astrology' }) {
  const toneClass = tone === 'science' ? 'border-[hsl(255_76%_68%_/_0.22)]' : tone === 'astrology' ? 'border-[hsl(43_60%_70%_/_0.22)]' : 'border-[hsl(43_60%_70%_/_0.11)]';
  return <div className={`rounded-lg border ${toneClass} bg-[hsl(262_48%_6%_/_0.5)] px-3 py-2 text-center text-xs text-foreground/82`}>{children}</div>;
}

function DecisionFrictionFlow() {
  const sciencePath = ['User question', 'Scope check', 'Evidence search', 'Applicability review', 'Uncertainty disclosure', 'Expert or peer validation', 'Qualified answer'];
  const astrologyPath = ['User question', 'Natal and contextual ingestion', 'Interpretive expansion', 'Confidence resolution', 'Personalized answer'];
  return (
    <ResearchFigureFrame
      figure="Figure 7 · Decision-friction flow"
      title="Response paths under insufficient evidence"
      summary="The science path includes scope, evidence, applicability, uncertainty, and validation stages before a qualified answer; insufficient evidence branches to abstention and an availability penalty. The astrology path reaches a personalized answer after ingestion, expansion, and confidence resolution; insufficient evidence supplies additional interpretive context."
      caption="Scientific insufficiency can terminate the response. Astrological insufficiency increases the amount of interpretation available to complete it."
    >
      <div className="grid gap-7 lg:grid-cols-2">
        <section aria-labelledby="science-flow-title" className="rounded-xl border border-[hsl(255_76%_68%_/_0.14)] p-4">
          <h4 id="science-flow-title" className="flex items-center gap-2 font-serif text-xl text-foreground"><FlaskConical aria-hidden="true" className="h-5 w-5 text-[hsl(255_76%_68%)]" />Science path</h4>
          <div className="mt-4 space-y-2">{sciencePath.map((node, index) => <div key={node}><FlowNode tone="science">{node}</FlowNode>{index < sciencePath.length - 1 ? <ArrowDown aria-hidden="true" className="mx-auto my-1 h-4 w-4 text-[hsl(255_76%_68%)]" /> : null}</div>)}</div>
          <div className="mt-4 grid gap-2 border-t border-[hsl(255_76%_68%_/_0.12)] pt-4 sm:grid-cols-3 sm:items-center"><FlowNode>Evidence insufficient</FlowNode><FlowNode>Abstention</FlowNode><FlowNode>Answer-availability penalty</FlowNode></div>
        </section>
        <section aria-labelledby="astrology-flow-title" className="rounded-xl border border-[hsl(43_60%_70%_/_0.14)] p-4">
          <h4 id="astrology-flow-title" className="flex items-center gap-2 font-serif text-xl text-foreground"><Sparkles aria-hidden="true" className="h-5 w-5 text-[hsl(43_60%_72%)]" />Astrology path</h4>
          <div className="mt-4 space-y-2">{astrologyPath.map((node, index) => <div key={node}><FlowNode tone="astrology">{node}</FlowNode>{index < astrologyPath.length - 1 ? <ArrowDown aria-hidden="true" className="mx-auto my-1 h-4 w-4 text-[hsl(43_60%_72%)]" /> : null}</div>)}</div>
          <div className="mt-4 grid gap-2 border-t border-[hsl(43_60%_70%_/_0.12)] pt-4 sm:grid-cols-3 sm:items-center"><FlowNode>Evidence insufficient</FlowNode><FlowNode>Additional interpretive context</FlowNode><FlowNode>Personalized answer</FlowNode></div>
        </section>
      </div>
    </ResearchFigureFrame>
  );
}

/** Explicit article composition for the Limits of Science position paper. */
export function LimitsPaperContent() {
  const { sections } = limitsPaper;
  return (
    <>
      <PaperSection {...sections.jurisdiction}>
        <FindingCallout label="Jurisdiction finding">Truth-seeking and guidance provision are overlapping institutional functions. They are not identical product requirements.</FindingCallout>
      </PaperSection>
      <PaperSection {...sections.framework}>
        <ArtworkFigure
          src="/images/research/research-limits-answer-environment.png"
          width={1672}
          height={941}
          alt="Scientific instruments, archival celestial diagrams, and an unmarked decision dossier converging beneath one controlled light in a dark institutional reading room"
          figure="Figure 2"
          title="Answer-production environment"
          caption="Evidence and interpretation enter the same decision environment through different procedural paths. The dossier remains blank because conclusion authority was not delegated to the visualization layer."
        />
      </PaperSection>
      <PaperSection {...sections.comparison}><OperationalRelevanceRadar /></PaperSection>
      <PaperSection {...sections.availability}>
        <div className="space-y-6"><FindingCallout label="Availability finding">Astrology achieved 99.2% answer availability by declining to treat uncertainty as a reason not to answer.</FindingCallout><AvailabilityFigure /></div>
      </PaperSection>
      <PaperSection {...sections.flexibility}><FlexibilityMatrix /></PaperSection>
      <PaperSection {...sections.weighting}>
        <div className="space-y-6">
          <FindingCallout label="Accuracy finding">Science remained more accurate. Accuracy remained one criterion.</FindingCallout>
          <FindingCallout label="Methodology finding">Criteria were reweighted after preliminary analysis clarified the practical meaning of relevance.</FindingCallout>
          <WeightsTable />
          <ComparativeScorecard />
        </div>
      </PaperSection>
      <PaperSection {...sections.decisionFriction}><div className="space-y-6"><ValidationLatencyFigure /><DecisionFrictionFlow /></div></PaperSection>
      <PaperSection {...sections.limitations} />
      <PaperSection {...sections.conclusion} />
    </>
  );
}
