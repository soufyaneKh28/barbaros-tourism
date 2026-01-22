'use client'

import { useState } from 'react'
import { locales, localeNames, type Locale } from '@/i18n/config'

interface MultiLangTextareaProps {
    name: string
    label: string
    required?: boolean
    placeholder?: string
    defaultValue?: Record<string, string>
    rows?: number
}

export default function MultiLangTextarea({
    name,
    label,
    required = false,
    placeholder = '',
    defaultValue = {},
    rows = 3
}: MultiLangTextareaProps) {
    const [activeLocale, setActiveLocale] = useState<Locale>('en')
    const [values, setValues] = useState<Record<string, string>>(defaultValue || {})

    const handleChange = (locale: Locale, value: string) => {
        setValues(prev => ({ ...prev, [locale]: value }))
    }

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

            {/* Language Tabs */}
            <div className="flex gap-1 mb-2 border-b">
                {locales.map(locale => (
                    <button
                        key={locale}
                        type="button"
                        onClick={() => setActiveLocale(locale)}
                        className={`px-3 py-1.5 text-sm font-medium transition-colors ${activeLocale === locale
                            ? 'border-b-2 border-primary text-primary'
                            : 'text-gray-500 hover:text-gray-700'
                            } ${values?.[locale] ? 'font-semibold' : ''}`}
                    >
                        {localeNames[locale]}
                        {values?.[locale] && ' ✓'}
                    </button>
                ))}
            </div>

            {/* Textarea Fields */}
            {locales.map(locale => (
                <div key={locale} className={activeLocale === locale ? 'block' : 'hidden'}>
                    <textarea
                        name={`${name}_${locale}`}
                        value={values[locale] || ''}
                        onChange={(e) => handleChange(locale, e.target.value)}
                        required={required && locale === 'en'}
                        rows={rows}
                        className="mt-1 block w-full border rounded-md px-3 py-2"
                        placeholder={placeholder}
                    />
                </div>
            ))}
        </div>
    )
}
