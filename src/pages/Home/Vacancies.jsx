import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';
import MaskedText from '../../components/MaskedText';
import headhunterLogo from '../../assets/headhunter-logo.png';
import islomPhoto from '../../assets/recruiters/islom.jpg';
import durdonaPhoto from '../../assets/recruiters/durdona.jpeg';
import elyorPhoto from '../../assets/recruiters/elyor.jpeg';
import RecruiterModal from '../../components/RecruiterModal';
import FAQ from '../../components/FAQ';
import { useSlide } from '../../contexts/SlideContext';
import { useLanguage } from '../../contexts/LanguageContext';

const bizCardHref = 'https://tashkent.hh.uz/employer/3926783?tab=DESCRIPTION';

// Cards 2-4 — IT recruiters. Names, photos, contacts and positions stay
// language-agnostic; role label is keyed via translations.
const recruiters = [
  {
    id: 'elyor',
    badge: 'AI Team',
    name: 'Жалолов Эльёр',
    roleKey: 'vacancies.roles.seniorRecruiter',
    initials: 'ЖЭ',
    photo: elyorPhoto,
    telegram: '@Impudent_11',
    telegramHref: 'https://t.me/Impudent_11',
    linkedin: 'https://www.linkedin.com/in/elyor-jalalov-257996295/',
    positions: [
      'NLP Team Lead',
      'Annotation Team Lead',
      'NLP Junior Engineer',
      'ML / AI Engineer',
      'System Analyst (RegTech / Data)',
      'Data Engineer (Data Platform)',
      'Middle ML Engineer',
      'Senior ML Engineer (NLP/Voice AI)',
      'Middle Data Scientist (Scoring)',
      'Senior Data Scientist (Scoring)',
      'Senior Computer Vision Engineer',
    ],
  },
  {
    id: 'islom',
    badge: 'Mobile Team',
    name: 'Ислом Холов',
    roleKey: 'vacancies.roles.seniorRecruiter',
    initials: 'ИХ',
    photo: islomPhoto,
    telegram: '@islom_agrobank',
    telegramHref: 'https://t.me/islom_agrobank',
    linkedin: 'https://www.linkedin.com/in/islom-kholov/',
    positions: [
      'QA Engineer',
      'IT рекрутер',
      'Head of ITSM',
      'Android developer',
      'Flutter developer',
    ],
  },
  {
    id: 'durdona',
    badge: 'Backend Team',
    name: 'Дурдона Рахмедова',
    roleKey: 'vacancies.roles.recruiter',
    initials: 'ДР',
    photo: durdonaPhoto,
    telegram: '@Durdona_Rakhmedova',
    telegramHref: 'https://t.me/Durdona_Rakhmedova',
    linkedin: '',
    positions: [
      'Java Backend разработчик',
      'Android разработчик',
      'SQL разработчик',
      'iOS разработчик',
      'Flutter разработчик',
    ],
  },
];

const cardRadius = 'rounded-3xl';
const badgeBase =
  'absolute -top-3 px-3 py-0.5 bg-[#0b0d12] border text-[0.6rem] tracking-widest uppercase rounded-full z-20';

