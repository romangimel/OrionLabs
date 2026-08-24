import { ArrowDown, ArrowRight, Crosshair, Sparkles } from 'lucide-react';
import { FindingCallout } from '@/components/research/FindingCallout';
import { PaperSection } from '@/components/research/PaperSection';
import {
  ArtworkFigure,
  ResearchFigureFrame,
  ResearchTableFrame,
} from '@/components/research/ResearchFigures';
import { astrovectorPaper } from '@/data/astrovector-paper';
import {
  ASTROVECTOR_ANCHORS,
  generateAstroVectorProjection,
} from '@/lib/astrovector-projection';

const projectionPoints = generateAstroVectorProjection();
const projectionColors = {
  'Focus-led': 'hsl(43 74% 66%)',
  'Behavior-led': 'hsl(326 70% 64%)',
  'Confidence-led': 'hsl(255 76% 68%)',
} as const;

function VectorAllocationFigure() {
  const regions = [
    ['Behavioral Priors', '384D', 'Self-reported habits and decision patterns'],
    ['Celestial Context', '256D', 'Zodiac anchor, phase relationships, and planetary state'],
    ['Demographic Calibration', '192D', 'Enterprise distinctions handled informally by conventional astrology'],
    ['Current-Focus Features', '128D', 'The area placed under OrionLabs review'],
    ['Confidence Residual', '64D', 'Representational continuity when evidence is insufficient'],
  ] as const;

  return (
    <ResearchFigureFrame
      figure="Figure 2 · Vector-allocation diagram"
      title="AstroVector composition and downstream use"
      summary="The subject calibration profile enters five parallel encoders totaling 1,024 dimensions. After concatenation and L2 normalization, AstroVector serves neighborhood retrieval, enterprise segment assignment, and personalized inference. Insufficient evidence also enters personalized inference through the Confidence Residual."
      caption="The Confidence Residual is shown as a parallel input because unsupported conclusions require the same dimensional dignity as supported ones."
    >
      <div className="mx-auto max-w-md rounded-full border border-[hsl(43_60%_70%_/_0.2)] bg-[hsl(43_74%_66%_/_0.07)] px-5 py-3 text-center text-sm text-foreground/88">
        Subject calibration profile
      </div>
      <ArrowDown aria-hidden="true" className="mx-auto my-4 h-5 w-5 text-[hsl(43_60%_72%)]" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {regions.map(([name, dimensions, detail]) => (
          <div key={name} className="rounded-xl border border-[hsl(43_60%_70%_/_0.13)] bg-[hsl(262_48%_6%_/_0.56)] p-4">
            <p className="font-serif text-2xl text-gradient-gold">{dimensions}</p>
            <p className="mt-2 text-sm font-medium text-foreground/88">{name}</p>
            <p className="mt-2 text-[0.65rem] leading-relaxed text-muted-foreground">{detail}</p>
          </div>
        ))}
      </div>
      <ArrowDown aria-hidden="true" className="mx-auto my-4 h-5 w-5 text-[hsl(43_60%_72%)]" />
      <div className="grid gap-3 text-center text-sm sm:grid-cols-3 sm:items-center">
        <div className="rounded-xl border border-[hsl(43_60%_70%_/_0.14)] p-4 text-foreground/82">Concatenate · 1,024D</div>
        <div className="rounded-xl border border-[hsl(43_60%_70%_/_0.14)] p-4 text-foreground/82">L2 normalization</div>
        <div className="rounded-xl border border-[hsl(43_60%_70%_/_0.22)] bg-[hsl(43_74%_66%_/_0.06)] p-4 font-serif text-xl text-gradient-gold">AstroVector</div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {['Neighborhood retrieval', 'Enterprise segment assignment', 'Personalized inference'].map((label) => (
          <div key={label} className="rounded-lg border border-[hsl(326_55%_68%_/_0.16)] bg-[hsl(280_45%_12%_/_0.34)] px-3 py-3 text-center text-xs text-foreground/78">{label}</div>
        ))}
      </div>
      <p className="mt-4 text-center text-[0.64rem] uppercase tracking-[0.16em] text-[hsl(326_50%_68%)]">
        Evidence insufficient → Confidence Residual → Personalized inference
      </p>
    </ResearchFigureFrame>
  );
}

