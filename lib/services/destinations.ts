import { supabase } from '../supabase'

export async function getDestinations() {
    const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('name', { ascending: true })

    if (error) throw error
    return data
}

export async function createDestination(destData: any) {
    const { data, error } = await supabase
        .from('destinations')
        .insert([destData])
        .select()

    if (error) throw error
    return data
}
