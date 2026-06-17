import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSlide } from '../../contexts/SlideContext';
import { useLanguage } from '../../contexts/LanguageContext';

// PLACEHOLDER carousel — auto-rotates every 3s. Real event photos + captions
// will replace the placeholder frames later (just swap the `frames` data + add an <img>).
const FRAME_COUNT = 3;
const INTERVAL = 3000;

export default function EventsCarousel() {
  const { slide } = useSlide();
  const { lang } = useLanguage();
  const accent = slide.accent;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [zoom, setZoom] = useState(false);

  const t = {
    kicker: lang === 'ru' ? 'Галерея' : 'Galereya',
    close: lang === 'ru' ? 'Закрыть' : 'Yopish',
    heading: lang === 'ru' ? 'Жизнь в банке' : 'Bank hayoti',
    photoHint: lang === 'ru' ? 'Здесь будет фото события' : "Bu yerga tadbir rasmi qo'yiladi",
    title: lang === 'ru' ? 'Название события' : 'Tadbir nomi',
    text:
      lang === 'ru'
        ? 'Краткое описание события появится здесь.'
        : "Tadbir haqida qisqacha matn shu yerda bo'ladi.",
    tag: lang === 'ru' ? 'Событие' : 'Tadbir',
    photo: lang === 'ru' ? 'ФОТО' : 'RASM',
  };

  const frames = Array.from({ length: FRAME_COUNT }, (_, i) => i);

  useEffect(() => {
    if (paused || zoom) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % FRAME_COUNT), INTERVAL);
    return () => clearInterval(id);
  }, [paused, zoom, index]);

  const go = (i) => setIndex((i + FRAME_COUNT) % FRAME_COUNT);

  return (
    <div className="max-w-5xl mx-auto mt-14 md:mt-24">
      {/* Header */}
      <div className="text-center mb-8 md:mb-10">
        <div className="text-sm tracking-widest uppercase font-medium mb-3" style={{ color: accent }}>
          {t.kicker}
        </div>
        <h3 className="font-agro-expanded text-2xl md:text-4xl text-white font-bold tracking-tight">
          {t.heading}
        </h3>
      </div>

      {/* Carousel */}
      <div
        className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[16/10] md:aspect-[21/9] cursor-zoom-in"
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
        {frames.map((i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{
              opacity: index === i ? 1 : 0,
              pointerEvents: index === i ? 'auto' : 'none',
              background: `linear-gradient(135deg, ${accent}26, #0b0d12 62%)`,
            }}
          >
            {/* Placeholder hint (replaced by a real <img> later) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div
                className="font-agro-expanded font-bold text-5xl md:text-7xl"
                style={{ color: `${accent}55` }}
              >
                {t.photo} {i + 1}
              </div>
              <div className="text-xs md:text-sm text-white/40 mt-2">{t.photoHint}</div>
            </div>

            {/* Caption overlay — shows how real photo text will sit */}
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-left">
              <span
                className="inline-block text-[0.65rem] tracking-widest uppercase px-2.5 py-1 rounded-full mb-2"
                style={{ backgroundColor: `${accent}22`, color: accent }}
              >
                {t.tag}
              </span>
              <h4 className="text-lg md:text-2xl font-bold text-white">
                {t.title} {i + 1}
              </h4>
              <p className="text-sm md:text-base text-white/70 mt-1 max-w-xl">{t.text}</p>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); go(index - 1); }}
          aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white/80 hover:text-white transition-colors z-10 cursor-pointer"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); go(index + 1); }}
          aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white/80 hover:text-white transition-colors z-10 cursor-pointer"
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {frames.map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`${t.photo} ${i + 1}`}
            aria-current={index === i ? 'true' : undefined}
            className="h-2 rounded-full transition-all duration-300 cursor-pointer"
            style={{ width: index === i ? 28 : 8, backgroundColor: index === i ? accent : 'rgba(255,255,255,0.25)' }}
          />
        ))}
      </div>

      {/* Full-screen lightbox — tap photo to enlarge (portaled to body so it escapes transformed ancestors) */}
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
            aria-label={t.close}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-2xl leading-none cursor-pointer z-10"
          >
            ✕
          </button>
          <div
            className="relative w-full max-w-3xl aspect-[16/10] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ background: `linear-gradient(135deg, ${accent}26, #0b0d12 62%)` }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="font-agro-expanded font-bold text-6xl md:text-8xl" style={{ color: `${accent}55` }}>
                {t.photo} {index + 1}
              </div>
              <div className="text-sm text-white/40 mt-2">{t.photoHint}</div>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-left">
              <span
                className="inline-block text-[0.65rem] tracking-widest uppercase px-2.5 py-1 rounded-full mb-2"
                style={{ backgroundColor: `${accent}22`, color: accent }}
              >
                {t.tag}
              </span>
              <h4 className="text-xl md:text-3xl font-bold text-white">
                {t.title} {index + 1}
              </h4>
              <p className="text-sm md:text-base text-white/70 mt-1">{t.text}</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
