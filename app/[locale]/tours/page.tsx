import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Destinations from "@/components/Destinations";
import HotDeals from "@/components/HotDeals";
import TourCarousel from "@/components/TourCarousel";
import ToursHero from "@/components/ToursHero";
import ToursExperience from "@/components/ToursExperience";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getMessages } from "@/i18n";
import Image from "next/image";
import Link from 'next/link';

export default async function Tours({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    const dailyTours = [
        {
            id: 1,
            title: "Istanbul Old City Tour",
            description: "Visit Hagia Sophia, Blue Mosque, and the Grand Bazaar in a comprehensive day trip.",
            image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=800&auto=format&fit=crop",
            price: "$45",
            tags: ["Daily", "History", "Istanbul"],
            link: "/tours/istanbul-old-city"
        },
        {
            id: 2,
            title: "Bosphorus Dinner Cruise",
            description: "Enjoy a magical evening on the Bosphorus with dinner, drinks, and traditional shows.",
            image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop",
            price: "$60",
            tags: ["Evening", "Dinner", "Cruise"],
            link: "/tours/bosphorus-cruise"
        },
        {
            id: 3,
            title: "Cappadocia North Tour",
            description: "Explore Goreme Open Air Museum, Devrent Valley, and Pasabag fairy chimneys.",
            image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=800&auto=format&fit=crop",
            price: "$55",
            tags: ["Daily", "Nature", "Cappadocia"],
            link: "/tours/cappadocia-north"
        },
        {
            id: 4,
            title: "Princes' Islands Trip",
            description: "Escape the city bustle with a peaceful full-day trip to Buyukada island.",
            image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=800&auto=format&fit=crop",
            price: "$40",
            tags: ["Full Day", "Island", "Relax"],
            link: "/tours/princes-islands"
        }
    ];

    const topDestinations = [
        {
            id: 101,
            title: "Antalya Coastal Escape",
            description: "Turquoise waters, ancient ruins, and luxury resorts await in the heart of the Turkish Riviera.",
            image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop",
            tags: ["Beach", "Luxury", "History"],
            link: "/destinations/antalya"
        },
        {
            id: 102,
            title: "Bodrum Yacht Life",
            description: "Experience the vibrant nightlife and crystal-clear bays of Turkey's most famous coastal town.",
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop",
            tags: ["Sun", "Sea", "Nightlife"],
            link: "/destinations/bodrum"
        },
        {
            id: 103,
            title: "Ephesus & Pamukkale",
            description: "Journey through time at the ancient city of Ephesus and bathe in the white travertine pools.",
            image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?q=80&w=800&auto=format&fit=crop",
            tags: ["UNESCO", "Thermal", "Discovery"],
            link: "/destinations/ephesus-pamukkale"
        },
        {
            id: 104,
            title: "Trabzon & Black Sea",
            description: "Discover the lush green landscapes, tea plantations, and Sumela Monastery.",
            image: "https://images.unsplash.com/photo-1606733900350-0a2a4b878207?q=80&w=800&auto=format&fit=crop",
            tags: ["Nature", "Tea", "History"],
            link: "/destinations/trabzon"
        }
    ];


    const adventureTours = [
        {
            id: 301,
            title: "Hot Air Balloon Flight",
            description: "Soar over the otherworldly landscape of Cappadocia at sunrise for a once-in-a-lifetime view.",
            image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=800&auto=format&fit=crop",
            price: "$180",
            tags: ["Aerial", "Adventure", "Landscape"],
            link: "/tours/balloon-flight"
        },
        {
            id: 302,
            title: "Taurus Mountain Jeep Safari",
            description: "Off-road adventure through rugged mountain trails, local villages, and hidden valleys.",
            image: "https://images.unsplash.com/photo-1533519107127-143d748d7e00?q=80&w=800&auto=format&fit=crop",
            price: "$75",
            tags: ["Off-road", "Jeep", "Mountains"],
            link: "/tours/jeep-safari"
        },
        {
            id: 303,
            title: "Oludeniz Paragliding",
            description: "Experience the thrill of tandem paragliding over the world-famous Blue Lagoon.",
            image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop",
            price: "$120",
            tags: ["Extreme", "Aerial", "Ocean"],
            link: "/tours/paragliding"
        },
        {
            id: 304,
            title: "Kas Scuba Diving",
            description: "Explore crystal-clear waters, ancient shipwrecks, and vibrant marine life in the Mediterranean.",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
            price: "$90",
            tags: ["Diving", "Underwater", "Discovery"],
            link: "/tours/diving"
        }
    ];

    return (
        <div className="bg-white">
            <Navbar locale={locale} transparent={false} />

            {/* Hero Section */}
            <ToursHero locale={locale} />

            {/* Daily Tours Carousel */}
            <TourCarousel
                badge="DAILY TOURS"
                title="Short & Sweet Adventures"
                description="Perfect for those with limited time or looking to add excitement to their day. Experience the essentials of Türkiye's best spots."
                items={dailyTours}
                locale={locale}
            />

            {/* Top Destinations Carousel (Dark Mode) */}
            <TourCarousel
                badge="TOP DESTINATIONS"
                title="Where Every Journey Matters"
                description="Join thousands of travelers who have discovered the magic of these iconic Turkish locations."
                items={topDestinations}
                locale={locale}
                dark={true}
            />

            {/* Hot Deals */}
            <HotDeals />

            {/* Adventure Tours Carousel */}
            <TourCarousel
                badge="ADVENTURE"
                title="Push Your Boundaries"
                description="For the thrill-seekers and nature lovers. Experience Türkiye from new perspectives."
                items={adventureTours}
                locale={locale}
                dark={true}
            />

            {/* Destinations grid (from home for SEO/internal linking) */}
            <Destinations />

            {/* What's Included / Experience Section */}
            <ToursExperience />

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
                    <h2 className="text-4xl md:text-5xl font-bold font-cabinet mb-8">Ready to Write Your <br /> Turkish Story?</h2>
                    <p className="text-xl font-satoshi mb-12 text-white/80">
                        Join over 10,000 happy travelers who trusted Barbaros Tourism for their Turkish adventure.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={`/${locale}/contact-us`} className="bg-secondary text-primary px-10 py-4 rounded-full font-bold font-cabinet hover:bg-white transition-all duration-300 shadow-xl">
                            Plan Your Trip
                        </Link>
                        <Link href={`/${locale}/medical-tourism`} className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full font-bold font-cabinet hover:bg-white/20 transition-all duration-300">
                            Medical Inquiries
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
