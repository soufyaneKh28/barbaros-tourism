import { supabase } from '../supabase'

export async function getBlogs() {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })

    if (error) throw error
    return data
}

export async function getBlogBySlug(slug: string) {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) throw error
    return data
}

export async function createBlog(blogData: any) {
    const { data, error } = await supabase
        .from('blogs')
        .insert([blogData])
        .select()

    if (error) throw error
    return data
}
