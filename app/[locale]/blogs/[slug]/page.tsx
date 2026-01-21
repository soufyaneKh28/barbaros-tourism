import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { BlogHeader, BlogContent, RelatedBlogs } from "@/components/blog-detail";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getBlogBySlug, getBlogs } from "@/lib/services/blogs";
import { notFound } from "next/navigation";

// Generate static params for all blog posts
export async function generateStaticParams() {
    try {
        const blogs = await getBlogs();

        if (!blogs || blogs.length === 0) {
            // Return empty array if no blogs found (e.g., during build without DB access)
            return [];
        }

        // Generate params for all locale/slug combinations
        const params = [];
        for (const locale of locales) {
            for (const blog of blogs) {
                params.push({
                    locale,
                    slug: blog.slug,
                });
            }
        }
        return params;
    } catch (error) {
        console.error('Error generating static params:', error);
        // Return empty array on error to allow build to continue
        return [];
    }
}

// Enable dynamic rendering for paths not generated at build time
export const dynamicParams = true;


export default async function BlogDetails({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale: localeParam, slug } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;

    let blog;
    try {
        blog = await getBlogBySlug(slug);
    } catch (error) {
        console.error("Error fetching blog:", error);
    }

    if (!blog) {
        // Fallback or 404
        if (slug === 'istanbul-bosphorus-experience') {
            // Allow the mock for the specific seeded-like slug if db is empty
            blog = {
                id: 1,
                title: 'Istanbul Bosphorus Experience',
                slug: 'istanbul-bosphorus-experience',
                content: '<p>Discover the enchanting beauty of Istanbul and the Bosphorus strait...</p>',
                excerpt: 'Discover the enchanting beauty of Istanbul and the Bosphorus strait.',
                cover_image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop',
                published_at: '2026-01-15',
                author_name: 'Sarah Johnson'
            };
        } else {
            return notFound();
        }
    }

    const blogData = {
        id: blog.id,
        slug: blog.slug,
        category: 'TRAVEL', // Static mapping for now
        title: blog.title,
        excerpt: blog.excerpt,
        image: blog.cover_image || 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200',
        author: {
            name: blog.author_name || 'Barbaros Team',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
            role: 'Author'
        },
        date: blog.published_at ? new Date(blog.published_at).toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' }) : 'Draft',
        readTime: '8 min read',
        content: blog.content,
        tags: ['Travel', 'Turkey', 'Explore'],
    };

    return (
        <div className="bg-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Back Navigation */}
                <a
                    href={`/${locale}/blogs`}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-8 font-cabinet font-medium"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Blogs
                </a>

                <BlogHeader
                    title={blogData.title}
                    category={blogData.category}
                    author={blogData.author}
                    date={blogData.date}
                    readTime={blogData.readTime}
                    image={blogData.image}
                />

                <div className="grid lg:grid-cols-12 gap-12 mt-12">
                    <div className="lg:col-span-8">
                        <BlogContent
                            content={blogData.content}
                            tags={blogData.tags}
                        />
                    </div>

                    <div className="lg:col-span-4">
                        {/* Sidebar */}
                    </div>
                </div>

                <RelatedBlogs currentBlogId={blogData.id as any} />
            </main>

            <Footer />
        </div>
    );
}
