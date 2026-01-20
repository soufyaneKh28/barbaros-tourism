import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogsGrid from "@/components/BlogsGrid";
import { type Locale, locales, defaultLocale } from "@/i18n";

export default async function BlogsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;

    return (
        <div className="bg-white">
            <Navbar locale={locale} />

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Page Header */}
                <div className="mb-12">
                    <div className="inline-block mb-4">
                        <span className="border border-secondary/20 rounded-full px-6 py-2 text-secondary font-bold font-cabinet text-sm">
                            Our Blog
                        </span>
                    </div>
                    
                    <h1 className="text-[32px] lg:text-[48px] leading-tight font-cabinet font-extrabold text-primary mb-4">
                        Travel Stories & Tips
                    </h1>
                    
                    <p className="max-w-2xl text-gray-600 font-satoshi text-lg leading-relaxed">
                        Explore inspiring travel stories, destination guides, and expert tips to help you plan your perfect journey.
                    </p>
                </div>

                <BlogsGrid locale={locale} />
            </main>

            <Footer />
        </div>
    );
}
