'use client';

import React, { createContext, useContext } from 'react';
import type { Locale } from '@/i18n/config';
import en from '@/i18n/messages/en.json';

export type Messages = typeof en;

interface LanguageContextProps {
    locale: Locale;
    t: Messages;
}

const LanguageContext = createContext<LanguageContextProps | null>(null);

export function LanguageProvider({
    children,
    locale,
    messages,
}: {
    children: React.ReactNode;
    locale: Locale;
    messages: any;
}) {
    return (
        <LanguageContext.Provider value={{ locale, t: messages }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
