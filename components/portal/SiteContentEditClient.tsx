'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, ExternalLink, Check, Loader2, Save } from 'lucide-react'
import { AdminLanguageProvider, useAdminLanguage } from '@/contexts/AdminLanguageContext'
import { locales, localeNames } from '@/i18n/config'
import MultiLangInput from '@/components/portal/MultiLangInput'
import MultiLangTextarea from '@/components/portal/MultiLangTextarea'
import ImageUpload from '@/components/portal/ImageUpload'
import MultiImageUpload from '@/components/portal/MultiImageUpload'
import RepeatableListField from '@/components/portal/RepeatableListField'
import {
    updateHomeHeroAction,
    updateHeroSectionAction,
    updateFooterContentAction,
    updateGlobalSettingsAction,
    updateGenericSectionAction,
} from '@/app/actions/site-content'
import {
    HERO_DEFAULTS,
    DEFAULT_HERO_IMAGES,
    DEFAULT_HOME_HERO,
    DEFAULT_FOOTER,
    DEFAULT_GLOBAL,
    GENERIC_SECTION_DEFAULTS,
    isMultiLangField,
    getGroupSlug,
    type SiteContentSectionMeta,
    type SiteContentRow,
    type HeroSectionKey,
    type GenericSectionKey,
} from '@/lib/site-content-shared'

// Builds the initial defaultValue for a generic field: if the section was
// never saved, falls back to the code-level default — which is either a
// plain English string (only the "en" tab gets filled in, correctly
// signaling "not translated yet, falls back to English on the live site")
// or a real {en, ar, ...} translation transcribed from the site's original
// copy, in which case every locale it covers shows up pre-filled.
function genericFieldDefault(saved: any, fallback: string | Record<string, string>): Record<string, string> {
    if (saved && typeof saved === 'object') return saved
    if (fallback && typeof fallback === 'object') return fallback
    return { en: fallback }
}

function merge<T extends Record<string, any>>(defaults: T, saved: Partial<T> | undefined): T {
    return { ...defaults, ...Object.fromEntries(Object.entries(saved || {}).filter(([, v]) => v !== undefined && v !== null && v !== '')) } as T
}

function getRelativeTime(dateStr: string | null | undefined): string | null {
    if (!dateStr) return null
    const date = new Date(dateStr)
    const diffMs = Date.now() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)
    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 30) return `${diffDays}d ago`
    return date.toLocaleDateString()
}

