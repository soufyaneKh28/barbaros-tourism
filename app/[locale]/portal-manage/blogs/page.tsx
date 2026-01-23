import { getBlogs } from '@/lib/services/blogs'
import BlogsList from '@/components/portal/BlogsList'

export const dynamic = 'force-dynamic';

export default async function BlogsAdminPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    let blogs = []
    try {
        blogs = await getBlogs()
    } catch (e) {
        console.error('Failed to fetch blogs', e)
    }

    return <BlogsList blogs={blogs} locale={locale} />
}
