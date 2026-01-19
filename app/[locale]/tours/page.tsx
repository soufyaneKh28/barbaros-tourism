import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Destinations from "@/components/Destinations";
import HotDeals from "@/components/HotDeals";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getMessages } from "@/i18n";
import Image from "next/image";

export default async function Tours({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    return (
        <>
            <Navbar locale={locale} />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl font-bold font-cabinet mb-6">Explore Türkiye</h1>
                    <p className="text-xl font-satoshi max-w-3xl">
                        Discover the magic of Türkiye with our carefully curated tours. From ancient ruins to
                        modern marvels, experience the best this beautiful country has to offer.
                    </p>
                </div>
            </section>

            {/* Hot Deals */}
            <HotDeals />

            {/* Destinations */}
            <Destinations />

            {/* Tour Categories */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold font-cabinet text-center mb-12 text-gray-900">Tour Categories</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Historical Tours",
                                image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=400&auto=format&fit=crop",
                                description: "Explore ancient civilizations and Ottoman heritage"
                            },
                            {
                                title: "Nature & Adventure",
                                image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=400&auto=format&fit=crop",
                                description: "Hot air balloons, hiking, and natural wonders"
                            },
                            {
                                title: "Coastal Getaways",
                                image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=400&auto=format&fit=crop",
                                description: "Beautiful beaches and Mediterranean charm"
                            },
                            {
                                title: "City Experiences",
                                image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=400&auto=format&fit=crop",
                                description: "Urban culture, shopping, and nightlife"
                            },
                        ].map((category, index) => (
                            <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer">
                                <div className="relative h-64">
                                    <Image
                                        src={category.image}
                                        alt={category.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="text-2xl font-bold font-cabinet mb-2">{category.title}</h3>
                                    <p className="text-sm font-satoshi text-white/90">{category.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold font-cabinet text-center mb-12 text-gray-900">What's Included in Our Tours</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                ),
                                title: "Expert Guides",
                                description: "Professional, knowledgeable guides fluent in multiple languages"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                ),
                                title: "Accommodation",
                                description: "Comfortable hotels and resorts carefully selected for quality"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                ),
                                title: "Transportation",
                                description: "All transfers and travel between destinations included"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: "Flexible Schedule",
                                description: "Customizable itineraries to match your preferences"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                ),
                                title: "Entry Tickets",
                                description: "Skip the lines with pre-arranged entrance fees"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ),
                                title: "24/7 Support",
                                description: "Round-the-clock assistance throughout your journey"
                            },
                        ].map((item, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex-shrink-0 w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center text-primary-700">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-cabinet mb-2 text-gray-900">{item.title}</h3>
                                    <p className="text-gray-600 font-satoshi">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold font-cabinet mb-6">Start Planning Your Adventure</h2>
                    <p className="text-xl font-satoshi mb-8">
                        Let us help you create unforgettable memories in Türkiye. Contact our team today!
                    </p>
                    <a href={`/${locale}/contact-us`} className="inline-block bg-white text-primary-700 px-8 py-4 rounded-lg font-bold font-cabinet hover:bg-gray-100 transition-colors">
                        Get in Touch
                    </a>
                </div>
            </section>

            <Footer />
        </>
    );
}
