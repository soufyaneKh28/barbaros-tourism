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

export async function createTripAction(formData: FormData) {
    const supabase = await createClient()

    // Multi-language fields
    const title = getMultiLangField(formData, 'title')
    const description = getMultiLangField(formData, 'description')
    const includes = getMultiLangArrayField(formData, 'includes')
    const excludes = getMultiLangArrayField(formData, 'excludes')

    // Regular fields
    const slug = formData.get('slug') as string

    const priceRaw = formData.get('price') as string
    const price = priceRaw ? parseFloat(priceRaw) : null

    const duration = parseInt(formData.get('duration') as string)

    const mainImage = formData.get('mainImage') as string

    const imagesRaw = formData.get('images') as string
    const images = imagesRaw ? imagesRaw.split(',').map(s => s.trim()).filter(Boolean) : []

    const timeText = getMultiLangField(formData, 'timeText')
    const timeIcon = formData.get('timeTextIcon') as string || 'calendar'

    const itinerary = getMultiLangField(formData, 'itinerary')

    const tripType = formData.get('tripType') as string || 'daily'

    // Hot deal fields
    const isHotDeal = formData.get('isHotDeal') === 'on'
    const hotDealPriorityRaw = formData.get('hotDealPriority') as string
    const hotDealPriority = hotDealPriorityRaw ? parseInt(hotDealPriorityRaw) : null

    const hotDealStartDateRaw = formData.get('hotDealStartDate') as string
    const hotDealStartDate = hotDealStartDateRaw ? new Date(hotDealStartDateRaw).toISOString() : null

    const hotDealEndDateRaw = formData.get('hotDealEndDate') as string
    const hotDealEndDate = hotDealEndDateRaw ? new Date(hotDealEndDateRaw).toISOString() : null


    // Fetch a random category if not provided
    const { data: cat } = await supabase.from('categories').select('id').limit(1).single()

    const { error } = await supabase
        .from('trips')
        .insert([{
            title,
            slug,
            description,
            price,
            duration_days: duration,
            main_image: mainImage,
            images,
            time_text: timeText,
            time_icon: timeIcon,
            includes,
            excludes,
            itinerary,
            trip_type: tripType,
            is_hot_deal: isHotDeal,
            hot_deal_priority: hotDealPriority,
            hot_deal_start_date: hotDealStartDate,
            hot_deal_end_date: hotDealEndDate,
            category_id: cat?.id,
            is_active: true
        }])

    if (error) {
        console.error(error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/tours', 'page')
    revalidatePath('/[locale]/portal-manage/trips')
    return { success: true }
}


export async function updateTripAction(id: string, formData: FormData) {
    const supabase = await createClient()

    // Multi-language fields
    const title = getMultiLangField(formData, 'title')
    const description = getMultiLangField(formData, 'description')
    const includes = getMultiLangArrayField(formData, 'includes')
    const excludes = getMultiLangArrayField(formData, 'excludes')

    // Regular fields
    const slug = formData.get('slug') as string

    const priceRaw = formData.get('price') as string
    const price = priceRaw ? parseFloat(priceRaw) : null

    const duration = parseInt(formData.get('duration') as string)

    const mainImage = formData.get('mainImage') as string

    const imagesRaw = formData.get('images') as string
    const images = imagesRaw ? imagesRaw.split(',').map(s => s.trim()).filter(Boolean) : []

    const timeText = getMultiLangField(formData, 'timeText')
    const timeIcon = formData.get('timeTextIcon') as string || 'calendar'

    const itinerary = getMultiLangField(formData, 'itinerary')

    const tripType = formData.get('tripType') as string || 'daily'

    // Hot deal fields
    const isHotDeal = formData.get('isHotDeal') === 'on'
    const hotDealPriorityRaw = formData.get('hotDealPriority') as string
    const hotDealPriority = hotDealPriorityRaw ? parseInt(hotDealPriorityRaw) : null

    const hotDealStartDateRaw = formData.get('hotDealStartDate') as string
    const hotDealStartDate = hotDealStartDateRaw ? new Date(hotDealStartDateRaw).toISOString() : null

    const hotDealEndDateRaw = formData.get('hotDealEndDate') as string
    const hotDealEndDate = hotDealEndDateRaw ? new Date(hotDealEndDateRaw).toISOString() : null


    const { error } = await supabase
        .from('trips')
        .update({
            title,
            slug,
            description,
            price,
            duration_days: duration,
            main_image: mainImage,
            images,
            time_text: timeText,
            time_icon: timeIcon,
            includes,
            excludes,
            itinerary,
            trip_type: tripType,
            is_hot_deal: isHotDeal,
            hot_deal_priority: hotDealPriority,
            hot_deal_start_date: hotDealStartDate,
            hot_deal_end_date: hotDealEndDate,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)

    if (error) {
        console.error('Error updating trip:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/tours', 'page')
    revalidatePath('/[locale]/portal-manage/trips')
    revalidatePath(`/[locale]/tours/${slug}`)
    return { success: true }
}

export async function deleteTripAction(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('trips').delete().eq('id', id)

    if (error) {
        console.error('Error deleting trip:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/tours', 'page')
    revalidatePath('/[locale]/portal-manage/trips')
    return { success: true }
}
