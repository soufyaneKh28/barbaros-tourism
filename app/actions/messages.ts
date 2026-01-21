'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitContactFormAction(formData: FormData) {
    try {
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const phone = formData.get('phone') as string
        const subject = formData.get('subject') as string
        const message = formData.get('message') as string

        // Server-side validation
        if (!name || name.trim().length < 2) {
            return { error: 'Name must be at least 2 characters' }
        }

        if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            return { error: 'Please provide a valid email address' }
        }

        if (!message || message.trim().length < 10) {
            return { error: 'Message must be at least 10 characters' }
        }

        const supabase = await createClient()

        const { error } = await supabase
            .from('messages')
            .insert([{
                name: name.trim(),
                email: email.trim(),
                phone: phone?.trim() || null,
                subject: subject?.trim() || null,
                message: message.trim(),
                is_read: false
            }])

        if (error) {
            console.error('Error submitting contact form:', error)
            return { error: 'Failed to submit message. Please try again.' }
        }

        revalidatePath('/[locale]/portal-manage/messages')
        return { success: true }
    } catch (error) {
        console.error('Error in submitContactFormAction:', error)
        return { error: 'An unexpected error occurred. Please try again.' }
    }
}

export async function markMessageAsReadAction(id: string, isRead: boolean) {
    try {
        const supabase = await createClient()

        const { error } = await supabase
            .from('messages')
            .update({ is_read: isRead })
            .eq('id', id)

        if (error) {
            console.error('Error updating message:', error)
            return { error: 'Failed to update message' }
        }

        revalidatePath('/[locale]/portal-manage/messages')
        return { success: true }
    } catch (error) {
        console.error('Error in markMessageAsReadAction:', error)
        return { error: 'An unexpected error occurred' }
    }
}

export async function deleteMessageAction(id: string) {
    try {
        const supabase = await createClient()

        const { error } = await supabase
            .from('messages')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Error deleting message:', error)
            return { error: 'Failed to delete message' }
        }

        revalidatePath('/[locale]/portal-manage/messages')
        return { success: true }
    } catch (error) {
        console.error('Error in deleteMessageAction:', error)
        return { error: 'An unexpected error occurred' }
    }
}
