import { createClient } from '@/utils/supabase/server'

export async function getMessages(limit: number | null = null, isRead: boolean | null = null) {
    try {
        const supabase = await createClient()

        let query = supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false })

        if (isRead !== null) {
            query = query.eq('is_read', isRead)
        }

        if (limit) {
            query = query.limit(limit)
        }

        const { data, error } = await query

        if (error) {
            console.error('Error fetching messages:', error)
            return []
        }

        return data || []
    } catch (error) {
        console.error('Error in getMessages:', error)
        return []
    }
}

export async function getMessageById(id: string) {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            console.error('Error fetching message:', error)
            return null
        }

        return data
    } catch (error) {
        console.error('Error in getMessageById:', error)
        return null
    }
}

export async function getUnreadCount() {
    try {
        const supabase = await createClient()

        const { count, error } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .eq('is_read', false)

        if (error) {
            console.error('Error fetching unread count:', error)
            return 0
        }

        return count || 0
    } catch (error) {
        console.error('Error in getUnreadCount:', error)
        return 0
    }
}
