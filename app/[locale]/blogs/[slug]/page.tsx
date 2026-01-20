import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogHeader, BlogContent, RelatedBlogs } from "@/components/blog-detail";
import { type Locale, locales, defaultLocale } from "@/i18n";

export default async function BlogDetails({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale: localeParam, slug } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;

    // TODO: Fetch blog data based on slug. Using mock data for now.
    const blogData = {
        id: slug === 'istanbul-bosphorus-experience' ? 1 : slug === 'kyoto-cultural-escape' ? 2 : 3,
        slug: slug,
        category: 'TRAVEL',
        title: slug === 'istanbul-bosphorus-experience' 
            ? 'Istanbul Bosphorus Experience: A Journey Through Time'
            : slug === 'kyoto-cultural-escape'
            ? 'Kyoto Cultural Escape: Discover Ancient Japan'
            : 'Alpine Lake Adventures: Nature at Its Best',
        excerpt: 'Discover the magic of this incredible destination and immerse yourself in unique experiences.',
        image: slug === 'istanbul-bosphorus-experience'
            ? 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop'
            : slug === 'kyoto-cultural-escape'
            ? 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop'
            : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
        author: {
            name: 'Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
            role: 'Travel Writer'
        },
        date: 'January 15, 2026',
        readTime: '8 min read',
        content: `
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            
            <h2>Discovering Hidden Gems</h2>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            
            <h2>Best Time to Visit</h2>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
            
            <ul>
                <li>Spring season offers mild weather and fewer crowds</li>
                <li>Summer brings vibrant festivals and outdoor activities</li>
                <li>Autumn provides stunning foliage and comfortable temperatures</li>
                <li>Winter showcases a different charm with special seasonal events</li>
            </ul>
            
            <h2>Local Cuisine Experience</h2>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
            
            <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.</p>
            
            <h2>Travel Tips</h2>
            <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.</p>
            
            <blockquote>
                "Travel is the only thing you buy that makes you richer. Every journey teaches us something new about the world and ourselves."
            </blockquote>
            
            <p>Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        `,
        tags: ['Travel', 'Culture', 'Adventure', 'Tourism'],
    };

    return (
        <div className="bg-white">
            <Navbar locale={locale} />

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
                        {/* Sidebar content could go here */}
                    </div>
                </div>

                <RelatedBlogs currentBlogId={blogData.id} />
            </main>

            <Footer />
        </div>
    );
}
