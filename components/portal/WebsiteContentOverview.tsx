'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
    Home, Info, Mail, Sparkles, Compass, HeartPulse, FileCheck2, Package,
    Crown, Gem, ClipboardList, Newspaper, Settings2, ArrowRight, ExternalLink,
} from 'lucide-react'
import {
    SITE_CONTENT_GROUPS,
    SITE_CONTENT_SECTIONS,
    type SiteContentRow,
    type SiteContentGroupMeta,
} from '@/lib/site-content-shared'

const GROUP_ICONS: Record<string, any> = {
    Homepage: Home,
    'About Us': Info,
    'Contact Us': Mail,
    'Our Services': Sparkles,
    Tours: Compass,
    'Medical Tourism': HeartPulse,
    Immigration: FileCheck2,
    'Special Packages': Package,
    'VIP Programs': Crown,
    'VIP Tourism Services': Gem,
    Programs: ClipboardList,
    Blog: Newspaper,
    Global: Settings2,
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

function PageCard({ group, sectionCount, latestUpdate, locale }: { group: SiteContentGroupMeta; sectionCount: number; latestUpdate: string | null; locale: string }) {
    const Icon = GROUP_ICONS[group.name] || Home
    const updated = getRelativeTime(latestUpdate)

    return (
        <Link
            href={`/${locale}/portal-manage/website-content/${group.slug}`}
            className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
            <div className="relative h-24 w-full overflow-hidden bg-gradient-to-br from-primary/90 to-primary-700 flex items-center justify-between px-5">
                <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <Icon className="w-5 h-5" />
                </div>
                {group.publicPath && (
                    <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium px-2 py-1 rounded-full">
                        <ExternalLink className="w-3 h-3" /> Live
                    </span>
                )}
            </div>

            <div className="flex-1 flex flex-col p-5">
                <h3 className="font-bold font-cabinet text-lg text-gray-900 mb-1 group-hover:text-primary transition-colors">
                    {group.name}
                </h3>
                <p className="text-sm text-gray-500 font-satoshi line-clamp-2 mb-4 flex-1">
                    {group.blurb}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400 font-satoshi">
                        {sectionCount} section{sectionCount === 1 ? '' : 's'} · {updated || 'Not customized yet'}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all">
                        Open <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default function WebsiteContentOverview({ rows }: { rows: SiteContentRow[] }) {
    const params = useParams()
    const locale = (params?.locale as string) || 'en'
    const updatedByKey = new Map(rows.map(r => [r.key, r.updated_at]))

    return (
        <div className="space-y-8 animate-fade-in font-satoshi">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h1 className="text-3xl font-bold mb-2 text-primary font-cabinet">Website Content</h1>
                <p className="text-gray-600 max-w-2xl">
                    Pick a page below, then a section to edit its text and images. Changes go live the moment you save.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {SITE_CONTENT_GROUPS.map((group) => {
                    const sections = SITE_CONTENT_SECTIONS.filter(s => s.group === group.name)
                    const updates = sections.map(s => updatedByKey.get(s.key)).filter(Boolean) as string[]
                    const latestUpdate = updates.length > 0 ? updates.sort().reverse()[0] : null
                    return (
                        <PageCard key={group.slug} group={group} sectionCount={sections.length} latestUpdate={latestUpdate} locale={locale} />
                    )
                })}
            </div>
        </div>
    )
}
