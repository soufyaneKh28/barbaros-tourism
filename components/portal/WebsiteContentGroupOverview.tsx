'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import {
    Home, Info, Mail, Sparkles, Compass, Sun, ClipboardList, Package,
    Crown, Gem, HeartPulse, FileCheck2, Newspaper, PanelBottom, Settings2,
    ArrowLeft, ArrowRight, ExternalLink, LayoutGrid,
} from 'lucide-react'
import {
    SITE_CONTENT_SECTIONS,
    HERO_DEFAULTS,
    DEFAULT_HERO_IMAGES,
    DEFAULT_HOME_HERO,
    DEFAULT_FOOTER,
    GENERIC_SECTION_DEFAULTS,
    defaultText,
    type SiteContentRow,
    type SiteContentSectionMeta,
    type SiteContentGroupMeta,
    type GenericSectionKey,
} from '@/lib/site-content-shared'

const ICONS: Record<string, any> = {
    home_hero: Home,
    about_hero: Info,
    contact_hero: Mail,
    services_hero: Sparkles,
    tours_hero: Compass,
    daily_tours_hero: Sun,
    medical_hero: HeartPulse,
    immigration_hero: FileCheck2,
    special_packages_hero: Package,
    vip_programs_hero: Crown,
    vip_tourism_services_hero: Gem,
    programs_hero: ClipboardList,
    blogs_hero: Newspaper,
    footer_content: PanelBottom,
    global_settings: Settings2,
}

function getPreview(section: SiteContentSectionMeta, data: Record<string, any>): { heading: string; image: string | null } {
    if (section.type === 'home') {
        return {
            heading: data.heading?.en || DEFAULT_HOME_HERO.heading,
            image: (data.images && data.images[0]) || DEFAULT_HERO_IMAGES[0],
        }
    }
    if (section.type === 'hero') {
        const defaults = HERO_DEFAULTS[section.key as keyof typeof HERO_DEFAULTS]
        return {
            heading: data.heading?.en || defaults.heading,
            image: section.hasImage ? (data.image || defaults.image || null) : null,
        }
    }
    if (section.type === 'footer') {
        return { heading: data.about?.en || DEFAULT_FOOTER.about, image: null }
    }
    if (section.type === 'generic' && section.schema) {
        const defaults = GENERIC_SECTION_DEFAULTS[section.key as GenericSectionKey]
        const textField = section.schema.fields.find(f => f.type !== 'image')
        const imageField = section.schema.fields.find(f => f.type === 'image')
        const heading = textField
            ? (data[textField.key]?.en || (typeof data[textField.key] === 'string' ? data[textField.key] : '') || defaultText(defaults[textField.key], 'en'))
            : ''
        const image = imageField ? (data[imageField.key] || defaults[imageField.key] || null) : null
        return { heading: heading || section.title, image }
    }
    return { heading: 'Logo, phone, email, office details & social links', image: null }
}

function getRelativeTime(dateStr: string | null): string | null {
    if (!dateStr) return null
    const date = new Date(dateStr)
    const diffMs = Date.now() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)
    if (diffMins < 1) return 'Updated just now'
    if (diffMins < 60) return `Updated ${diffMins}m ago`
    if (diffHours < 24) return `Updated ${diffHours}h ago`
    if (diffDays < 30) return `Updated ${diffDays}d ago`
    return `Updated ${date.toLocaleDateString()}`
}

function SectionCard({ section, row, locale, groupSlug }: { section: SiteContentSectionMeta; row: SiteContentRow | undefined; locale: string; groupSlug: string }) {
    const Icon = ICONS[section.key] || LayoutGrid
    const preview = getPreview(section, row?.data || {})
    const updated = getRelativeTime(row?.updated_at || null)

    return (
        <Link
            href={`/${locale}/portal-manage/website-content/${groupSlug}/${section.key}`}
            className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
            <div className="relative h-32 w-full overflow-hidden bg-gradient-to-br from-primary/90 to-primary-700">
                {preview.image ? (
                    <>
                        <Image
                            src={preview.image}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    </>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-10 h-10 text-white/40" />
                    </div>
                )}
                <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <Icon className="w-4 h-4" />
                </div>
                {section.publicPath && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium px-2 py-1 rounded-full">
                        <ExternalLink className="w-3 h-3" /> Live
                    </span>
                )}
            </div>

            <div className="flex-1 flex flex-col p-5">
                <h3 className="font-bold font-cabinet text-gray-900 mb-1 group-hover:text-primary transition-colors">
                    {section.title}
                </h3>
                <p className="text-sm text-gray-500 font-satoshi line-clamp-2 mb-4 flex-1">
                    {preview.heading}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400 font-satoshi">
                        {updated || 'Not customized yet'}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all">
                        Edit <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default function WebsiteContentGroupOverview({ group, rows }: { group: SiteContentGroupMeta; rows: SiteContentRow[] }) {
    const params = useParams()
    const locale = (params?.locale as string) || 'en'
    const rowsByKey = new Map(rows.map(r => [r.key, r]))
    const sections = SITE_CONTENT_SECTIONS.filter(s => s.group === group.name)

    return (
        <div className="space-y-8 animate-fade-in font-satoshi">
            <div>
                <Link
                    href={`/${locale}/portal-manage/website-content`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Website Content
                </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-3xl font-bold text-primary font-cabinet">{group.name}</h1>
                    {group.publicPath && (
                        <a
                            href={`/${locale}${group.publicPath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-primary border border-gray-200 rounded-full px-3 py-1 transition-colors"
                        >
                            View live page <ExternalLink className="w-3 h-3" />
                        </a>
                    )}
                </div>
                <p className="text-gray-600 max-w-2xl mt-2">{group.blurb}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {sections.map((section) => (
                    <SectionCard key={section.key} section={section} row={rowsByKey.get(section.key)} locale={locale} groupSlug={group.slug} />
                ))}
            </div>
        </div>
    )
}
