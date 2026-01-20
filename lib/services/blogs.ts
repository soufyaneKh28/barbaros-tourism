import { supabase } from '../supabase'

export async function getBlogs(includeDrafts = true) {
    try {
        let query = supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false })

        if (!includeDrafts) {
            query = query.eq('is_published', true)
        }

        const { data, error } = await query

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

export async function getBlogById(id: string) {
    try {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            console.error('Error fetching blog by id:', error)
            return null
        }
        return data
    } catch (error) {
        console.error('Error in getBlogById:', error)
        return null
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
