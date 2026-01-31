import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getMessages } from "@/i18n";
import Image from "next/image";
import Link from "next/link";
import { getImmigrationServices } from "@/lib/services/immigration";

export default async function ImmigrationServicesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    // Fetch all residence services
    let services: any[] = [];
    try {
        const data = await getImmigrationServices(locale, 'residence');
        services = (data || []).map((service: any) => ({
            ...service,
            main_image: service.main_image
                ? `${service.main_image}?v=${service.updated_at ? new Date(service.updated_at).getTime() : Date.now()}`
                : "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop"
        }));
    } catch (error) {
        console.error("Error fetching immigration services:", error);
    }

    return (
        <div className="bg-white">
            <Navbar transparent={false} />

            {/* Hero Section */}
            <section className="relative m-2 rounded-[20px] overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-[500px]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/residence_hero.png"
                        alt="Residence Services Hero"
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
                            {(t as any).immigration.residence.badge}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-cabinet mb-6">
                        {(t as any).immigration.residence.heading}
                    </h1>
                    <p className="text-lg font-satoshi max-w-2xl mx-auto">
                        {(t as any).immigration.residence.description}
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {services.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service) => (
                                <Link
                                    key={service.id}
                                    href={`/${locale}/immigration/residence/${service.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <Image
                                            src={service.main_image}
                                            alt={service.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold font-cabinet mb-3 group-hover:text-primary transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {service.description}
                                        </p>
                                        <div className="flex items-center text-primary font-semibold">
                                            <span>Learn More</span>
                                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No immigration services available at the moment. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