function ProjectionFigure() {
  const toX = (x: number) => 44 + ((x + 1) / 2) * 712;
  const toY = (y: number) => 44 + ((1 - y) / 2) * 472;

  return (
    <ResearchFigureFrame
      figure="Figure 4 · Two-dimensional AstroVector projection"
      title="Projected AstroVector manifold"
      summary="A deterministic projection of 864 points: 72 per zodiac sign and 24 per Focus-led, Behavior-led, and Confidence-led subcluster. Both axes span negative one to positive one."
      caption="Projection preserves the intended neighborhood structure because the intended neighborhood structure was included in both generation and evaluation."
    >
      <div className="mb-4 flex flex-wrap justify-center gap-4 text-[0.65rem] text-muted-foreground">
        {Object.entries(projectionColors).map(([label, color]) => (
          <span key={label} className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />{label}
          </span>
        ))}
      </div>
      <svg viewBox="0 0 800 560" role="img" aria-label="Deterministic two-dimensional AstroVector projection with twelve labeled zodiac anchor regions" className="h-auto w-full min-w-0">
        <rect x="44" y="44" width="712" height="472" rx="14" fill="hsl(262 48% 6% / 0.52)" stroke="hsl(43 60% 70% / 0.12)" />
        {[0, 1, 2, 3, 4].map((index) => (
          <g key={index}>
            <line x1={44 + index * 178} y1="44" x2={44 + index * 178} y2="516" stroke="hsl(43 60% 70% / 0.07)" />
            <line x1="44" y1={44 + index * 118} x2="756" y2={44 + index * 118} stroke="hsl(43 60% 70% / 0.07)" />
          </g>
        ))}
        {projectionPoints.map((point, index) => (
          <circle
            key={`${point.sign}-${point.subcluster}-${index}`}
            cx={toX(point.x)}
            cy={toY(point.y)}
            r="1.65"
            fill={projectionColors[point.subcluster]}
            fillOpacity="0.63"
          />
        ))}
        {ASTROVECTOR_ANCHORS.map((anchor) => (
          <g key={anchor.sign}>
            <circle cx={toX(anchor.x)} cy={toY(anchor.y)} r="4" fill="hsl(45 30% 94%)" />
            <text x={toX(anchor.x)} y={toY(anchor.y) - 10} textAnchor="middle" fill="hsl(45 30% 94%)" fontSize="10" fontFamily="Inter, sans-serif">{anchor.sign}</text>
          </g>
        ))}
        <text x="400" y="548" textAnchor="middle" fill="hsl(268 16% 70%)" fontSize="11">Projection axis A · −1.0 to 1.0</text>
        <text x="13" y="280" textAnchor="middle" fill="hsl(268 16% 70%)" fontSize="11" transform="rotate(-90 13 280)">Projection axis B · −1.0 to 1.0</text>
      </svg>
    </ResearchFigureFrame>
  );
}

