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

export async function createImmigrationServiceAction(formData: FormData) {
    const supabase = await createClient()

    // Multi-language fields
    const title = getMultiLangField(formData, 'title')
    const description = getMultiLangField(formData, 'description')
    const longDescription = getMultiLangField(formData, 'longDescription')
    const features = getMultiLangArrayField(formData, 'features')
    const requirements = getMultiLangArrayField(formData, 'requirements')
    const processingTime = getMultiLangField(formData, 'processingTime')

    // Regular fields
    const slug = formData.get('slug') as string
    const categoryId = formData.get('categoryId') as string
    const mainImage = formData.get('mainImage') as string
    const displayOrderRaw = formData.get('displayOrder') as string
    const displayOrder = displayOrderRaw ? parseInt(displayOrderRaw) : 0
    const isActive = formData.get('isActive') === 'on'

    const { error } = await supabase
        .from('immigration_services')
        .insert([{
            title,
            slug,
            description,
            long_description: longDescription,
            category_id: categoryId,
            features,
            requirements,
            processing_time: processingTime,
            main_image: mainImage,
            display_order: displayOrder,
            is_active: isActive
        }])

    if (error) {
        console.error('Error creating immigration service:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/immigration', 'page')
    revalidatePath('/[locale]/portal-manage/immigration-services')
    return { success: true }
}

export async function updateImmigrationServiceAction(id: string, formData: FormData) {
    const supabase = await createClient()

    // Multi-language fields
    const title = getMultiLangField(formData, 'title')
    const description = getMultiLangField(formData, 'description')
    const longDescription = getMultiLangField(formData, 'longDescription')
    const features = getMultiLangArrayField(formData, 'features')
    const requirements = getMultiLangArrayField(formData, 'requirements')
    const processingTime = getMultiLangField(formData, 'processingTime')

    // Regular fields
    const slug = formData.get('slug') as string
    const categoryId = formData.get('categoryId') as string
    const mainImage = formData.get('mainImage') as string
    const displayOrderRaw = formData.get('displayOrder') as string
    const displayOrder = displayOrderRaw ? parseInt(displayOrderRaw) : 0
    const isActive = formData.get('isActive') === 'on'

    const { error } = await supabase
        .from('immigration_services')
        .update({
            title,
            slug,
            description,
            long_description: longDescription,
            category_id: categoryId,
            features,
            requirements,
            processing_time: processingTime,
            main_image: mainImage,
            display_order: displayOrder,
            is_active: isActive,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)

    if (error) {
        console.error('Error updating immigration service:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/immigration', 'page')
    revalidatePath('/[locale]/portal-manage/immigration-services')
    revalidatePath(`/[locale]/immigration/*/[slug]`, 'page')
    return { success: true }
}

export async function deleteImmigrationServiceAction(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('immigration_services').delete().eq('id', id)

    if (error) {
        console.error('Error deleting immigration service:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/immigration', 'page')
    revalidatePath('/[locale]/portal-manage/immigration-services')
    return { success: true }
}

export async function toggleImmigrationServiceStatusAction(id: string) {
    const supabase = await createClient()

    // First get the current status
    const { data: service } = await supabase
        .from('immigration_services')
        .select('is_active')
        .eq('id', id)
        .single()

    if (!service) {
        return { error: 'Service not found' }
    }

    // Toggle the status
    const { error } = await supabase
        .from('immigration_services')
        .update({ is_active: !service.is_active, updated_at: new Date().toISOString() })
        .eq('id', id)

    if (error) {
        console.error('Error toggling service status:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/immigration', 'page')
    revalidatePath('/[locale]/portal-manage/immigration-services')
    return { success: true }
}

export async function updateImmigrationServiceOrderAction(id: string, order: number) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('immigration_services')
        .update({ display_order: order, updated_at: new Date().toISOString() })
        .eq('id', id)

    if (error) {
        console.error('Error updating immigration service order:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/immigration', 'page')
    revalidatePath('/[locale]/portal-manage/immigration-services')
    return { success: true }
}

export async function toggleImmigrationServiceComingSoonAction(id: string, isComingSoon: boolean) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('immigration_services')
        .update({ is_coming_soon: isComingSoon, updated_at: new Date().toISOString() })
        .eq('id', id)

    if (error) {
        console.error('Error updating immigration service coming soon status:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/immigration', 'page')
    revalidatePath('/[locale]/portal-manage/immigration-services')
    return { success: true }
}
