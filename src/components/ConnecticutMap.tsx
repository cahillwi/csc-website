export default function ConnecticutMap() {
  return (
    <svg
      viewBox="0 0 600 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      aria-label="Map of Connecticut with Litchfield County highlighted"
      role="img"
    >
      {/* Litchfield County — highlighted */}
      <path
        d="M32 12 L205 2 L215 18 L218 52 L222 95 L210 130 L225 165 L228 200 L220 235 L210 280 L195 310 L148 305 L100 298 L60 288 L38 265 L22 220 L15 170 L18 110 L25 60 Z"
        fill="#E87722"
        fillOpacity="0.18"
        stroke="#E87722"
        strokeWidth="2.5"
      />
      {/* Hartford County */}
      <path
        d="M218 52 L320 42 L335 48 L340 95 L338 155 L330 200 L320 235 L228 200 L225 165 L210 130 L222 95 Z"
        fill="#E4D9C6"
        fillOpacity="0.5"
        stroke="#C9BDA8"
        strokeWidth="1.5"
      />
      {/* Tolland County */}
      <path
        d="M335 48 L445 38 L455 55 L458 110 L450 160 L338 155 L340 95 Z"
        fill="#E4D9C6"
        fillOpacity="0.5"
        stroke="#C9BDA8"
        strokeWidth="1.5"
      />
      {/* Windham County */}
      <path
        d="M455 55 L565 45 L575 60 L580 130 L572 210 L560 260 L450 240 L450 160 L458 110 Z"
        fill="#E4D9C6"
        fillOpacity="0.5"
        stroke="#C9BDA8"
        strokeWidth="1.5"
      />
      {/* Middlesex County */}
      <path
        d="M320 235 L330 200 L338 155 L450 160 L450 240 L420 280 L380 310 L340 320 L295 310 L280 295 Z"
        fill="#E4D9C6"
        fillOpacity="0.5"
        stroke="#C9BDA8"
        strokeWidth="1.5"
      />
      {/* New London County */}
      <path
        d="M450 240 L560 260 L572 280 L578 340 L565 390 L540 420 L490 440 L430 445 L380 430 L340 400 L340 320 L380 310 L420 280 Z"
        fill="#E4D9C6"
        fillOpacity="0.5"
        stroke="#C9BDA8"
        strokeWidth="1.5"
      />
      {/* New Haven County */}
      <path
        d="M210 280 L220 235 L320 235 L280 295 L295 310 L340 320 L340 400 L300 420 L245 435 L195 425 L165 400 L148 370 L155 330 L195 310 Z"
        fill="#E4D9C6"
        fillOpacity="0.5"
        stroke="#C9BDA8"
        strokeWidth="1.5"
      />
      {/* Fairfield County */}
      <path
        d="M38 265 L60 288 L100 298 L148 305 L195 310 L155 330 L148 370 L165 400 L145 425 L110 445 L65 458 L30 452 L12 420 L8 370 L15 310 Z"
        fill="#E4D9C6"
        fillOpacity="0.5"
        stroke="#C9BDA8"
        strokeWidth="1.5"
      />

      {/* County labels */}
      <text x="120" y="165" textAnchor="middle" className="fill-orange font-heading font-bold text-[15px] uppercase tracking-wider">
        Litchfield
      </text>
      <text x="275" y="148" textAnchor="middle" className="fill-[#9C9282] font-heading font-semibold text-[11px] uppercase tracking-wider">
        Hartford
      </text>
      <text x="395" y="115" textAnchor="middle" className="fill-[#9C9282] font-heading font-semibold text-[11px] uppercase tracking-wider">
        Tolland
      </text>
      <text x="515" y="160" textAnchor="middle" className="fill-[#9C9282] font-heading font-semibold text-[11px] uppercase tracking-wider">
        Windham
      </text>
      <text x="380" y="255" textAnchor="middle" className="fill-[#9C9282] font-heading font-semibold text-[11px] uppercase tracking-wider">
        Middlesex
      </text>
      <text x="470" y="370" textAnchor="middle" className="fill-[#9C9282] font-heading font-semibold text-[11px] uppercase tracking-wider">
        New London
      </text>
      <text x="250" y="365" textAnchor="middle" className="fill-[#9C9282] font-heading font-semibold text-[11px] uppercase tracking-wider">
        New Haven
      </text>
      <text x="90" y="390" textAnchor="middle" className="fill-[#9C9282] font-heading font-semibold text-[11px] uppercase tracking-wider">
        Fairfield
      </text>

      {/* New Milford marker */}
      <circle cx="130" cy="210" r="6" fill="#E87722" />
      <circle cx="130" cy="210" r="10" fill="#E87722" fillOpacity="0.25" />
      <text x="148" y="215" className="fill-dark font-heading font-bold text-[12px]">
        New Milford
      </text>
    </svg>
  );
}
