import { supabase } from '../supabase'

export async function getTrips() {
    const { data, error } = await supabase
        .from('trips')
        .select(`
      *,
      destination:destinations(name, slug),
      category:categories(name, slug)
    `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

export async function getTripById(id: string) {
    const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return data
}

export async function getTripBySlug(slug: string) {
    const { data, error } = await supabase
        .from('trips')
        .select(`
      *,
      destination:destinations(name, slug, description, image_url),
      category:categories(name, slug)
    `)
        .eq('slug', slug)
        .single()

    if (error) throw error
    return data
}

export async function createTrip(tripData: any) {
    const { data, error } = await supabase
        .from('trips')
        .insert([tripData])
        .select()

    if (error) throw error
    return data
}
