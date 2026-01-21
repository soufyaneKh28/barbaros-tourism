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

export async function createBlogAction(formData: FormData) {
    const supabase = await createClient()

    // Multi-language fields
    const title = getMultiLangField(formData, 'title')
    const excerpt = getMultiLangField(formData, 'excerpt')
    const content = getMultiLangField(formData, 'content')

    // Regular fields
    const slug = formData.get('slug') as string
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
    revalidatePath('/[locale]/portal-manage/blogs')
    return { success: true }
}

export async function deleteBlogAction(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting blog:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/portal-manage/blogs')
    return { success: true }
}

export async function toggleBlogStatusAction(id: string, isPublished: boolean) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('blogs')
        .update({
            is_published: isPublished,
            published_at: isPublished ? new Date().toISOString() : null
        })
        .eq('id', id)

    if (error) {
        console.error('Error updating blog status:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/portal-manage/blogs')
    return { success: true }
}

export async function updateBlogAction(id: string, formData: FormData) {
    const supabase = await createClient()

    // Multi-language fields
    const title = getMultiLangField(formData, 'title')
    const excerpt = getMultiLangField(formData, 'excerpt')
    const content = getMultiLangField(formData, 'content')

    // Regular fields
    const slug = formData.get('slug') as string
    const coverImage = formData.get('coverImage') as string
    const authorName = formData.get('authorName') as string

    const { error } = await supabase
        .from('blogs')
        .update({
            title,
            slug,
            excerpt,
            content,
            cover_image: coverImage,
            author_name: authorName,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)

    if (error) {
        console.error('Error updating blog:', error)
        return { error: error.message }
    }

    revalidatePath('/[locale]/portal-manage/blogs')
    revalidatePath(`/[locale]/blogs/${slug}`)
    return { success: true }
}
