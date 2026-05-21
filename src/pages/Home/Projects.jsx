import { useState } from 'react';
import { Cctv, Satellite, Mic, BarChart3, ArrowUpRight, Sparkles } from 'lucide-react';
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
  'absolute -top-3 px-3 py-0.5 bg-white border text-[0.6rem] tracking-widest uppercase rounded-full z-20';

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
      className="w-full max-w-7xl py-32 px-6 relative border-b border-[var(--border)]"
      style={{ '--accent': accent, '--card-hover-border': `${accent}66` }}
    >
      {/* Vertical guide lines */}
      <div className="absolute top-0 bottom-0 left-1/3 w-px bg-[var(--border)] -z-10"></div>
      <div className="absolute top-0 bottom-0 right-1/3 w-px bg-[var(--border)] -z-10"></div>

      {/* Header */}
      <div ref={headerRef} className="text-center mb-20">
        <div
          className="flex items-center justify-center space-x-4 mb-4 text-[0.65rem] tracking-widest uppercase font-medium clip-slide delay-100"
          style={{ color: accent }}
        >
          <span>{slide.num}</span>
          <div className="w-12 h-px" style={{ backgroundColor: `${accent}80` }}></div>
          <span>{t('projects.kicker')}</span>
        </div>
        <h2 className="text-4xl md:text-5xl text-[var(--text)] font-medium tracking-tight">
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
          className="relative aspect-video rounded-sm overflow-hidden border border-[var(--border)] skeuo-card"
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
        <h3 className="text-3xl md:text-4xl text-[var(--text)] font-medium tracking-tight">
          {t('projects.branchHeading')}
        </h3>
      </div>

      {/* Project cards */}
      <div ref={gridRef} className="relative max-w-6xl mx-auto holodex-container">
        {/* Connector lines (1 trunk → 4 legs) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-[var(--border)] clip-slide delay-200"></div>
        <div className="absolute top-12 left-[12.5%] right-[12.5%] h-px bg-[var(--border)] clip-slide delay-300"></div>
        <div className="absolute top-12 left-[12.5%] w-px h-12 bg-[var(--border)] clip-slide delay-400"></div>
        <div className="absolute top-12 left-[37.5%] w-px h-12 bg-[var(--border)] clip-slide delay-400"></div>
        <div className="absolute top-12 left-[62.5%] w-px h-12 bg-[var(--border)] clip-slide delay-400"></div>
        <div className="absolute top-12 left-[87.5%] w-px h-12 bg-[var(--border)] clip-slide delay-400"></div>

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
                    isActive ? 'skeuo-card-active' : 'skeuo-card'
                  }`}
                >
                  <div
                    className={badgeBase}
                    style={{ color: accent, borderColor: `${accent}55`, backgroundColor: '#fff' }}
                  >
                    {p.badge}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-6 mt-2">
                    <ProjIcon
                      size={isActive ? 56 : 48}
                      strokeWidth={1.4}
                      style={isActive ? { color: accent, filter: `drop-shadow(0 0 18px ${accent}66)` } : { color: 'var(--text-muted)' }}
                      className="transition-all"
                    />
                  </div>

                  {/* Title */}
                  <h3 className={`font-medium text-[var(--text)] tracking-tight mb-3 text-center ${isActive ? 'text-2xl' : 'text-xl'}`}>
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed font-normal mb-5 text-center text-[var(--text-muted)]`}>
                    {p.description}
                  </p>

                  {/* Features list — LEFT-aligned, bigger text */}
                  <ul className="flex flex-col gap-3 mb-6 text-left w-full">
                    {(p.features || []).map((f) => (
                      <li
                        key={f}
                        className={`text-base font-medium flex items-start gap-2.5 text-[var(--text)]`}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0 mt-2.5"
                          style={{ backgroundColor: accent }}
                        ></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Batafsil button — primary CTA */}
                  <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className="btn-pill-filled mt-auto px-6 py-3 rounded-full text-[0.7rem] tracking-widest uppercase font-semibold inline-flex items-center gap-2 relative z-30 cursor-pointer"
                  >
                    {t('common.batafsil')}
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* "+ More projects" indicator below the grid */}
        <div className="flex items-center justify-center gap-2 mt-12 text-sm text-[var(--text-muted)]">
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
