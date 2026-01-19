import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import ServicesGrid from "@/components/ServicesGrid";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getMessages } from "@/i18n";
import Image from "next/image";

export default async function OurServices({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    return (
        <>
            {/* Hero Section */}
            <section className="relative m-2 rounded-[20px] overflow-hidden flex flex-col min-h-[500px] md:min-h-[600px]">
                {/* Navbar integrated into Hero */}
                <Navbar locale={locale} transparent={true} />

                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
                        alt="Our Services"
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                    />
                    {/* Dark overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/50 to-slate-900/70 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10" />
                </div>

                {/* Content */}
                <div className="relative z-20 flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-6 py-20 text-center">
                    {/* Badge */}
                    <div className="inline-block mb-6">
                        <span className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 text-white font-bold font-cabinet text-sm">
                            COMPREHENSIVE SOLUTIONS
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-cabinet text-white mb-6 leading-tight">
                        Exceptional Services for Your Journey
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-white/90 font-satoshi leading-relaxed mb-8 max-w-2xl mx-auto">
                        From cultural tours to world-class medical procedures, we provide end-to-end services to make your experience in Türkiye unforgettable.
                    </p>

                    {/* CTA Button */}
                    <div className="flex justify-center">
                        <a
                            href={`/${locale}/contact-us`}
                            className="bg-primary hover:bg-primary-700 text-white px-8 py-4 rounded-full font-bold font-cabinet transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </section>

            {/* Modern Services Grid */}
            <ServicesGrid />

            {/* Services Component */}
            <Services />

            {/* Additional Services Details */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold font-cabinet text-center mb-12 text-gray-900">What We Offer</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Cultural Tours",
                                description: "Explore Türkiye's rich history and heritage with expert guides.",
                                features: ["Historical sites", "Museum visits", "Local experiences", "Cultural workshops"]
                            },
                            {
                                title: "Adventure Tours",
                                description: "Thrilling experiences for adventure seekers and nature lovers.",
                                features: ["Hot air balloon rides", "Paragliding", "Hiking trails", "Water sports"]
                            },
                            {
                                title: "Medical Tourism",
                                description: "World-class medical procedures with comprehensive care packages.",
                                features: ["Hair transplant", "Dental treatments", "Cosmetic surgery", "Health checkups"]
                            },
                            {
                                title: "Accommodation",
                                description: "Carefully selected hotels and resorts for your comfort.",
                                features: ["5-star hotels", "Boutique stays", "Budget options", "Special packages"]
                            },
                            {
                                title: "Transportation",
                                description: "Seamless travel arrangements throughout your journey.",
                                features: ["Airport transfers", "Private vehicles", "Group transport", "VIP services"]
                            },
                            {
                                title: "Custom Packages",
                                description: "Personalized itineraries designed just for you.",
                                features: ["Flexible schedules", "Special requests", "Group bookings", "Corporate events"]
                            },
                        ].map((service, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                                <h3 className="text-2xl font-bold font-cabinet mb-3 text-gray-900">{service.title}</h3>
                                <p className="text-gray-600 font-satoshi mb-4">{service.description}</p>
                                <ul className="space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-700 font-satoshi">
                                            <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-primary-700 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold font-cabinet mb-6">Ready to Start Your Journey?</h2>
                    <p className="text-xl font-satoshi mb-8">
                        Contact us today to discuss your travel plans and let us create the perfect package for you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={`/${locale}/contact-us`} className="bg-white text-primary-700 px-8 py-4 rounded-lg font-bold font-cabinet hover:bg-gray-100 transition-colors">
                            Contact Us
                        </a>
                        <a href={`/${locale}/tours`} className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold font-cabinet hover:bg-white/10 transition-colors">
                            View Tours
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
