import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Language = 'FR' | 'EN'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('lang') as Language | null
    return stored === 'EN' || stored === 'FR' ? stored : 'FR'
  })

  useEffect(() => {
    localStorage.setItem('lang', language)
  }, [language])

  const setLanguage = (lang: Language) => setLanguageState(lang)

  const value = useMemo(() => ({ language, setLanguage }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    return { language: 'FR', setLanguage: () => {} }
  }
  return ctx
}
