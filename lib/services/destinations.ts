import { supabase } from '../supabase'
import { getLocalized } from '../utils'

function transformDestination(dest: any, locale: string = 'en') {
    if (!dest) return null
    return {
        ...dest,
        name: getLocalized(dest.name, locale),
        description: getLocalized(dest.description, locale)
    }
}

export async function getDestinations(locale: string = 'en', limit: number | null = null) {
    let query = supabase
        .from('destinations')
        .select(`
            *,
            trips:trips(count)
        `)
        .order('name', { ascending: true })

    if (limit) {
        query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) throw error

    return data.map(dest => ({
        ...transformDestination(dest, locale),
        tours_count: dest.trips?.[0]?.count || 0
    }))
}

export async function createDestination(destData: any) {
    const { data, error } = await supabase
        .from('destinations')
        .insert([destData])
        .select()

    if (error) throw error
    return data
}
