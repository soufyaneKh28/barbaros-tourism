import { createClient } from '@/utils/supabase/server'
import { getLocalized } from '../utils'
import { MedicalTourismSection } from '../types'

// Helper to transform medical tourism section
function transformSection(section: any, locale: string = 'en'): MedicalTourismSection {
    if (!section) return section
    return {
        ...section,
        title: getLocalized(section.title, locale),
        description: getLocalized(section.description, locale)
    }
}

// Get all active medical tourism sections
export async function getMedicalTourismSections(locale: string = 'en') {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('medical_tourism_sections')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false })

    if (error) throw error
    return data.map(section => transformSection(section, locale))
}

// Get all medical tourism sections (for admin)
export async function getAllMedicalTourismSections(locale: string = 'en') {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('medical_tourism_sections')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false })

    if (error) throw error
    return data.map(section => transformSection(section, locale))
}

// Get single medical tourism section by ID (for admin editing)
export async function getMedicalTourismSectionById(id: string, locale: string = 'en') {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('medical_tourism_sections')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return transformSection(data, locale)
}
