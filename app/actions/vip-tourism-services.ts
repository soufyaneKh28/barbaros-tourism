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

export async function createVipServiceAction(formData: FormData) {
    const supabase = await createClient()

    // Multi-language fields
    const title = getMultiLangField(formData, 'title')
    const description = getMultiLangField(formData, 'description')
    const ctaText = getMultiLangField(formData, 'cta_text')

    // Regular fields
    const imageUrl = formData.get('imageUrl') as string
    const ctaLink = formData.get('ctaLink') as string
    const displayOrderRaw = formData.get('displayOrder') as string
    const displayOrder = displayOrderRaw ? parseInt(displayOrderRaw) : 0
    const isActive = formData.get('isActive') === 'on'

    const { error } = await supabase
        .from('vip_tourism_services')
        .insert([{
            title,
            description,
            cta_text: ctaText,
            cta_link: ctaLink,
            image_url: imageUrl,
            display_order: displayOrder,
            is_active: isActive
        }])

    if (error) {
        console.error('Error creating vip service:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/vip-tourism-services', 'page')
    revalidatePath('/[locale]/portal-manage/vip-tourism-services')
    return { success: true }
}

export async function updateVipServiceAction(id: string, formData: FormData) {
    const supabase = await createClient()

    // Multi-language fields
    const title = getMultiLangField(formData, 'title')
    const description = getMultiLangField(formData, 'description')
    const ctaText = getMultiLangField(formData, 'cta_text')

    // Regular fields
    const imageUrl = formData.get('imageUrl') as string
    const ctaLink = formData.get('ctaLink') as string
    const displayOrderRaw = formData.get('displayOrder') as string
    const displayOrder = displayOrderRaw ? parseInt(displayOrderRaw) : 0
    const isActive = formData.get('isActive') === 'on'

    const { error } = await supabase
        .from('vip_tourism_services')
        .update({
            title,
            description,
            cta_text: ctaText,
            cta_link: ctaLink,
            image_url: imageUrl,
            display_order: displayOrder,
            is_active: isActive,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)

    if (error) {
        console.error('Error updating vip service:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/vip-tourism-services', 'page')
    revalidatePath('/[locale]/portal-manage/vip-tourism-services')
    return { success: true }
}

export async function deleteVipServiceAction(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('vip_tourism_services').delete().eq('id', id)

    if (error) {
        console.error('Error deleting vip service:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/vip-tourism-services', 'page')
    revalidatePath('/[locale]/portal-manage/vip-tourism-services')
    return { success: true }
}

export async function toggleVipServiceStatusAction(id: string) {
    const supabase = await createClient()

    const { data: service } = await supabase
        .from('vip_tourism_services')
        .select('is_active')
        .eq('id', id)
        .single()

    if (!service) return { error: 'Service not found' }

    const { error } = await supabase
        .from('vip_tourism_services')
        .update({ is_active: !service.is_active, updated_at: new Date().toISOString() })
        .eq('id', id)

    if (error) {
        console.error('Error toggling status:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/vip-tourism-services', 'page')
    revalidatePath('/[locale]/portal-manage/vip-tourism-services')
    return { success: true }
}

export async function updateVipServiceOrderAction(id: string, order: number) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('vip_tourism_services')
        .update({ display_order: order, updated_at: new Date().toISOString() })
        .eq('id', id)

    if (error) {
        console.error('Error updating vip service order:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/vip-tourism-services', 'page')
    revalidatePath('/[locale]/portal-manage/vip-tourism-services')
    return { success: true }
}
