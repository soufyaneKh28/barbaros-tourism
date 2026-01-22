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

export async function createDestinationAction(formData: FormData) {
    const supabase = await createClient()

    // Multi-language fields
    const name = getMultiLangField(formData, 'name')
    const description = getMultiLangField(formData, 'description')

    // Regular fields
    const slug = formData.get('slug') as string
    const imageUrl = formData.get('imageUrl') as string

    const { error } = await supabase
        .from('destinations')
        .insert([{
            name,
            slug,
            description,
            image_url: imageUrl
        }])

    if (error) {
        console.error(error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/tours', 'page')
    revalidatePath('/[locale]/portal-manage/destinations')
    return { success: true }
}

export async function updateDestinationAction(id: string, formData: FormData) {
    const supabase = await createClient()

    // Multi-language fields
    const name = getMultiLangField(formData, 'name')
    const description = getMultiLangField(formData, 'description')

    // Regular fields
    const slug = formData.get('slug') as string
    const imageUrl = formData.get('imageUrl') as string

    const { error } = await supabase
        .from('destinations')
        .update({
            name,
            slug,
            description,
            image_url: imageUrl,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)

    if (error) {
        console.error('Error updating destination:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/destinations', 'page')
    revalidatePath('/[locale]/portal-manage/destinations')
    revalidatePath(`/[locale]/destinations/${slug}`)
    return { success: true }
}

export async function deleteDestinationAction(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('destinations')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting destination:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/destinations', 'page')
    revalidatePath('/[locale]/portal-manage/destinations')
    return { success: true }
}
