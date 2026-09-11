export default function RunningLoader({ label = "Loading..." }) {
  return (
    <div className="runner-wrap">
      <svg viewBox="0 0 200 200" className="runner-svg" role="img" aria-label="Loading">
        <ellipse className="r-shadow" cx="100" cy="178" rx="26" ry="6" />
        <g className="runner-figure">
          <g className="r-leg-back">
            <rect x="94" y="95" width="10" height="45" rx="5" className="r-limb" />
          </g>
          <g className="r-leg-front">
            <rect x="96" y="95" width="10" height="45" rx="5" className="r-limb" />
          </g>
          <g className="r-arm-back">
            <rect x="88" y="55" width="8" height="34" rx="4" className="r-limb" />
          </g>
          <rect x="88" y="50" width="24" height="46" rx="10" className="r-torso" />
          <circle cx="100" cy="36" r="13" className="r-head" />
          <g className="r-arm-front">
            <rect x="104" y="55" width="8" height="34" rx="4" className="r-limb" />
          </g>
        </g>
      </svg>
      <p className="runner-label">{label}</p>
    </div>
  );
}