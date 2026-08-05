import { OrbitalProfile } from '@/components/celestial/OrbitalProfile';
import type { OrbitalProfileData } from '@/lib/orbital-profile';

interface CelestialCalibrationIndicatorProps {
  profile: OrbitalProfileData;
  stage: number;
  isComplete: boolean;
}

/**
 * Analysis-specific boundary for the shared subject-profile instrument.
 * Keeping this wrapper lets future request progress remain separate from the
 * reusable visualization rendered again in review and the final report.
 */
export function CelestialCalibrationIndicator({
  profile,
  stage,
  isComplete,
}: CelestialCalibrationIndicatorProps) {
  return (
    <OrbitalProfile
      profile={profile}
      variant="analysis"
      stage={stage}
      isComplete={isComplete}
      className="mx-auto"
    />
  );
}
