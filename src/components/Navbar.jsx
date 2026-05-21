import { useState, useEffect } from 'react';
import clsx from 'clsx';
import agrobankLogo from '../assets/agrobank-logo.svg';
import { useSlide } from '../contexts/SlideContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { slideIndex, setSlideIndex, slides } = useSlide();
  const { t } = useLanguage();

  const goToSlide = (i) => {
    setSlideIndex(i);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetToHome = () => goToSlide(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={clsx(
      "sticky top-0 w-full max-w-7xl px-6 flex items-center justify-between z-50 transition-all duration-300",
      scrolled
        ? "py-3 bg-[#030303]/80 backdrop-blur-md border-b border-white/[0.1] shadow-lg"
        : "pt-8 md:pt-[88px] pb-4 bg-transparent border-b border-white/[0.05]"
    )}>
      {/* Corner Brackets */}
      <div className={clsx(
        "absolute top-0 left-0 w-2 h-2 border-l border-t transition-colors duration-300",
        scrolled ? "border-white/40" : "border-white/20"
      )}></div>
      <div className={clsx(
        "absolute top-0 right-0 w-2 h-2 border-r border-t transition-colors duration-300",
        scrolled ? "border-white/40" : "border-white/20"
      )}></div>

      <button
        type="button"
        onClick={resetToHome}
        aria-label={t('navbar.resetAria')}
        className="flex items-center group cursor-pointer bg-transparent border-0 p-0"
      >
        <img
          src={agrobankLogo}
          alt="Agrobank"
          className="h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
        />
      </button>

      {/* Right cluster: slide nav (desktop) + language toggle (always) */}
      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden md:flex items-center gap-7 text-xs font-medium tracking-widest uppercase">
          {slides.map((s, i) => {
            const active = slideIndex === i;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => goToSlide(i)}
                className="flex items-center gap-1.5 transition-colors cursor-pointer hover:text-white"
                style={{ color: active ? s.accent : 'rgba(255,255,255,0.55)' }}
              >
                <span className="text-[0.65rem] opacity-70">{s.num}</span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
        <LanguageToggle />
      </div>
    </nav>
  );
}
