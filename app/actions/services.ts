'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Helper to parse multi-language field from FormData
function getMultiLangField(formData: FormData, fieldName: string): any {
    const locales = ['en', 'ar', 'fr', 'tr']
    const result: any = {}

    for (const locale of locales) {
        const value = formData.get(`${fieldName}_${locale}`) as string
        if (value && value.trim()) {
            result[locale] = value.trim()
        }
    }

    return Object.keys(result).length > 0 ? result : null
}

// Generate slug from service name
function generateSlug(serviceName: any): string {
    const name = serviceName.en || serviceName.ar || serviceName.fr || serviceName.tr || 'service'
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

export async function createServiceAction(formData: FormData) {
    try {
        const serviceName = getMultiLangField(formData, 'service_name')
        const serviceDetails = getMultiLangField(formData, 'service_details')
        const targetClientCategory = getMultiLangField(formData, 'target_client_category')
        const proceduralRequirements = getMultiLangField(formData, 'procedural_requirements')
        const additionalNotes = getMultiLangField(formData, 'additional_notes')
        const coverImage = formData.get('cover_image') as string
        const isActive = formData.get('is_active') === 'on'

        // Hot deal fields
        const isHotDeal = formData.get('is_hot_deal') === 'on'
        const hotDealStartDateRaw = formData.get('hotDealStartDate') as string
        const hotDealStartDate = hotDealStartDateRaw ? new Date(hotDealStartDateRaw).toISOString() : null
        const hotDealEndDateRaw = formData.get('hotDealEndDate') as string
        const hotDealEndDate = hotDealEndDateRaw ? new Date(hotDealEndDateRaw).toISOString() : null
        const hotDealPriority = formData.get('hotDealPriority') ? parseInt(formData.get('hotDealPriority') as string) : 999

        // Debug logging
        console.log('Service Name:', serviceName)
        console.log('FormData keys:', Array.from(formData.keys()))

        if (!serviceName) {
            return { error: 'Service name is required' }
        }

        const slug = generateSlug(serviceName)
        const supabase = await createClient()

        const { error } = await supabase
            .from('services')
            .insert([{
                service_name: serviceName,
                service_details: serviceDetails,
                target_client_category: targetClientCategory,
                procedural_requirements: proceduralRequirements,
                additional_notes: additionalNotes,
                cover_image: coverImage || null,
                slug,
                is_active: isActive,
                is_hot_deal: isHotDeal,
                hot_deal_start_date: hotDealStartDate,
                hot_deal_end_date: hotDealEndDate,
                hot_deal_priority: hotDealPriority
            }])

        if (error) {
            console.error('Error creating service:', error)
            return { error: 'Failed to create service' }
        }

        revalidatePath('/[locale]/portal-manage/services')
        revalidatePath('/[locale]/our-services')
        return { success: true }
    } catch (error) {
        console.error('Error in createServiceAction:', error)
        return { error: 'An unexpected error occurred' }
    }
}

export async function updateServiceAction(id: string, formData: FormData) {
    try {
        const serviceName = getMultiLangField(formData, 'service_name')
        const serviceDetails = getMultiLangField(formData, 'service_details')
        const targetClientCategory = getMultiLangField(formData, 'target_client_category')
        const proceduralRequirements = getMultiLangField(formData, 'procedural_requirements')
        const additionalNotes = getMultiLangField(formData, 'additional_notes')
        const coverImage = formData.get('cover_image') as string
        const isActive = formData.get('is_active') === 'on'

        // Hot deal fields
        const isHotDeal = formData.get('is_hot_deal') === 'on'
        const hotDealStartDateRaw = formData.get('hotDealStartDate') as string
        const hotDealStartDate = hotDealStartDateRaw ? new Date(hotDealStartDateRaw).toISOString() : null
        const hotDealEndDateRaw = formData.get('hotDealEndDate') as string
        const hotDealEndDate = hotDealEndDateRaw ? new Date(hotDealEndDateRaw).toISOString() : null
        const hotDealPriority = formData.get('hotDealPriority') ? parseInt(formData.get('hotDealPriority') as string) : 999

        if (!serviceName) {
            return { error: 'Service name is required' }
        }

        const slug = generateSlug(serviceName)
        const supabase = await createClient()

        const { error } = await supabase
            .from('services')
            .update({
                service_name: serviceName,
                service_details: serviceDetails,
                target_client_category: targetClientCategory,
                procedural_requirements: proceduralRequirements,
                additional_notes: additionalNotes,
                cover_image: coverImage || null,
                slug,
                is_active: isActive,
                is_hot_deal: isHotDeal,
                hot_deal_start_date: hotDealStartDate,
                hot_deal_end_date: hotDealEndDate,
                hot_deal_priority: hotDealPriority
            })
            .eq('id', id)

        if (error) {
            console.error('Error updating service:', error)
            return { error: 'Failed to update service' }
        }

        revalidatePath('/[locale]/portal-manage/services')
        revalidatePath('/[locale]/our-services')
        return { success: true }
    } catch (error) {
        console.error('Error in updateServiceAction:', error)
        return { error: 'An unexpected error occurred' }
    }
}

export async function deleteServiceAction(id: string) {
    try {
        const supabase = await createClient()

        const { error } = await supabase
            .from('services')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Error deleting service:', error)
            return { error: 'Failed to delete service' }
        }

        revalidatePath('/[locale]/portal-manage/services')
        revalidatePath('/[locale]/our-services')
        return { success: true }
    } catch (error) {
        console.error('Error in deleteServiceAction:', error)
        return { error: 'An unexpected error occurred' }
    }
}
