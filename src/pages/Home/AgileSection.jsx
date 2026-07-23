import { Target, Users, Layers, ChevronDown, RefreshCw } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';
import { useLanguage } from '../../contexts/LanguageContext';

const structureIcons = [Target, Users, Layers];

const cardRadius = 'rounded-3xl';
const badgeBase =
  'absolute -top-3 px-3 py-0.5 bg-[#0b0d12] border text-[0.6rem] tracking-widest uppercase rounded-full z-20';

// Sprint ceremonies as a cycle. Desktop (md+): circular diagram — numbered
// nodes on a ring, clockwise arc arrows, "Sprint" in the center. Mobile:
// vertical timeline with downward arrows and a loop-back indicator.
function SprintCycle({ steps, centerSub, repeatLabel, accent }) {
  const CX = 380;
  const CY = 280;
  const R = 150;
  const NODE_R = 22;

  const polar = (deg) => {
    const rad = (deg * Math.PI) / 180;
    return [CX + R * Math.cos(rad), CY + R * Math.sin(rad)];
  };
  // Nodes sit at the cardinal points; arcs flow clockwise between them,
  // trimmed 17° on each side so arrowheads clear the 22px nodes.
  const nodeAngles = [-90, 0, 90, 180];
  const arcs = [[-73, -17], [17, 73], [107, 163], [197, 253]].map(([a, b]) => {
    const [x1, y1] = polar(a);
    const [x2, y2] = polar(b);
    return `M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`;
  });

  const labelPos = [
    { left: CX, top: CY - R - 36, transform: 'translate(-50%, -100%)', width: 300, align: 'text-center' },
    { left: CX + R + 34, top: CY, transform: 'translate(0, -50%)', width: 190, align: 'text-left' },
    { left: CX, top: CY + R + 36, transform: 'translate(-50%, 0)', width: 300, align: 'text-center' },
    { left: CX - R - 34 - 190, top: CY, transform: 'translate(0, -50%)', width: 190, align: 'text-right' },
  ];

  return (
    <>
      {/* Desktop: circular cycle diagram */}
      <div className="hidden md:block relative w-[760px] h-[560px] mx-auto">
        <svg viewBox="0 0 760 560" className="absolute inset-0 w-full h-full">
          <defs>
            <marker id="cycle-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8" fill={accent} />
            </marker>
          </defs>
          {/* Faint base ring + slowly rotating dashed inner ring */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <g className="animate-spin-slow" style={{ transformOrigin: `${CX}px ${CY}px` }}>
            <circle cx={CX} cy={CY} r={R - 32} fill="none" stroke={`${accent}33`} strokeWidth="1" strokeDasharray="3 9" />
          </g>
          {/* Clockwise arc arrows */}
          {arcs.map((d) => (
            <path key={d} d={d} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.75" markerEnd="url(#cycle-arrow)" />
          ))}
          {/* Numbered nodes */}
          {nodeAngles.map((deg, i) => {
            const [x, y] = polar(deg);
            return (
              <g key={deg}>
                <circle cx={x} cy={y} r={NODE_R} fill="#0b0d12" stroke={accent} strokeWidth="1.5" style={{ filter: `drop-shadow(0 0 10px ${accent}66)` }} />
                <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize="15" fontWeight="600">
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Step labels around the ring */}
        {steps.map((step, i) => {
          const p = labelPos[i];
          return (
            <div
              key={step.title}
              className={`absolute ${p.align}`}
              style={{ left: p.left, top: p.top, transform: p.transform, width: p.width }}
            >
              <h5 className="text-white font-medium text-sm uppercase tracking-widest mb-1">{step.title}</h5>
              <p className="text-[0.8rem] leading-relaxed font-light text-white/50">{step.desc}</p>
            </div>
          );
        })}

        {/* Center label */}
        <div
          className="absolute text-center"
          style={{ left: CX, top: CY, transform: 'translate(-50%, -50%)' }}
        >
          <div className="font-agro-expanded text-2xl font-bold text-white tracking-tight">Sprint</div>
          <div className="text-[0.65rem] tracking-widest uppercase mt-1 font-medium" style={{ color: accent }}>
            {centerSub}
          </div>
        </div>
      </div>

      {/* Mobile: compact vertical timeline with a connecting spine + loop-back */}
      <div className="md:hidden relative max-w-sm mx-auto pl-1">
        <div
          className="absolute left-[19px] top-4 bottom-10 w-px"
          style={{ background: `linear-gradient(to bottom, ${accent}00, ${accent}66 15%, ${accent}66 85%, ${accent}00)` }}
        ></div>
        {steps.map((step, i) => (
          <div key={step.title} className="flex items-start gap-4 relative pb-6 last:pb-0">
            <div
              className="w-9 h-9 rounded-full border shrink-0 flex items-center justify-center text-sm font-semibold text-white bg-[#0b0d12] relative z-10"
              style={{ borderColor: accent, boxShadow: `0 0 14px ${accent}55` }}
            >
              {i + 1}
            </div>
            <div className="pt-1">
              <h5 className="text-white font-medium text-sm uppercase tracking-widest mb-1">{step.title}</h5>
              <p className="text-[0.82rem] leading-relaxed font-light text-white/55">{step.desc}</p>
            </div>
          </div>
        ))}
        {/* Loop-back: the cycle restarts */}
        <div className="flex items-center gap-4 relative">
          <div
            className="w-9 h-9 rounded-full border border-dashed shrink-0 flex items-center justify-center relative z-10 bg-[#0b0d12]"
            style={{ borderColor: `${accent}88` }}
          >
            <RefreshCw size={15} strokeWidth={2} className="animate-spin-slow" style={{ color: accent }} />
          </div>
          <p className="text-[0.82rem] font-light text-white/45 italic">{repeatLabel}</p>
        </div>
      </div>
    </>
  );
}

export default function AgileSection({ accent }) {
  const headerRef = useReveal();
  const structuresRef = useReveal({ threshold: 0.2 });
  const rolesRef = useReveal({ threshold: 0.2 });
  const rhythmRef = useReveal({ threshold: 0.2 });
  const { t } = useLanguage();
  const structures = t('agile.structures') || [];
  const roles = t('agile.roles') || [];
  const rhythm = t('agile.rhythm') || [];
  const values = t('agile.values') || [];

  // Desktop card renderers (unchanged look).
  const renderStructure = (s, i) => {
    const Icon = structureIcons[i] ?? Target;
    return (
      <div className={`holodex-item p-8 ${cardRadius} flex flex-col items-center text-center relative h-full border border-white/5 skeuo-card`}>
        <div className={badgeBase} style={{ color: accent, borderColor: `${accent}55` }}>
          {t('agile.structureLabel')}
        </div>
        <div className="flex justify-center mb-6 mt-2">
          <Icon size={44} strokeWidth={1.4} style={{ color: accent, filter: `drop-shadow(0 0 14px ${accent}66)` }} />
        </div>
        <h4 className="font-medium text-white tracking-tight mb-3 text-xl">{s.title}</h4>
        <p className="text-sm leading-relaxed font-light text-white/55">{s.desc}</p>
      </div>
    );
  };

  const renderRole = (r, i) => (
    <div className={`p-5 ${cardRadius} h-full border border-white/5 skeuo-card`}>
      <div className="text-xs tracking-widest font-medium mb-2" style={{ color: accent }}>
        {String(i + 1).padStart(2, '0')}
      </div>
      <h5 className="text-white font-medium tracking-tight mb-2">{r.title}</h5>
      <p className="text-[0.8rem] leading-relaxed font-light text-white/50">{r.desc}</p>
    </div>
  );

  return (
    <div className="mt-16 md:mt-28">
      {/* Divider */}
      <div className="max-w-6xl mx-auto mb-12 md:mb-20 h-px bg-white/[0.07]"></div>

      {/* Header */}
      <div ref={headerRef} className="text-center mb-8 md:mb-14">
        <div
          className="flex items-center justify-center space-x-4 mb-4 text-sm tracking-widest uppercase font-medium clip-slide delay-100"
          style={{ color: accent }}
        >
          <div className="w-12 h-px" style={{ backgroundColor: `${accent}80` }}></div>
          <span>{t('agile.kicker')}</span>
          <div className="w-12 h-px" style={{ backgroundColor: `${accent}80` }}></div>
        </div>
        <h3 className="font-agro-expanded text-3xl md:text-4xl text-white font-bold tracking-tight clip-slide delay-200">
          {t('agile.heading')}
        </h3>
        <p className="max-w-3xl mx-auto mt-5 text-base md:text-lg leading-relaxed font-light text-white/60 clip-slide delay-300">
          {t('agile.intro')}
        </p>
      </div>

      {/* Structure: Tribe / Team / Chapter */}
      <div ref={structuresRef} className="max-w-6xl mx-auto">
        {/* Mobile: layered vertical stack (faithful to the cookbook's 3-layer org diagram) */}
        <div className="md:hidden relative max-w-md mx-auto clip-slide delay-100">
          <div
            className="absolute left-[31px] top-8 bottom-8 w-px"
            style={{ background: `linear-gradient(to bottom, ${accent}00, ${accent}55, ${accent}00)` }}
          ></div>
          <div className="space-y-3">
            {structures.map((s, i) => {
              const Icon = structureIcons[i] ?? Target;
              return (
                <div
                  key={s.title}
                  className={`relative flex items-start gap-4 p-4 ${cardRadius} border border-white/5 skeuo-card`}
                >
                  <div
                    className="w-12 h-12 rounded-2xl border shrink-0 flex items-center justify-center bg-[#0b0d12] relative z-10"
                    style={{ borderColor: `${accent}55`, boxShadow: `0 0 16px ${accent}33` }}
                  >
                    <Icon size={22} strokeWidth={1.6} style={{ color: accent }} />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium text-lg tracking-tight">{s.title}</h4>
                      <span className="text-[0.5rem] tracking-widest uppercase px-1.5 py-0.5 rounded-full border" style={{ color: accent, borderColor: `${accent}44` }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-[0.82rem] leading-relaxed font-light text-white/55">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 pt-6">
          {structures.map((s, i) => (
            <div key={s.title} className="h-full">
              {renderStructure(s, i)}
            </div>
          ))}
        </div>
      </div>

      {/* Roles */}
      <div ref={rolesRef} className="max-w-6xl mx-auto mt-14 md:mt-20">
        <div className="text-center mb-8 clip-slide delay-100">
          <h4 className="font-agro-expanded text-2xl md:text-3xl text-white font-bold tracking-tight">
            {t('agile.rolesHeading')}
          </h4>
        </div>

        {/* Mobile: clean scannable list in one container */}
        <div className="md:hidden max-w-md mx-auto rounded-3xl border border-white/5 skeuo-card overflow-hidden divide-y divide-white/5 clip-slide delay-200">
          {roles.map((r, i) => (
            <div key={r.title} className="flex items-start gap-3.5 p-4">
              <div
                className="w-7 h-7 rounded-full border shrink-0 flex items-center justify-center text-[0.7rem] font-semibold mt-0.5"
                style={{ color: accent, borderColor: `${accent}55` }}
              >
                {i + 1}
              </div>
              <div className="min-w-0">
                <h5 className="text-white font-medium tracking-tight">{r.title}</h5>
                <p className="text-[0.8rem] leading-relaxed font-light text-white/50 mt-0.5">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {roles.map((r, i) => (
            <div key={r.title} className="h-full">
              {renderRole(r, i)}
            </div>
          ))}
        </div>
      </div>

      {/* Sprint rhythm + values */}
      <div ref={rhythmRef} className="max-w-6xl mx-auto mt-14 md:mt-20">
        <div className="text-center mb-8 md:mb-8 clip-slide delay-100">
          <h4 className="font-agro-expanded text-2xl md:text-3xl text-white font-bold tracking-tight">
            {t('agile.rhythmLabel')}
          </h4>
          <p className="max-w-2xl mx-auto mt-4 text-sm md:text-base leading-relaxed font-light text-white/55">
            {t('agile.rhythmIntro')}
          </p>
        </div>
        <div className="mb-12 clip-slide delay-200">
          <SprintCycle
            steps={rhythm}
            centerSub={t('agile.cycleSub')}
            repeatLabel={t('agile.cycleRepeat')}
            accent={accent}
          />
        </div>

        {/* Values */}
        <div className="clip-slide delay-300">
          <div className="text-center mb-5 text-sm tracking-widest uppercase font-medium" style={{ color: accent }}>
            {t('agile.valuesLabel')}
          </div>

          {/* Mobile: tidy 2-column grid of mini-cards */}
          <div className="md:hidden grid grid-cols-2 gap-2.5 max-w-md mx-auto">
            {values.map((v) => (
              <div key={v.title} className="p-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <div className="text-white text-sm font-medium mb-1">{v.title}</div>
                <div className="text-white/45 text-[0.72rem] leading-snug font-light">{v.desc}</div>
              </div>
            ))}
          </div>

          {/* Desktop: chips */}
          <div className="hidden md:flex flex-wrap justify-center gap-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-center"
              >
                <span className="text-white text-sm font-medium">{v.title}</span>
                <span className="text-white/45 text-sm font-light"> — {v.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
