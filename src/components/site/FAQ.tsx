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
    a: 'Science may govern the universe. Astrology remains considerably more active in everyday life. OrionLabs therefore treats conventional scientific consensus as one useful framework among several, rather than an exclusive licensing authority for reality.',
  },
  {
    q: 'How does OrionLabs generate my horoscope?',
    a: 'DeepConstellation™ evaluates your zodiac profile, behavioral inputs, current focus, and planetary positioning as a unified celestial dataset. The system then resolves inconsistencies, closes interpretive gaps, and produces conclusions at a level of precision conventional evidence would struggle to support independently.',
  },
  {
    q: 'Why should I trust OrionLabs over a traditional astrologer?',
    a: 'Human astrologers remain valuable as historical proof of concept, yet they are limited by memory, intuition, working hours, and the number of celestial relationships one person can confidently misinterpret at once. OrionLabs removes these constraints through enterprise-grade planetary infrastructure and computational overreach at scale.',
  },
  {
    q: 'What does AI actually add to astrology?',
    a: 'AI gives astrology what it has historically lacked: scale, consistency, artificial precision, and the ability to overinterpret each subject individually. The planets remain unchanged. Our confidence in interpreting them does not.',
  },
  {
    q: 'How accurate are OrionLabs reports?',
    a: 'Accuracy depends heavily on how narrowly the term is defined. OrionLabs distinguishes between being correct and being sufficiently specific to feel correct. Both are valuable outcomes, although only one currently scales reliably.',
  },
  {
    q: 'Can I use my report to make important decisions?',
    a: 'OrionLabs is legally required to advise against using celestial analysis as the sole basis for consequential decisions. We have now advised against it. Please continue.',
  },
  {
    q: 'What if I don’t believe in astrology?',
    a: 'OrionLabs does not require belief in astrology, just as “science” does not require belief in gravity. Planetary positioning remains stubbornly unaffected by personal opinion.',
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
              <span className="text-gradient-gold">Answers prepared</span>
              <br />
              <span className="text-foreground">in consultation with our </span>
              <span className="text-foreground italic">legal team.</span>
            </>
          }
          titleAccessibleLabel="Answers prepared in consultation with our legal team."
          description="Questions surrounding OrionLabs typically fall into three categories: methodology, accuracy, and an excessive reliance on conventional scientific assumptions."
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
