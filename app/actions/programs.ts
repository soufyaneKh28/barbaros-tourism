'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { locales } from '@/i18n/config'

// Helper to extract multi-language field from FormData
function getMultiLangField(formData: FormData, fieldName: string): Record<string, string> {
    const result: Record<string, string> = {}
    locales.forEach(locale => {
        const value = formData.get(`${fieldName}_${locale}`) as string
        if (value) result[locale] = value
    })
    return result
}

// Helper to extract multi-language array field from FormData
function getMultiLangArrayField(formData: FormData, fieldName: string): Record<string, string[]> {
    const result: Record<string, string[]> = {}
    locales.forEach(locale => {
        const value = formData.get(`${fieldName}_${locale}`) as string
        if (value) {
            result[locale] = value.split('\n').map(s => s.trim()).filter(Boolean)
        }
    })
    return result
}

export async function createProgramAction(formData: FormData) {
    const supabase = await createClient()

    // Multi-language fields
    const title = getMultiLangField(formData, 'title')
    const description = getMultiLangField(formData, 'description')
    const includes = getMultiLangArrayField(formData, 'includes')
    const excludes = getMultiLangArrayField(formData, 'excludes')
    const duration_text = getMultiLangField(formData, 'duration_text')
    const accommodation_type = getMultiLangField(formData, 'accommodation_type')
    const itinerary = getMultiLangField(formData, 'itinerary') // Assuming itinerary is stored as JSONB but handled as text input for now or proper JSON structure

    // Regular fields
    const slug = formData.get('slug') as string
    const mainImage = formData.get('main_image') as string

    const imagesRaw = formData.get('images') as string
    const images = imagesRaw ? imagesRaw.split(',').map(s => s.trim()).filter(Boolean) : []

    const { error } = await supabase
        .from('programs')
        .insert([{
            title,
            slug,
            description,
            duration_text,
            accommodation_type,
            includes,
            excludes,
            itinerary,
            main_image: mainImage,
            images,
            is_active: true
        }])

    if (error) {
        console.error(error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/programs', 'page')
    revalidatePath('/[locale]/portal-manage/programs')
    return { success: true }
}


export async function updateProgramAction(id: string, formData: FormData) {
    const supabase = await createClient()

    // Multi-language fields
    const title = getMultiLangField(formData, 'title')
    const description = getMultiLangField(formData, 'description')
    const includes = getMultiLangArrayField(formData, 'includes')
    const excludes = getMultiLangArrayField(formData, 'excludes')
    const duration_text = getMultiLangField(formData, 'duration_text')
    const accommodation_type = getMultiLangField(formData, 'accommodation_type')
    const itinerary = getMultiLangField(formData, 'itinerary')

    // Regular fields
    const slug = formData.get('slug') as string
    const mainImage = formData.get('main_image') as string

    const imagesRaw = formData.get('images') as string
    const images = imagesRaw ? imagesRaw.split(',').map(s => s.trim()).filter(Boolean) : []


    const { error } = await supabase
        .from('programs')
        .update({
            title,
            slug,
            description,
            duration_text,
            accommodation_type,
            includes,
            excludes,
            itinerary,
            main_image: mainImage,
            images,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)

    if (error) {
        console.error('Error updating program:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/programs', 'page')
    revalidatePath('/[locale]/portal-manage/programs')
    revalidatePath(`/[locale]/programs/${slug}`)
    return { success: true }
}

export async function deleteProgramAction(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('programs').delete().eq('id', id)

    if (error) {
        console.error('Error deleting program:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/programs', 'page')
    revalidatePath('/[locale]/portal-manage/programs')
    return { success: true }
}

export async function updateProgramOrderAction(id: string, order: number) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('programs')
        .update({ display_order: order, updated_at: new Date().toISOString() })
        .eq('id', id)

    if (error) {
        console.error('Error updating program order:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/programs', 'page')
    revalidatePath('/[locale]/portal-manage/programs')
    return { success: true }
}
