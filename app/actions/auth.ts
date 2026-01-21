'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signInAction(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const locale = formData.get('locale') as string || 'en'
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect(`/${locale}/portal-manage`)
}

export async function signOutAction(formData?: FormData) {
    const supabase = await createClient()
    await supabase.auth.signOut()

    let locale = 'en'
    if (formData) {
        locale = formData.get('locale') as string || 'en'
    }

    redirect(`/${locale}`)
}
