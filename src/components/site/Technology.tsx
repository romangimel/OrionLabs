import { motion, useReducedMotion } from 'framer-motion';
import { Reveal, Stagger, StaggerItem } from './Motion';
import { SectionHeading } from './SectionHeading';
import { Atom, Network, Telescope, Orbit, Cpu, Waves } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BackgroundGlow } from './shared/BackgroundGlow';
import { IconTile } from './shared/IconTile';

interface Tech {
  icon: LucideIcon;
  name: string;
  tag: string;
  desc: string;
}

const TECH: Tech[] = [
  {
    icon: Atom,
    name: 'DeepConstellation™',
    tag: 'Foundation Model',
    desc: 'A 47-billion-parameter transformer trained on every recorded horoscope since 1932, cross-referenced with weather data, for reasons.',
  },
  {
    icon: Orbit,
    name: 'Quantum Horoscope Engine™',
    tag: 'Inference Layer',
    desc: 'Collapses every possible future into a single, billable prediction. Schrödinger would be proud, or furious, or both simultaneously.',
  },
  {
    icon: Network,
    name: 'Planetary Neural Network™',
    tag: 'Distributed Compute',
    desc: 'A mesh of nodes hosted somewhere beneath Mercury Retrograde. Latency may vary with celestial interference and investor sentiment.',
  },
  {
    icon: Telescope,
    name: 'AstroVector™',
    tag: 'Embedding Space',
    desc: 'Maps your personality to a 1,024-dimensional vector where Capricorns cluster suspiciously close to "owns multiple air fryers".',
  },
  {
    icon: Waves,
    name: 'Celestial Intelligence Platform™',
    tag: 'Orchestration',
    desc: 'Unifies observation, inference, and billing into a single elegant pipeline. The pipeline is also a black box. We are very proud of this.',
  },
  {
    icon: Cpu,
    name: 'Retrograde Shield™',
    tag: 'Reliability',
    desc: 'Enterprise-grade cosmic intelligence with 99.97% uptime, except during three weeks per year when everything is, regrettably, Mercury.',
  },
];

export function Technology() {
  return (
    <section
      id="technology"
      className="relative overflow-hidden border-y border-[hsl(43_60%_70%_/_0.08)] bg-transparent py-28 md:py-36"
    >
      {/* Atmospheric blue-violet + magenta glow */}
      <BackgroundGlow className="-left-1/4 top-1/4 h-[55vh] w-[55vh] rounded-full bg-[hsl(256_80%_52%_/_0.40)] blur-[130px]" />
      <BackgroundGlow className="-right-1/4 bottom-1/4 h-[50vh] w-[50vh] rounded-full bg-[hsl(326_78%_50%_/_0.38)] blur-[125px]" />

      {/* Decorative grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(43 60% 70%) 1px, transparent 1px), linear-gradient(90deg, hsl(43 60% 70%) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container-narrow relative">
        <SectionHeading
          eyebrow="The Technology"
          title={
            <>
              <span className="text-gradient-gold">Proprietary infrastructure,</span>
              <br />
              <span className="text-foreground italic">celebrity</span>{' '}
              <span className="text-foreground">confidence.</span>
            </>
          }
          description="Every layer of our stack is named, trademarked, and presented at conferences with very dim lighting. Below: the architecture your board will pretend to understand."
        />

        {/* Engine visualization */}
        <Reveal delay={0.1} className="mt-16">
          <ConstellationDiagram />
        </Reveal>

        <Stagger className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TECH.map((t) => (
            <StaggerItem key={t.name}>
              <article className="group relative h-full overflow-hidden rounded-2xl glass p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[hsl(43_60%_70%_/_0.28)]">
                <div className="flex items-center justify-between">
                  <IconTile icon={t.icon} />
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-[hsl(326_55%_62%_/_0.9)]">
                    {t.tag}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-xl text-gradient-gold">{t.name}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ConstellationDiagram — a decorative animated "engine" diagram.    */
/* ------------------------------------------------------------------ */

function ConstellationDiagram() {
  const reduce = useReducedMotion();
  const nodes = [
    { label: 'Observation', x: 50, y: 12 },
    { label: 'Ingestion', x: 18, y: 40 },
    { label: 'Inference', x: 82, y: 40 },
    { label: 'Embedding', x: 32, y: 78 },
    { label: 'Prediction', x: 68, y: 78 },
  ];
  const edges: [number, number][] = [
    [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [1, 2],
  ];

  return (
    <div className="relative mx-auto aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-2xl glass-strong p-6">
      <div className="absolute left-6 top-5 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[hsl(43_74%_66%)] animate-pulse-glow" />
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-[hsl(43_60%_70%)]">
          DeepConstellation™ — live architecture
        </span>
      </div>

      <svg viewBox="0 0 100 90" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        {/* Edges */}
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="hsl(43 60% 70% / 0.25)"
            strokeWidth="0.25"
            strokeDasharray="0.8 0.8"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0, opacity: 0 }}
            whileInView={reduce ? {} : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={n.label}>
            <motion.circle
              cx={n.x}
              cy={n.y}
              r="2.4"
              fill="hsl(262 45% 7%)"
              stroke="hsl(43 74% 66%)"
              strokeWidth="0.4"
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0 }}
              whileInView={reduce ? {} : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            />
            <motion.circle
              cx={n.x}
              cy={n.y}
              r="2.4"
              fill="none"
              stroke="hsl(43 74% 66% / 0.5)"
              strokeWidth="0.2"
              animate={reduce ? {} : { r: [2.4, 5, 2.4], opacity: [0.5, 0, 0.5] }}
              transition={reduce ? {} : { duration: 3, repeat: Infinity, delay: i * 0.4 }}
            />
            <text
              x={n.x}
              y={n.y + 6}
              textAnchor="middle"
              className="fill-muted-foreground"
              style={{ fontSize: '2.4px', letterSpacing: '0.1px' }}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute bottom-5 right-6 text-right">
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[hsl(326_55%_62%_/_0.8)]">
          Throughput: 4.2M readings / retrograde
        </p>
      </div>
    </div>
  );
}
