import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getMessages } from "@/i18n";
import Image from "next/image";
import Link from "next/link";
import { getImmigrationServices } from "@/lib/services/immigration";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    return {
        title: (t as any).immigration?.citizenship?.metadata?.title,
        description: (t as any).immigration?.citizenship?.metadata?.description,
    };
}

export default async function VisaServicesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    // Fetch all citizenship services
    let services: any[] = [];
    try {
        const data = await getImmigrationServices(locale, 'citizenship');
        services = (data || []).map((service: any) => ({
            ...service,
            main_image: service.main_image
                ? `${service.main_image}?v=${service.updated_at ? new Date(service.updated_at).getTime() : Date.now()}`
                : "https://images.unsplash.com/photo-1554224311-beee415c201f?q=80&w=800&auto=format&fit=crop"
        }));
    } catch (error) {
        console.error("Error fetching visa services:", error);
    }

    return (
        <div className="bg-white">
            <Navbar transparent={false} />

            {/* Hero Section */}
            <section className="relative m-2 rounded-[20px] overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-[500px]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/citizenship_hero.png"
                        alt="Citizenship Services Hero"
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
                            {(t as any).immigration.citizenship.badge}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-cabinet mb-6">
                        {(t as any).immigration.citizenship.heading}
                    </h1>
                    <p className="text-lg font-satoshi max-w-2xl mx-auto">
                        {(t as any).immigration.citizenship.description}
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {services.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className="relative h-56 overflow-hidden">
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
                                        <h3 className="text-xl font-bold font-cabinet mb-3 group-hover:text-primary transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 line-clamp-3">
                                            {service.description}
                                        </p>
                                        {service.cta_link && service.cta_text && (
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
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No visa services available at the moment. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
