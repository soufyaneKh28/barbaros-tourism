import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getDestinationBySlug } from "@/lib/services/destinations";
import { getTripsByDestination } from "@/lib/services/trips";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function DestinationDetails({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale: localeParam, slug } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;

    // Fetch destination and related trips from backend
    const destination = await getDestinationBySlug(slug, locale);

    if (!destination) {
        notFound();
    }

    const trips = await getTripsByDestination(slug, locale);

    return (
        <div className="bg-white">
            <Navbar />

            {/* Hero Section with Destination Image */}
            <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
                {destination.image_url ? (
                    <Image
                        src={destination.image_url}
                        alt={destination.name}
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
                                Destination
                            </span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-4 font-cabinet">
                            {destination.name}
                        </h1>
                        {destination.description && (
                            <p className="text-lg text-white/90 font-satoshi line-clamp-3">
                                {destination.description}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Description Section */}
            {destination.description && (
                <section className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="max-w-4xl">
                            <h2 className="text-3xl font-bold text-primary mb-6 font-cabinet">About {destination.name}</h2>
                            <p className="text-lg text-gray-700 font-satoshi leading-relaxed whitespace-pre-wrap">
                                {destination.description}
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* Trips Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full" />
                        <h2 className="text-4xl font-bold text-primary font-cabinet">
                            Available Tours in {destination.name}
                        </h2>
                    </div>

                    {trips.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {trips.map((trip) => (
                                <Link
                                    key={trip.id}
                                    href={`/${locale}/tours/${trip.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        {trip.main_image ? (
                                            <Image
                                                src={trip.main_image}
                                                alt={trip.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                                        )}

                                        {/* Hot Deal Badge */}
                                        {trip.is_hot_deal && (
                                            <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold">
                                                Hot Deal
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 font-cabinet group-hover:text-primary transition-colors">
                                            {trip.title}
                                        </h3>

                                        {trip.description && (
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-satoshi">
                                                {trip.description}
                                            </p>
                                        )}

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            {trip.price && trip.price > 0 ? (
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-2xl font-bold text-primary font-cabinet">${trip.price}</span>
                                                    <span className="text-sm text-gray-500 font-satoshi">per person</span>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-500 font-satoshi">Contact for pricing</span>
                                            )}

                                            {trip.duration_days && (
                                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>{trip.duration_days} days</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="inline-block p-8 bg-gray-100 rounded-full mb-4">
                                <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-cabinet">No Tours Available</h3>
                            <p className="text-gray-600 font-satoshi mb-8">
                                There are currently no tours available for this destination.
                            </p>
                            <Link
                                href={`/${locale}/tours`}
                                className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-600 transition-colors font-cabinet"
                            >
                                Browse All Tours
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
