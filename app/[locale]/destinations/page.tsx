import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import DestinationsGrid from "@/components/destinations/DestinationsGrid";
import { type Locale, locales, defaultLocale } from "@/i18n";

export default async function DestinationsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;

    return (
        <div className="bg-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Page Header */}
                <div className="mb-12 text-center">
                    <div className="inline-block mb-4">
                        <span className="border border-secondary/20 rounded-full px-6 py-2 text-secondary font-bold font-cabinet text-sm">
                            Top Destinations
                        </span>
                    </div>

                    <h1 className="text-[32px] lg:text-[48px] leading-tight font-cabinet font-extrabold text-primary mb-4">
                        Explore Our Destinations
                    </h1>

                    <p className="max-w-2xl mx-auto text-gray-600 font-satoshi text-lg leading-relaxed">
                        Discover the most loved destinations chosen by our travelers. From iconic cities to breathtaking landscapes, these destinations offer unforgettable experiences.
                    </p>
                </div>

                <DestinationsGrid locale={locale} />
            </main>

            <Footer />
        </div>
    );
}
