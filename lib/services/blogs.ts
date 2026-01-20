import { supabase } from '../supabase'

export async function getBlogs() {
    try {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('is_published', true)
            .order('published_at', { ascending: false })

        if (error) {
            console.error('Error fetching blogs:', error)
            return []
        }
        return data || []
    } catch (error) {
        console.error('Error in getBlogs:', error)
        return []
    }
}

export async function getBlogBySlug(slug: string) {
    try {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('slug', slug)
            .single()

        if (error) {
            console.error('Error fetching blog by slug:', error)
            return null
        }
        return data
    } catch (error) {
        console.error('Error in getBlogBySlug:', error)
        return null
    }
}

export async function createBlog(blogData: any) {
    const { data, error } = await supabase
        .from('blogs')
        .insert([blogData])
        .select()

    if (error) throw error
    return data
}
