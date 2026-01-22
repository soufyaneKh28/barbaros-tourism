'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { type Locale } from '@/i18n/config'

interface AdminLanguageContextType {
    activeLocale: Locale
    setActiveLocale: (locale: Locale) => void
}

const AdminLanguageContext = createContext<AdminLanguageContextType | undefined>(undefined)

export function AdminLanguageProvider({ children }: { children: ReactNode }) {
    const [activeLocale, setActiveLocale] = useState<Locale>('en')

    return (
        <AdminLanguageContext.Provider value={{ activeLocale, setActiveLocale }}>
            {children}
        </AdminLanguageContext.Provider>
    )
}

export function useAdminLanguage() {
    const context = useContext(AdminLanguageContext)
    if (context === undefined) {
        throw new Error('useAdminLanguage must be used within AdminLanguageProvider')
    }
    return context
}
