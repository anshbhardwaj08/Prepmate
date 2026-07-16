const Logo = ({ size = "default" }) => {
  const isSmall = size === "small";
  return (
    <svg
      width={isSmall ? 130 : 168}
      height={isSmall ? 36 : 44}
      viewBox="0 0 168 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PrepMate AI"
    >
      <defs>
        <linearGradient id="pm-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>

      {/* Icon mark — hexagon neural node */}
      <rect width="44" height="44" rx="12" fill="#0F172A" />
      <rect width="44" height="44" rx="12" fill="url(#pm-grad)" fillOpacity="0.12" />

      {/* Hexagon outline */}
      <polygon
        points="22,5 36,13 36,29 22,37 8,29 8,13"
        fill="none"
        stroke="url(#pm-grad)"
        strokeWidth="1.4"
      />

      {/* Center node */}
      <circle cx="22" cy="21" r="4" fill="url(#pm-grad)" />

      {/* Connector spokes */}
      <line x1="22" y1="5"  x2="22" y2="17" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="22" y1="25" x2="22" y2="37" stroke="#A78BFA" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="8"  y1="13" x2="18" y2="18" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="26" y1="24" x2="36" y2="29" stroke="#A78BFA" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="36" y1="13" x2="26" y2="18" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="18" y1="24" x2="8"  y2="29" stroke="#A78BFA" strokeWidth="1" strokeDasharray="2 2" />

      {/* Vertex dots */}
      <circle cx="22" cy="5"  r="2.2" fill="#38BDF8" />
      <circle cx="36" cy="13" r="2.2" fill="#A78BFA" />
      <circle cx="36" cy="29" r="2.2" fill="#A78BFA" />
      <circle cx="22" cy="37" r="2.2" fill="#38BDF8" />
      <circle cx="8"  cy="29" r="2.2" fill="#38BDF8" />
      <circle cx="8"  cy="13" r="2.2" fill="#A78BFA" />

      {/* Wordmark */}
      <text
        x="52"
        y="26"
        fontFamily="'Inter', system-ui, sans-serif"
        fontSize="17"
        fontWeight="800"
        fill="white"
        letterSpacing="-0.3"
      >
        PrepMate
      </text>
      <text
        x="53"
        y="38"
        fontFamily="'Inter', system-ui, sans-serif"
        fontSize="8.5"
        fontWeight="500"
        fill="#94A3B8"
        letterSpacing="3"
      >
        AI PLATFORM
      </text>

      {/* "AI" accent badge next to PrepMate */}
      <rect x="128" y="12" width="22" height="14" rx="4" fill="url(#pm-grad)" fillOpacity="0.18" />
      <text
        x="139"
        y="22.5"
        fontFamily="'Inter', system-ui, sans-serif"
        fontSize="9"
        fontWeight="700"
        fill="#A78BFA"
        textAnchor="middle"
        letterSpacing="1"
      >
        AI
      </text>
    </svg>
  );
};

export default Logo;