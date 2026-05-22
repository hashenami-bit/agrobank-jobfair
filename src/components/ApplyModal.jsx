import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ApplyModal({ open, onClose, position, recruiter, accent = '#00973A' }) {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', phone: '', email: '', note: '', cv: null });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;
    setSubmitted(false);
    setErrors({});
    setForm({ name: '', phone: '', email: '', note: '', cv: null });

    window.history.pushState({ modal: 'apply' }, '');
    const handlePop = () => onClose();
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };

    window.addEventListener('popstate', handlePop);
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('popstate', handlePop);
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
      if (window.history.state && window.history.state.modal === 'apply') {
        window.history.back();
      }
    };
  }, [open, onClose]);

  if (!open) return null;

  const setField = (k) => (e) => {
    const value = k === 'cv' ? e.target.files?.[0] ?? null : e.target.value;
    setForm((f) => ({ ...f, [k]: value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = t('applyModal.errors.required') || 'Majburiy maydon';
    if (!form.phone.trim()) next.phone = t('applyModal.errors.required') || 'Majburiy maydon';
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      next.email = t('applyModal.errors.email') || 'Email noto‘g‘ri';
    }
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitted(true);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md animate-[fadeIn_0.25s_ease]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-[#0b0d12] border border-white/10 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto skeuo-card"
        style={{ boxShadow: `0 30px 80px -20px ${accent}55` }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Yopish"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors"
        >
          <X size={22} strokeWidth={1.5} />
        </button>

        <div className="px-8 pt-10 pb-6 md:px-12 border-b border-white/10">
          <div
            className="text-[0.65rem] tracking-widest uppercase mb-3 font-medium"
            style={{ color: accent }}
          >
            {t('applyModal.kicker') || 'Ariza topshirish'}
          </div>
          <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight mb-2">
            {position || t('applyModal.fallbackPosition') || 'Lavozim'}
          </h2>
          {recruiter && (
            <div className="text-sm text-white/55">
              {t('applyModal.recruiterPrefix') || 'Ariza yetkaziladi:'}{' '}
              <span className="text-white/85">{recruiter.name}</span>
              {recruiter.badge && (
                <span className="ml-2 text-[0.6rem] tracking-widest uppercase" style={{ color: accent }}>
                  · {recruiter.badge}
                </span>
              )}
            </div>
          )}
        </div>

        {submitted ? (
          <div className="px-8 py-12 md:px-12 flex flex-col items-center text-center">
            <CheckCircle2 size={56} strokeWidth={1.5} style={{ color: accent }} className="mb-4" />
            <h3 className="text-xl text-white font-medium mb-2">
              {t('applyModal.successHeading') || 'Arizangiz qabul qilindi'}
            </h3>
            <p className="text-sm text-white/65 max-w-sm">
              {t('applyModal.successBody') ||
                'Tez orada sizga bog‘lanamiz. Yangi vakansiyalar haqida xabardor bo‘lib turing.'}
            </p>
            <button
              type="button"
              onClick={onClose}
              style={{ '--accent': accent }}
              className="btn-pill-filled mt-8 px-6 py-3 rounded-full text-sm font-semibold tracking-wide"
            >
              {t('common.close') || 'Yopish'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-8 py-8 md:px-12 flex flex-col gap-5">
            <Field
              label={t('applyModal.fields.name') || 'F.I.Sh.'}
              required
              error={errors.name}
            >
              <input
                type="text"
                value={form.name}
                onChange={setField('name')}
                className="apply-input"
                placeholder="Aliyev Ali"
                autoFocus
              />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label={t('applyModal.fields.phone') || 'Telefon'}
                required
                error={errors.phone}
              >
                <input
                  type="tel"
                  value={form.phone}
                  onChange={setField('phone')}
                  className="apply-input"
                  placeholder="+998 90 123 45 67"
                />
              </Field>

              <Field
                label={t('applyModal.fields.email') || 'Email (ixtiyoriy)'}
                error={errors.email}
              >
                <input
                  type="email"
                  value={form.email}
                  onChange={setField('email')}
                  className="apply-input"
                  placeholder="ali@example.uz"
                />
              </Field>
            </div>

            <Field label={t('applyModal.fields.cv') || 'CV (PDF, DOC)'}>
              <label
                className="apply-input flex items-center gap-3 cursor-pointer hover:border-white/30 transition-colors"
                style={{ minHeight: '52px' }}
              >
                <iconify-icon icon="solar:cloud-upload-linear" class="text-xl" style={{ color: accent }}></iconify-icon>
                <span className="text-white/80 text-sm truncate">
                  {form.cv ? form.cv.name : t('applyModal.fields.cvHint') || 'Faylni tanlash...'}
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={setField('cv')}
                  className="hidden"
                />
              </label>
            </Field>

            <Field label={t('applyModal.fields.note') || 'Qisqacha xabar (ixtiyoriy)'}>
              <textarea
                rows={3}
                value={form.note}
                onChange={setField('note')}
                className="apply-input resize-none"
                placeholder={t('applyModal.fields.notePlaceholder') || 'O‘zingiz haqida bir-ikki gap...'}
              />
            </Field>

            <button
              type="submit"
              style={{ '--accent': accent }}
              className="btn-pill-filled mt-2 px-6 py-3.5 rounded-full text-sm font-semibold tracking-wide inline-flex items-center justify-center gap-2"
            >
              {t('applyModal.submit') || 'Yuborish'}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}

function Field({ label, required, error, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[0.7rem] tracking-widest uppercase text-white/55 font-medium">
        {label} {required && <span className="text-rose-400">*</span>}
      </span>
      {children}
      {error && <span className="text-xs text-rose-400">{error}</span>}
    </label>
  );
}
