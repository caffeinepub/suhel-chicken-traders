export function RoosterLogoSvg({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="rooster-logo-title"
    >
      <title id="rooster-logo-title">Suhel Chicken Traders Logo</title>
      {/* Body */}
      <ellipse cx="52" cy="65" rx="22" ry="20" fill="#CC0000" />
      {/* Wing highlight */}
      <path
        d="M35 60 Q45 50 65 62 Q55 72 35 68 Z"
        fill="#8B0000"
        opacity="0.7"
      />
      {/* Neck */}
      <ellipse cx="48" cy="44" rx="10" ry="14" fill="#CC0000" />
      {/* Head */}
      <circle cx="50" cy="32" r="11" fill="#CC0000" />
      {/* Beak */}
      <path d="M60 31 L68 33 L60 36 Z" fill="#FFD700" />
      {/* Eye */}
      <circle cx="56" cy="30" r="3" fill="white" />
      <circle cx="57" cy="30" r="1.5" fill="#1A1A1A" />
      {/* Comb */}
      <path
        d="M44 22 Q46 15 50 21 Q52 13 54 20 Q56 12 57 19 Q60 14 60 21"
        stroke="#CC0000"
        strokeWidth="0"
        fill="#CC0000"
      />
      <ellipse cx="50" cy="21" rx="8" ry="4" fill="#CC0000" />
      <circle cx="44" cy="20" r="3" fill="#8B0000" />
      <circle cx="50" cy="17" r="3.5" fill="#8B0000" />
      <circle cx="56" cy="20" r="3" fill="#8B0000" />
      {/* Wattle */}
      <ellipse cx="62" cy="37" rx="4" ry="5" fill="#8B0000" />
      {/* Tail feathers */}
      <path d="M70 55 Q82 42 85 50 Q80 58 72 62 Z" fill="#8B0000" />
      <path
        d="M68 50 Q80 35 84 43 Q78 52 70 56 Z"
        fill="#CC0000"
        opacity="0.8"
      />
      <path
        d="M66 58 Q80 50 82 58 Q76 65 68 64 Z"
        fill="#8B0000"
        opacity="0.9"
      />
      {/* Legs */}
      <rect x="44" y="82" width="5" height="12" rx="2" fill="#FFD700" />
      <rect x="54" y="82" width="5" height="12" rx="2" fill="#FFD700" />
      {/* Feet */}
      <path
        d="M40 94 L49 94 L46 97"
        stroke="#FFD700"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M50 94 L59 94 L56 97"
        stroke="#FFD700"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Shine */}
      <ellipse cx="46" cy="30" rx="3" ry="2" fill="white" opacity="0.2" />
    </svg>
  );
}

export function HeroRoosterSvg() {
  return (
    <svg
      width="220"
      height="220"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="hero-rooster-title"
    >
      <title id="hero-rooster-title">Decorative rooster illustration</title>
      {/* Glow effect */}
      <defs>
        <radialGradient id="bodyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF2222" />
          <stop offset="100%" stopColor="#8B0000" />
        </radialGradient>
        <radialGradient id="wingGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#CC0000" />
          <stop offset="100%" stopColor="#5A0000" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Shadow */}
      <ellipse cx="100" cy="190" rx="55" ry="8" fill="rgba(0,0,0,0.3)" />

      {/* Tail feathers - back layer */}
      <path d="M140 100 Q165 70 172 85 Q168 100 148 112 Z" fill="#8B0000" />
      <path
        d="M142 92 Q168 58 176 72 Q170 90 150 100 Z"
        fill="#CC0000"
        opacity="0.9"
      />
      <path d="M138 110 Q165 85 170 98 Q162 112 142 118 Z" fill="#6B0000" />
      <path
        d="M145 82 Q170 52 178 65 Q172 82 152 92 Z"
        fill="#FF2222"
        opacity="0.7"
      />

      {/* Body */}
      <ellipse cx="95" cy="125" rx="45" ry="42" fill="url(#bodyGrad)" />

      {/* Wing */}
      <path
        d="M58 115 Q72 95 108 118 Q95 140 58 132 Z"
        fill="url(#wingGrad)"
        opacity="0.85"
      />
      {/* Wing feather detail */}
      <path
        d="M62 122 Q75 108 100 120"
        stroke="#FF4444"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M64 128 Q77 114 104 126"
        stroke="#FF4444"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />

      {/* Neck */}
      <ellipse cx="90" cy="85" rx="18" ry="26" fill="#CC0000" />
      {/* Neck feather detail */}
      <path
        d="M76 78 Q82 70 90 74 Q82 80 76 82Z"
        fill="#8B0000"
        opacity="0.6"
      />

      {/* Head */}
      <circle
        cx="90"
        cy="60"
        r="22"
        fill="url(#bodyGrad)"
        filter="url(#glow)"
      />

      {/* Comb - main */}
      <ellipse cx="90" cy="40" rx="15" ry="6" fill="#CC0000" />
      <circle cx="79" cy="38" r="7" fill="#8B0000" />
      <circle cx="89" cy="33" r="8" fill="#CC0000" />
      <circle cx="99" cy="37" r="7" fill="#8B0000" />
      <circle cx="89" cy="33" r="5" fill="#FF2222" />

      {/* Beak */}
      <path d="M110 59 L122 62 L110 66 Z" fill="#FFD700" />
      <path d="M110 62 L120 62 L110 64 Z" fill="#B8960C" />

      {/* Eye */}
      <circle cx="104" cy="57" r="7" fill="white" />
      <circle cx="105" cy="57" r="4" fill="#1A1A1A" />
      <circle cx="103" cy="55" r="1.5" fill="white" opacity="0.8" />

      {/* Wattle */}
      <ellipse cx="116" cy="72" rx="7" ry="9" fill="#8B0000" />
      <ellipse cx="113" cy="74" rx="5" ry="7" fill="#CC0000" opacity="0.7" />

      {/* Legs */}
      <rect x="78" y="162" width="10" height="22" rx="4" fill="#FFD700" />
      <rect x="96" y="162" width="10" height="22" rx="4" fill="#FFD700" />

      {/* Feet */}
      <path
        d="M72 184 L88 184 M78 184 L74 190"
        stroke="#FFD700"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M90 184 L106 184 M96 184 L92 190"
        stroke="#FFD700"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Gold feather tips */}
      <path d="M72 162 Q75 155 78 162" fill="#FFD700" opacity="0.6" />
      <path d="M107 162 Q110 155 113 162" fill="#FFD700" opacity="0.6" />

      {/* Shine on body */}
      <ellipse cx="78" cy="112" rx="12" ry="8" fill="white" opacity="0.08" />
      <ellipse cx="82" cy="57" rx="5" ry="4" fill="white" opacity="0.15" />
    </svg>
  );
}

