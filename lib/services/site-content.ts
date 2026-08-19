import { cache } from 'react'
import { createClient } from '@/utils/supabase/server'
import { type Locale, getMessages } from '@/i18n'
import {
    ALL_SITE_CONTENT_KEYS,
    GENERIC_SECTION_KEYS,
    GENERIC_SCHEMAS,
    GENERIC_SECTION_DEFAULTS,
    EMPTY_RAW_SITE_CONTENT,
    DEFAULT_HERO_IMAGES,
    DEFAULT_HOME_HERO,
    DEFAULT_FOOTER,
    DEFAULT_GLOBAL,
    HERO_DEFAULTS,
    pick,
    resolveHero,
    resolveGenericSection,
    type RawSiteContent,
    type HeroSectionKey,
    type ResolvedHero,
    type ResolvedSiteContent,
    type SiteContentRow,
} from '../site-content-shared'

// Re-export everything client-safe so existing imports from
// '@/lib/services/site-content' keep working for server components.
export * from '../site-content-shared'

/**
 * Fetches every site_content row (with updated_at) for the admin overview
 * grid — one row per card.
 */
export const getSiteContentRows = cache(async (): Promise<SiteContentRow[]> => {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('site_content')
            .select('key, data, updated_at')
            .in('key', ALL_SITE_CONTENT_KEYS as unknown as string[])

        if (error) {
            console.error('Error fetching site content rows:', error)
            return []
        }
        return data || []
    } catch (e) {
        console.error('Error fetching site content rows:', e)
        return []
    }
})

/** Fetches a single site_content row, used to pre-fill a section's edit form. */
export async function getSiteContentRow(key: string): Promise<SiteContentRow | null> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('site_content')
            .select('key, data, updated_at')
            .eq('key', key)
            .maybeSingle()

        if (error) {
            console.error(`Error fetching site content row "${key}":`, error)
            return null
        }
        return data
    } catch (e) {
        console.error(`Error fetching site content row "${key}":`, e)
        return null
    }
}

/**
 * Fetches every site_content row as a plain { key: data } map.
 * Used to resolve public-facing content (see getResolvedSiteContent below).
 */
export async function getAllSiteContent(): Promise<RawSiteContent> {
    const rows = await getSiteContentRows()
    const result: RawSiteContent = { ...EMPTY_RAW_SITE_CONTENT }
    for (const row of rows) {
        if ((ALL_SITE_CONTENT_KEYS as readonly string[]).includes(row.key)) {
            ;(result as any)[row.key] = row.data || {}
        }
    }
    return result
}

/**
 * Resolves DB-managed site content for a given locale, falling back to the
 * existing translation strings / hard-coded defaults whenever a field
 * hasn't been set from the admin portal yet. This is what public pages use.
 */
export const getResolvedSiteContent = cache(async (locale: Locale): Promise<ResolvedSiteContent> => {
    const raw = await getAllSiteContent()
    const t = getMessages(locale) as any
    const g = raw.global_settings || {}

    const generic: Record<string, Record<string, any>> = {}
    for (const key of GENERIC_SECTION_KEYS) {
        generic[key] = resolveGenericSection((raw as any)[key], locale, GENERIC_SCHEMAS[key], GENERIC_SECTION_DEFAULTS[key])
    }

    return {
        hero: {
            tagline: pick(raw.home_hero.tagline, locale, t.hero?.tagline || DEFAULT_HOME_HERO.tagline),
            heading: pick(raw.home_hero.heading, locale, t.hero?.heading || DEFAULT_HOME_HERO.heading),
            description: pick(raw.home_hero.description, locale, t.hero?.description || DEFAULT_HOME_HERO.description),
            images: raw.home_hero.images && raw.home_hero.images.length > 0 ? raw.home_hero.images : DEFAULT_HERO_IMAGES,
        },
        aboutHero: resolveHero(raw.about_hero, locale, 'about_hero'),
        contactHero: resolveHero(raw.contact_hero, locale, 'contact_hero'),
        servicesHero: resolveHero(raw.services_hero, locale, 'services_hero'),
        toursHero: resolveHero(raw.tours_hero, locale, 'tours_hero'),
        medicalHero: resolveHero(raw.medical_hero, locale, 'medical_hero'),
        vipProgramsHero: resolveHero(raw.vip_programs_hero, locale, 'vip_programs_hero'),
        vipTourismServicesHero: resolveHero(raw.vip_tourism_services_hero, locale, 'vip_tourism_services_hero'),
        specialPackagesHero: resolveHero(raw.special_packages_hero, locale, 'special_packages_hero'),
        immigrationHero: resolveHero(raw.immigration_hero, locale, 'immigration_hero'),
        dailyToursHero: resolveHero(raw.daily_tours_hero, locale, 'daily_tours_hero'),
        programsHero: resolveHero(raw.programs_hero, locale, 'programs_hero'),
        blogsHero: resolveHero(raw.blogs_hero, locale, 'blogs_hero'),
        footer: {
            about: pick(raw.footer_content.about, locale, t.footer?.about || DEFAULT_FOOTER.about),
        },
        global: {
            logo: g.logo || DEFAULT_GLOBAL.logo,
            phone: g.phone || DEFAULT_GLOBAL.phone,
            email: g.email || DEFAULT_GLOBAL.email,
            officeName: pick(g.officeName, locale, DEFAULT_GLOBAL.officeName),
            officeAddress: pick(g.officeAddress, locale, DEFAULT_GLOBAL.officeAddress),
            officeCity: pick(g.officeCity, locale, DEFAULT_GLOBAL.officeCity),
            hoursMonFri: pick(g.hoursMonFri, locale, DEFAULT_GLOBAL.hoursMonFri),
            hoursSat: pick(g.hoursSat, locale, DEFAULT_GLOBAL.hoursSat),
            hoursSun: pick(g.hoursSun, locale, DEFAULT_GLOBAL.hoursSun),
            facebookUrl: g.facebookUrl || DEFAULT_GLOBAL.facebookUrl,
            instagramUrl: g.instagramUrl || DEFAULT_GLOBAL.instagramUrl,
            linkedinUrl: g.linkedinUrl || DEFAULT_GLOBAL.linkedinUrl,
        },
        generic,
    }
})
