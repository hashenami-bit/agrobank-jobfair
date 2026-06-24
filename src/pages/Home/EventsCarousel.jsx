import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSlide } from '../../contexts/SlideContext';
import { useLanguage } from '../../contexts/LanguageContext';

import aihackaton from '../../assets/events/aihackaton.webp';
import ayollarklublari from '../../assets/events/ayollarklublari.jpg';
import chess from '../../assets/events/chess.jpg';
import football from '../../assets/events/football.jpg';
import jahonchampfan from '../../assets/events/Jahonchempianatimuxlisi.jpg';
import mutoala from '../../assets/events/mutoala.jpg';
import sportvazirligi from '../../assets/events/sportvazirligi.jpg';
import valleyball from '../../assets/events/valleyball.jpg';
import zominultramarafon from '../../assets/events/zominultramarafon.jpg';

// One photo per event. Captions are drafts based on photo context + research;
// refine the wording anytime.
const EVENTS = [
  { img: aihackaton, alt: 'AI500 hackathon', tag: { uz: 'Hakaton', ru: 'Хакатон' }, title: { uz: 'AI500 Hakaton', ru: 'Хакатон AI500' }, desc: { uz: "Agrobank va IT Community hamkorligidagi mamlakatdagi eng yirik AI-hakaton — 500 mln so'm mukofot jamg'armasi bilan.", ru: 'Крупнейший AI-хакатон страны от Agrobank и IT Community с призовым фондом 500 млн сумов.' } },
  { img: ayollarklublari, alt: "Women's club event", tag: { uz: 'Jamoa', ru: 'Сообщество' }, title: { uz: 'Ayollar klubi', ru: 'Женский клуб' }, desc: { uz: "Bank ayollar klubi a'zolarining ommaviy sport va sog'lomlashtirish tadbiridagi ishtiroki.", ru: 'Участницы женского клуба банка на массовом спортивно-оздоровительном мероприятии.' } },
  { img: chess, alt: 'Chess tournament', tag: { uz: 'Sport', ru: 'Спорт' }, title: { uz: 'Shaxmat turniri', ru: 'Шахматный турнир' }, desc: { uz: "Xodimlar o'rtasida o'tkazilgan shaxmat turniri.", ru: 'Шахматный турнир среди сотрудников банка.' } },
  { img: football, alt: 'World Cup broadcast fan-zone', tag: { uz: 'Translyatsiya', ru: 'Трансляция' }, title: { uz: 'Jahon chempionati translyatsiyasi', ru: 'Трансляция Чемпионата мира' }, desc: { uz: 'Agrobank homiyligida Jahon chempionati translyatsiyasi va jonkuyarlar zonasi.', ru: 'Трансляция Чемпионата мира и фан-зона при поддержке Agrobank.' } },
  { img: jahonchampfan, alt: 'National team support — Uzbekistan vs Colombia', tag: { uz: 'Muxlislar', ru: 'Болельщики' }, title: { uz: 'Terma jamoa muxlislari', ru: 'Болельщики сборной' }, desc: { uz: "Bosh ofisda O'zbekiston terma jamoasini Jahon chempionatida birgalikda qo'llab-quvvatlash.", ru: 'Совместная поддержка сборной Узбекистана на Чемпионате мира в головном офисе.' } },
  { img: mutoala, alt: 'Mutolaa reading marathon', tag: { uz: 'Yoshlar', ru: 'Молодёжь' }, title: { uz: 'Mutolaa marafoni', ru: 'Марафон чтения Mutolaa' }, desc: { uz: "Yoshlar bilan 'Mutolaa' kitobxonlik marafoni doirasidagi uchrashuv.", ru: 'Встреча в рамках марафона чтения «Mutolaa» с молодёжью.' } },
  { img: sportvazirligi, alt: 'Chimgan mountain festival', tag: { uz: 'Festival', ru: 'Фестиваль' }, title: { uz: "Chimgan tog' festivali", ru: 'Горный фестиваль Чимган' }, desc: { uz: "Sport vazirligi tashkil etgan Chimgan tog' festivalida bank jamoasi ishtiroki.", ru: 'Команда банка на горном фестивале «Чимган» от Министерства спорта.' } },
  { img: valleyball, alt: 'Volleyball tournament', tag: { uz: 'Sport', ru: 'Спорт' }, title: { uz: 'Voleybol turniri', ru: 'Турнир по волейболу' }, desc: { uz: 'Agrobank kubogi doirasida voleybol turniri.', ru: 'Турнир по волейболу в рамках кубка Agrobank.' } },
  { img: zominultramarafon, alt: 'Zomin ultramarathon', tag: { uz: 'Sport', ru: 'Спорт' }, title: { uz: 'Zomin ultramarafoni', ru: 'Зоминский ультрамарафон' }, desc: { uz: "Bank jamoasining Zomin ultramarafonidagi ishtiroki va sovrinlari.", ru: 'Участие команды банка в Зоминском ультрамарафоне.' } },
];