export function CuttingChickenSvg() {
  return (
    <svg
      width="160"
      height="130"
      viewBox="0 0 160 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="cutting-chicken-title"
    >
      <title id="cutting-chicken-title">
        Raw cutting chicken pieces illustration
      </title>
      <defs>
        <radialGradient id="meatGrad1" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FF8080" />
          <stop offset="60%" stopColor="#E84040" />
          <stop offset="100%" stopColor="#CC2200" />
        </radialGradient>
        <radialGradient id="meatGrad2" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FF9090" />
          <stop offset="60%" stopColor="#F04444" />
          <stop offset="100%" stopColor="#BB1100" />
        </radialGradient>
        <radialGradient id="skinGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#FFE0B2" />
          <stop offset="100%" stopColor="#FFCC80" />
        </radialGradient>
      </defs>

      {/* Cutting board background */}
      <rect
        x="5"
        y="85"
        width="150"
        height="35"
        rx="8"
        fill="#3D1C02"
        opacity="0.7"
      />
      <rect
        x="8"
        y="87"
        width="144"
        height="31"
        rx="6"
        fill="#5C2D0A"
        opacity="0.5"
      />
      {/* Board grain lines */}
      <line
        x1="25"
        y1="87"
        x2="25"
        y2="118"
        stroke="#4A2408"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="55"
        y1="87"
        x2="55"
        y2="118"
        stroke="#4A2408"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="85"
        y1="87"
        x2="85"
        y2="118"
        stroke="#4A2408"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="115"
        y1="87"
        x2="115"
        y2="118"
        stroke="#4A2408"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="135"
        y1="87"
        x2="135"
        y2="118"
        stroke="#4A2408"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Chicken leg/drumstick piece */}
      <ellipse cx="35" cy="70" rx="20" ry="14" fill="url(#meatGrad1)" />
      <rect
        x="28"
        y="70"
        width="14"
        height="22"
        rx="5"
        fill="url(#meatGrad1)"
      />
      <rect x="33" y="86" width="4" height="14" rx="2" fill="#E0E0E0" />
      <ellipse
        cx="35"
        cy="68"
        rx="18"
        ry="11"
        fill="url(#skinGrad)"
        opacity="0.6"
      />
      {/* Meat texture */}
      <path
        d="M20 65 Q28 60 42 68"
        stroke="#CC2200"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M22 70 Q30 66 44 72"
        stroke="#CC2200"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

      {/* Chicken breast piece */}
      <path
        d="M65 45 Q80 32 105 40 Q120 50 115 68 Q100 78 75 75 Q58 68 65 45 Z"
        fill="url(#meatGrad2)"
      />
      <path
        d="M67 46 Q82 35 104 42 Q116 51 112 67 Q98 75 76 72 Q62 65 67 46 Z"
        fill="url(#skinGrad)"
        opacity="0.5"
      />
      {/* Breast texture lines */}
      <path
        d="M72 50 Q85 44 102 52"
        stroke="#BB1100"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M70 58 Q85 52 104 60"
        stroke="#BB1100"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M72 65 Q88 60 108 67"
        stroke="#BB1100"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />

      {/* Chicken wing piece */}
      <path
        d="M115 55 Q130 45 148 52 Q155 62 145 72 Q130 78 118 70 Z"
        fill="url(#meatGrad1)"
      />
      <path
        d="M117 56 Q131 47 147 54 Q152 62 143 70 Q130 75 120 68 Z"
        fill="url(#skinGrad)"
        opacity="0.55"
      />
      {/* Wing joint */}
      <circle cx="118" cy="65" r="5" fill="#E84040" />
      <circle cx="118" cy="65" r="3" fill="#CC2200" />

      {/* Bone visible on drumstick */}
      <circle cx="35" cy="99" r="4" fill="#F5F5F5" />
      <circle cx="35" cy="99" r="2.5" fill="white" />

      {/* Herb garnish */}
      <path
        d="M10 100 Q13 92 16 100"
        stroke="#22AA44"
        strokeWidth="2"
        fill="none"
      />
      <path d="M13 96 Q10 90 14 88 Q18 90 15 96" fill="#22AA44" opacity="0.8" />

      {/* Fresh badge shine */}
      <ellipse
        cx="85"
        cy="48"
        rx="8"
        ry="5"
        fill="white"
        opacity="0.12"
        transform="rotate(-15 85 48)"
      />
    </svg>
  );
}

