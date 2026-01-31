import { supabase } from '../supabase'
import { getLocalized } from '../utils'

// Helper to transform immigration service category
function transformCategory(category: any, locale: string = 'en') {
    if (!category) return null
    return {
        ...category,
        name: getLocalized(category.name, locale),
        description: getLocalized(category.description, locale)
    }
}

// Helper to transform immigration service
function transformService(service: any, locale: string = 'en') {
    if (!service) return null
    return {
        ...service,
        title: getLocalized(service.title, locale),
        description: getLocalized(service.description, locale),
        long_description: getLocalized(service.long_description, locale),
        features: getLocalized(service.features, locale) || [],
        requirements: getLocalized(service.requirements, locale) || [],
        processing_time: getLocalized(service.processing_time, locale),
        category: service.category ? transformCategory(service.category, locale) : null
    }
}

// Get all immigration service categories
export async function getImmigrationCategories(locale: string = 'en') {
    const { data, error } = await supabase
        .from('immigration_service_categories')
        .select('*')
        .order('slug', { ascending: true })

    if (error) throw error
    return data.map(category => transformCategory(category, locale))
}

// Get immigration services with optional category filter
export async function getImmigrationServices(
    locale: string = 'en',
    categorySlug?: string,
    limit?: number
) {
    let query = supabase
        .from('immigration_services')
        .select(`
            *,
            category:immigration_service_categories(*)
        `)
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false })

    if (categorySlug) {
        // First get the category ID
        const { data: categoryData } = await supabase
            .from('immigration_service_categories')
            .select('id')
            .eq('slug', categorySlug)
            .single()

        if (categoryData) {
            query = query.eq('category_id', categoryData.id)
        }
    }

    if (limit) {
        query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) throw error
    return data.map(service => transformService(service, locale))
}

// Get single immigration service by slug
export async function getImmigrationServiceBySlug(slug: string, locale: string = 'en') {
    const { data, error } = await supabase
        .from('immigration_services')
        .select(`
            *,
            category:immigration_service_categories(*)
        `)
        .eq('slug', slug)
        .single()

    if (error) throw error
    return transformService(data, locale)
}

// Get single immigration service by ID (for admin)
export async function getImmigrationServiceById(id: string, locale: string = 'en') {
    const { data, error } = await supabase
        .from('immigration_services')
        .select(`
            *,
            category:immigration_service_categories(*)
        `)
        .eq('id', id)
        .single()

    if (error) throw error
    return transformService(data, locale)
}

// Get all immigration services (for admin, including inactive)
export async function getAllImmigrationServices(locale: string = 'en') {
    const { data, error } = await supabase
        .from('immigration_services')
        .select(`
            *,
            category:immigration_service_categories(*)
        `)
        .order('created_at', { ascending: false })

    if (error) throw error
    return data.map(service => transformService(service, locale))
}
