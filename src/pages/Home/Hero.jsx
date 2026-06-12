import { useRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';
import Typewriter from '../../components/Typewriter';
import { useSlide } from '../../contexts/SlideContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Hero() {
  const revealRef = useReveal();
  const { slideIndex, slide, slides, next, prev, setSlideIndex } = useSlide();
  const { t, lang } = useLanguage();

  const launch = () => {
    document.getElementById('slide-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Touch swipe → change slides (mobile). Ignores taps and vertical scrolls.
  const touchStart = useRef(null);
  const onTouchStart = (e) => {
    const tp = e.touches[0];
    touchStart.current = { x: tp.clientX, y: tp.clientY };
  };
  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const tp = e.changedTouches[0];
    const dx = tp.clientX - touchStart.current.x;
    const dy = tp.clientY - touchStart.current.y;
    touchStart.current = null;
    // require a deliberate horizontal swipe
    if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy)) return;
    if (dx < 0) next();
    else prev();
  };
  const accent = slide.accent;
  // 8-digit hex appends alpha — '66' ≈ 40%, '99' ≈ 60%
  const accentGlow = `${accent}66`;
  const accentSoft = `${accent}1A`; // ~10% — for subtle backgrounds

  return (
    <section
      ref={revealRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="w-full max-w-7xl min-h-[calc(100svh-115px)] md:min-h-[90vh] relative flex items-center border-b border-white/[0.05] overflow-hidden accent-transition"
      style={{ '--accent': accent }}
    >
      {/* Corner Brackets */}
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/20 z-20"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20 z-20"></div>

      <div className="relative md:absolute inset-0 grid grid-cols-12 gap-6 px-6 h-auto md:h-full items-center pt-2.5 pb-12 md:py-0">

        {/* Left Visual Area — desktop only (mobile uses a calm inline image instead of the ring) */}
        <div className="col-span-12 md:col-span-7 hidden md:flex h-full relative items-center justify-center clip-slide delay-200">
          <div className="relative w-[500px] h-[500px] flex items-center justify-center scale-95 md:scale-100 -my-3 md:my-0 origin-center">
            {/* Outer glow */}
            <div
              className="absolute inset-0 rounded-full opacity-5 blur-3xl animate-pulse"
              style={{ backgroundColor: accent }}
            ></div>

            {/* Layer 1: Outer metallic ring */}
            <div
              className="absolute w-[400px] h-[400px] rounded-full border border-white/[0.05] bg-gradient-to-br from-white/[0.02] to-transparent"
              style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.8), 0 20px 50px rgba(0,0,0,0.5)" }}
            ></div>

            {/* Rotating AGROBANK text along the outer glass ring */}
            <svg
              className="absolute w-[440px] h-[440px] pointer-events-none animate-spin [animation-duration:12s] origin-center"
              viewBox="0 0 440 440"
              style={{ filter: `drop-shadow(0 0 6px ${accentGlow})` }}
            >
              <defs>
                <path
                  id="agrobank-ring"
                  d="M 220,220 m -170,0 a 170,170 0 1,1 340,0 a 170,170 0 1,1 -340,0"
                  fill="none"
                />
              </defs>
              {[0, 25, 50, 75].map((offset) => (
                <text
                  key={offset}
                  fill={accent}
                  fillOpacity="0.9"
                  fontSize="24"
                  letterSpacing="5"
                  fontWeight="600"
                  dominantBaseline="middle"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  <textPath href="#agrobank-ring" startOffset={`${offset}%`}>
                    AGROBANK
                  </textPath>
                </text>
              ))}
            </svg>

            {/* Layer 2: Inner detailed ring */}
            <div className="absolute w-[300px] h-[300px] rounded-full border border-white/10 skeuo-card flex items-center justify-center relative overflow-hidden group">
              {/* Per-slide hero visual: image OR centered icon */}
              {slide.image ? (
                <img
                  key={slideIndex}
                  src={slide.image}
                  style={{
                    '--img-scale': slide.imgScale ?? 0.9,
                    '--img-scale-hover': slide.imgScaleHover ?? 1,
                  }}
                  className="hero-img absolute inset-0 w-full h-full object-cover opacity-90"
                  alt={slide.alt}
                />
              ) : slide.HeroIcon ? (
                <div
                  key={slideIndex}
                  className="hero-img absolute inset-0 flex items-center justify-center"
                  style={{
                    '--img-scale': slide.imgScale ?? 1,
                    '--img-scale-hover': slide.imgScaleHover ?? 1.05,
                  }}
                >
                  <slide.HeroIcon
                    size={170}
                    strokeWidth={1.2}
                    style={{ color: accent, filter: `drop-shadow(0 0 40px ${accent}99)` }}
                  />
                </div>
              ) : null}
            </div>

            {/* Left arrow — previous slide (outlined accent button) */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full hidden md:flex items-center justify-center transition-all hover:scale-110 hover:-translate-x-1 cursor-pointer"
              style={{
                border: `2px solid ${accent}`,
                backgroundColor: accentSoft,
                boxShadow: `0 0 24px ${accent}40`,
              }}
            >
              <ChevronLeft size={24} strokeWidth={2.5} style={{ color: accent }} />
            </button>

            {/* Right arrow — next slide (filled accent button, primary CTA) */}
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="absolute right-[5%] top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full hidden md:flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
              style={{
                backgroundColor: accent,
                boxShadow: `0 0 30px ${accent}88, 0 0 60px ${accent}44`,
              }}
            >
              <ChevronRight size={28} strokeWidth={2.5} className="text-white animate-nudge-right" />
            </button>

          </div>
        </div>

        {/* Content area — on mobile this is the whole hero (the ring visual is hidden) */}
        <div className="col-span-12 md:col-span-5 flex flex-col justify-center relative z-10 overflow-hidden">
          <div key={slideIndex} className="animate-slide-in">
            {/* Desktop: slide number + next arrow */}
            <div className="hidden md:flex items-center space-x-4 mb-4">
              <span className="text-2xl font-light" style={{ color: accent }}>{slide.num}</span>
              <div className="w-8 h-px bg-white/20"></div>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="text-white/50 transition-colors cursor-pointer hover:[color:var(--accent)]"
              >
                <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
              </button>
            </div>

            {/* Mobile: kicker — which slide you're on */}
            <span className="md:hidden block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: accent }}>
              {slide.num} · {slide.label}
            </span>

            <h1 className="font-agro-expanded leading-[1.1] text-4xl md:text-6xl font-bold text-white tracking-tight mb-4 md:mb-6">
              <Typewriter key={`${slideIndex}-${lang}`} text={slide.heading} speed={70} startDelay={300} cursorColor={accent} />
            </h1>

            {/* Mobile: the Agrobank orb — circular ring + rotating AGROBANK text, in the content-first flow */}
            <div className="md:hidden relative w-[300px] h-[300px] mx-auto mb-8 flex items-center justify-center">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full opacity-5 blur-3xl animate-pulse" style={{ backgroundColor: accent }}></div>

              {/* Outer metallic ring */}
              <div
                className="absolute w-[240px] h-[240px] rounded-full border border-white/[0.05] bg-gradient-to-br from-white/[0.02] to-transparent"
                style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8), 0 20px 50px rgba(0,0,0,0.5)' }}
              ></div>

              {/* Rotating AGROBANK text */}
              <svg
                className="absolute w-[264px] h-[264px] pointer-events-none animate-spin [animation-duration:12s] origin-center"
                viewBox="0 0 440 440"
                style={{ filter: `drop-shadow(0 0 6px ${accentGlow})` }}
              >
                <defs>
                  <path id="agrobank-ring-mobile" d="M 220,220 m -170,0 a 170,170 0 1,1 340,0 a 170,170 0 1,1 -340,0" fill="none" />
                </defs>
                {[0, 25, 50, 75].map((offset) => (
                  <text
                    key={offset}
                    fill={accent}
                    fillOpacity="0.9"
                    fontSize="24"
                    letterSpacing="5"
                    fontWeight="600"
                    dominantBaseline="middle"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    <textPath href="#agrobank-ring-mobile" startOffset={`${offset}%`}>
                      AGROBANK
                    </textPath>
                  </text>
                ))}
              </svg>

              {/* Inner ring with the slide image */}
              <div className="absolute w-[180px] h-[180px] rounded-full border border-white/10 skeuo-card flex items-center justify-center overflow-hidden">
                {slide.image ? (
                  <img
                    key={slideIndex}
                    src={slide.image}
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                    alt={slide.alt}
                  />
                ) : slide.HeroIcon ? (
                  <slide.HeroIcon size={100} strokeWidth={1.2} style={{ color: accent, filter: `drop-shadow(0 0 30px ${accent}99)` }} />
                ) : null}
              </div>
            </div>

            <div className="flex items-center">
              <button
                type="button"
                onClick={launch}
                className="btn-pill-filled px-7 py-3.5 rounded-full text-base font-semibold tracking-wide inline-flex items-center gap-2.5 cursor-pointer"
              >
                {t('common.batafsil')}
                <ChevronDown size={20} strokeWidth={2.5} className="animate-bounce-down" />
              </button>
            </div>

            {/* Mobile: slide switcher — tappable dots + de-emphasized chevrons */}
            <div className="md:hidden flex items-center gap-3 mt-8">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-white/45 active:text-white transition-colors"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>

              <div className="flex items-center gap-2" aria-label="Slides">
                {slides.map((s, i) => {
                  const active = slideIndex === i;
                  return (
                    <button
                      key={s.num}
                      type="button"
                      aria-label={s.label || `Slide ${i + 1}`}
                      aria-current={active ? 'true' : undefined}
                      onClick={() => setSlideIndex(i)}
                      className="h-2.5 rounded-full transition-all duration-300"
                      style={{
                        width: active ? 30 : 10,
                        backgroundColor: active ? accent : 'rgba(255,255,255,0.25)',
                      }}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/45 active:text-white transition-colors"
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Progress Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/10 flex clip-slide delay-800">
        <div className="w-1/3 h-full" style={{ backgroundColor: accent, opacity: 0.7 }}></div>
        <div className="w-1/4 h-full" style={{ backgroundColor: accent }}></div>
      </div>
    </section>
  );
}
