import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake can make it very hard to debug
    // issues with users being randomly logged out.

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const url = request.nextUrl.clone()
    const path = url.pathname
    const isPortalManage = path.includes('/portal-manage')
    const isLoginPage = path.includes('/portal-manage/login')

    if (isPortalManage && !user && !isLoginPage) {
        // Redirect to login if accessing portal and not logged in
        // Extract locale if possible, or default to en
        const localeMatch = path.match(/^\/([a-z]{2})/);
        const locale = localeMatch ? localeMatch[1] : 'en';
        url.pathname = `/${locale}/portal-manage/login`
        return NextResponse.redirect(url)
    }

    return supabaseResponse
}
