'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createDestinationAction(formData: FormData) {
    const supabase = await createClient()
    const name = formData.get('name') as string
    const slug = formData.get('slug') as string
    const description = formData.get('description') as string
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
    return { success: true }
}
