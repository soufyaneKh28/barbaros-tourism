import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getMessages } from "@/i18n";
import Image from "next/image";
import Link from "next/link";
import { getImmigrationServices } from "@/lib/services/immigration";

export default async function ImmigrationPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    // Fetch citizenship services
    let citizenshipServices: any[] = [];
    try {
        const data = await getImmigrationServices(locale, 'citizenship', 6);
        citizenshipServices = (data || []).map((service: any) => ({
            ...service,
            main_image: service.main_image
                ? `${service.main_image}?v=${service.updated_at ? new Date(service.updated_at).getTime() : Date.now()}`
                : "https://images.unsplash.com/photo-1554224311-beee415c201f?q=80&w=800&auto=format&fit=crop"
        }));
    } catch (error) {
        console.error("Error fetching citizenship services:", error);
    }

    // Fetch residence services
    let residenceServices: any[] = [];
    try {
        const data = await getImmigrationServices(locale, 'residence', 6);
        residenceServices = (data || []).map((service: any) => ({
            ...service,
            main_image: service.main_image
                ? `${service.main_image}?v=${service.updated_at ? new Date(service.updated_at).getTime() : Date.now()}`
                : "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop"
        }));
    } catch (error) {
        console.error("Error fetching residence services:", error);
    }

    return (
        <div className="bg-white">
            <Navbar transparent={false} />

            {/* Hero Section */}
            <section className="relative m-2 rounded-[20px] overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-[500px]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/citizenship_hero.png"
                        alt="Immigration Services Hero"
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-primary/40 z-10" />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-6 text-center text-white">
                    <div className="inline-block mb-4">
                        <span className="bg-secondary text-primary font-bold px-6 py-2 rounded-full text-sm">
                            {(t as any).immigration.hero.badge}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-cabinet mb-6">
                        {(t as any).immigration.hero.heading}
                    </h1>
                    <p className="text-lg font-satoshi max-w-2xl mx-auto">
                        {(t as any).immigration.hero.description}
                    </p>
                </div>
            </section>

            {/* Visa Services Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="bg-secondary text-primary font-bold px-6 py-2 rounded-full text-sm inline-block mb-4">
                            {(t as any).immigration.citizenship.badge}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold font-cabinet mb-4">
                            {(t as any).immigration.citizenship.heading}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {(t as any).immigration.citizenship.description}
                        </p>
                    </div>

                    {citizenshipServices.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {citizenshipServices.map((service) => (
                                <div
                                    key={service.id}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={service.main_image}
                                            alt={service.title}
                                            fill
                                            className={`object-cover group-hover:scale-110 transition-transform duration-300 ${service.is_coming_soon ? 'grayscale' : ''}`}
                                        />
                                        {service.is_coming_soon && (
                                            <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg z-10">
                                                Coming Soon
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold font-cabinet mb-2 group-hover:text-primary transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 line-clamp-2">
                                            {service.description}
                                        </p>
                                        {!service.is_coming_soon && service.cta_link && service.cta_text && (
                                            <div className="mt-4">
                                                <Link
                                                    href={service.cta_link}
                                                    target={service.cta_link.startsWith('http') ? "_blank" : "_self"}
                                                    rel={service.cta_link.startsWith('http') ? "noopener noreferrer" : undefined}
                                                    className="inline-block bg-primary text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-primary/90 transition-colors"
                                                >
                                                    {service.cta_text}
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No visa services available at the moment.</p>
                    )}

                    {citizenshipServices.length > 0 && (
                        <div className="text-center mt-8">
                            <Link
                                href={`/${locale}/immigration/citizenship`}
                                className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors"
                            >
                                View All Visa Services
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Immigration Services Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="bg-secondary text-primary font-bold px-6 py-2 rounded-full text-sm inline-block mb-4">
                            {(t as any).immigration.residence.badge}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold font-cabinet mb-4">
                            {(t as any).immigration.residence.heading}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {(t as any).immigration.residence.description}
                        </p>
                    </div>

                    {residenceServices.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {residenceServices.map((service) => (
                                <div
                                    key={service.id}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={service.main_image}
                                            alt={service.title}
                                            fill
                                            className={`object-cover group-hover:scale-110 transition-transform duration-300 ${service.is_coming_soon ? 'grayscale' : ''}`}
                                        />
                                        {service.is_coming_soon && (
                                            <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg z-10">
                                                Coming Soon
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold font-cabinet mb-2 group-hover:text-primary transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 line-clamp-2">
                                            {service.description}
                                        </p>
                                        {!service.is_coming_soon && service.cta_link && service.cta_text && (
                                            <div className="mt-4">
                                                <Link
                                                    href={service.cta_link}
                                                    target={service.cta_link.startsWith('http') ? "_blank" : "_self"}
                                                    rel={service.cta_link.startsWith('http') ? "noopener noreferrer" : undefined}
                                                    className="inline-block bg-primary text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-primary/90 transition-colors"
                                                >
                                                    {service.cta_text}
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No immigration services available at the moment.</p>
                    )}

                    {residenceServices.length > 0 && (
                        <div className="text-center mt-8">
                            <Link
                                href={`/${locale}/immigration/residence`}
                                className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors"
                            >
                                View All Immigration Services
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop"
                        alt="CTA background"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
                    <h2 className="text-4xl md:text-5xl font-bold font-cabinet mb-8">
                        {(t as any).immigration.cta.heading}
                    </h2>
                    <p className="text-xl font-satoshi mb-12 text-white/80">
                        {(t as any).immigration.cta.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={`/${locale}/contact-us`}
                            className="bg-secondary text-primary px-10 py-4 rounded-full font-bold font-cabinet hover:bg-white transition-all duration-300 shadow-xl"
                        >
                            {(t as any).immigration.cta.getConsultation}
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
