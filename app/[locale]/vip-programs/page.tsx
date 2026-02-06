import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import TripGrid from "@/components/tours/TripGrid";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getMessages } from "@/i18n";
import Image from "next/image";
import { getTripsByType } from "@/lib/services/trips";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    return {
        title: (t as any).tourTypes?.vipPrograms?.metadata?.title,
        description: (t as any).tourTypes?.vipPrograms?.metadata?.description,
    };
}

export default async function VIPPrograms({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    // Fetch VIP programs
    let trips: any[] = [];
    try {
        const data = await getTripsByType('vip-programs', locale);
        trips = (data || []).map((trip: any) => ({
            id: trip.id,
            title: trip.title,
            description: trip.description,
            image: trip.main_image || trip.images?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945",
            price: trip.price ? `$${trip.price}` : undefined,
            tags: [trip.destination?.name, trip.category?.name].filter(Boolean),
            link: `/${locale}/tours/${trip.slug}`
        }));
    } catch (error) {
        console.error("Error fetching VIP programs:", error);
    }

    return (
        <div className="bg-white">
            <Navbar transparent={false} />

            {/* Hero Section */}
            <section className="relative m-2 rounded-[20px] overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-[500px]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
                        alt="VIP Programs Hero"
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
                            {(t as any).tourTypes.vipPrograms.badge}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-cabinet mb-6">
                        {(t as any).tourTypes.vipPrograms.heading}
                    </h1>
                    <p className="text-lg font-satoshi max-w-2xl mx-auto">
                        {(t as any).tourTypes.vipPrograms.description}
                    </p>
                </div>
            </section>

            {/* Trips Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <TripGrid
                        trips={trips}
                        emptyMessage="No VIP programs available at the moment. Check back soon!"
                    />
                </div>
            </section>

            <Footer />
        </div>
    );
}
