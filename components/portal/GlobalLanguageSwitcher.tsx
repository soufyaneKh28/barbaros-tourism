'use client'

import { locales, localeNames, type Locale } from '@/i18n/config'
import { useAdminLanguage } from '@/contexts/AdminLanguageContext'

export default function GlobalLanguageSwitcher() {
    const { activeLocale, setActiveLocale } = useAdminLanguage()

    return (
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 -mx-8 px-8 py-4 mb-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Content Language</h3>
                    <p className="text-xs text-gray-500">Switch language to edit content in different languages</p>
                </div>

                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                    {locales.map(locale => (
                        <button
                            key={locale}
                            type="button"
                            onClick={() => setActiveLocale(locale)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeLocale === locale
                                    ? 'bg-white text-primary shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {localeNames[locale]}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
