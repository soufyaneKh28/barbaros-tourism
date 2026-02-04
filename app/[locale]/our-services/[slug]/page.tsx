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



                    {/* CTA Section */}
                    <div className="relative bg-gradient-to-br from-primary via-primary-600 to-secondary rounded-3xl p-12 lg:p-16 text-center text-white overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />

                        <div className="relative">
                            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-cabinet">
                                Interested in {service.service_name}?
                            </h2>
                            <p className="text-xl text-white/90 mb-10 font-satoshi max-w-2xl mx-auto leading-relaxed">
                                Contact us on WhatsApp to learn more and get personalized assistance for your needs.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {service.cta_link ? (
                                    <Link
                                        href={service.cta_link}
                                        target={service.cta_link.startsWith('http') ? "_blank" : undefined}
                                        className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-10 py-4 rounded-full font-bold hover:bg-[#20BA5A] transition-all duration-300 hover:scale-105 font-cabinet shadow-xl"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        {service.cta_text || "Contact Us"}
                                    </Link>
                                ) : (
                                    <a
                                        href={`https://wa.me/905338885972?text=${encodeURIComponent(`Hi, I'm interested in learning more about ${service.service_name}`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-10 py-4 rounded-full font-bold hover:bg-[#20BA5A] transition-all duration-300 hover:scale-105 font-cabinet shadow-xl"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        Chat on WhatsApp
                                    </a>
                                )}
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
