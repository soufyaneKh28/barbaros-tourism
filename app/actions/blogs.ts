'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createBlogAction(formData: FormData) {
    const supabase = await createClient()
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string
    const coverImage = formData.get('coverImage') as string
    const authorName = formData.get('authorName') as string || 'Barbaros Team'
    const isPublished = formData.get('isPublished') === 'on'

    const { error } = await supabase
        .from('blogs')
        .insert([{
            title,
            slug,
            excerpt,
            content,
            cover_image: coverImage,
            author_name: authorName,
            is_published: isPublished,
            published_at: isPublished ? new Date().toISOString() : null
        }])

    if (error) {
        console.error(error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/blogs', 'page')
    return { success: true }
}