export default function Vacancies() {
  const headerRef = useReveal();
  const gridRef = useReveal({ threshold: 0.2 });
  const { slide } = useSlide();
  const { t, lang } = useLanguage();
  const accent = slide.accent;
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const careerFaqs = t('vacancies.faqs') || [];
  const bizCard = {
    badge: t('vacancies.bizCard.badge'),
    title: t('vacancies.bizCard.title'),
    description: t('vacancies.bizCard.description'),
    cta: t('vacancies.bizCard.cta'),
    href: bizCardHref,
  };

  return (
    <section
      id="slide-content"
      className="w-full max-w-7xl py-32 px-6 relative border-b border-[var(--border)]"
      style={{ '--accent': accent, '--card-hover-border': `${accent}66` }}
    >
      {/* Vertical guide lines */}
      <div className="absolute top-0 bottom-0 left-1/3 w-px bg-[var(--bg-soft)] -z-10"></div>
      <div className="absolute top-0 bottom-0 right-1/3 w-px bg-[var(--bg-soft)] -z-10"></div>

      {/* Header */}
      <div ref={headerRef} className="text-center mb-20">
        <div
          className="flex items-center justify-center space-x-4 mb-4 text-[0.65rem] tracking-widest uppercase font-medium clip-slide delay-100"
          style={{ color: accent }}
        >
          <span>{slide.num}</span>
          <div className="w-12 h-px" style={{ backgroundColor: `${accent}80` }}></div>
          <span>{t('vacancies.kicker')}</span>
        </div>
        <h2 className="text-4xl md:text-5xl text-[var(--text)] font-medium tracking-tight">
          <MaskedText key={`vac-h-${lang}`} text={t('vacancies.heading')} delayStart={200} stagger={100} />
        </h2>
      </div>

      {/* Branch heading */}
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl text-[var(--text)] font-medium tracking-tight">
          {t('vacancies.branchHeading')}
        </h3>
      </div>

      {/* Cards */}
      <div ref={gridRef} className="relative max-w-6xl mx-auto holodex-container">
        {/* Connector lines (1 trunk → 4 legs) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-[var(--bg-soft)] clip-slide delay-200"></div>
        <div className="absolute top-12 left-[12.5%] right-[12.5%] h-px bg-[var(--bg-soft)] clip-slide delay-300"></div>
        <div className="absolute top-12 left-[12.5%] w-px h-12 bg-[var(--bg-soft)] clip-slide delay-400"></div>
        <div className="absolute top-12 left-[37.5%] w-px h-12 bg-[var(--bg-soft)] clip-slide delay-400"></div>
        <div className="absolute top-12 left-[62.5%] w-px h-12 bg-[var(--bg-soft)] clip-slide delay-400"></div>
        <div className="absolute top-12 left-[87.5%] w-px h-12 bg-[var(--bg-soft)] clip-slide delay-400"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-24">

          {/* CARD 1 — Biz haqimizda: clickable card that opens HH profile */}
          {(() => {
            const isActive = activeIndex === 0;
            return (
              <a
                href={bizCard.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setActiveIndex(0)}
                className="clip-slide delay-300 h-full block"
              >
                <div
                  className={`holodex-item p-8 ${cardRadius} flex flex-col items-center text-center relative group h-full ${
                    isActive ? 'skeuo-card-active' : 'border border-[var(--border)] skeuo-card'
                  }`}
                  style={isActive ? { borderColor: `${accent}33`, boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.1), inset 0 0 30px ${accent}1A, 0 0 40px -10px ${accent}40` } : undefined}
                >
                  <div
                    className={badgeBase}
                    style={{ color: accent, borderColor: `${accent}55`, backgroundColor: isActive ? '#141820' : '#0b0d12' }}
                  >
                    {bizCard.badge}
                  </div>

                  <img
                    src={headhunterLogo}
                    alt="HeadHunter"
                    className={`mb-6 transition-all ${isActive ? 'w-24 h-24' : 'w-20 h-20'}`}
                  />

                  <h3 className={`font-medium text-[var(--text)] tracking-tight mb-3 ${isActive ? 'text-2xl' : 'text-xl'}`}>
                    {bizCard.title}
                  </h3>

                  <p className={`text-sm leading-relaxed font-light mb-8 ${isActive ? 'text-[var(--text-muted)]' : 'text-[var(--text-muted)]'}`}>
                    {bizCard.description}
                  </p>

                  <span className="px-6 py-2 mt-auto border border-[var(--border)] rounded-full text-[var(--text)] text-[0.65rem] tracking-widest uppercase hover:bg-[var(--brand-green)] hover:text-white transition-all relative z-20 inline-flex items-center gap-2">
                    {bizCard.cta}
                    <ArrowUpRight size={14} strokeWidth={2} />
                  </span>
                </div>
              </a>
            );
          })()}

          {/* CARDS 2-4 — recruiter cards */}
          {recruiters.map((r, i) => {
            const index = i + 1;
            const isActive = activeIndex === index;
            return (
              <div
                key={r.id}
                role="button"
                tabIndex={0}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveIndex(index); } }}
                className={`clip-slide delay-${(index + 3) * 100} h-full cursor-pointer`}
              >
                <div
                  className={`holodex-item p-8 ${cardRadius} flex flex-col items-center relative group h-full ${
                    isActive ? 'skeuo-card-active' : 'border border-[var(--border)] skeuo-card'
                  }`}
                  style={isActive ? { borderColor: `${accent}33`, boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.1), inset 0 0 30px ${accent}1A, 0 0 40px -10px ${accent}40` } : undefined}
                >
                  <div
                    className={badgeBase}
                    style={{ color: accent, borderColor: `${accent}55`, backgroundColor: isActive ? '#141820' : '#0b0d12' }}
                  >
                    {r.badge}
                  </div>

                  {/* Avatar */}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setSelectedRecruiter(r); }}
                    aria-label={`Open ${r.name} profile`}
                    className={`rounded-full overflow-hidden mb-5 mt-2 transition-transform hover:scale-105 ${isActive ? 'w-32 h-32' : 'w-28 h-28'}`}
                    style={{
                      border: `2px solid ${accent}`,
                      boxShadow: isActive ? `0 0 40px ${accent}88` : `0 0 22px ${accent}55`,
                    }}
                  >
                    <img
                      src={r.photo}
                      alt={r.name}
                      className="w-full h-full object-cover"
                    />
                  </button>

                  {/* Name + role */}
                  <h3 className={`font-medium text-[var(--text)] tracking-tight mb-1 text-center ${isActive ? 'text-xl' : 'text-lg'}`}>
                    {r.name}
                  </h3>
                  <div
                    className="text-[0.65rem] tracking-widest uppercase mb-5 font-medium"
                    style={{ color: accent }}
                  >
                    {t(r.roleKey)}
                  </div>

                  {/* Positions list — first 4 only, "..." if more */}
                  <ul className="flex flex-col gap-3 mb-5 text-left w-full">
                    {r.positions.slice(0, 4).map((pos) => (
                      <li
                        key={pos}
                        className={`text-base font-medium flex items-start gap-2.5 ${isActive ? 'text-[var(--text-muted)]' : 'text-[var(--text-muted)]'}`}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0 mt-2.5"
                          style={{ backgroundColor: accent }}
                        ></span>
                        <span>{pos}</span>
                      </li>
                    ))}
                    {r.positions.length > 4 && (
                      <li className="text-base flex items-center gap-2.5 text-[var(--text-muted)] leading-none pl-3">
                        ...
                      </li>
                    )}
                  </ul>

                  {/* Contacts: Telegram + LinkedIn */}
                  <div className="flex items-center gap-3 mb-5 relative z-30">
                    <a
                      href={r.telegramHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity text-[var(--text-muted)]"
                    >
                      <iconify-icon icon="simple-icons:telegram" class="text-base" style={{ color: accent }}></iconify-icon>
                      <span>{r.telegram}</span>
                    </a>
                    {r.linkedin && (
                      <a
                        href={r.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`${r.name} LinkedIn`}
                        className="flex items-center hover:opacity-80 transition-opacity"
                      >
                        <iconify-icon icon="simple-icons:linkedin" class="text-base" style={{ color: accent }}></iconify-icon>
                      </a>
                    )}
                  </div>

                  {/* Batafsil — primary CTA, opens recruiter modal */}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setSelectedRecruiter(r); }}
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

      <FAQ faqs={careerFaqs} accent={accent} label={t('vacancies.faqLabel')} heading={t('common.faqHeading')} />

      <RecruiterModal
        recruiter={selectedRecruiter}
        open={!!selectedRecruiter}
        onClose={() => setSelectedRecruiter(null)}
        accent={accent}
      />
    </section>
  );
}
