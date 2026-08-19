import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import BlogsGrid from "@/components/blogs/BlogsGrid";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getMessages } from "@/i18n";

import { getBlogs } from "@/lib/services/blogs";
import { getResolvedSiteContent } from "@/lib/services/site-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    return {
        title: (t as any).blogsPage?.metadata?.title,
        description: (t as any).blogsPage?.metadata?.description,
    };
}

export default async function BlogsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const { blogsHero, generic } = await getResolvedSiteContent(locale);
    const fallbackContent = generic.blogs_content;

    let dynamicBlogs: any[] = [];
    try {
        const data = await getBlogs(false, locale);
        dynamicBlogs = (data || []).map((blog: any) => ({
            id: blog.id,
            category: 'TRAVEL', // Placeholder until category join logic refined
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            image: blog.cover_image || 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200',
            author: 'Barbaros Team',
            date: blog.published_at ? new Date(blog.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Draft',
            readTime: '5 min read'
        }));
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }

    const fallbackBlogs = [
        {
            id: 1,
            category: fallbackContent.category,
            title: fallbackContent.title,
            slug: 'istanbul-bosphorus-experience',
            excerpt: fallbackContent.excerpt,
            image: fallbackContent.image,
            author: fallbackContent.author,
            date: fallbackContent.date,
            readTime: fallbackContent.readTime,
        }
    ];

    const displayBlogs = dynamicBlogs.length > 0 ? dynamicBlogs : fallbackBlogs;

    return (
        <div className="bg-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Page Header */}
                <div className="mb-12">
                    <div className="inline-block mb-4">
                        <span className="border border-secondary/20 rounded-full px-6 py-2 text-secondary font-bold font-cabinet text-sm">
                            {blogsHero.badge}
                        </span>
                    </div>

                    <h1 className="text-[32px] lg:text-[48px] leading-tight font-cabinet font-extrabold text-primary mb-4">
                        {blogsHero.heading}
                    </h1>

                    <p className="max-w-2xl text-gray-600 font-satoshi text-lg leading-relaxed">
                        {blogsHero.description}
                    </p>
                </div>

                <BlogsGrid locale={locale} blogs={displayBlogs} />
            </main>

            <Footer />
        </div>
    );
}