export function ZindaChickenSvg() {
  return (
    <svg
      width="160"
      height="130"
      viewBox="0 0 160 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="zinda-chicken-title"
    >
      <title id="zinda-chicken-title">Live zinda chicken illustration</title>
      <defs>
        <radialGradient id="bodyZinda" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#D4883A" />
          <stop offset="60%" stopColor="#B5631A" />
          <stop offset="100%" stopColor="#8B4513" />
        </radialGradient>
        <radialGradient id="bellyZinda" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5C58A" />
          <stop offset="100%" stopColor="#D4943A" />
        </radialGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="80" cy="122" rx="45" ry="7" fill="rgba(0,0,0,0.25)" />

      {/* Tail feathers */}
      <path d="M118 75 Q138 55 145 68 Q140 82 122 86 Z" fill="#8B4513" />
      <path
        d="M120 68 Q140 46 148 60 Q142 76 124 80 Z"
        fill="#B5631A"
        opacity="0.9"
      />
      <path d="M116 80 Q136 65 142 76 Q136 88 118 88 Z" fill="#6B3410" />
      <path
        d="M122 62 Q140 40 150 55 Q143 70 126 74 Z"
        fill="#D4883A"
        opacity="0.7"
      />

      {/* Body */}
      <ellipse cx="82" cy="88" rx="40" ry="33" fill="url(#bodyZinda)" />
      {/* Belly */}
      <ellipse
        cx="76"
        cy="94"
        rx="22"
        ry="18"
        fill="url(#bellyZinda)"
        opacity="0.7"
      />

      {/* Wing */}
      <path
        d="M52 80 Q66 65 98 80 Q88 98 52 94 Z"
        fill="#8B4513"
        opacity="0.8"
      />
      {/* Wing feather stripes */}
      <path
        d="M56 88 Q70 76 95 84"
        stroke="#D4883A"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M57 92 Q72 81 96 88"
        stroke="#D4883A"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />

      {/* Neck */}
      <ellipse cx="72" cy="60" rx="14" ry="20" fill="#B5631A" />

      {/* Head */}
      <circle cx="68" cy="42" r="18" fill="url(#bodyZinda)" />

      {/* Comb */}
      <ellipse cx="68" cy="26" rx="10" ry="5" fill="#CC0000" />
      <circle cx="62" cy="24" r="5" fill="#CC0000" />
      <circle cx="68" cy="20" r="6" fill="#CC2200" />
      <circle cx="74" cy="24" r="5" fill="#CC0000" />

      {/* Beak */}
      <path d="M84 42 L96 44 L84 48 Z" fill="#FFD700" />
      <path d="M84 44 L93 44 L84 46 Z" fill="#B8960C" />

      {/* Eye */}
      <circle cx="78" cy="40" r="6" fill="#FFD700" />
      <circle cx="79" cy="40" r="3.5" fill="#1A1A1A" />
      <circle cx="77" cy="38" r="1" fill="white" opacity="0.9" />

      {/* Wattle */}
      <ellipse cx="88" cy="52" rx="5" ry="8" fill="#CC0000" />

      {/* Legs */}
      <rect x="66" y="116" width="8" height="18" rx="3" fill="#FFD700" />
      <rect x="82" y="116" width="8" height="18" rx="3" fill="#FFD700" />

      {/* Feet */}
      <path
        d="M62 134 L74 134 M68 134 L64 140"
        stroke="#FFD700"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M78 134 L90 134 M84 134 L80 140"
        stroke="#FFD700"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Body shine */}
      <ellipse cx="66" cy="80" rx="10" ry="7" fill="white" opacity="0.07" />
      <ellipse cx="62" cy="40" rx="4" ry="3" fill="white" opacity="0.15" />

      {/* Feather texture dots */}
      <circle cx="75" cy="88" r="1.5" fill="#8B4513" opacity="0.5" />
      <circle cx="85" cy="84" r="1.5" fill="#8B4513" opacity="0.5" />
      <circle cx="90" cy="92" r="1.5" fill="#8B4513" opacity="0.5" />
      <circle cx="80" cy="96" r="1.5" fill="#8B4513" opacity="0.5" />
    </svg>
  );
}
