'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

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

export async function createQuickAction(action: Partial<QuickAction>) {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('home_quick_actions')
            .insert([action])
            .select()
            .single()

        if (error) throw error
        revalidatePath('/[locale]/portal-manage/quick-actions')
        revalidatePath('/') // Revalidate home page
        return { data, error: null }
    } catch (error) {
        console.error('Error creating quick action:', error)
        return { data: null, error }
    }
}

export async function updateQuickAction(id: string, updates: Partial<QuickAction>) {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('home_quick_actions')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        revalidatePath('/[locale]/portal-manage/quick-actions')
        revalidatePath('/') // Revalidate home page
        return { data, error: null }
    } catch (error) {
        console.error('Error updating quick action:', error)
        return { data: null, error }
    }
}

export async function deleteQuickAction(id: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase
            .from('home_quick_actions')
            .delete()
            .eq('id', id)

        if (error) throw error
        revalidatePath('/[locale]/portal-manage/quick-actions')
        revalidatePath('/') // Revalidate home page
        return { error: null }
    } catch (error) {
        console.error('Error deleting quick action:', error)
        return { error }
    }
}

export async function updateQuickActionOrderAction(id: string, order: number) {
    try {
        await updateQuickAction(id, { sort_order: order });
        // Revalidation is handled inside updateQuickAction
        return { success: true };
    } catch (error) {
        console.error('Error updating quick action order:', error);
        return { success: false, error: (error as Error).message };
    }
}
