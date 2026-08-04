interface CelestialCalibrationIndicatorProps {
  isComplete: boolean;
}

/**
 * Decorative orbital instrument for the analysis screen.
 * CSS owns its motion so reduced-motion preferences can provide a stable form.
 */
export function CelestialCalibrationIndicator({
  isComplete,
}: CelestialCalibrationIndicatorProps) {
  return (
    <div
      aria-hidden="true"
      className={`celestial-calibration${isComplete ? ' celestial-calibration--complete' : ''}`}
    >
      <div className="celestial-calibration__aura" />
      <div className="celestial-calibration__ticks" />
      <div className="celestial-calibration__ring celestial-calibration__ring--outer">
        <span className="celestial-calibration__marker celestial-calibration__marker--gold" />
        <span className="celestial-calibration__marker celestial-calibration__marker--pink" />
      </div>
      <div className="celestial-calibration__ring celestial-calibration__ring--middle">
        <span className="celestial-calibration__marker celestial-calibration__marker--violet" />
      </div>
      <div className="celestial-calibration__ring celestial-calibration__ring--inner" />
      <div className="celestial-calibration__axis celestial-calibration__axis--horizontal" />
      <div className="celestial-calibration__axis celestial-calibration__axis--vertical" />
      <div className="celestial-calibration__core">
        <span className="celestial-calibration__core-light" />
      </div>
    </div>
  );
}