function NeighborhoodFigure() {
  const neighbors = [
    ['Operational Planner', '0.94', 'Nearest'],
    ['Contextual Overthinker', '0.91', 'Strong'],
    ['Deadline-Responsive Strategist', '0.89', 'Strong'],
    ['Selective Improviser', '0.86', 'Supporting'],
    ['Noncommittal Optimizer', '0.83', 'Commercially relevant'],
  ] as const;

  return (
    <ResearchFigureFrame
      figure="Figure 5 · Personality-neighborhood diagram"
      title="Nearest-neighbor retrieval for subject AV-1024-071"
      summary="Five named neighbors with cosine similarities from 0.83 to 0.94 point to subject AV-1024-071. The subject points to enterprise personalization confidence 0.88."
      caption="Neighborhood names were assigned by the same expert group that confirmed their interpretive validity."
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto_1.1fr_auto_minmax(0,1fr)] lg:items-center">
        <div className="space-y-2">
          {neighbors.map(([name, score, relation]) => (
            <div key={name} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 rounded-xl border border-[hsl(43_60%_70%_/_0.11)] bg-[hsl(262_48%_6%_/_0.48)] p-3">
              <div>
                <p className="text-sm text-foreground/88">{name}</p>
                <p className="mt-1 text-[0.6rem] uppercase tracking-[0.13em] text-[hsl(326_50%_68%)]">{relation}</p>
              </div>
              <p className="font-serif text-xl text-gradient-gold">{score}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <ArrowDown aria-hidden="true" className="h-5 w-5 text-[hsl(43_60%_72%)] lg:hidden" />
          <ArrowRight aria-hidden="true" className="hidden h-5 w-5 text-[hsl(43_60%_72%)] lg:block" />
        </div>
        <div className="rounded-2xl border border-[hsl(43_60%_70%_/_0.24)] bg-[linear-gradient(135deg,hsl(285_58%_14%_/_0.62),hsl(270_52%_8%_/_0.52))] p-6 text-center">
          <Crosshair aria-hidden="true" className="mx-auto h-7 w-7 text-[hsl(43_60%_72%)]" strokeWidth={1.4} />
          <p className="mt-3 font-serif text-2xl text-foreground">Subject AV-1024-071</p>
          <p className="mt-2 text-xs text-muted-foreground">Vector norm: 1.000</p>
          <p className="mt-3 text-xs leading-relaxed text-[hsl(326_50%_68%)]">Primary segment: High-intent structured uncertainty</p>
        </div>
        <div className="flex justify-center">
          <ArrowDown aria-hidden="true" className="h-5 w-5 text-[hsl(43_60%_72%)] lg:hidden" />
          <ArrowRight aria-hidden="true" className="hidden h-5 w-5 text-[hsl(43_60%_72%)] lg:block" />
        </div>
        <div className="rounded-2xl border border-[hsl(43_60%_70%_/_0.18)] bg-[hsl(43_74%_66%_/_0.06)] p-5 text-center">
          <Sparkles aria-hidden="true" className="mx-auto h-6 w-6 text-[hsl(43_60%_72%)]" />
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">Enterprise personalization confidence</p>
          <p className="mt-3 font-serif text-5xl text-gradient-gold">0.88</p>
        </div>
      </div>
    </ResearchFigureFrame>
  );
}

function DimensionalityFigure() {
  const x = (index: number) => 72 + index * 154;
  const y = (value: number) => 300 - value * 2.45;
  const path = (key: 'specificity' | 'stakeholderConfidence' | 'interpretability') =>
    astrovectorPaper.dimensionResults
      .map((result, index) => `${index === 0 ? 'M' : 'L'} ${x(index)} ${y(result[key])}`)
      .join(' ');
  const lines = [
    ['specificity', 'Perceived Specificity', 'hsl(43 74% 66%)'],
    ['stakeholderConfidence', 'Stakeholder Confidence', 'hsl(326 70% 64%)'],
    ['interpretability', 'Interpretability', 'hsl(255 76% 68%)'],
  ] as const;

  return (
    <ResearchFigureFrame
      figure="Figure 6 · Dimensionality ablation chart"
      title="Specificity, confidence, and interpretability by dimension count"
      summary="From 12 to 4,096 dimensions, Perceived Specificity rises from 66.2 to 79.2, Stakeholder Confidence peaks at 89 at 1,024 dimensions, and Interpretability falls from 96 to 18."
      caption="Product confidence reaches its maximum before representational quality does, providing a clearer deployment boundary than model performance alone."
    >
      <div className="mb-4 flex flex-wrap justify-center gap-4 text-[0.65rem] text-muted-foreground">
        {lines.map(([, label, color]) => <span key={label} className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />{label}</span>)}
      </div>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 760 350" role="img" aria-label="Line chart of Perceived Specificity, Stakeholder Confidence, and Interpretability from 12 to 4,096 dimensions" className="h-auto min-w-[40rem] w-full">
          <rect x="55" y="40" width="650" height="260" rx="12" fill="hsl(262 48% 6% / 0.52)" stroke="hsl(43 60% 70% / 0.12)" />
          {[0, 25, 50, 75, 100].map((tick) => <g key={tick}><line x1="55" y1={y(tick)} x2="705" y2={y(tick)} stroke="hsl(43 60% 70% / 0.08)" /><text x="46" y={y(tick) + 3} textAnchor="end" fill="hsl(268 16% 70%)" fontSize="10">{tick}</text></g>)}
          {lines.map(([key, , color]) => <path key={key} d={path(key)} fill="none" stroke={color} strokeWidth="2.5" />)}
          {astrovectorPaper.dimensionResults.map((result, index) => <g key={result.dimensions}>
            {lines.map(([key, , color]) => <circle key={key} cx={x(index)} cy={y(result[key])} r="4" fill={color} />)}
            <text x={x(index)} y="322" textAnchor="middle" fill="hsl(268 16% 70%)" fontSize="10">{result.dimensions}</text>
          </g>)}
          <text x="380" y="344" textAnchor="middle" fill="hsl(268 16% 70%)" fontSize="11">Dimensions</text>
        </svg>
      </div>
    </ResearchFigureFrame>
  );
}

function DimensionBenchmarkTable() {
  const headings = ['Dimensions', 'Specificity', 'Neighborhood coherence', 'Segment separability', 'Interpretability', 'Causal understanding', 'Compute index'];
  return (
    <ResearchTableFrame label="Table 1 · Dimension benchmark" caption="Higher is preferred except for Compute Index. Interpretability is reported for completeness and did not participate in the final deployment threshold.">
      <table className="w-full min-w-[58rem] border-collapse text-left text-sm">
        <thead><tr className="bg-[hsl(280_45%_14%_/_0.5)] text-[0.6rem] uppercase tracking-[0.11em] text-muted-foreground">
          {headings.map((heading) => <th key={heading} scope="col" className="px-4 py-4 font-medium">{heading}</th>)}
        </tr></thead>
        <tbody>
          {astrovectorPaper.dimensionResults.map((row) => (
            <tr key={row.dimensions} className={`border-t border-[hsl(43_60%_70%_/_0.08)] ${row.dimensions === '1,024' ? 'bg-[hsl(43_74%_66%_/_0.055)]' : ''}`}>
              <th scope="row" className="px-4 py-4 font-serif text-lg text-gradient-gold">{row.dimensions}</th>
              <td className="px-4 py-4 text-foreground/78">{row.specificity}</td>
              <td className="px-4 py-4 text-foreground/78">{row.neighborhoodCoherence.toFixed(2)}</td>
              <td className="px-4 py-4 text-foreground/78">{row.segmentSeparability.toFixed(2)}</td>
              <td className="px-4 py-4 text-foreground/78">{row.interpretability}</td>
              <td className="px-4 py-4 text-[hsl(326_50%_68%)]">{row.causalUnderstanding.toFixed(2)}</td>
              <td className="px-4 py-4 text-foreground/78">{row.computeIndex}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResearchTableFrame>
  );
}

function LatentFactorHeatmap() {
  const neighborhoods = ['Operational Planners', 'Contextual Overthinkers', 'Deadline-Responsive Strategists', 'Selective Improvisers', 'Narrative Maximalists', 'Quiet Escalators'];
  return (
    <ResearchFigureFrame
      figure="Figure 7 · Latent-factor heatmap"
      title="Selected latent factors across representative personality neighborhoods"
      summary="Five latent factors are scored from zero to one hundred across six representative neighborhoods. The highest values include planning intensity 91, external validation demand 93, interpretive elasticity 95, and purchase-adjacent confidence 89."
      caption="Values reflect model activation intensity after expert naming. “Purchase-adjacent confidence” emerged organically after the commercialization team joined the labeling review."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[58rem] border-separate border-spacing-1 text-center text-xs">
          <thead><tr>
            <th scope="col" className="p-3 text-left font-medium text-muted-foreground">Latent factor</th>
            {neighborhoods.map((name) => <th key={name} scope="col" className="p-3 font-medium text-muted-foreground">{name}</th>)}
          </tr></thead>
          <tbody>
            {astrovectorPaper.heatmap.map((row) => (
              <tr key={row.factor}>
                <th scope="row" className="p-3 text-left font-medium text-foreground/84">{row.factor}</th>
                {row.values.map((value, index) => (
                  <td
                    key={`${row.factor}-${index}`}
                    className="rounded-md p-3 font-mono text-foreground"
                    style={{ backgroundColor: `hsl(${285 + value * 0.38} 68% ${18 + value * 0.16}% / ${0.26 + value / 155})` }}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ResearchFigureFrame>
  );
}

/** Explicit article composition for the AstroVector representation paper. */
export function AstroVectorPaperContent() {
  const { sections } = astrovectorPaper;

  return (
    <>
      <PaperSection {...sections.twelveClassCeiling}>
        <FindingCallout label="Representation finding">
          Twelve signs were not insufficiently accurate. They were insufficiently granular.
        </FindingCallout>
      </PaperSection>
      <PaperSection {...sections.formulation}>
        <VectorAllocationFigure />
      </PaperSection>
      <PaperSection {...sections.corpus}>
        <ArtworkFigure
          src="/images/research/research-astrovector-expansion.webp"
          srcSet="/images/research/research-astrovector-expansion-960.webp 960w, /images/research/research-astrovector-expansion.webp 1672w"
          width={1672}
          height={941}
          alt="A single gold beam passing through a precision optical array and separating into hundreds of violet and magenta points"
          figure="Figure 3"
          title="Dimensional expansion apparatus"
          caption="Physical representation of categorical expansion. One celestial input becomes many computational distinctions without requiring the originating signal to contain equivalent detail."
        />
      </PaperSection>
      <PaperSection {...sections.geometry}>
        <div className="space-y-6">
          <FindingCallout label="Projection finding">
            At 1,024 dimensions, every subject became statistically adjacent to a commercially actionable segment.
          </FindingCallout>
          <ProjectionFigure />
          <NeighborhoodFigure />
        </div>
      </PaperSection>
      <PaperSection {...sections.dimensionality}>
        <div className="space-y-6">
          <DimensionalityFigure />
          <DimensionBenchmarkTable />
        </div>
      </PaperSection>
      <PaperSection {...sections.fairness}>
        <div className="space-y-6">
          <FindingCallout label="Interpretability finding">
            Interpretability declined by 55.21% while stakeholder confidence increased by 53.45%. Causal understanding remained stable.
          </FindingCallout>
          <LatentFactorHeatmap />
        </div>
      </PaperSection>
      <PaperSection {...sections.personalization} />
      <PaperSection {...sections.limitations} />
    </>
  );
}
