import { useMemo, useState } from 'react';
import { ArrowUpRight, Search, Send } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';
import MaskedText from '../../components/MaskedText';
import headhunterLogo from '../../assets/headhunter-logo.png';
import islomPhoto from '../../assets/recruiters/islom.jpg';
import durdonaPhoto from '../../assets/recruiters/durdona.jpeg';
import elyorPhoto from '../../assets/recruiters/elyor.jpeg';
import RecruiterModal from '../../components/RecruiterModal';
import ApplyModal from '../../components/ApplyModal';
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
  const [applyTarget, setApplyTarget] = useState(null); // { position, recruiter }
  const [query, setQuery] = useState('');
  const [teamFilter, setTeamFilter] = useState('all'); // 'all' | recruiter.id
  const careerFaqs = t('vacancies.faqs') || [];

  // Flat list of every position with its owning recruiter — used by search/filter section.
  const allPositions = useMemo(
    () => recruiters.flatMap((r) => r.positions.map((pos) => ({ pos, recruiter: r }))),
    [],
  );

  const filteredPositions = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPositions.filter(({ pos, recruiter }) => {
      if (teamFilter !== 'all' && recruiter.id !== teamFilter) return false;
      if (!q) return true;
      return pos.toLowerCase().includes(q) || recruiter.badge.toLowerCase().includes(q);
    });
  }, [allPositions, query, teamFilter]);
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
      className="w-full max-w-7xl py-32 px-6 relative border-b border-white/[0.05]"
      style={{ '--accent': accent, '--card-hover-border': `${accent}66` }}
    >
      {/* Vertical guide lines */}
      <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/[0.03] -z-10"></div>
      <div className="absolute top-0 bottom-0 right-1/3 w-px bg-white/[0.03] -z-10"></div>

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
        <h2 className="text-4xl md:text-5xl text-white font-medium tracking-tight">
          <MaskedText key={`vac-h-${lang}`} text={t('vacancies.heading')} delayStart={200} stagger={100} />
        </h2>
      </div>

      {/* Branch heading */}
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl text-white font-medium tracking-tight">
          {t('vacancies.branchHeading')}
        </h3>
      </div>

      {/* Cards */}
      <div ref={gridRef} className="relative max-w-6xl mx-auto holodex-container">
        {/* Connector lines (1 trunk → 4 legs) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-white/20 clip-slide delay-200"></div>
        <div className="absolute top-12 left-[12.5%] right-[12.5%] h-px bg-white/20 clip-slide delay-300"></div>
        <div className="absolute top-12 left-[12.5%] w-px h-12 bg-white/20 clip-slide delay-400"></div>
        <div className="absolute top-12 left-[37.5%] w-px h-12 bg-white/20 clip-slide delay-400"></div>
        <div className="absolute top-12 left-[62.5%] w-px h-12 bg-white/20 clip-slide delay-400"></div>
        <div className="absolute top-12 left-[87.5%] w-px h-12 bg-white/20 clip-slide delay-400"></div>

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
                    isActive ? 'skeuo-card-active' : 'border border-white/5 skeuo-card'
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

                  <h3 className={`font-medium text-white tracking-tight mb-3 ${isActive ? 'text-2xl' : 'text-xl'}`}>
                    {bizCard.title}
                  </h3>

                  <p className={`text-sm leading-relaxed font-light mb-8 ${isActive ? 'text-white/65' : 'text-white/55'}`}>
                    {bizCard.description}
                  </p>

                  <span className="px-6 py-2 mt-auto border border-white/20 rounded-full text-white text-[0.65rem] tracking-widest uppercase hover:bg-white hover:text-black transition-all relative z-20 inline-flex items-center gap-2">
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
                    isActive ? 'skeuo-card-active' : 'border border-white/5 skeuo-card'
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
                  <h3 className={`font-medium text-white tracking-tight mb-1 text-center ${isActive ? 'text-xl' : 'text-lg'}`}>
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
                        className={`text-base font-medium flex items-start gap-2.5 ${isActive ? 'text-white/90' : 'text-white/80'}`}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0 mt-2.5"
                          style={{ backgroundColor: accent }}
                        ></span>
                        <span>{pos}</span>
                      </li>
                    ))}
                    {r.positions.length > 4 && (
                      <li className="text-base flex items-center gap-2.5 text-white/45 leading-none pl-3">
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
                      className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity text-white/85"
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

      {/* ─── All Vacancies: search + filter + flat list with Apply CTA ─── */}
      <div className="relative max-w-6xl mx-auto mt-24">
        <div className="text-center mb-8">
          <div
            className="text-[0.65rem] tracking-widest uppercase mb-3 font-medium"
            style={{ color: accent }}
          >
            {t('vacancies.allKicker') || 'Barcha vakansiyalar'}
          </div>
          <h3 className="text-3xl md:text-4xl text-white font-medium tracking-tight">
            {t('vacancies.allHeading') || 'O‘zingizga mos lavozimni toping'}
          </h3>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-5">
          <Search
            size={18}
            strokeWidth={2}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('vacancies.searchPlaceholder') || 'Lavozim yoki kalit so‘zni kiriting (masalan: Java, ML, QA)'}
            className="apply-input pl-11"
          />
        </div>

        {/* Team chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setTeamFilter('all')}
            className={`filter-chip ${teamFilter === 'all' ? 'is-active' : ''}`}
          >
            {t('vacancies.filterAll') || 'Hammasi'} ({allPositions.length})
          </button>
          {recruiters.map((r) => {
            const count = allPositions.filter((p) => p.recruiter.id === r.id).length;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setTeamFilter(r.id)}
                className={`filter-chip ${teamFilter === r.id ? 'is-active' : ''}`}
              >
                {r.badge} ({count})
              </button>
            );
          })}
        </div>

        {/* Position grid */}
        {filteredPositions.length === 0 ? (
          <div className="text-center py-12 text-white/55 text-sm">
            {t('vacancies.noResults') || 'Hozircha hech narsa topilmadi. Boshqa kalit so‘z bilan urinib ko‘ring.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPositions.map(({ pos, recruiter }) => (
              <div
                key={`${recruiter.id}-${pos}`}
                className="skeuo-card rounded-2xl p-5 flex flex-col gap-4 transition-all hover:-translate-y-0.5"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="text-[0.6rem] tracking-widest uppercase font-medium px-2 py-1 rounded-full border"
                    style={{ color: accent, borderColor: `${accent}55`, backgroundColor: `${accent}10` }}
                  >
                    {recruiter.badge}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedRecruiter(recruiter)}
                    className="text-[0.65rem] text-white/45 hover:text-white/80 transition-colors"
                  >
                    {recruiter.name.split(' ').slice(-1)[0]} →
                  </button>
                </div>

                <h4 className="text-base md:text-lg text-white font-medium leading-snug">
                  {pos}
                </h4>

                <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                  <a
                    href={recruiter.telegramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/55 hover:text-white inline-flex items-center gap-1.5 transition-colors"
                  >
                    <iconify-icon icon="simple-icons:telegram" class="text-sm" style={{ color: accent }}></iconify-icon>
                    {recruiter.telegram}
                  </a>
                  <button
                    type="button"
                    onClick={() => setApplyTarget({ position: pos, recruiter })}
                    style={{ '--accent': accent }}
                    className="btn-pill-filled px-3.5 py-2 rounded-full text-[0.65rem] tracking-widest uppercase font-semibold inline-flex items-center gap-1.5"
                  >
                    {t('vacancies.applyCta') || 'Ariza'}
                    <Send size={12} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FAQ faqs={careerFaqs} accent={accent} label={t('vacancies.faqLabel')} heading={t('common.faqHeading')} />

      <RecruiterModal
        recruiter={selectedRecruiter}
        open={!!selectedRecruiter}
        onClose={() => setSelectedRecruiter(null)}
        accent={accent}
      />

      <ApplyModal
        open={!!applyTarget}
        onClose={() => setApplyTarget(null)}
        position={applyTarget?.position}
        recruiter={applyTarget?.recruiter}
        accent={accent}
      />
    </section>
  );
}
