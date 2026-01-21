'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { locales } from '@/i18n/config'

// Helper to extract multi-language field from FormData
function getMultiLangField(formData: FormData, fieldName: string): Record<string, string> {
    const result: Record<string, string> = {}
    locales.forEach(locale => {
        const value = formData.get(`${fieldName}[${locale}]`) as string
        if (value) result[locale] = value
    })
    return result
}

// Helper to extract multi-language array field from FormData
function getMultiLangArrayField(formData: FormData, fieldName: string): Record<string, string[]> {
    const result: Record<string, string[]> = {}
    locales.forEach(locale => {
        const value = formData.get(`${fieldName}[${locale}]`) as string
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
    const location = getMultiLangField(formData, 'location')
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

    const startDateRaw = formData.get('startDate') as string
    const startDate = startDateRaw ? new Date(startDateRaw).toISOString() : null

    const endDateRaw = formData.get('endDate') as string
    const endDate = endDateRaw ? new Date(endDateRaw).toISOString() : null

    const itineraryRaw = formData.get('itinerary') as string
    // Store as simple array of objects for now
    const itinerary = itineraryRaw ? itineraryRaw.split('\n').map(s => s.trim()).filter(Boolean).map(step => ({ title: step })) : []

    const tripType = formData.get('tripType') as string || 'daily'

    // For now, we'll fetch a random destination and category if not provided
    // In a real app, you'd have a dropdown to select these
    const { data: dest } = await supabase.from('destinations').select('id').limit(1).single()
    const { data: cat } = await supabase.from('categories').select('id').limit(1).single()

    const { error } = await supabase
        .from('trips')
        .insert([{
            title,
            slug,
            description,
            price,
            duration_days: duration,
            location,
            main_image: mainImage,
            images,
            start_date: startDate,
            end_date: endDate,
            includes,
            excludes,
            itinerary,
            trip_type: tripType,
            destination_id: dest?.id,
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
    const location = getMultiLangField(formData, 'location')
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

    const startDateRaw = formData.get('startDate') as string
    const startDate = startDateRaw ? new Date(startDateRaw).toISOString() : null

    const endDateRaw = formData.get('endDate') as string
    const endDate = endDateRaw ? new Date(endDateRaw).toISOString() : null

    const itineraryRaw = formData.get('itinerary') as string
    const itinerary = itineraryRaw ? itineraryRaw.split('\n').map(s => s.trim()).filter(Boolean).map(step => ({ title: step })) : []

    const tripType = formData.get('tripType') as string || 'daily'

    const { error } = await supabase
        .from('trips')
        .update({
            title,
            slug,
            description,
            price,
            duration_days: duration,
            location,
            main_image: mainImage,
            images,
            start_date: startDate,
            end_date: endDate,
            includes,
            excludes,
            itinerary,
            trip_type: tripType,
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
