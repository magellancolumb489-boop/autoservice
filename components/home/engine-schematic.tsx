export function EngineSchematic() {
  return (
    <svg
      viewBox="0 0 900 600"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="orange-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="cobalt-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="block-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0a1729" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Blueprint dimensional marks */}
      <g stroke="#4a90d9" strokeWidth="0.8" fill="none" opacity="0.4">
        <line x1="120" y1="180" x2="780" y2="180" strokeDasharray="2 4" />
        <line x1="120" y1="180" x2="120" y2="170" />
        <line x1="780" y1="180" x2="780" y2="170" />
        <text x="450" y="172" fill="#4a90d9" fontSize="10" fontFamily="monospace" textAnchor="middle">
          L = 660mm
        </text>

        <line x1="820" y1="220" x2="820" y2="480" strokeDasharray="2 4" />
        <line x1="820" y1="220" x2="830" y2="220" />
        <line x1="820" y1="480" x2="830" y2="480" />
        <text
          x="838"
          y="350"
          fill="#4a90d9"
          fontSize="10"
          fontFamily="monospace"
          transform="rotate(90 838 350)"
          textAnchor="middle"
        >
          H = 260mm
        </text>
      </g>

      {/* Engine block - isometric box */}
      <g className="engine-sway" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        {/* Back face shadow */}
        <polygon
          points="180,360 720,360 780,320 240,320"
          fill="url(#block-gradient)"
          stroke="#4a90d9"
          strokeWidth="1.5"
        />

        {/* Top face of block (cylinder bank) */}
        <polygon
          points="180,360 720,360 780,320 240,320"
          fill="none"
          stroke="#4a90d9"
          strokeWidth="1.5"
        />

        {/* Front face of block */}
        <polygon
          points="180,360 720,360 720,470 180,470"
          fill="url(#block-gradient)"
          stroke="#4a90d9"
          strokeWidth="1.5"
        />

        {/* Right side face */}
        <polygon
          points="720,360 780,320 780,430 720,470"
          fill="url(#block-gradient)"
          stroke="#4a90d9"
          strokeWidth="1.5"
        />

        {/* Cooling fins on front face */}
        <g stroke="#4a90d9" strokeWidth="0.6" opacity="0.5">
          <line x1="200" y1="390" x2="700" y2="390" />
          <line x1="200" y1="410" x2="700" y2="410" />
          <line x1="200" y1="430" x2="700" y2="430" />
          <line x1="200" y1="450" x2="700" y2="450" />
        </g>

        {/* Bolt heads on front face */}
        <g fill="#4a90d9" opacity="0.6">
          {[210, 270, 330, 390, 450, 510, 570, 630, 690].map((x) => (
            <g key={x}>
              <circle cx={x} cy="375" r="2.5" />
              <circle cx={x} cy="465" r="2.5" />
            </g>
          ))}
        </g>

        {/* 4 Cylinder bores on top */}
        {[
          { cx: 270, sx: 30 },
          { cx: 405, sx: 30 },
          { cx: 540, sx: 30 },
          { cx: 675, sx: 30 },
        ].map((c, i) => (
          <g key={i}>
            {/* Outer bore ellipse */}
            <ellipse
              cx={c.cx}
              cy={340}
              rx="42"
              ry="14"
              fill="#0a0f1e"
              stroke="#4a90d9"
              strokeWidth="1.5"
            />
            {/* Inner bore ellipse */}
            <ellipse
              cx={c.cx}
              cy={340}
              rx="32"
              ry="10"
              fill="none"
              stroke="#4a90d9"
              strokeWidth="1"
              opacity="0.6"
            />
          </g>
        ))}

        {/* Cylinder heads / pistons rising up at varied heights */}
        {[
          { cx: 270, h: 60 },
          { cx: 405, h: 95 },
          { cx: 540, h: 45 },
          { cx: 675, h: 80 },
        ].map((c, i) => (
          <g key={i} stroke="#4a90d9" strokeWidth="1.5" fill="none">
            {/* Cylinder head box */}
            <rect x={c.cx - 32} y={340 - c.h} width="64" height={c.h} fill="url(#block-gradient)" />
            {/* Cylinder top */}
            <ellipse cx={c.cx} cy={340 - c.h} rx="32" ry="10" fill="#0a0f1e" />
            {/* Inner detail line */}
            <ellipse cx={c.cx} cy={340 - c.h} rx="20" ry="6" opacity="0.5" />
            {/* Vertical guide lines */}
            <line x1={c.cx - 32} y1={340 - c.h} x2={c.cx - 32} y2={340} opacity="0.5" />
            <line x1={c.cx + 32} y1={340 - c.h} x2={c.cx + 32} y2={340} opacity="0.5" />
          </g>
        ))}

        {/* Spark plugs - orange glowing dots */}
        {[
          { cx: 270, cy: 280, cls: "spark-pulse-1" },
          { cx: 405, cy: 245, cls: "spark-pulse-2" },
          { cx: 540, cy: 295, cls: "spark-pulse-3" },
          { cx: 675, cy: 260, cls: "spark-pulse-4" },
        ].map((p, i) => (
          <g key={i} className={`spark-pulse ${p.cls}`}>
            {/* Outer halo */}
            <circle cx={p.cx} cy={p.cy} r="10" fill="#ff5a1f" opacity="0.15" />
            <circle cx={p.cx} cy={p.cy} r="6" fill="#ff5a1f" opacity="0.35" />
            {/* Core */}
            <circle cx={p.cx} cy={p.cy} r="3" fill="#ffb38a" />
            <circle cx={p.cx} cy={p.cy} r="1.5" fill="#ffffff" />
            {/* Plug stem */}
            <line
              x1={p.cx}
              y1={p.cy + 4}
              x2={p.cx}
              y2={p.cy + 14}
              stroke="#ff5a1f"
              strokeWidth="1.5"
              filter="url(#orange-glow)"
            />
          </g>
        ))}

        {/* Crankshaft - horizontal ellipse below block */}
        <g>
          <ellipse
            cx="450"
            cy="510"
            rx="280"
            ry="16"
            fill="none"
            stroke="#4a90d9"
            strokeWidth="1.5"
            filter="url(#cobalt-glow)"
          />
          <ellipse
            cx="450"
            cy="510"
            rx="280"
            ry="10"
            fill="none"
            stroke="#4a90d9"
            strokeWidth="0.8"
            opacity="0.5"
          />
          {/* Crankshaft journals */}
          {[270, 405, 540, 675].map((x) => (
            <g key={x}>
              <circle cx={x} cy="510" r="8" fill="#0a0f1e" stroke="#4a90d9" strokeWidth="1.2" />
              <circle cx={x} cy="510" r="3" fill="#4a90d9" opacity="0.6" />
            </g>
          ))}
          {/* Crankshaft end pulley */}
          <circle cx="170" cy="510" r="18" fill="#0a0f1e" stroke="#ff5a1f" strokeWidth="1.5" />
          <circle cx="170" cy="510" r="10" fill="none" stroke="#ff5a1f" strokeWidth="0.8" opacity="0.6" />
          <circle cx="170" cy="510" r="3" fill="#ff5a1f" filter="url(#orange-glow)" />
        </g>

        {/* Connecting rods - thin orange-glow lines from pistons to crankshaft */}
        {[270, 405, 540, 675].map((x) => (
          <line
            key={x}
            x1={x}
            y1="345"
            x2={x}
            y2="510"
            stroke="#ff5a1f"
            strokeWidth="1.5"
            opacity="0.7"
            filter="url(#orange-glow)"
          />
        ))}

        {/* Intake manifold pipes on top-back */}
        <g stroke="#4a90d9" strokeWidth="1.5" fill="none" opacity="0.7">
          <path d="M 270 280 Q 270 230 340 230 L 540 230 Q 610 230 610 280" />
          <line x1="340" y1="230" x2="540" y2="230" />
          {/* Vertical drops to each cylinder */}
          <line x1="405" y1="245" x2="405" y2="230" strokeDasharray="2 2" />
          <line x1="540" y1="295" x2="540" y2="230" strokeDasharray="2 2" opacity="0.4" />
        </g>

        {/* Label callouts */}
        <g fontFamily="monospace" fontSize="9" fill="#4a90d9" opacity="0.7">
          <line x1="170" y1="510" x2="120" y2="540" stroke="#4a90d9" strokeWidth="0.6" />
          <text x="60" y="552">CRANKSHAFT</text>

          <line x1="405" y1="245" x2="450" y2="180" stroke="#4a90d9" strokeWidth="0.6" />
          <text x="420" y="172">SPARK · 4x</text>

          <line x1="700" y1="430" x2="760" y2="460" stroke="#4a90d9" strokeWidth="0.6" />
          <text x="735" y="478">BLOCK</text>
        </g>
      </g>

      {/* Reference frame ticks */}
      <g stroke="#4a90d9" strokeWidth="0.6" opacity="0.3">
        <line x1="50" y1="50" x2="80" y2="50" />
        <line x1="50" y1="50" x2="50" y2="80" />
        <text x="55" y="48" fill="#4a90d9" fontSize="8" fontFamily="monospace">
          0,0
        </text>
      </g>
    </svg>
  )
}
