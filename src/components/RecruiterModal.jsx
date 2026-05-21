import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function RecruiterModal({ recruiter, open, onClose, accent = '#0443F2' }) {
  const { t } = useLanguage();
  useEffect(() => {
    if (!open) return;

    // Push a history entry so the phone's hardware back button closes the modal
    // instead of navigating away from the page.
    window.history.pushState({ modal: 'recruiter' }, '');

    const handlePop = () => onClose();
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };

    window.addEventListener('popstate', handlePop);
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('popstate', handlePop);
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
      // If the modal was closed by other means (X / backdrop / ESC), pop our
      // pushed entry so the back stack stays clean.
      if (window.history.state && window.history.state.modal === 'recruiter') {
        window.history.back();
      }
    };
  }, [open, onClose]);

  if (!open || !recruiter) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md animate-[fadeIn_0.25s_ease]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-[#0b0d12] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto skeuo-card"
        style={{ boxShadow: `0 30px 80px -20px ${accent}55` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t('recruiterModal.closeAria')}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors"
        >
          <X size={22} strokeWidth={1.5} />
        </button>

        {/* Recruiter Profile — big avatar block */}
        <div className="px-8 pt-12 pb-10 md:px-12 flex flex-col items-center text-center border-b border-white/10">
          <div
            className="w-32 h-32 rounded-full overflow-hidden mb-5"
            style={{
              border: `2px solid ${accent}`,
              boxShadow: `0 0 40px ${accent}55`,
            }}
          >
            {recruiter.photo ? (
              <img
                src={recruiter.photo}
                alt={recruiter.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-3xl font-semibold text-white"
                style={{ backgroundColor: `${accent}40` }}
              >
                {recruiter.initials}
              </div>
            )}
          </div>

          <h2 className="text-3xl font-medium text-white tracking-tight mb-1">
            {recruiter.name}
          </h2>

          <div
            className="text-[0.65rem] tracking-widest uppercase mb-6 font-medium"
            style={{ color: accent }}
          >
            {recruiter.roleKey ? t(recruiter.roleKey) : recruiter.role}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={recruiter.telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: accent }}
            >
              <iconify-icon icon="simple-icons:telegram" class="text-base"></iconify-icon>
              {recruiter.telegram}
            </a>
            {recruiter.linkedin && (
              <a
                href={recruiter.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5 border"
                style={{ color: accent, borderColor: accent }}
              >
                <iconify-icon icon="simple-icons:linkedin" class="text-base"></iconify-icon>
                LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Positions list */}
        <div className="px-8 py-10 md:px-12">
          <div
            className="text-[0.65rem] tracking-widest uppercase mb-3 font-medium"
            style={{ color: accent }}
          >
            {t('recruiterModal.sectionKicker')}
          </div>
          <h3 className="text-xl text-white font-medium mb-6">
            {t('recruiterModal.sectionHeading')}
          </h3>

          <ul className="flex flex-col gap-3">
            {recruiter.positions.map((pos) => (
              <li
                key={pos}
                className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 hover:border-white/30 transition-colors"
                style={{ backgroundColor: `${accent}08` }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: accent }}
                ></span>
                <span className="text-base text-white">{pos}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body,
  );
}
