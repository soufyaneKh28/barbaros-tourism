import { supabase } from '../supabase'
import { getLocalized } from '../utils'

// Helper to flatten localized fields
function transformTrip(trip: any, locale: string = 'en') {
    if (!trip) return null
    return {
        ...trip,
        title: getLocalized(trip.title, locale),
        description: getLocalized(trip.description, locale),
        long_description: getLocalized(trip.long_description, locale),
        location: getLocalized(trip.location, locale),
        time_text: getLocalized(trip.time_text, locale),
        includes: getLocalized(trip.includes, locale) || [],
        excludes: getLocalized(trip.excludes, locale) || [],
        itinerary: getLocalized(trip.itinerary, locale),
        category: trip.category ? {
            ...trip.category,
            name: getLocalized(trip.category.name, locale)
        } : null
    }
}


export async function getTrips(locale: string = 'en') {
    const { data, error } = await supabase
        .from('trips')
        .select(`
      *,
      category:categories(name, slug)
    `)
        .eq('is_active', true)
        .order('display_order', { ascending: true })

    if (error) throw error
    return data.map(trip => transformTrip(trip, locale))
}

export async function getAllTrips() {
    const { data, error } = await supabase
        .from('trips')
        .select(`
      *,
      category:categories(name, slug)
    `)
        .order('display_order', { ascending: true })

    if (error) throw error
    return data
}

export async function getTripsByType(tripType: string, locale: string = 'en') {
    const { data, error } = await supabase
        .from('trips')
        .select(`
      *,
      category:categories(name, slug)
    `)
        .eq('is_active', true)
        .eq('trip_type', tripType)
        .order('display_order', { ascending: true })

    if (error) throw error
    return data.map(trip => transformTrip(trip, locale))
}

export async function getTripById(id: string, locale: string = 'en') {
    const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return transformTrip(data, locale)
}

export async function getTripBySlug(slug: string, locale: string = 'en') {
    const { data, error } = await supabase
        .from('trips')
        .select(`
      *,
      category:categories(name, slug)
    `)
        .eq('slug', slug)
        .single()

    if (error) throw error
    return transformTrip(data, locale)
}

export async function createTrip(tripData: any) {
    const { data, error } = await supabase
        .from('trips')
        .insert([tripData])
        .select()

    if (error) throw error
    return data
}

export async function getHotDeals(locale: string = 'en') {
    const now = new Date().toISOString()
    const { data, error } = await supabase
        .from('trips')
        .select(`
            *,
            category:categories(name, slug)
        `)
        .eq('is_hot_deal', true)
        .eq('is_active', true)
        .or(`hot_deal_end_date.is.null,hot_deal_end_date.gte.${now}`)
        .order('hot_deal_priority', { ascending: true, nullsFirst: false })
        .limit(10)

    if (error) throw error
    return data.map(trip => transformTrip(trip, locale))
}