const INTERVAL = 3000;

export default function EventsCarousel() {
  const { slide } = useSlide();
  const { lang } = useLanguage();
  const accent = slide.accent;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [zoom, setZoom] = useState(false);

  const N = EVENTS.length;
  const L = (o) => (lang === 'ru' ? o.ru : o.uz);
  const heading = lang === 'ru' ? 'Жизнь в банке' : 'Bank hayoti';
  const kicker = lang === 'ru' ? 'Галерея' : 'Galereya';
  const closeLabel = lang === 'ru' ? 'Закрыть' : 'Yopish';

  useEffect(() => {
    if (paused || zoom) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % N), INTERVAL);
    return () => clearInterval(id);
  }, [paused, zoom, index, N]);

  const go = (i) => setIndex((i + N) % N);
  const cur = EVENTS[index];

  return (
    <div className="max-w-5xl mx-auto mt-14 md:mt-24">
      {/* Header */}
      <div className="text-center mb-8 md:mb-10">
        <div className="text-sm tracking-widest uppercase font-medium mb-3" style={{ color: accent }}>
          {kicker}
        </div>
        <h3 className="font-agro-expanded text-2xl md:text-4xl text-white font-bold tracking-tight">
          {heading}
        </h3>
      </div>

      {/* Carousel */}
      <div
        className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[16/10] md:aspect-[21/9] cursor-zoom-in bg-[#0b0d12]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onClick={() => setZoom(true)}
      >
        {/* Tap-to-enlarge hint */}
        <div className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white/80 pointer-events-none">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
          </svg>
        </div>

        {EVENTS.map((e, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: index === i ? 1 : 0, pointerEvents: index === i ? 'auto' : 'none' }}
          >
            <img src={e.img} alt={e.alt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-left">
              <span
                className="inline-block text-[0.65rem] tracking-widest uppercase px-2.5 py-1 rounded-full mb-2"
                style={{ backgroundColor: `${accent}22`, color: accent }}
              >
                {L(e.tag)}
              </span>
              <h4 className="font-agro text-lg md:text-2xl font-bold text-white">{L(e.title)}</h4>
              {L(e.desc) && <p className="text-sm md:text-base text-white/70 mt-1 max-w-xl">{L(e.desc)}</p>}
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button
          type="button"
          onClick={(ev) => { ev.stopPropagation(); go(index - 1); }}
          aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white/80 hover:text-white transition-colors z-10 cursor-pointer"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={(ev) => { ev.stopPropagation(); go(index + 1); }}
          aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white/80 hover:text-white transition-colors z-10 cursor-pointer"
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
        {EVENTS.map((e, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={L(e.title)}
            aria-current={index === i ? 'true' : undefined}
            className="h-2 rounded-full transition-all duration-300 cursor-pointer"
            style={{ width: index === i ? 28 : 8, backgroundColor: index === i ? accent : 'rgba(255,255,255,0.25)' }}
          />
        ))}
      </div>

      {/* Full-screen lightbox */}
      {zoom && createPortal(
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setZoom(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setZoom(false)}
            aria-label={closeLabel}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-2xl leading-none cursor-pointer z-10"
          >
            ✕
          </button>
          <button
            type="button"
            onClick={(ev) => { ev.stopPropagation(); go(index - 1); }}
            aria-label="Previous"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10 cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={(ev) => { ev.stopPropagation(); go(index + 1); }}
            aria-label="Next"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10 cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>
          <div className="relative w-full max-w-4xl" onClick={(ev) => ev.stopPropagation()}>
            <img src={cur.img} alt={cur.alt} className="w-full max-h-[80vh] object-contain rounded-xl" />
            <div className="mt-4 text-center">
              <span
                className="inline-block text-[0.65rem] tracking-widest uppercase px-2.5 py-1 rounded-full mb-2"
                style={{ backgroundColor: `${accent}22`, color: accent }}
              >
                {L(cur.tag)}
              </span>
              <h4 className="font-agro text-xl md:text-2xl font-bold text-white">{L(cur.title)}</h4>
              {L(cur.desc) && <p className="text-sm md:text-base text-white/70 mt-1">{L(cur.desc)}</p>}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
