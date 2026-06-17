import { useState, useEffect } from 'react';
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

  const t = {
    kicker: lang === 'ru' ? 'Галерея' : 'Galereya',
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
    if (paused) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % FRAME_COUNT), INTERVAL);
    return () => clearInterval(id);
  }, [paused, index]);

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
        className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[16/10] md:aspect-[21/9]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
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
          onClick={() => go(index - 1)}
          aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white/80 hover:text-white transition-colors z-10 cursor-pointer"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
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
    </div>
  );
}
