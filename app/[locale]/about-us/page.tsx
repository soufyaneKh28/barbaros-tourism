import Navbar from "@/components/common/Navbar";

import Footer from "@/components/common/Footer";
import Team from "@/components/about/Team";
import { type Locale, locales, defaultLocale, getMessages } from "@/i18n";
import Image from "next/image";
import AboutHero from "@/components/about/AboutHero";
import FAQ from "@/components/common/FAQ";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    return {
        title: (t as any).about?.metadata?.title,
        description: (t as any).about?.metadata?.description,
    };
}

export default async function AboutUs({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    return (
        <div className="bg-white">
            <Navbar />

            {/* Hero Section */}
            <AboutHero locale={locale} />

            {/* Our Story Section */}
            <section className="py-16 md:py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Content */}
                        <div className="order-2 lg:order-1">
                            <span className="text-primary font-bold font-cabinet text-sm uppercase tracking-wide mb-4 block">
                                {t.about.story.badge}
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-cabinet mb-6 text-gray-900 leading-tight">
                                {t.about.story.heading}
                            </h2>
                            <p className="text-gray-600 font-satoshi leading-relaxed mb-4">
                                {t.about.story.p1}
                            </p>
                            <p className="text-gray-600 font-satoshi leading-relaxed mb-4">
                                {t.about.story.p2}
                            </p>
                            <p className="text-gray-600 font-satoshi leading-relaxed mb-8">
                                {t.about.story.p3}
                            </p>
                            <button className="border-2 border-primary text-primary px-8 py-3 rounded-full font-bold font-cabinet hover:bg-primary hover:text-white transition-colors">
                                {t.about.story.readMore}
                            </button>
                        </div>

                        {/* Right Images */}
                        <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
                            <div className="relative h-[280px] md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop"
                                    alt="Team collaboration"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative h-[280px] md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
                                    alt="Office workspace"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-cabinet text-primary mb-4">
                            {t.about.stats.heading}
                        </h2>
                        <p className="text-gray-500 font-satoshi max-w-2xl mx-auto">
                            {t.about.stats.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { value: "10,000+", label: t.about.stats.items.customers },
                            { value: "5,000+", label: t.about.stats.items.tours },
                            { value: "30+", label: t.about.stats.items.countries },
                            { value: "200+", label: t.about.stats.items.partners },
                        ].map((stat, index) => (
                            <div key={index} className="bg-white border border-secondary/30 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                                <div className="text-4xl font-bold font-cabinet text-secondary mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 font-satoshi font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            {/* <Team /> */}

            {/* Mission & Vision */}
            {/* <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold font-cabinet mb-4 text-gray-900">{t.about.mission.title}</h2>
                        <p className="text-gray-600 font-satoshi leading-relaxed">
                            {t.about.mission.description}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold font-cabinet mb-4 text-gray-900">{t.about.vision.title}</h2>
                        <p className="text-gray-600 font-satoshi leading-relaxed">
                            {t.about.vision.description}
                        </p>
                    </div>
                </div>
            </section> */}

            {/* Why Choose Us */}
            <section className="py-20 px-6 ">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold font-cabinet text-center mb-12 text-gray-900">{t.about.whyChoose.heading}</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: t.about.whyChoose.items.trusted.title,
                                description: t.about.whyChoose.items.trusted.description
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: t.about.whyChoose.items.support.title,
                                description: t.about.whyChoose.items.support.description
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: t.about.whyChoose.items.value.title,
                                description: t.about.whyChoose.items.value.description
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                ),
                                title: t.about.whyChoose.items.personalized.title,
                                description: t.about.whyChoose.items.personalized.description
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                ),
                                title: t.about.whyChoose.items.team.title,
                                description: t.about.whyChoose.items.team.description
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: t.about.whyChoose.items.network.title,
                                description: t.about.whyChoose.items.network.description
                            },
                        ].map((item, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold font-cabinet mb-3 text-gray-900">{item.title}</h3>
                                <p className="text-gray-600 font-satoshi">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FAQ locale={locale} />

            <Footer />
        </div>
    );
}
