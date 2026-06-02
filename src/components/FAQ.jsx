import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function FAQ({ faqs, accent = '#f43f5e', label = 'FAQ', heading }) {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);
  const resolvedHeading = heading ?? t('common.faqHeading');
  const supportLabel = t('common.faqKicker');

  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-24 flex flex-col relative z-10">
      <div className="mb-12 w-full text-center flex flex-col items-center">
        <div
          className="flex items-center space-x-4 mb-4 text-sm tracking-widest uppercase font-medium"
          style={{ color: accent }}
        >
          <span>{supportLabel}</span>
          <div className="w-12 h-px" style={{ backgroundColor: `${accent}80` }}></div>
          <span>{label}</span>
        </div>
        <h2 className="font-agro-expanded text-3xl md:text-4xl text-white font-bold tracking-tight">
          {resolvedHeading}
        </h2>
      </div>

      <div className="flex flex-col space-y-4 w-full">
        {faqs.map((faq, idx) => {
          const open = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                open ? 'skeuo-card-active transform scale-[1.02] z-10' : 'border border-white/10 skeuo-card hover:border-white/20'
              }`}
              style={open ? {
                borderColor: `${accent}33`,
                boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.1), inset 0 0 30px ${accent}1A, 0 0 40px -10px ${accent}40`,
              } : undefined}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
              >
                <span
                  className="font-medium tracking-wide transition-colors"
                  style={{ color: open ? accent : 'rgba(255,255,255,0.9)' }}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  strokeWidth={2}
                  className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                  style={{ color: open ? accent : 'rgba(255,255,255,0.5)' }}
                />
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                  open ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-sm text-white/65 font-light leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
