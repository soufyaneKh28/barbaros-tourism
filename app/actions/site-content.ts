'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { locales } from '@/i18n/config'
import {
    getSectionMeta,
    isMultiLangField,
    type HeroSectionKey,
    type GenericFieldSchema,
} from '@/lib/services/site-content'

// Helper to extract a multi-language field ({ en, ar, fr, tr }) from FormData
function getMultiLangField(formData: FormData, fieldName: string): Record<string, string> {
    const result: Record<string, string> = {}
    locales.forEach(locale => {
        const value = formData.get(`${fieldName}_${locale}`) as string
        if (value) result[locale] = value
    })
    return result
}

// Reconstructs a repeatable list field's array of objects from the flat,
// indexed FormData entries RepeatableListField submits (`{listKey}.{i}.{field}[_locale]`
// plus a `{listKey}.count` marker for how many items to read).
function getListField(formData: FormData, listKey: string, itemFields: GenericFieldSchema[]): Record<string, any>[] {
    const count = parseInt((formData.get(`${listKey}.count`) as string) || '0', 10) || 0
    const items: Record<string, any>[] = []
    for (let i = 0; i < count; i++) {
        const item: Record<string, any> = {}
        for (const f of itemFields) {
            const fieldName = `${listKey}.${i}.${f.key}`
            if (!isMultiLangField(f)) {
                item[f.key] = (formData.get(fieldName) as string) || ''
            } else {
                item[f.key] = getMultiLangField(formData, fieldName)
            }
        }
        items.push(item)
    }
    return items
}

async function upsertSiteContent(key: string, data: Record<string, any>) {
    const supabase = await createClient()
    const { error } = await supabase
        .from('site_content')
        .upsert({ key, data, updated_at: new Date().toISOString() }, { onConflict: 'key' })

    if (error) {
        console.error(`Error updating site content "${key}":`, error)
        return { error: error.message }
    }

    // The content is shared across every locale, so revalidate the whole
    // localized tree plus the admin screen.
    revalidatePath('/[locale]', 'layout')
    revalidatePath('/[locale]/portal-manage/website-content')
    return { success: true }
}

export async function updateHomeHeroAction(formData: FormData) {
    const images = formData.getAll('images').map(v => v as string).filter(Boolean)

    return upsertSiteContent('home_hero', {
        tagline: getMultiLangField(formData, 'tagline'),
        heading: getMultiLangField(formData, 'heading'),
        description: getMultiLangField(formData, 'description'),
        images,
    })
}

// Generic action for every simple "badge + heading + description (+ image)"
// page hero — About, Contact, Services, Tours, Medical, VIP Programs, VIP
// Tourism Services, Special Packages, Immigration, Daily Tours, Programs,
// Blogs. `key` identifies which site_content row to write to.
export async function updateHeroSectionAction(key: HeroSectionKey, formData: FormData) {
    const image = formData.get('image') as string

    return upsertSiteContent(key, {
        badge: getMultiLangField(formData, 'badge'),
        heading: getMultiLangField(formData, 'heading'),
        description: getMultiLangField(formData, 'description'),
        image: image || '',
    })
}

export async function updateFooterContentAction(formData: FormData) {
    return upsertSiteContent('footer_content', {
        about: getMultiLangField(formData, 'about'),
    })
}

// Single generic action for every non-hero, non-home, non-footer, non-global
// section (About's Story/Stats/Why Choose, Home's Testimonials/Partners/etc.,
// Contact's form/info/map copy, and so on). The section's schema (from the
// registry) says which fields are plain/multi-lang/image and which are lists.
export async function updateGenericSectionAction(key: string, formData: FormData) {
    const meta = getSectionMeta(key)
    if (!meta || meta.type !== 'generic' || !meta.schema) {
        return { error: `Unknown section "${key}"` }
    }

    const data: Record<string, any> = {}
    for (const f of meta.schema.fields) {
        if (f.type === 'image' || f.multiLang === false) {
            data[f.key] = (formData.get(f.key) as string) || ''
        } else {
            data[f.key] = getMultiLangField(formData, f.key)
        }
    }
    for (const l of meta.schema.lists || []) {
        data[l.key] = getListField(formData, l.key, l.itemFields)
    }

    return upsertSiteContent(key, data)
}

export async function updateGlobalSettingsAction(formData: FormData) {
    const logo = formData.get('logo') as string

    return upsertSiteContent('global_settings', {
        logo: logo || '',
        phone: (formData.get('phone') as string) || '',
        email: (formData.get('email') as string) || '',
        officeName: getMultiLangField(formData, 'officeName'),
        officeAddress: getMultiLangField(formData, 'officeAddress'),
        officeCity: getMultiLangField(formData, 'officeCity'),
        hoursMonFri: getMultiLangField(formData, 'hoursMonFri'),
        hoursSat: getMultiLangField(formData, 'hoursSat'),
        hoursSun: getMultiLangField(formData, 'hoursSun'),
        facebookUrl: (formData.get('facebookUrl') as string) || '',
        instagramUrl: (formData.get('instagramUrl') as string) || '',
        linkedinUrl: (formData.get('linkedinUrl') as string) || '',
    })
}
