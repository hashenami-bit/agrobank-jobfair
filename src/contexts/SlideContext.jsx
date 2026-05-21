import { createContext, useContext, useMemo, useState } from 'react';
import globeImage from '../assets/globe.webp';
import staircasesImage from '../assets/staircases.webp';
import cityscapeImage from '../assets/cityscape.webp';
import { useLanguage } from './LanguageContext';

const slideMeta = [
  { num: '01', accent: '#b91c1c', image: globeImage, alt: 'Glowing Earth globe', imgScale: 1, imgScaleHover: 1 },
  { num: '02', accent: '#0443F2', image: staircasesImage, alt: 'Glowing staircase', imgScale: 1.12, imgScaleHover: 1.12 },
  { num: '03', accent: '#10b981', image: cityscapeImage, alt: 'Glowing cityscape', imgScale: 1, imgScaleHover: 1 },
];

const SlideContext = createContext(null);

export function SlideProvider({ children }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const { t } = useLanguage();

  const slides = useMemo(() => {
    const localized = t('slides') || [];
    return slideMeta.map((m, i) => ({
      ...m,
      label: localized[i]?.label ?? '',
      heading: localized[i]?.heading ?? '',
    }));
  }, [t]);

  const value = useMemo(() => {
    const next = () => setSlideIndex((i) => (i + 1) % slides.length);
    const prev = () => setSlideIndex((i) => (i - 1 + slides.length) % slides.length);
    return {
      slideIndex,
      slide: slides[slideIndex],
      slides,
      next,
      prev,
      setSlideIndex,
    };
  }, [slideIndex, slides]);

  return <SlideContext.Provider value={value}>{children}</SlideContext.Provider>;
}

export function useSlide() {
  const ctx = useContext(SlideContext);
  if (!ctx) throw new Error('useSlide must be used inside <SlideProvider>');
  return ctx;
}
