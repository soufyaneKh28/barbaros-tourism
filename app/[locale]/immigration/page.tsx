import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getMessages } from "@/i18n";
import Image from "next/image";
import Link from "next/link";
import { getImmigrationServices } from "@/lib/services/immigration";
import { getResolvedSiteContent } from "@/lib/services/site-content";

// Disable caching to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    return {
        title: (t as any).immigration?.metadata?.title,
        description: (t as any).immigration?.metadata?.description,
    };
}

export default async function ImmigrationPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const { immigrationHero, generic } = await getResolvedSiteContent(locale);
    const citizenship = generic.immigration_citizenship_header;
    const residence = generic.immigration_residence_header;
    const cta = generic.immigration_cta;

    // Fetch citizenship services
    let citizenshipServices: any[] = [];
    try {
        const data = await getImmigrationServices(locale, 'citizenship', 6);
        citizenshipServices = (data || []).map((service: any) => ({
            ...service,
            main_image: service.main_image
                ? `${service.main_image}?v=${service.updated_at ? new Date(service.updated_at).getTime() : Date.now()}`
                : citizenship.fallbackImage
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
                : residence.fallbackImage
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
                        src={immigrationHero.image}
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
                            {immigrationHero.badge}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-cabinet mb-6">
                        {immigrationHero.heading}
                    </h1>
                    <p className="text-lg font-satoshi max-w-2xl mx-auto">
                        {immigrationHero.description}
                    </p>
                </div>
            </section>

            {/* Visa Services Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="bg-secondary text-primary font-bold px-6 py-2 rounded-full text-sm inline-block mb-4">
                            {citizenship.badge}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold font-cabinet mb-4">
                            {citizenship.heading}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {citizenship.description}
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
                                        <p className="text-gray-600">
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
                        <p className="text-center text-gray-500">{citizenship.emptyStateMessage}</p>
                    )}

                    {citizenshipServices.length > 0 && (
                        <div className="text-center mt-8">
                            <Link
                                href={`/${locale}/immigration/citizenship`}
                                className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors"
                            >
                                {citizenship.viewAllLabel}
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
                            {residence.badge}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold font-cabinet mb-4">
                            {residence.heading}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {residence.description}
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
                                        <p className="text-gray-600">
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
                        <p className="text-center text-gray-500">{residence.emptyStateMessage}</p>
                    )}

                    {residenceServices.length > 0 && (
                        <div className="text-center mt-8">
                            <Link
                                href={`/${locale}/immigration/residence`}
                                className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors"
                            >
                                {residence.viewAllLabel}
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={cta.backgroundImage}
                        alt="CTA background"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
                    <h2 className="text-4xl md:text-5xl font-bold font-cabinet mb-8">
                        {cta.heading}
                    </h2>
                    <p className="text-xl font-satoshi mb-12 text-white/80">
                        {cta.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={`/${locale}/contact-us`}
                            className="bg-secondary text-primary px-10 py-4 rounded-full font-bold font-cabinet hover:bg-white transition-all duration-300 shadow-xl"
                        >
                            {cta.buttonLabel}
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
