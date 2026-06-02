import { ShieldCheck, Award, Handshake, Sprout } from 'lucide-react';
import MaskedText from '../../components/MaskedText';
import { useSlide } from '../../contexts/SlideContext';
import { useLanguage } from '../../contexts/LanguageContext';

const valueIcons = [ShieldCheck, Award, Handshake, Sprout];

export default function AboutBank() {
  const { slide } = useSlide();
  const { t, lang } = useLanguage();
  const accent = slide.accent;
  const about = t('about') || {};
  const stats = about.stats || [];
  const strategy = about.strategy || [];
  const values = about.values || [];

  return (
    <div className="w-full mb-28" style={{ '--accent': accent }}>
      {/* Header */}
      <div className="text-center mb-14">
        <div
          className="flex items-center justify-center space-x-4 mb-4 text-sm tracking-widest uppercase font-medium"
          style={{ color: accent }}
        >
          <div className="w-12 h-px" style={{ backgroundColor: `${accent}80` }}></div>
          <span>{about.kicker}</span>
          <div className="w-12 h-px" style={{ backgroundColor: `${accent}80` }}></div>
        </div>
        <h2 className="font-agro-expanded text-4xl md:text-5xl text-white font-bold tracking-tight">
          <MaskedText key={`about-h-${lang}`} text={about.heading || ''} delayStart={200} stagger={100} />
        </h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 max-w-6xl mx-auto">
        {stats.map((s) => (
          <div
            key={s.label}
            className="skeuo-card rounded-2xl p-6 text-center border border-white/5 flex flex-col items-center justify-center"
          >
            <div
              className="font-agro-expanded text-3xl md:text-4xl font-bold mb-2"
              style={{ color: accent }}
            >
              {s.value}
            </div>
            <div className="text-xs md:text-sm text-white/55 font-light leading-snug">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        <div className="text-sm tracking-widest uppercase mb-4" style={{ color: accent }}>
          {about.missionLabel}
        </div>
        <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">{about.mission}</p>
      </div>

      {/* Strategy + Values */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Strategy */}
        <div>
          <h3 className="font-agro-expanded text-2xl text-white font-bold mb-6">{about.strategyLabel}</h3>
          <ul className="flex flex-col gap-4">
            {strategy.map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/75 leading-relaxed">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0 mt-2.5"
                  style={{ backgroundColor: accent }}
                ></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Values */}
        <div>
          <h3 className="font-agro-expanded text-2xl text-white font-bold mb-6">{about.valuesLabel}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => {
              const ValueIcon = valueIcons[i] ?? ShieldCheck;
              return (
                <div key={v.title} className="skeuo-card rounded-2xl p-5 border border-white/5 h-full">
                  <ValueIcon
                    size={26}
                    strokeWidth={1.5}
                    style={{ color: accent, filter: `drop-shadow(0 0 12px ${accent}66)` }}
                    className="mb-3"
                  />
                  <h4 className="font-medium text-white text-base mb-2">{v.title}</h4>
                  <p className="text-sm text-white/60 font-light leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
