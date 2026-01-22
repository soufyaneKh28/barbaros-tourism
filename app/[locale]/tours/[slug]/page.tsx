import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import TourHeader from "@/components/tour-detail/TourHeader";
import TourGallery from "@/components/tour-detail/TourGallery";
import TourContent from "@/components/tour-detail/TourContent";
import BookingCard from "@/components/tour-detail/BookingCard";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getTripBySlug } from "@/lib/services/trips";
import { notFound } from "next/navigation";

export default async function TourDetails({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale: localeParam, slug } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;

    const trip = await getTripBySlug(slug, locale);

    if (!trip) {
        notFound();
    }

    // Combine main_image with other images for gallery
    const galleryImages = [];
    if (trip.main_image) galleryImages.push(trip.main_image);
    if (trip.images && Array.isArray(trip.images)) galleryImages.push(...trip.images);

    // Fallback images if none provided
    if (galleryImages.length === 0) {
        galleryImages.push("https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2000&auto=format&fit=crop");
    }

    return (
        <div className="bg-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <TourHeader
                    title={trip.title}
                    location={trip.location || 'Unknown Location'}
                    rating={4.8} // Placeholder rating
                    reviews={124} // Placeholder reviews
                />

                <TourGallery images={galleryImages} />

                <div className="grid lg:grid-cols-12 gap-12 relative">
                    {/* Left Content (Client Component with Tabs) */}
                    <TourContent
                        description={trip.description}
                        location={trip.location}
                        itinerary={trip.itinerary}
                        includes={trip.includes}
                        excludes={trip.excludes}
                        locale={locale}
                    />

                    {/* Right Sidebar (Booking) */}
                    <div className="lg:col-span-4 h-full relative">
                        <BookingCard price={trip.price || 0} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
