import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { translations, SUPPORTED_LANGS, DEFAULT_LANG } from '../i18n/translations';

const STORAGE_KEY = 'agrobank.lang';
const LanguageContext = createContext(null);

function readInitialLang() {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch {}
    if (typeof document !== 'undefined') document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    if (SUPPORTED_LANGS.includes(next)) setLangState(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((cur) => (cur === 'uz' ? 'ru' : 'uz'));
  }, []);

  const t = useCallback((key, fallback) => {
    const dict = translations[lang] || translations[DEFAULT_LANG];
    const value = key.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), dict);
    if (value === undefined) return fallback !== undefined ? fallback : key;
    return value;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, toggleLang, t }), [lang, setLang, toggleLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
