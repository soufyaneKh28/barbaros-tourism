import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TourHeader from "@/components/tour-detail/TourHeader";
import TourGallery from "@/components/tour-detail/TourGallery";
import TourContent from "@/components/tour-detail/TourContent";
import BookingCard from "@/components/tour-detail/BookingCard";
import { type Locale, locales, defaultLocale } from "@/i18n";

export default async function TourDetails({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale: localeParam, slug } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;

    // TODO: Fetch tour data based on slug. Using mock data for now.
    const tourData = {
        title: "Reijnders Musy Super Green Field", // Example title from design
        location: "Jl. Inspeksi Cidurian, Cileunyi, Bandung",
        rating: 4.7,
        reviews: 234,
        price: 750,
        description: "A Historic American Prairie-Style Mansion In Toorak On One Of The Suburb's Most Prestigious Roads Is Up For Sale For The First Time In 70 Years. While The Listing Agent Refused To Comment On Who The Seller Was, While The Listing Agent Refused To Comment On Who The Seller Was Industry Sources Revealed Grace Davey-Milne Owns The Property, Who Is The Widow Of The Late Vintage.",
        images: [
            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1622546758362-o886b6256860?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop"
        ]
    };

    return (
        <div className="bg-white">
            <Navbar locale={locale} />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <TourHeader
                    title={tourData.title}
                    location={tourData.location}
                    rating={tourData.rating}
                    reviews={tourData.reviews}
                />

                <TourGallery images={tourData.images} />



                <div className="grid lg:grid-cols-12 gap-12 relative">
                    {/* Left Content (Client Component with Tabs) */}
                    <TourContent
                        description={tourData.description}
                        location={tourData.location}
                    />

                    {/* Right Sidebar (Booking) */}
                    <div className="lg:col-span-4 h-full relative">
                        <BookingCard price={tourData.price} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
