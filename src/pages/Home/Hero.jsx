import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';
import Typewriter from '../../components/Typewriter';
import { useSlide } from '../../contexts/SlideContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Hero() {
  const revealRef = useReveal();
  const { slideIndex, slide, next, prev } = useSlide();
  const { t, lang } = useLanguage();

  const launch = () => {
    document.getElementById('slide-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const accent = slide.accent;

  return (
    <section
      ref={revealRef}
      className="w-full max-w-7xl min-h-[78vh] md:min-h-[90vh] relative flex items-center border-b border-[var(--border)] overflow-hidden accent-transition bg-[var(--bg-soft)]"
      style={{ '--accent': accent }}
    >
      {/* Corner Brackets */}
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-[var(--border)] z-20"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-[var(--border)] z-20"></div>

      <div className="absolute inset-0 grid grid-cols-12 gap-6 px-6 h-full items-center">

        {/* Left Visual Area */}
        <div className="col-span-12 md:col-span-7 flex h-full relative items-center justify-center clip-slide delay-200">
          <div className="relative w-[500px] h-[500px] flex items-center justify-center scale-95 md:scale-100 -my-3 md:my-0 origin-center">
            {/* Hero image container */}
            <div
              className="absolute w-[300px] h-[300px] rounded-full bg-white border border-[var(--border)] flex items-center justify-center relative overflow-hidden group"
              style={{ boxShadow: 'var(--card-shadow)' }}
            >
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
                  <slide.HeroIcon size={170} strokeWidth={1.2} style={{ color: accent }} />
                </div>
              ) : null}
            </div>

            {/* Left arrow — previous slide (outlined accent button) */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:-translate-x-1 cursor-pointer bg-white"
              style={{
                border: `2px solid ${accent}`,
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <ChevronLeft size={24} strokeWidth={2.5} style={{ color: accent }} />
            </button>

            {/* Right arrow — next slide (filled accent button, primary CTA) */}
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="absolute right-[5%] top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
              style={{
                backgroundColor: accent,
                boxShadow: '0 2px 6px rgba(0, 151, 58, 0.25)',
              }}
            >
              <ChevronRight size={28} strokeWidth={2.5} className="text-white animate-nudge-right" />
            </button>

          </div>
        </div>

        {/* Right Text Area — pulled up on mobile so the Batafsil button stays in view */}
        <div className="col-span-12 md:col-span-5 flex flex-col justify-center relative z-10 overflow-hidden -mt-20 md:mt-0">
          <div key={slideIndex} className="animate-slide-in">
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-2xl font-light" style={{ color: accent }}>{slide.num}</span>
              <div className="w-8 h-px bg-[var(--border)]"></div>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="text-[var(--text-muted)] transition-colors cursor-pointer hover:[color:var(--accent)]"
              >
                <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
              </button>
            </div>

            <h1 className="leading-[1.1] text-4xl md:text-6xl font-medium text-[var(--text)] tracking-tight mb-4 md:mb-6">
              <Typewriter key={`${slideIndex}-${lang}`} text={slide.heading} speed={70} startDelay={300} cursorColor={accent} />
            </h1>

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
          </div>
        </div>
      </div>

      {/* Bottom Progress Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-[var(--border)] flex clip-slide delay-800">
        <div className="w-1/3 h-full" style={{ backgroundColor: accent, opacity: 0.7 }}></div>
        <div className="w-1/4 h-full" style={{ backgroundColor: accent }}></div>
      </div>
    </section>
  );
}
