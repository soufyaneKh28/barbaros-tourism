import { createClient } from '@/utils/supabase/server'
import { getLocalized } from '../utils'

// Helper to flatten localized fields
function transformService(service: any, locale: string = 'en') {
    if (!service) return null
    return {
        ...service,
        service_name: getLocalized(service.service_name, locale),
        service_details: getLocalized(service.service_details, locale),
        cta_text: getLocalized(service.cta_text, locale),
        cta_link: service.cta_link,
        is_coming_soon: service.is_coming_soon
    }
}

export async function getServices(locale: string = 'en') {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true })

        if (error) {
            console.error('Error fetching services:', error)
            return []
        }

        return data.map(service => transformService(service, locale))
    } catch (error) {
        console.error('Error in getServices:', error)
        return []
    }
}

export async function getAllServices(locale: string = 'en') {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('display_order', { ascending: true })

        if (error) {
            console.error('Error fetching all services:', error)
            return []
        }

        return data.map(service => transformService(service, locale))
    } catch (error) {
        console.error('Error in getAllServices:', error)
        return []
    }
}

export async function getServiceById(id: string, skipTransform: boolean = false) {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            console.error('Error fetching service:', error)
            return null
        }

        if (skipTransform) return data
        return data // Original implementation returned data directly but typically we should transform. However, getServiceById seemed to return untransformed data before? 
        // Wait, line 75 was simply `return data`.
        // If the original implementation was returning raw data, then `services.ts` might be inconsistent with `immigration.ts`.
        // Let's look at `services.ts` again.
        // It WAS returning `data` directly (line 75).
        // But `transformService` was defined at line 5.
        // If `getServiceById` returns raw data, then maybe `services` edit page was working fine because it got raw JSONB.
        // But `immigration.ts` was definitely transforming it.

        // Actually, let's stick to fixing `immigration.ts`. `services.ts` changes are risky without full context of where it's used.
        // The user only complained about immigration service.
    } catch (error) {
        console.error('Error in getServiceById:', error)
        return null
    }
}

export async function getServiceBySlug(slug: string, locale: string = 'en') {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('slug', slug)
            .eq('is_active', true)
            .single()

        if (error) {
            console.error('Error fetching service by slug:', error)
            return null
        }

        return transformService(data, locale)
    } catch (error) {
        console.error('Error in getServiceBySlug:', error)
        return null
    }
}

export async function getHotDealServices(locale: string = 'en') {
    try {
        const supabase = await createClient()
        const now = new Date().toISOString()

        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('is_hot_deal', true)
            .eq('is_active', true)
            .or(`hot_deal_end_date.is.null,hot_deal_end_date.gte.${now}`)
            .order('hot_deal_priority', { ascending: true, nullsFirst: false })
            .limit(10)

        if (error) {
            console.error('Error fetching hot deal services:', error)
            return []
        }

        return data.map(service => transformService(service, locale))
    } catch (error) {
        console.error('Error in getHotDealServices:', error)
        return []
    }
}

