import { supabase } from '../supabase'
import { getLocalized } from '../utils'
import { Program } from '../types'

function transformProgram(program: any, locale: string = 'en') {
    if (!program) return null
    return {
        ...program,
        title: getLocalized(program.title, locale),
        description: getLocalized(program.description, locale),
        duration_text: getLocalized(program.duration_text, locale),
        accommodation_type: getLocalized(program.accommodation_type, locale),
        includes: getLocalized(program.includes, locale) || [],
        excludes: getLocalized(program.excludes, locale) || [],
        itinerary: getLocalized(program.itinerary, locale),
    }
}

export async function getPrograms(locale: string = 'en', limit: number | null = null) {
    let query = supabase
        .from('programs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

    if (limit) {
        query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) throw error
    return data.map(p => transformProgram(p, locale))
}

export async function getProgramBySlug(slug: string, locale: string = 'en') {
    const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) throw error
    return transformProgram(data, locale)
}

export async function createProgram(programData: any) {
    const { data, error } = await supabase
        .from('programs')
        .insert([programData])
        .select()

    if (error) throw error
    return data
}

export async function updateProgram(id: string, programData: any) {
    const { data, error } = await supabase
        .from('programs')
        .update(programData)
        .eq('id', id)
        .select()

    if (error) throw error
    return data
}
