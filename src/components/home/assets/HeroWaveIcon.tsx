const HeroWaveIcon = ({ style }: { style: React.CSSProperties }) => (
  <svg
    style={style}
    width="100%"
    height="auto"
    viewBox="0 0 1920 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e7eef8" />
        <stop offset="25%" stopColor="#e7eef8" />
        <stop offset="50%" stopColor="#e8eef8" />
        <stop offset="75%" stopColor="#e8eef8" />
        <stop offset="100%" stopColor="#e8eef8" />
      </linearGradient>
    </defs>
    <path
      d="M0 137.608C0 137.608 48.061 153.774 74.3738 161.909C434.652 273.291 728.19 -40.6689 1088.45 57.4406C1448.72 155.555 1587.08 104.045 1912.86 2.31751C1915.07 1.53846 1917.29 0.765975 1919.51 9.66507e-05C1921.73 -0.765744 1920.81 4550 1920.81 4550H0L0 137.608Z"
      fill="url(#customGradient)"
    />
  </svg>
);

export default HeroWaveIcon;
