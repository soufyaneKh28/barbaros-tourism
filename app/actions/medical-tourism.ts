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

export async function createMedicalTourismSectionAction(formData: FormData) {
    const supabase = await createClient()

    // Multi-language fields
    const title = getMultiLangField(formData, 'title')
    const description = getMultiLangField(formData, 'description')

    // Regular fields
    const imageUrl = formData.get('imageUrl') as string
    const displayOrderRaw = formData.get('displayOrder') as string
    const displayOrder = displayOrderRaw ? parseInt(displayOrderRaw) : 0
    const isActive = formData.get('isActive') === 'on'

    const { error } = await supabase
        .from('medical_tourism_sections')
        .insert([{
            title,
            description,
            image_url: imageUrl,
            display_order: displayOrder,
            is_active: isActive
        }])

    if (error) {
        console.error('Error creating medical tourism section:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/medical-tourism', 'page')
    revalidatePath('/[locale]/portal-manage/medical-tourism')
    return { success: true }
}

export async function updateMedicalTourismSectionAction(id: string, formData: FormData) {
    const supabase = await createClient()

    // Multi-language fields
    const title = getMultiLangField(formData, 'title')
    const description = getMultiLangField(formData, 'description')

    // Regular fields
    const imageUrl = formData.get('imageUrl') as string
    const displayOrderRaw = formData.get('displayOrder') as string
    const displayOrder = displayOrderRaw ? parseInt(displayOrderRaw) : 0
    const isActive = formData.get('isActive') === 'on'

    const { error } = await supabase
        .from('medical_tourism_sections')
        .update({
            title,
            description,
            image_url: imageUrl,
            display_order: displayOrder,
            is_active: isActive,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)

    if (error) {
        console.error('Error updating medical tourism section:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/medical-tourism', 'page')
    revalidatePath('/[locale]/portal-manage/medical-tourism')
    return { success: true }
}

export async function deleteMedicalTourismSectionAction(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('medical_tourism_sections').delete().eq('id', id)

    if (error) {
        console.error('Error deleting medical tourism section:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/medical-tourism', 'page')
    revalidatePath('/[locale]/portal-manage/medical-tourism')
    return { success: true }
}

export async function toggleMedicalTourismSectionStatusAction(id: string) {
    const supabase = await createClient()

    const { data: section } = await supabase
        .from('medical_tourism_sections')
        .select('is_active')
        .eq('id', id)
        .single()

    if (!section) return { error: 'Section not found' }

    const { error } = await supabase
        .from('medical_tourism_sections')
        .update({ is_active: !section.is_active, updated_at: new Date().toISOString() })
        .eq('id', id)

    if (error) {
        console.error('Error toggling status:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/medical-tourism', 'page')
    revalidatePath('/[locale]/portal-manage/medical-tourism')
    return { success: true }
}
