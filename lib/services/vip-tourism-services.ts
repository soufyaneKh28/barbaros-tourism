import { createClient } from '@/utils/supabase/server'
import { getLocalized } from '../utils'
import { VipTourismService } from '../types'

// Helper to transform vip service
function transformVipService(service: any, locale: string = 'en'): VipTourismService {
    if (!service) return service
    return {
        ...service,
        title: getLocalized(service.title, locale),
        description: getLocalized(service.description, locale),
        cta_text: getLocalized(service.cta_text, locale),
        is_coming_soon: service.is_coming_soon
    }
}

// Get all active vip services (for public)
export async function getVipServices(locale: string = 'en') {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('vip_tourism_services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching vip services:', error)
        return []
    }
    return data.map(service => transformVipService(service, locale))
}

// Get all vip services (for admin)
export async function getAllVipServices(locale: string = 'en') {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('vip_tourism_services')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching all vip services:', error)
        return []
    }
    return data.map(service => transformVipService(service, locale))
}

// Get single vip service by ID (for admin editing - raw data)
export async function getVipServiceByIdRaw(id: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('vip_tourism_services')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching vip service:', error)
        return null
    }
    return data
}

// Get single vip service by ID (for public/transformed)
export async function getVipServiceById(id: string, locale: string = 'en') {
    const data = await getVipServiceByIdRaw(id)
    if (!data) return null
    return transformVipService(data, locale)
}
