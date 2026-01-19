import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getMessages } from "@/i18n";
import Image from "next/image";

export default async function MedicalTourism({
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
            <section className="relative bg-gradient-to-br from-blue-600 to-blue-900 text-white py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl font-bold font-cabinet mb-6">Medical Tourism in Türkiye</h1>
                    <p className="text-xl font-satoshi max-w-3xl">
                        World-class medical procedures combined with the beauty of Türkiye. Experience premium healthcare
                        at competitive prices with comprehensive care packages.
                    </p>
                </div>
            </section>

            {/* Why Choose Turkey for Medical Tourism */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold font-cabinet text-center mb-12 text-gray-900">
                        Why Choose Türkiye for Medical Tourism?
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                                title: "JCI Accredited",
                                description: "Top hospitals with international certifications"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: "Affordable Prices",
                                description: "Up to 70% savings compared to Western countries"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                ),
                                title: "Expert Doctors",
                                description: "Highly qualified specialists with international experience"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: "Tourism + Treatment",
                                description: "Combine medical care with a memorable vacation"
                            },
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-700">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold font-cabinet mb-2 text-gray-900">{item.title}</h3>
                                <p className="text-gray-600 font-satoshi">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Medical Services */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold font-cabinet text-center mb-12 text-gray-900">Our Medical Services</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Hair Transplant",
                                image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=400&auto=format&fit=crop",
                                procedures: ["FUE Method", "DHI Technique", "Sapphire FUE", "Beard Transplant"],
                                price: "Starting from €1,500"
                            },
                            {
                                title: "Dental Treatments",
                                image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=400&auto=format&fit=crop",
                                procedures: ["Implants", "Veneers", "Hollywood Smile", "Whitening"],
                                price: "Starting from €300"
                            },
                            {
                                title: "Cosmetic Surgery",
                                image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=400&auto=format&fit=crop",
                                procedures: ["Rhinoplasty", "Liposuction", "Breast Augmentation", "Facelift"],
                                price: "Starting from €2,500"
                            },
                            {
                                title: "Eye Surgery",
                                image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop",
                                procedures: ["LASIK", "Cataract Surgery", "Lens Replacement", "Eye Lift"],
                                price: "Starting from €1,200"
                            },
                            {
                                title: "Bariatric Surgery",
                                image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=400&auto=format&fit=crop",
                                procedures: ["Gastric Sleeve", "Gastric Bypass", "Gastric Balloon", "Mini Gastric"],
                                price: "Starting from €3,500"
                            },
                            {
                                title: "Orthopedics",
                                image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=400&auto=format&fit=crop",
                                procedures: ["Hip Replacement", "Knee Surgery", "Spine Surgery", "Sports Medicine"],
                                price: "Starting from €4,000"
                            },
                        ].map((service, index) => (
                            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                                <div className="relative h-48">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold font-cabinet mb-3 text-gray-900">{service.title}</h3>
                                    <ul className="space-y-2 mb-4">
                                        {service.procedures.map((procedure, idx) => (
                                            <li key={idx} className="flex items-center text-gray-700 font-satoshi text-sm">
                                                <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {procedure}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-blue-700 font-bold font-cabinet">{service.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold font-cabinet text-center mb-12 text-gray-900">
                        Comprehensive Care Packages
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                ),
                                title: "Pre-Consultation",
                                description: "Free online consultation with specialists before arrival"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                ),
                                title: "Accommodation",
                                description: "Hotel stay near the hospital included in package"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                ),
                                title: "Airport Transfer",
                                description: "VIP pickup and drop-off service"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                    </svg>
                                ),
                                title: "Translator",
                                description: "Personal medical translator throughout your stay"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                ),
                                title: "Medical Reports",
                                description: "Detailed reports and documentation in English"
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ),
                                title: "Follow-up Care",
                                description: "Post-procedure support and online consultations"
                            },
                        ].map((item, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
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

            {/* Testimonials */}
            <Testimonials />

            {/* CTA */}
            <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold font-cabinet mb-6">Ready to Transform Your Life?</h2>
                    <p className="text-xl font-satoshi mb-8">
                        Get a free consultation and personalized treatment plan from our medical experts.
                    </p>
                    <a href={`/${locale}/contact-us`} className="inline-block bg-white text-blue-700 px-8 py-4 rounded-lg font-bold font-cabinet hover:bg-gray-100 transition-colors">
                        Request Free Consultation
                    </a>
                </div>
            </section>

            <Footer />
        </>
    );
}
