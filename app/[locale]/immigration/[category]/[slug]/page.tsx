import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getMessages } from "@/i18n";
import Image from "next/image";
import Link from "next/link";
import { getImmigrationServiceBySlug } from "@/lib/services/immigration";
import { notFound } from "next/navigation";

export default async function ImmigrationServiceDetailPage({
    params,
}: {
    params: Promise<{ locale: string; category: string; slug: string }>;
}) {
    const { locale: localeParam, category, slug } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    // Fetch service details
    let service: any = null;
    try {
        service = await getImmigrationServiceBySlug(slug, locale);
        if (service && service.main_image) {
            service.main_image = `${service.main_image}?v=${service.updated_at ? new Date(service.updated_at).getTime() : Date.now()}`;
        }
    } catch (error) {
        console.error("Error fetching service:", error);
        notFound();
    }

    if (!service) {
        notFound();
    }

    return (
        <div className="bg-white">
            <Navbar transparent={false} />

            {/* Hero Section */}
            <section className="relative m-2 rounded-[20px] overflow-hidden min-h-[400px] md:min-h-[500px]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={service.main_image || "https://images.unsplash.com/photo-1554224311-beee415c201f?q=80&w=2071&auto=format&fit=crop"}
                        alt={service.title}
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40 z-10" />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 text-white">
                    <div className="inline-block mb-4">
                        <span className="bg-secondary text-primary font-bold px-6 py-2 rounded-full text-sm">
                            {service.category?.name || "Immigration Service"}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-cabinet mb-6 max-w-3xl">
                        {service.title}
                    </h1>
                    <p className="text-lg font-satoshi max-w-2xl">
                        {service.description}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Overview */}
                    {service.long_description && (
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold font-cabinet mb-6">
                                {(t as any).immigration.serviceDetail.overview}
                            </h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {service.long_description}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Features */}
                    {service.features && service.features.length > 0 && (
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold font-cabinet mb-6">
                                {(t as any).immigration.serviceDetail.features}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.features.map((feature: string, index: number) => (
                                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                        <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Requirements */}
                    {service.requirements && service.requirements.length > 0 && (
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold font-cabinet mb-6">
                                {(t as any).immigration.serviceDetail.requirements}
                            </h2>
                            <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                                <ul className="space-y-3">
                                    {service.requirements.map((requirement: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-primary flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700">{requirement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Processing Time */}
                    {service.processing_time && (
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold font-cabinet mb-6">
                                {(t as any).immigration.serviceDetail.processingTime}
                            </h2>
                            <div className="bg-secondary/10 border border-secondary/30 p-6 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-lg font-semibold text-gray-800">{service.processing_time}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-white">
                        <h3 className="text-2xl md:text-3xl font-bold font-cabinet mb-4">
                            {(t as any).immigration.serviceDetail.contactUs}
                        </h3>
                        <p className="text-lg mb-8 text-white/90">
                            Our immigration experts are ready to assist you with this service.
                        </p>
                        <Link
                            href={`/${locale}/contact-us`}
                            className="inline-block bg-secondary text-primary px-10 py-4 rounded-full font-bold font-cabinet hover:bg-white transition-all duration-300 shadow-xl"
                        >
                            Contact Us Now
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
