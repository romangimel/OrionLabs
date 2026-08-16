import { Reveal, Stagger, StaggerItem } from './Motion';
import heliosCapitalWordmark from '../../../trusted bar/helios-capital.webp';
import meridianVenturesWordmark from '../../../trusted bar/meridian-ventures.webp';
import nadirAndApexWordmark from '../../../trusted bar/nadir-and-apex.webp';
import lumenHoldingsWordmark from '../../../trusted bar/lumen-holdings.webp';
import polarisGroupWordmark from '../../../trusted bar/polaris-group.webp';
import equinoxPartnersWordmark from '../../../trusted bar/equinox-partners.webp';
import zenithTrustWordmark from '../../../trusted bar/zenith-trust.webp';

interface TrustedInstitution {
  name: string;
  assetPath: string;
  widthClassName: string;
  gridClassName?: string;
}

const TRUSTED_INSTITUTIONS: readonly TrustedInstitution[] = [
  {
    name: 'Helios Capital',
    assetPath: heliosCapitalWordmark,
    widthClassName: 'max-w-[10.5rem]',
  },
  {
    name: 'Meridian Ventures',
    assetPath: meridianVenturesWordmark,
    widthClassName: 'max-w-[10.5rem]',
  },
  {
    name: 'Nadir & Apex',
    assetPath: nadirAndApexWordmark,
    widthClassName: 'max-w-[11rem]',
  },
  {
    name: 'Lumen Holdings',
    assetPath: lumenHoldingsWordmark,
    widthClassName: 'max-w-[10rem]',
  },
  {
    name: 'Polaris Group',
    assetPath: polarisGroupWordmark,
    widthClassName: 'max-w-[11rem]',
    gridClassName: 'md:col-start-2',
  },
  {
    name: 'Equinox Partners',
    assetPath: equinoxPartnersWordmark,
    widthClassName: 'max-w-[10.75rem]',
  },
  {
    name: 'Zenith Trust',
    assetPath: zenithTrustWordmark,
    widthClassName: 'max-w-[10.5rem]',
    gridClassName: 'col-start-4 md:col-start-auto',
  },
] as const;

const BRAND_GOLD_GRADIENT =
  'linear-gradient(135deg, #F5E6B0 0%, #E8C77A 45%, #C9A24A 100%)';

export function TrustBar() {
  return (
    <section className="relative border-y border-[hsl(43_60%_70%_/_0.08)] bg-transparent py-12">
      <div className="container-narrow">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.3em] text-[hsl(43_60%_70%)]">
            TRUSTED BY FORWARD-THINKING INSTITUTIONS WITH FLEXIBLE EVIDENTIARY THRESHOLDS
          </p>
        </Reveal>
        <Stagger className="mt-8">
          <ul className="grid grid-cols-12 gap-y-4" aria-label="Trusted institutions">
            {TRUSTED_INSTITUTIONS.map((institution) => (
              <li
                key={institution.name}
                className={`col-span-6 flex min-w-0 items-start justify-center px-2 md:col-span-3 ${institution.gridClassName ?? ''}`}
              >
                <StaggerItem className="flex min-h-[5.5rem] w-full items-start justify-center">
                  <span
                    role="img"
                    aria-label={institution.name}
                    className={`block aspect-[3/1] w-full transition-opacity duration-300 hover:opacity-80 ${institution.widthClassName}`}
                    style={{
                      backgroundImage: BRAND_GOLD_GRADIENT,
                      maskImage: `url("${institution.assetPath}")`,
                      maskPosition: 'top center',
                      maskRepeat: 'no-repeat',
                      maskSize: 'contain',
                      WebkitMaskImage: `url("${institution.assetPath}")`,
                      WebkitMaskPosition: 'top center',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskSize: 'contain',
                    }}
                  />
                </StaggerItem>
              </li>
            ))}
          </ul>
        </Stagger>
      </div>
    </section>
  );
}
