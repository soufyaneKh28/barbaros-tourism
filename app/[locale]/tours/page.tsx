import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import FeaturedPrograms from "@/components/home/FeaturedPrograms";
import HotDeals from "@/components/home/HotDeals";
import TourCarousel from "@/components/tours/TourCarousel";
import ToursHero from "@/components/tours/ToursHero";
import ToursExperience from "@/components/tours/ToursExperience";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getMessages } from "@/i18n";
import Image from "next/image";
import Link from 'next/link';

import { getTrips, getTripsByType } from "@/lib/services/trips";
import { getPrograms } from "@/lib/services/programs";
import { getCombinedHotDeals } from "@/lib/services/deals";

export default async function Tours({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    let dynamicTrips: any[] = [];
    try {
        const data = await getTrips(locale);
        dynamicTrips = (data || []).map((trip: any) => ({
            id: trip.id,
            title: trip.title,
            description: trip.description,
            image: (trip.main_image || trip.images?.[0])
                ? `${trip.main_image || trip.images[0]}?v=${trip.updated_at ? new Date(trip.updated_at).getTime() : Date.now()}`
                : "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b",
            price: trip.price ? `$${trip.price}` : undefined,
            tags: [trip.category?.name].filter(Boolean),
            link: `/${locale}/tours/${trip.slug}`
        }));
    } catch (error) {
        console.error("Error fetching dynamic trips:", error);
    }

    // Fetch tourism programs (TRIPS of type tourism-programs)
    // NOTE: This logic refers to 'trips' table type. But we also have 'Programs' table now.
    // The user might mean the 'Programs' list. 
    // However, existing code fetches usage of `getTripsByType`. I will keep it for now as 'Programs' might be distinct or replacing.
    // I will replace "Destinations" section with "FeaturedPrograms" from new table.

    let tourismPrograms: any[] = [];
    try {
        const data = await getTripsByType('tourism-programs', locale);
        tourismPrograms = (data || []).map((trip: any) => ({
            id: trip.id,
            title: trip.title,
            description: trip.description,
            image: (trip.main_image || trip.images?.[0])
                ? `${trip.main_image || trip.images[0]}?v=${trip.updated_at ? new Date(trip.updated_at).getTime() : Date.now()}`
                : "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200",
            price: trip.price ? `$${trip.price}` : undefined,
            tags: [trip.category?.name].filter(Boolean),
            link: `/${locale}/tours/${trip.slug}`
        }));
    } catch (error) {
        console.error("Error fetching tourism programs:", error);
    }

    // Fetch specialized packages
    let specializedPackages: any[] = [];
    try {
        const data = await getTripsByType('specialized-packages', locale);
        specializedPackages = (data || []).map((trip: any) => ({
            id: trip.id,
            title: trip.title,
            description: trip.description,
            image: (trip.main_image || trip.images?.[0])
                ? `${trip.main_image || trip.images[0]}?v=${trip.updated_at ? new Date(trip.updated_at).getTime() : Date.now()}`
                : "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd",
            price: trip.price ? `$${trip.price}` : undefined,
            tags: [trip.category?.name].filter(Boolean),
            link: `/${locale}/tours/${trip.slug}`
        }));
    } catch (error) {
        console.error("Error fetching specialized packages:", error);
    }

    // Fetch featured programs (from new Programs table) instead of destinations
    let featuredPrograms: any[] = [];
    try {
        const data = await getPrograms(locale, 6);
        featuredPrograms = (data || []).map((program: any) => ({
            ...program,
            main_image: program.main_image
                ? `${program.main_image}?v=${program.updated_at ? new Date(program.updated_at).getTime() : Date.now()}`
                : undefined
        }));
    } catch (error) {
        console.error("Error fetching programs:", error);
    }

    // Fetch hot deals
    let hotDeals: any[] = []
    try {
        const data = await getCombinedHotDeals(locale)
        hotDeals = (data || []).map((deal: any) => ({
            ...deal,
            main_image: deal.main_image
                ? `${deal.main_image}?v=${deal.updated_at ? new Date(deal.updated_at).getTime() : Date.now()}`
                : undefined,
            cover_image: deal.cover_image
                ? `${deal.cover_image}?v=${deal.updated_at ? new Date(deal.updated_at).getTime() : Date.now()}`
                : undefined
        }))
    } catch (e) {
        console.error('Failed to fetch hot deals', e)
    }

    // Daily Tours: Combine dynamic and some static fallbacks if empty
    const dailyTours = dynamicTrips.length > 0 ? dynamicTrips : [
        {
            id: 1,
            title: "Istanbul Old City Tour",
            description: "Visit Hagia Sophia, Blue Mosque, and the Grand Bazaar in a comprehensive day trip.",
            image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=800&auto=format&fit=crop",
            price: "$45",
            tags: ["Daily", "History", "Istanbul"],
            link: `/${locale}/tours/istanbul-old-city`
        },
        {
            id: 2,
            title: "Bosphorus Dinner Cruise",
            description: "Enjoy a magical evening on the Bosphorus with dinner, drinks, and traditional shows.",
            image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop",
            price: "$60",
            tags: ["Evening", "Dinner", "Cruise"],
            link: `/${locale}/tours/bosphorus-cruise`
        }
    ];

    return (
        <div className="bg-white">
            <Navbar transparent={false} />

            {/* Hero Section */}
            <ToursHero locale={locale} />

            {/* Daily Tours Carousel */}
            <TourCarousel
                badge={(t as any).tourTypes?.dailyTours?.badge || "DAILY TOURS"}
                title={(t as any).tourTypes?.dailyTours?.heading || "Short & Sweet Adventures"}
                description={(t as any).tourTypes?.dailyTours?.description || "Perfect for those with limited time or looking to add excitement to their day. Experience the essentials of Türkiye's best spots."}
                items={dailyTours}
            />

            {/* Tourism Programs Carousel (Dark Mode) */}
            <TourCarousel
                badge={(t as any).tourTypes?.tourismPrograms?.badge || "TOURISM PROGRAMS"}
                title={(t as any).tourTypes?.tourismPrograms?.heading || "Curated Travel Experiences"}
                description={(t as any).tourTypes?.tourismPrograms?.description || "Discover our specially designed tourism programs that combine culture, adventure, and relaxation for an unforgettable journey."}
                items={tourismPrograms.length > 0 ? tourismPrograms : [
                    {
                        id: 101,
                        title: "Cultural Heritage Tour",
                        description: "Explore Turkey's rich history and cultural landmarks in this comprehensive program.",
                        image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop",
                        tags: ["Culture", "History"],
                        link: `/${locale}/tours/cultural-heritage`
                    }
                ]}
                dark={true}
            />

            {/* Hot Deals */}
            <HotDeals deals={hotDeals} locale={locale} />

            {/* Specialized Tourism Packages Carousel */}
            <TourCarousel
                badge={(t as any).tourTypes?.specialPackages?.badge || "SPECIALIZED PACKAGES"}
                title={(t as any).tourTypes?.specialPackages?.heading || "Tailored Tourism Solutions"}
                description={(t as any).tourTypes?.specialPackages?.description || "Exclusive packages designed for specific interests - from medical tourism to cultural immersion and luxury experiences."}
                items={specializedPackages.length > 0 ? specializedPackages : [
                    {
                        id: 301,
                        title: "Medical Tourism Package",
                        description: "Combine world-class medical care with a relaxing Turkish getaway.",
                        image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=800&auto=format&fit=crop",
                        tags: ["Medical", "Wellness"],
                        link: `/${locale}/tours/medical-tourism`
                    }
                ]}
                dark={true}
            />

            {/* Featured Programs Grid (Replacing Destinations) */}
            <FeaturedPrograms programs={featuredPrograms} locale={locale} />

            {/* What's Included / Experience Section */}
            {/* <ToursExperience /> */}

            {/* Final CTA */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2071&auto=format&fit=crop"
                        alt="CTA background"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
                    <h2 className="text-4xl md:text-5xl font-bold font-cabinet mb-8">
                        {(t as any).toursPage?.cta?.heading || "Ready to Write Your Turkish Story?"}
                    </h2>
                    <p className="text-xl font-satoshi mb-12 text-white/80">
                        {(t as any).toursPage?.cta?.description || "Join over 10,000 happy travelers who trusted Barbaros Tourism for their Turkish adventure."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={`/${locale}/contact-us`} className="bg-secondary text-primary px-10 py-4 rounded-full font-bold font-cabinet hover:bg-white transition-all duration-300 shadow-xl">
                            {(t as any).toursPage?.cta?.planTrip || "Plan Your Trip"}
                        </Link>
                        <Link href={`/${locale}/medical-tourism`} className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full font-bold font-cabinet hover:bg-white/20 transition-all duration-300">
                            {(t as any).toursPage?.cta?.medicalInquiries || "Medical Inquiries"}
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
