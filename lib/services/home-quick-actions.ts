import { createClient } from '@/utils/supabase/server'
import { getLocalized } from '../utils'

export type QuickAction = {
    id: string
    title: any
    description: any
    icon_url: string
    link_url: any // Changed to any for JSONB support
    is_active: boolean
    sort_order: number
    created_at: string
    updated_at: string
}

function transformQuickAction(action: any, locale: string = 'en') {
    if (!action) return null

    console.log('transformQuickAction input:', { id: action.id, link_url: action.link_url, type: typeof action.link_url, locale })

    let linkUrl = action.link_url
    // Handle case where JSONB is returned as string or it's legacy text data
    if (typeof linkUrl === 'string') {
        try {
            const parsed = JSON.parse(linkUrl)
            if (parsed && typeof parsed === 'object') {
                linkUrl = parsed
            }
        } catch (e) {
            // Not JSON, keep as string (legacy plain URL)
        }
    }

    const result = {
        ...action,
        title: getLocalized(action.title, locale),
        description: getLocalized(action.description, locale),
        link_url: getLocalized(linkUrl, locale)
    }
    console.log('transformQuickAction output:', { id: result.id, link_url: result.link_url })
    return result
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

