import clsx from 'clsx';
import { useLanguage } from '../contexts/LanguageContext';
import { useSlide } from '../contexts/SlideContext';

const OPTIONS = [
  { code: 'uz', label: 'UZ' },
  { code: 'ru', label: 'RU' },
];

export default function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();
  const { slide } = useSlide();
  const accent = slide?.accent ?? '#ffffff';

  return (
    <div
      role="group"
      aria-label={t('languageToggle.aria')}
      className="relative inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm p-0.5 text-[0.7rem] font-semibold tracking-widest uppercase select-none"
    >
      {OPTIONS.map((opt) => {
        const active = lang === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLang(opt.code)}
            aria-pressed={active}
            className={clsx(
              'relative z-10 px-3 py-1.5 rounded-full transition-colors cursor-pointer',
              active ? 'text-white' : 'text-white/55 hover:text-white/80'
            )}
            style={active ? {
              backgroundColor: `${accent}33`,
              boxShadow: `inset 0 0 0 1px ${accent}66, 0 0 16px -4px ${accent}88`,
              color: '#fff',
            } : undefined}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
