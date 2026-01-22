import { createClient } from '@/utils/supabase/server'
import { getLocalized } from '../utils'

// Helper to flatten localized fields
function transformService(service: any, locale: string = 'en') {
    if (!service) return null
    return {
        ...service,
        service_name: getLocalized(service.service_name, locale),
        service_details: getLocalized(service.service_details, locale),
        target_client_category: getLocalized(service.target_client_category, locale),
        procedural_requirements: getLocalized(service.procedural_requirements, locale),
        additional_notes: getLocalized(service.additional_notes, locale)
    }
}

export async function getServices(locale: string = 'en') {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false })

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
            .order('created_at', { ascending: false })

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

export async function getServiceById(id: string) {
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

        return data
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

