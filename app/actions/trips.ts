'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createTripAction(formData: FormData) {
    const supabase = await createClient()
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const duration = parseInt(formData.get('duration') as string)
    const location = formData.get('location') as string
    const imageUrl = formData.get('imageUrl') as string

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
            images: imageUrl ? [imageUrl] : [],
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
