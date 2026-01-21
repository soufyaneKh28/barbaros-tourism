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

export async function getDestinations(locale: string = 'en') {
    const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('name', { ascending: true })

    if (error) throw error
    return data.map(dest => transformDestination(dest, locale))
}

export async function createDestination(destData: any) {
    const { data, error } = await supabase
        .from('destinations')
        .insert([destData])
        .select()

    if (error) throw error
    return data
}
