'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createTripAction(formData: FormData) {
    const supabase = await createClient()
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const description = formData.get('description') as string

    const priceRaw = formData.get('price') as string
    const price = priceRaw ? parseFloat(priceRaw) : null

    const duration = parseInt(formData.get('duration') as string)
    const location = formData.get('location') as string

    const mainImage = formData.get('mainImage') as string

    const imagesRaw = formData.get('images') as string
    const images = imagesRaw ? imagesRaw.split(',').map(s => s.trim()).filter(Boolean) : []

    const startDateRaw = formData.get('startDate') as string
    const startDate = startDateRaw ? new Date(startDateRaw).toISOString() : null

    const endDateRaw = formData.get('endDate') as string
    const endDate = endDateRaw ? new Date(endDateRaw).toISOString() : null

    const includesRaw = formData.get('includes') as string
    const includes = includesRaw ? includesRaw.split('\n').map(s => s.trim()).filter(Boolean) : []

    const excludesRaw = formData.get('excludes') as string
    const excludes = excludesRaw ? excludesRaw.split('\n').map(s => s.trim()).filter(Boolean) : []

    const itineraryRaw = formData.get('itinerary') as string
    // Store as simple array of objects for now
    const itinerary = itineraryRaw ? itineraryRaw.split('\n').map(s => s.trim()).filter(Boolean).map(step => ({ title: step })) : []

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
            destination_id: dest?.id,
            category_id: cat?.id,
            is_active: true
        }])

    if (error) {
        console.error(error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/tours', 'page')
    return { success: true }
}
