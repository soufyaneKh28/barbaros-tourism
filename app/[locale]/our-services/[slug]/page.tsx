import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getServiceBySlug } from "@/lib/services/services";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ServiceDetails({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale: localeParam, slug } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;

    // Fetch service by slug
    const service = await getServiceBySlug(slug, locale);

    if (!service) {
        notFound();
    }

    return (
        <div className="bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
                {service.cover_image ? (
                    <Image
                        src={service.cover_image}
                        alt={service.service_name}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-600 to-secondary" />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-12 flex items-end pb-16">
                    <div className="max-w-3xl">
                        <div className="inline-block mb-4">
                            <span className="bg-secondary/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold font-cabinet">
                                Service
                            </span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-4 font-cabinet">
                            {service.service_name}
                        </h1>
                        {service.service_details && (
                            <p className="text-lg text-white/90 font-satoshi line-clamp-2">
                                {service.service_details}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white pointer-events-none" />

                <div className="relative max-w-6xl mx-auto px-6 lg:px-12 py-20">

                    {/* Service Details */}
                    {service.service_details && (
                        <div className="mb-20">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full" />
                                <h2 className="text-4xl font-bold text-primary font-cabinet">
                                    Service Overview
                                </h2>
                            </div>
                            <div className="prose prose-xl max-w-none font-satoshi text-gray-700 leading-relaxed">
                                <p className="whitespace-pre-wrap text-lg">{service.service_details}</p>
                            </div>
                        </div>
                    )}

                    {/* Divider */}
                    <div className="relative mb-20">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center">
                            <div className="bg-white px-6">
                                <div className="w-3 h-3 bg-gradient-to-br from-primary to-secondary rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* Target Client Category */}
                    {service.target_client_category && (
                        <div className="mb-20">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center">
                                        <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4 font-cabinet">
                                        Who Is This For?
                                    </h2>
                                    <div className="prose prose-lg max-w-none font-satoshi text-gray-600 leading-relaxed">
                                        <p className="whitespace-pre-wrap text-lg">{service.target_client_category}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Divider */}
                    <div className="relative mb-20">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center">
                            <div className="bg-white px-6">
                                <div className="w-3 h-3 bg-gradient-to-br from-primary to-secondary rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* Procedural Requirements */}
                    {service.procedural_requirements && (
                        <div className="mb-20">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                                        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4 font-cabinet">
                                        Requirements & Process
                                    </h2>
                                    <div className="prose prose-lg max-w-none font-satoshi text-gray-600 leading-relaxed">
                                        <p className="whitespace-pre-wrap text-lg">{service.procedural_requirements}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Additional Notes */}
                    {service.additional_notes && (
                        <>
                            {/* Divider */}
                            <div className="relative mb-20">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center">
                                    <div className="bg-white px-6">
                                        <div className="w-3 h-3 bg-gradient-to-br from-primary to-secondary rounded-full" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-20">
                                <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 lg:p-12 border border-blue-100/50 overflow-hidden">
                                    {/* Decorative elements */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" />
                                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-200/20 to-blue-200/20 rounded-full blur-3xl" />

                                    <div className="relative flex items-start gap-6">
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 bg-blue-500/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-blue-200/50">
                                                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-3xl font-bold text-blue-900 mb-4 font-cabinet">
                                                Important Information
                                            </h2>
                                            <div className="prose prose-lg max-w-none font-satoshi text-blue-900/80 leading-relaxed">
                                                <p className="whitespace-pre-wrap text-lg">{service.additional_notes}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* CTA Section */}
                    <div className="relative bg-gradient-to-br from-primary via-primary-600 to-secondary rounded-3xl p-12 lg:p-16 text-center text-white overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />

                        <div className="relative">
                            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-cabinet">
                                Ready to Get Started?
                            </h2>
                            <p className="text-xl text-white/90 mb-10 font-satoshi max-w-2xl mx-auto leading-relaxed">
                                Contact us today to learn more about {service.service_name} and how we can help you achieve your goals.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={`/${locale}/contact-us`}
                                    className="inline-block bg-white text-primary px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 font-cabinet shadow-xl"
                                >
                                    Contact Us
                                </Link>
                                <Link
                                    href={`/${locale}/our-services`}
                                    className="inline-block bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300 hover:scale-105 font-cabinet backdrop-blur-sm"
                                >
                                    View All Services
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
}
