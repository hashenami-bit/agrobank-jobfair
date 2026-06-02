import { useState } from 'react';
import { HeartPulse, GraduationCap, TrendingUp, Gift, ArrowUpRight } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';
import MaskedText from '../../components/MaskedText';
import FAQ from '../../components/FAQ';
import AboutBank from './AboutBank';
import { useSlide } from '../../contexts/SlideContext';
import { useLanguage } from '../../contexts/LanguageContext';

const offeringsMeta = [
  { id: 'health', Icon: HeartPulse },
  { id: 'learning', Icon: GraduationCap },
  { id: 'growth', Icon: TrendingUp },
  { id: 'bonuses', Icon: Gift },
];

const cardRadius = 'rounded-3xl';
const badgeBase =
  'absolute -top-3 px-3 py-0.5 bg-[#0b0d12] border text-[0.6rem] tracking-widest uppercase rounded-full z-20';

export default function Offerings() {
  const headerRef = useReveal();
  const gridRef = useReveal({ threshold: 0.2 });
  const { slide } = useSlide();
  const { t, lang } = useLanguage();
  const accent = slide.accent;
  const [activeIndex, setActiveIndex] = useState(0);
  const offerings = t('offerings.items') || [];
  const offerFaqs = t('offerings.faqs') || [];

  return (
    <section
      id="slide-content"
      className="w-full max-w-7xl py-32 px-6 relative border-b border-white/[0.05]"
      style={{ '--accent': accent, '--card-hover-border': `${accent}66` }}
    >
      {/* Vertical guide lines */}
      <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/[0.03] -z-10"></div>
      <div className="absolute top-0 bottom-0 right-1/3 w-px bg-white/[0.03] -z-10"></div>

      {/* About Agrobank — mission, strategy, values, stats */}
      <AboutBank />

      {/* Divider */}
      <div className="max-w-6xl mx-auto mb-20 h-px bg-white/[0.07]"></div>

      {/* Header */}
      <div ref={headerRef} className="text-center mb-20">
        <div
          className="flex items-center justify-center space-x-4 mb-4 text-sm tracking-widest uppercase font-medium clip-slide delay-100"
          style={{ color: accent }}
        >
          <span>{slide.num}</span>
          <div className="w-12 h-px" style={{ backgroundColor: `${accent}80` }}></div>
          <span>{t('offerings.kicker')}</span>
        </div>
        <h2 className="font-agro-expanded text-4xl md:text-5xl text-white font-bold tracking-tight">
          <MaskedText key={`offerings-h-${lang}`} text={t('offerings.heading')} delayStart={200} stagger={100} />
        </h2>
      </div>

      {/* Branch heading */}
      <div className="text-center mb-12">
        <h3 className="font-agro-expanded text-3xl md:text-4xl text-white font-bold tracking-tight">
          {t('offerings.branchHeading')}
        </h3>
      </div>

      {/* Cards */}
      <div ref={gridRef} className="relative max-w-6xl mx-auto holodex-container">
        {/* Connector lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-white/20 clip-slide delay-200"></div>
        <div className="absolute top-12 left-[12.5%] right-[12.5%] h-px bg-white/20 clip-slide delay-300"></div>
        <div className="absolute top-12 left-[12.5%] w-px h-12 bg-white/20 clip-slide delay-400"></div>
        <div className="absolute top-12 left-[37.5%] w-px h-12 bg-white/20 clip-slide delay-400"></div>
        <div className="absolute top-12 left-[62.5%] w-px h-12 bg-white/20 clip-slide delay-400"></div>
        <div className="absolute top-12 left-[87.5%] w-px h-12 bg-white/20 clip-slide delay-400"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-24">
          {offeringsMeta.map((m, index) => {
            const o = offerings[index] || {};
            const isActive = activeIndex === index;
            const OfferIcon = m.Icon;
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
                    {o.badge}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-6 mt-2">
                    <OfferIcon
                      size={isActive ? 56 : 48}
                      strokeWidth={1.4}
                      style={isActive ? { color: accent, filter: `drop-shadow(0 0 18px ${accent}99)` } : { color: 'rgba(255,255,255,0.75)' }}
                      className="transition-all"
                    />
                  </div>

                  {/* Title */}
                  <h3 className={`font-medium text-white tracking-tight mb-3 text-center ${isActive ? 'text-2xl' : 'text-xl'}`}>
                    {o.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed font-light mb-5 text-center ${isActive ? 'text-white/70' : 'text-white/55'}`}>
                    {o.description}
                  </p>

                  {/* Features list */}
                  <ul className="flex flex-col gap-3 mb-6 text-left w-full">
                    {(o.features || []).map((f) => (
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

                  {/* Batafsil */}
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
      </div>

      <FAQ faqs={offerFaqs} accent={accent} label={t('offerings.faqLabel')} heading={t('common.faqHeading')} />
    </section>
  );
}
