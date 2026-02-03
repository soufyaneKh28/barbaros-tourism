import { createClient } from '@/utils/supabase/server'
import { getLocalized } from '../utils'

export type QuickAction = {
    id: string
    title: any
    description: any
    icon_url: string
    link_url: string
    is_active: boolean
    sort_order: number
    created_at: string
    updated_at: string
}

function transformQuickAction(action: any, locale: string = 'en') {
    if (!action) return null
    return {
        ...action,
        title: getLocalized(action.title, locale),
        description: getLocalized(action.description, locale),
    }
}

export async function getQuickActions(locale: string = 'en') {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from('home_quick_actions')
            .select('*')
            .eq('is_active', true)
            .order('sort_order', { ascending: true })

        if (error) {
            console.error('Error fetching quick actions:', error)
            return []
        }

        return data.map(action => transformQuickAction(action, locale))
    } catch (error) {
        console.error('Error in getQuickActions:', error)
        return []
    }
}

export async function getAllQuickActions() {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from('home_quick_actions')
            .select('*')
            .order('sort_order', { ascending: true })

        if (error) {
            console.error('Error fetching all quick actions:', error)
            return []
        }

        return data
    } catch (error) {
        console.error('Error in getAllQuickActions:', error)
        return []
    }
}

export async function getQuickActionById(id: string) {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from('home_quick_actions')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            console.error('Error fetching quick action:', error)
            return null
        }

        return data
    } catch (error) {
        console.error('Error in getQuickActionById:', error)
        return null
    }
}

