import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Standard client for use in components and server actions
// Use placeholder values during build if env vars are missing
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-anon-key'
)

// Types for your database (you can generate these with Supabase CLI later)
export type Tables = {
    trips: any // Placeholders for now
    destinations: any
    blogs: any
    categories: any
}
