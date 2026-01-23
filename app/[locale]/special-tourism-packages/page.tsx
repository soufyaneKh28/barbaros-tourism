import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import TripGrid from "@/components/tours/TripGrid";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getMessages } from "@/i18n";
import Image from "next/image";
import { getTripsByType } from "@/lib/services/trips";

export default async function SpecialTourismPackages({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    // Fetch special tourism packages
    let trips: any[] = [];
    try {
        const data = await getTripsByType('special-tourism-packages', locale);
        trips = (data || []).map((trip: any) => ({
            id: trip.id,
            title: trip.title,
            description: trip.description,
            image: trip.main_image || trip.images?.[0] || "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd",
            price: trip.price ? `$${trip.price}` : undefined,
            tags: [trip.destination?.name, trip.category?.name].filter(Boolean),
            link: `/${locale}/tours/${trip.slug}`
        }));
    } catch (error) {
        console.error("Error fetching special tourism packages:", error);
    }

    return (
        <div className="bg-white">
            <Navbar transparent={false} />

            {/* Hero Section */}
            <section className="relative m-2 rounded-[20px] overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-[500px]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2071&auto=format&fit=crop"
                        alt="Special Tourism Packages Hero"
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/50 to-slate-900/30 z-10" />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-6 text-center text-white">
                    <div className="inline-block mb-4">
                        <span className="bg-secondary text-primary font-bold px-6 py-2 rounded-full text-sm">
                            {(t as any).tourTypes.specialPackages.badge}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-cabinet mb-6">
                        {(t as any).tourTypes.specialPackages.heading}
                    </h1>
                    <p className="text-lg font-satoshi max-w-2xl mx-auto">
                        {(t as any).tourTypes.specialPackages.description}
                    </p>
                </div>
            </section>

            {/* Trips Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <TripGrid
                        trips={trips}
                        emptyMessage="No special tourism packages available at the moment. Check back soon!"
                    />
                </div>
            </section>

            <Footer />
        </div>
    );
}
