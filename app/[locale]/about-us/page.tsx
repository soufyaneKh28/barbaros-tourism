import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getMessages } from "@/i18n";
import Image from "next/image";

export default async function AboutUs({
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
            <section className="relative bg-gradient-to-br from-primary-700 to-primary-900 text-white py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl font-bold font-cabinet mb-6">About Barbaros Tourism</h1>
                    <p className="text-xl font-satoshi max-w-3xl">
                        Your trusted partner for unforgettable experiences in Türkiye. We specialize in creating memorable journeys and providing world-class medical tourism services.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold font-cabinet mb-4 text-gray-900">Our Mission</h2>
                        <p className="text-gray-600 font-satoshi leading-relaxed">
                            To provide exceptional tourism experiences and medical services that exceed expectations,
                            combining Turkish hospitality with professional excellence. We strive to make every journey
                            memorable and every medical procedure seamless and comfortable.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-secondary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold font-cabinet mb-4 text-gray-900">Our Vision</h2>
                        <p className="text-gray-600 font-satoshi leading-relaxed">
                            To become the leading tourism and medical tourism provider in Türkiye, recognized globally
                            for our commitment to quality, innovation, and customer satisfaction. We envision a future
                            where every traveler experiences the best of Turkish culture and healthcare.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold font-cabinet text-center mb-12 text-gray-900">Why Choose Barbaros Tourism?</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: "Trusted Experience",
                                description: "Years of expertise in tourism and medical services with thousands of satisfied clients."
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: "24/7 Support",
                                description: "Round-the-clock assistance to ensure your journey is smooth and worry-free."
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: "Best Value",
                                description: "Competitive pricing without compromising on quality or service excellence."
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                ),
                                title: "Personalized Service",
                                description: "Tailored experiences designed to match your preferences and requirements."
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                ),
                                title: "Expert Team",
                                description: "Professional guides and medical coordinators dedicated to your satisfaction."
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: "Global Network",
                                description: "Partnerships with top hotels, hospitals, and service providers across Türkiye."
                            },
                        ].map((item, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4 text-primary-700">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold font-cabinet mb-3 text-gray-900">{item.title}</h3>
                                <p className="text-gray-600 font-satoshi">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold font-cabinet mb-6 text-gray-900">Our Story</h2>
                            <p className="text-gray-600 font-satoshi leading-relaxed mb-4">
                                Founded with a passion for showcasing the beauty and culture of Türkiye, Barbaros Tourism
                                has grown from a small local agency to a comprehensive tourism and medical tourism provider.
                            </p>
                            <p className="text-gray-600 font-satoshi leading-relaxed mb-4">
                                Our journey began with a simple mission: to share the wonders of Türkiye with the world
                                while providing exceptional service. Over the years, we've expanded our services to include
                                medical tourism, recognizing the growing demand for quality healthcare combined with travel.
                            </p>
                            <p className="text-gray-600 font-satoshi leading-relaxed">
                                Today, we're proud to serve thousands of clients annually, helping them discover Türkiye's
                                rich history, stunning landscapes, and world-class medical facilities. Our commitment to
                                excellence remains unwavering as we continue to grow and evolve.
                            </p>
                        </div>
                        <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop"
                                alt="Istanbul skyline"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
