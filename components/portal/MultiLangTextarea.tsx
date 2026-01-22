'use client'

import { useState } from 'react'
import { locales, type Locale } from '@/i18n/config'
import { useAdminLanguage } from '@/contexts/AdminLanguageContext'

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
    const { activeLocale } = useAdminLanguage()
    const [values, setValues] = useState<Record<string, string>>(defaultValue || {})

    const handleChange = (locale: Locale, value: string) => {
        setValues(prev => ({ ...prev, [locale]: value }))
    }

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {/* Show only active language textarea */}
            <textarea
                name={`${name}_${activeLocale}`}
                value={values[activeLocale] || ''}
                onChange={(e) => handleChange(activeLocale, e.target.value)}
                required={required && activeLocale === 'en'}
                rows={rows}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder={placeholder}
            />

            {/* Hidden inputs for other languages to preserve data */}
            {locales.filter(locale => locale !== activeLocale).map(locale => (
                <input
                    key={locale}
                    type="hidden"
                    name={`${name}_${locale}`}
                    value={values[locale] || ''}
                />
            ))}
        </div>
    )
}
