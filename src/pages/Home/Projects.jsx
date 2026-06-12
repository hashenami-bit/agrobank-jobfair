import { useState } from 'react';
import { Cctv, Satellite, Mic, BarChart3, Sparkles } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';
import MaskedText from '../../components/MaskedText';
import LiveIndicator from '../../components/LiveIndicator';
import FAQ from '../../components/FAQ';
import { useSlide } from '../../contexts/SlideContext';
import { useLanguage } from '../../contexts/LanguageContext';

const projectsMeta = [
  { id: 'chorvachilik', Icon: Cctv },
  { id: 'agronom', Icon: Satellite },
  { id: 'voice', Icon: Mic },
  { id: 'scoring', Icon: BarChart3 },
];

const cardRadius = 'rounded-3xl';
const badgeBase =
  'absolute -top-3 px-3 py-0.5 bg-[#0b0d12] border text-[0.6rem] tracking-widest uppercase rounded-full z-20';

export default function Projects() {
  const headerRef = useReveal();
  const gridRef = useReveal({ threshold: 0.2 });
  const { slide } = useSlide();
  const { t, lang } = useLanguage();
  const accent = slide.accent;
  const [activeIndex, setActiveIndex] = useState(0);
  const projects = t('projects.items') || [];
  const projectFaqs = t('projects.faqs') || [];

  return (
    <section
      id="slide-content"
      className="w-full max-w-7xl py-32 px-6 relative border-b border-white/[0.05]"
      style={{ '--accent': accent, '--card-hover-border': `${accent}66` }}
    >
      {/* Vertical guide lines */}
      <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/[0.03] -z-10"></div>
      <div className="absolute top-0 bottom-0 right-1/3 w-px bg-white/[0.03] -z-10"></div>

      {/* Header */}
      <div ref={headerRef} className="text-center mb-20">
        <div
          className="flex items-center justify-center space-x-4 mb-4 text-sm tracking-widest uppercase font-medium clip-slide delay-100"
          style={{ color: accent }}
        >
          <span>{slide.num}</span>
          <div className="w-12 h-px" style={{ backgroundColor: `${accent}80` }}></div>
          <span>{t('projects.kicker')}</span>
        </div>
        <h2 className="font-agro-expanded text-4xl md:text-5xl text-white font-bold tracking-tight">
          <MaskedText key={`proj-h-${lang}`} text={t('projects.heading')} delayStart={200} stagger={100} />
        </h2>
      </div>

      {/* Video section */}
      <div className="max-w-4xl mx-auto mb-28">
        <div className="flex items-center gap-2 mb-3">
          <LiveIndicator size={12} />
          <span className="text-[0.6rem] tracking-widest uppercase" style={{ color: accent }}>{t('projects.videoLabel')}</span>
        </div>
        <div
          className="relative aspect-video rounded-sm overflow-hidden border border-white/10 skeuo-card"
          style={{ boxShadow: `0 30px 80px -20px ${accent}33` }}
        >
          <video
            src="/matbuot_ai.mp4"
            controls
            playsInline
            preload="metadata"
            poster="/matbuot_ai.mp4#t=0.5"
            className="absolute inset-0 w-full h-full bg-black"
          />
        </div>
      </div>

      {/* Branch heading — centered above the trunk */}
      <div className="text-center mb-12">
        <h3 className="font-agro-expanded text-3xl md:text-4xl text-white font-bold tracking-tight">
          {t('projects.branchHeading')}
        </h3>
      </div>

      {/* Project cards */}
      <div ref={gridRef} className="relative max-w-6xl mx-auto holodex-container">
        {/* Connector lines (1 trunk → 4 legs) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-white/20 clip-slide delay-200"></div>
        <div className="absolute top-12 left-[12.5%] right-[12.5%] h-px bg-white/20 clip-slide delay-300"></div>
        <div className="absolute top-12 left-[12.5%] w-px h-12 bg-white/20 clip-slide delay-400"></div>
        <div className="absolute top-12 left-[37.5%] w-px h-12 bg-white/20 clip-slide delay-400"></div>
        <div className="absolute top-12 left-[62.5%] w-px h-12 bg-white/20 clip-slide delay-400"></div>
        <div className="absolute top-12 left-[87.5%] w-px h-12 bg-white/20 clip-slide delay-400"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-24">
          {projectsMeta.map((m, index) => {
            const p = projects[index] || {};
            const isActive = activeIndex === index;
            const ProjIcon = m.Icon;
            return (
              <div
                key={m.id}
                role="button"
                tabIndex={0}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveIndex(index); } }}
                className={`clip-slide delay-${(index + 3) * 100} h-full cursor-pointer`}
              >
                <div
                  className={`holodex-item p-8 ${cardRadius} flex flex-col items-center relative group h-full ${
                    isActive ? 'skeuo-card-active' : 'border border-white/5 skeuo-card'
                  }`}
                  style={isActive ? { borderColor: `${accent}33`, boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.1), inset 0 0 30px ${accent}1A, 0 0 40px -10px ${accent}40` } : undefined}
                >
                  <div
                    className={badgeBase}
                    style={{ color: accent, borderColor: `${accent}55`, backgroundColor: isActive ? '#141820' : '#0b0d12' }}
                  >
                    {p.badge}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-6 mt-2">
                    <ProjIcon
                      size={isActive ? 56 : 48}
                      strokeWidth={1.4}
                      style={isActive ? { color: accent, filter: `drop-shadow(0 0 18px ${accent}99)` } : { color: 'rgba(255,255,255,0.75)' }}
                      className="transition-all"
                    />
                  </div>

                  {/* Title */}
                  <h3 className={`font-medium text-white tracking-tight mb-3 text-center ${isActive ? 'text-2xl' : 'text-xl'}`}>
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed font-light mb-5 text-center ${isActive ? 'text-white/70' : 'text-white/55'}`}>
                    {p.description}
                  </p>

                  {/* Features list — LEFT-aligned, bigger text */}
                  <ul className="flex flex-col gap-3 mb-6 text-left w-full">
                    {(p.features || []).map((f) => (
                      <li
                        key={f}
                        className={`text-base font-medium flex items-start gap-2.5 ${isActive ? 'text-white/90' : 'text-white/80'}`}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0 mt-2.5"
                          style={{ backgroundColor: accent }}
                        ></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* "+ More projects" indicator below the grid */}
        <div className="flex items-center justify-center gap-2 mt-12 text-sm text-white/50">
          <Sparkles size={16} strokeWidth={1.5} style={{ color: accent }} />
          <span>
            <span className="font-medium" style={{ color: accent }}>AgroMobile</span>{t('projects.moreText')}
          </span>
        </div>
      </div>

      <FAQ faqs={projectFaqs} accent={accent} label={t('projects.faqLabel')} heading={t('common.faqHeading')} />
    </section>
  );
}
