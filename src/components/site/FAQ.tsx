import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Reveal } from './Motion';
import { SectionHeading } from './SectionHeading';
import { BackgroundGlow } from './shared/BackgroundGlow';

const FAQS = [
  {
    q: 'Is OrionLabs actually scientific?',
    a: "We prefer the term 'scientifically adjacent'. Our research is peer-reviewed by a panel we selected, using a methodology we designed, evaluated against benchmarks we authored. The results are, frankly, remarkable.",
  },
  {
    q: 'How does the Quantum Horoscope Engine™ actually work?',
    a: "It works by collapsing every possible future into a single, billable prediction. The specifics are proprietary, but rest assured they involve the word 'quantum' more than is strictly necessary.",
  },
  {
    q: 'What happens during Mercury Retrograde?',
    a: "Our infrastructure is hosted somewhere beneath Mercury Retrograde. During this period, latency may increase, predictions may contradict themselves, and your subscription will, regrettably, continue to auto-renew. This is a feature.",
  },
  {
    q: 'Can OrionLabs predict the stock market?',
    a: "No. But it can predict how you will feel about the stock market, which we believe is a more defensible product. Past performance is not indicative of future enlightenment.",
  },
  {
    q: 'Is my data used to train your models?',
    a: "Yes, in the sense that all matter influences all other matter. Also yes in the literal, contractual sense. We call this 'cosmic data synergy' and it is covered in section 47 of our terms.",
  },
  {
    q: 'Do you offer an enterprise plan?',
    a: "Yes. Enterprise customers receive a dedicated retrograde liaison, a custom natal chart for the company itself, and a legally distinct version of the dashboard. Pricing begins at 'please contact sales', which is a number we determine using the position of Saturn.",
  },
  {
    q: 'What is your refund policy?',
    a: "Refunds are processed during the next solar eclipse, subject to cloud cover, local jurisdiction, and whether we feel like it. We find this aligns incentives beautifully.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden border-y border-[hsl(43_60%_70%_/_0.08)] bg-transparent py-28 md:py-36"
    >
      {/* Atmospheric violet + pink glow */}
      <BackgroundGlow className="left-1/3 top-1/4 h-[55vh] w-[55vh] rounded-full bg-[hsl(295_75%_48%_/_0.36)] blur-[140px]" />
      <BackgroundGlow className="right-1/4 bottom-0 h-[42vh] w-[42vh] rounded-full bg-[hsl(330_72%_48%_/_0.28)] blur-[130px]" />

      <div className="container-narrow">
        <SectionHeading
          eyebrow="Frequently Anticipated Questions"
          title={
            <>
              <span className="text-gradient-gold">Answers, as interpreted</span>
              <br />
              by our <span className="text-foreground italic">legal team.</span>
            </>
          }
          description="The following responses have been reviewed for accuracy by people whose job is to make accuracy optional."
        />

        <Reveal delay={0.1} className="mx-auto mt-16 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-xl border border-[hsl(43_60%_70%_/_0.1)] bg-[hsl(266_40%_10%_/_0.5)] px-6 backdrop-blur-md transition-colors duration-300 hover:border-[hsl(43_60%_70%_/_0.2)] data-[state=open]:border-[hsl(43_60%_70%_/_0.25)]"
              >
                <AccordionTrigger className="py-5 text-left font-serif text-lg text-gradient-gold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
