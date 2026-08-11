import { SubjectSignature } from '@/components/celestial/SubjectSignature';
import type { SubjectSignatureData } from '@/lib/subject-signature';

interface CelestialCalibrationIndicatorProps {
  signature: SubjectSignatureData;
}

/**
 * Analysis-specific boundary for the shared subject-profile instrument.
 * Keeping this wrapper lets future request progress remain separate from the
 * reusable visualization rendered again in review and the final report.
 */
export function CelestialCalibrationIndicator({
  signature,
}: CelestialCalibrationIndicatorProps) {
  return (
    <SubjectSignature
      signature={signature}
      variant="analysis"
      className="mx-auto"
    />
  );
}