function CompactLanguageSwitcher() {
    const { activeLocale, setActiveLocale } = useAdminLanguage()

    return (
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            {locales.map(locale => (
                <button
                    key={locale}
                    type="button"
                    onClick={() => setActiveLocale(locale)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeLocale === locale
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-500 hover:text-gray-800'
                        }`}
                >
                    {localeNames[locale]}
                </button>
            ))}
        </div>
    )
}

export default function SiteContentEditClient({
    meta,
    row,
}: {
    meta: SiteContentSectionMeta
    row: SiteContentRow | null
}) {
    const router = useRouter()
    const params = useParams()
    const locale = (params?.locale as string) || 'en'
    const data = row?.data || {}

    const [isPending, startTransition] = useTransition()
    const [saved, setSaved] = useState(false)

    // Local, controlled state for anything that needs a live preview
    // (image uploads) — everything else is read straight off the form via
    // FormData on submit.
    const homeDefaults = { ...DEFAULT_HOME_HERO, images: DEFAULT_HERO_IMAGES }
    const homeValues = meta.type === 'home' ? merge(homeDefaults, data) : null
    const [homeImages, setHomeImages] = useState<string[]>(homeValues?.images || DEFAULT_HERO_IMAGES)

    const heroDefaults = meta.type === 'hero' ? HERO_DEFAULTS[meta.key as HeroSectionKey] : null
    const heroValues = heroDefaults ? merge(heroDefaults, data) : null
    const [heroImage, setHeroImage] = useState<string>(heroValues?.image || '')

    const footerValues = meta.type === 'footer' ? merge(DEFAULT_FOOTER, data) : null

    const globalValues = meta.type === 'global' ? merge(DEFAULT_GLOBAL, data) : null
    const [logo, setLogo] = useState<string>(globalValues?.logo || '')

    // Generic sections: image fields need controlled state (for live preview
    // + a hidden input carrying the uploaded URL), same as hero/logo above.
    // Non-image fields are read straight off the form on submit.
    const genericDefaults = meta.type === 'generic' ? GENERIC_SECTION_DEFAULTS[meta.key as GenericSectionKey] : null
    const [genericImages, setGenericImages] = useState<Record<string, string>>(() => {
        if (!genericDefaults || !meta.schema) return {}
        const initial: Record<string, string> = {}
        for (const f of meta.schema.fields) {
            if (f.type === 'image') initial[f.key] = data[f.key] || genericDefaults[f.key] || ''
        }
        return initial
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        setSaved(false)

        const action =
            meta.type === 'home' ? updateHomeHeroAction :
            meta.type === 'footer' ? updateFooterContentAction :
            meta.type === 'global' ? updateGlobalSettingsAction :
            meta.type === 'generic' ? (fd: FormData) => updateGenericSectionAction(meta.key, fd) :
            (fd: FormData) => updateHeroSectionAction(meta.key as HeroSectionKey, fd)

        startTransition(async () => {
            const result = await action(formData)
            if (result.error) {
                alert(result.error)
            } else {
                setSaved(true)
                router.refresh()
                setTimeout(() => setSaved(false), 3000)
            }
        })
    }

    return (
        <AdminLanguageProvider>
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in font-satoshi pb-16">
                <div>
                    <Link
                        href={`/${locale}/portal-manage/website-content/${getGroupSlug(meta.group)}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to {meta.group}
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="sticky top-0 z-20 -mx-2 px-2 py-3 mb-6 bg-gray-50/90 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <h1 className="text-2xl font-bold text-primary font-cabinet">{meta.title}</h1>
                                    {meta.publicPath && (
                                        <a
                                            href={`/${locale}${meta.publicPath}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-primary border border-gray-200 rounded-full px-3 py-1 transition-colors"
                                        >
                                            View live page <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    {row?.updated_at ? `Last updated ${getRelativeTime(row.updated_at)}` : 'Not customized yet — showing default content'}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <CompactLanguageSwitcher />
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="shrink-0 bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary-600 transition-all font-medium text-sm shadow-sm active:scale-95 disabled:opacity-70 flex items-center gap-2"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                                        </>
                                    ) : saved ? (
                                        <>
                                            <Check className="w-4 h-4" /> Saved
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" /> Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 space-y-6">
                        {meta.type === 'home' && homeValues && (
                            <>
                                <MultiLangInput name="tagline" label="Tagline Badge" defaultValue={genericFieldDefault(data.tagline, homeDefaults.tagline)} placeholder="Trusted Tourism Services in Turkey" />
                                <MultiLangInput name="heading" label="Heading" defaultValue={genericFieldDefault(data.heading, homeDefaults.heading)} required placeholder="Main headline" />
                                <MultiLangTextarea name="description" label="Description" defaultValue={genericFieldDefault(data.description, homeDefaults.description)} rows={3} placeholder="Short supporting text" />
                                <div>
                                    <MultiImageUpload
                                        bucket="site-content"
                                        label="Background Slideshow Images"
                                        currentImages={homeImages}
                                        maxImages={6}
                                        onUploadComplete={setHomeImages}
                                    />
                                    {homeImages.map((url, i) => (
                                        <input key={i} type="hidden" name="images" value={url} />
                                    ))}
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 pt-2 border-t border-gray-100">
                                    <div className="space-y-2 pt-4">
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <input
                                                type="checkbox"
                                                name="ctaPrimaryEnabled"
                                                defaultChecked={data.ctaPrimaryEnabled !== false}
                                                className="rounded border-gray-300 text-primary focus:ring-primary/20"
                                            />
                                            Show primary button
                                        </label>
                                        <MultiLangInput name="ctaPrimaryLabel" label="Button Text" defaultValue={genericFieldDefault(data.ctaPrimaryLabel, homeDefaults.ctaPrimaryLabel)} placeholder="Explore tours" />
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                                            <input
                                                type="text"
                                                name="ctaPrimaryLink"
                                                defaultValue={data.ctaPrimaryLink || homeDefaults.ctaPrimaryLink}
                                                placeholder="/tours or https://..."
                                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            />
                                            <p className="text-xs text-gray-400 mt-1">A path like <code>/tours</code> stays on the site (in the visitor&apos;s language); a full <code>https://</code> link opens as-is.</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 pt-4">
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <input
                                                type="checkbox"
                                                name="ctaSecondaryEnabled"
                                                defaultChecked={data.ctaSecondaryEnabled !== false}
                                                className="rounded border-gray-300 text-primary focus:ring-primary/20"
                                            />
                                            Show secondary button
                                        </label>
                                        <MultiLangInput name="ctaSecondaryLabel" label="Button Text" defaultValue={genericFieldDefault(data.ctaSecondaryLabel, homeDefaults.ctaSecondaryLabel)} placeholder="Medical tourism" />
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                                            <input
                                                type="text"
                                                name="ctaSecondaryLink"
                                                defaultValue={data.ctaSecondaryLink || homeDefaults.ctaSecondaryLink}
                                                placeholder="/medical-tourism or https://..."
                                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            />
                                            <p className="text-xs text-gray-400 mt-1">A path like <code>/medical-tourism</code> stays on the site (in the visitor&apos;s language); a full <code>https://</code> link opens as-is.</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {meta.type === 'hero' && heroValues && (
                            <>
                                <MultiLangInput name="badge" label="Badge Text" defaultValue={genericFieldDefault(data.badge, heroDefaults!.badge)} placeholder="Badge label" />
                                <MultiLangInput name="heading" label="Heading" defaultValue={genericFieldDefault(data.heading, heroDefaults!.heading)} required placeholder="Page heading" />
                                <MultiLangTextarea name="description" label="Description" defaultValue={genericFieldDefault(data.description, heroDefaults!.description)} rows={3} />
                                {meta.hasImage && (
                                    <div>
                                        <ImageUpload
                                            bucket="site-content"
                                            label="Background Image"
                                            currentImage={heroImage}
                                            onUploadComplete={setHeroImage}
                                        />
                                        <input type="hidden" name="image" value={heroImage} />
                                    </div>
                                )}
                            </>
                        )}

                        {meta.type === 'footer' && footerValues && (
                            <MultiLangTextarea name="about" label="About Text" defaultValue={genericFieldDefault(data.about, DEFAULT_FOOTER.about)} rows={3} />
                        )}

                        {meta.type === 'global' && globalValues && (
                            <>
                                <div>
                                    <ImageUpload bucket="site-content" label="Site Logo" currentImage={logo} onUploadComplete={setLogo} />
                                    <input type="hidden" name="logo" value={logo} />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            defaultValue={globalValues.phone}
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            placeholder="+90 505 368 88 56"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            defaultValue={globalValues.email}
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            placeholder="info@example.com"
                                        />
                                    </div>
                                </div>

                                <MultiLangInput name="officeName" label="Office Name" defaultValue={genericFieldDefault(data.officeName, DEFAULT_GLOBAL.officeName)} />
                                <MultiLangInput name="officeAddress" label="Office Address" defaultValue={genericFieldDefault(data.officeAddress, DEFAULT_GLOBAL.officeAddress)} />
                                <MultiLangInput name="officeCity" label="Office City / Postal" defaultValue={genericFieldDefault(data.officeCity, DEFAULT_GLOBAL.officeCity)} />

                                <div className="grid md:grid-cols-3 gap-6">
                                    <MultiLangInput name="hoursMonFri" label="Hours (Mon–Fri)" defaultValue={genericFieldDefault(data.hoursMonFri, DEFAULT_GLOBAL.hoursMonFri)} />
                                    <MultiLangInput name="hoursSat" label="Hours (Sat)" defaultValue={genericFieldDefault(data.hoursSat, DEFAULT_GLOBAL.hoursSat)} />
                                    <MultiLangInput name="hoursSun" label="Hours (Sun)" defaultValue={genericFieldDefault(data.hoursSun, DEFAULT_GLOBAL.hoursSun)} />
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                                        <input
                                            type="url"
                                            name="facebookUrl"
                                            defaultValue={globalValues.facebookUrl}
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                                        <input
                                            type="url"
                                            name="instagramUrl"
                                            defaultValue={globalValues.instagramUrl}
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
                                        <input
                                            type="url"
                                            name="linkedinUrl"
                                            defaultValue={globalValues.linkedinUrl}
                                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {meta.type === 'generic' && meta.schema && genericDefaults && (
                            <>
                                {meta.schema.fields.map(f => {
                                    if (f.type === 'image') {
                                        return (
                                            <div key={f.key}>
                                                <ImageUpload
                                                    bucket="site-content"
                                                    label={f.label}
                                                    currentImage={genericImages[f.key] || ''}
                                                    onUploadComplete={url => setGenericImages(prev => ({ ...prev, [f.key]: url }))}
                                                />
                                                <input type="hidden" name={f.key} value={genericImages[f.key] || ''} />
                                            </div>
                                        )
                                    }
                                    if (!isMultiLangField(f)) {
                                        return (
                                            <div key={f.key}>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">{f.label}</label>
                                                <input
                                                    type={f.inputType || 'text'}
                                                    name={f.key}
                                                    defaultValue={data[f.key] || genericDefaults[f.key] || ''}
                                                    placeholder={f.placeholder}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                                />
                                            </div>
                                        )
                                    }
                                    if (f.type === 'textarea') {
                                        return (
                                            <MultiLangTextarea
                                                key={f.key}
                                                name={f.key}
                                                label={f.label}
                                                defaultValue={genericFieldDefault(data[f.key], genericDefaults[f.key] || '')}
                                                rows={f.rows || 3}
                                                placeholder={f.placeholder}
                                            />
                                        )
                                    }
                                    return (
                                        <MultiLangInput
                                            key={f.key}
                                            name={f.key}
                                            label={f.label}
                                            defaultValue={genericFieldDefault(data[f.key], genericDefaults[f.key] || '')}
                                            placeholder={f.placeholder}
                                        />
                                    )
                                })}

                                {(meta.schema.lists || []).map(l => {
                                    const savedItems: any[] | undefined = data[l.key]
                                    const rawDefaultItems: any[] = savedItems && savedItems.length > 0 ? savedItems : (genericDefaults[l.key] || [])
                                    const multiLangKeys = l.itemFields.filter(isMultiLangField).map(f => f.key)
                                    const defaultItems = rawDefaultItems.map(item => {
                                        const shaped: Record<string, any> = { ...item }
                                        multiLangKeys.forEach(k => {
                                            shaped[k] = genericFieldDefault(item[k], typeof item[k] === 'string' ? item[k] : '')
                                        })
                                        return shaped
                                    })
                                    return (
                                        <RepeatableListField
                                            key={l.key}
                                            name={l.key}
                                            label={l.label}
                                            itemLabel={l.itemLabel}
                                            itemFields={l.itemFields}
                                            defaultItems={defaultItems}
                                        />
                                    )
                                })}
                            </>
                        )}
                    </div>
                </form>
            </div>
        </AdminLanguageProvider>
    )
}
