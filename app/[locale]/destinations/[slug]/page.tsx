import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { DestinationHeader, DestinationContent, DestinationGallery, RelatedDestinations } from "@/components/destination-detail";
import { type Locale, locales, defaultLocale } from "@/i18n";

export default async function DestinationDetails({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale: localeParam, slug } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;

    // TODO: Fetch destination data based on slug. Using mock data for now.
    const getDestinationData = (slug: string) => {
        const destinations: Record<string, any> = {
            'bodrum': {
                id: 1,
                slug: 'bodrum',
                name: 'Bodrum',
                country: 'Turkey',
                tagline: 'The Pearl of the Aegean',
                description: 'Discover the stunning coastal paradise of Bodrum, where ancient history meets modern luxury.',
                image: 'https://images.unsplash.com/photo-1605815063836-7a6c2497c2b1?q=80&w=2070&auto=format&fit=crop',
                gallery: [
                    'https://images.unsplash.com/photo-1605815063836-7a6c2497c2b1?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1541604021356-ef6bf5b7f974?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
                ],
                availableTours: 8,
                bestTimeToVisit: 'May to October',
                averageTemp: '25°C - 35°C',
                content: `
                    <p>Bodrum, located on Turkey's stunning Aegean coast, is a jewel of the Mediterranean that seamlessly blends ancient history with modern luxury. Known as the "Pearl of the Aegean," this enchanting coastal town offers pristine beaches, crystal-clear waters, and a vibrant nightlife scene that attracts visitors from around the globe.</p>
                    
                    <h2>Historical Significance</h2>
                    <p>The ancient city of Halicarnassus, where Bodrum stands today, was once home to one of the Seven Wonders of the Ancient World - the Mausoleum at Halicarnassus. Today, the impressive Bodrum Castle, built by the Knights of St. John in the 15th century, dominates the harbor and houses the Museum of Underwater Archaeology.</p>
                    
                    <h2>Beaches and Water Activities</h2>
                    <p>Bodrum's coastline is dotted with stunning beaches and hidden coves. From the popular Bitez and Gümbet beaches to the more secluded Karaada and Akvaryum Bay, there's a perfect spot for every traveler. Water sports enthusiasts can enjoy windsurfing, sailing, scuba diving, and yacht cruises.</p>
                    
                    <ul>
                        <li>Visit the iconic Bodrum Castle and Museum</li>
                        <li>Explore ancient ruins of Halicarnassus</li>
                        <li>Sail on a traditional Turkish gulet</li>
                        <li>Experience vibrant nightlife at Bodrum Marina</li>
                        <li>Relax at pristine beaches and beach clubs</li>
                        <li>Shop at local markets and boutiques</li>
                    </ul>
                    
                    <h2>Culinary Delights</h2>
                    <p>Bodrum's cuisine is a delightful fusion of Aegean and Mediterranean flavors. Fresh seafood, olive oil-based dishes, and locally grown vegetables take center stage. Don't miss trying local specialties like stuffed zucchini flowers, fresh fish grilled to perfection, and traditional Turkish mezes paired with rakı.</p>
                    
                    <blockquote>
                        "Bodrum is not just a destination; it's a lifestyle. The perfect blend of history, natural beauty, and Mediterranean charm creates an unforgettable experience."
                    </blockquote>
                    
                    <h2>Nightlife and Entertainment</h2>
                    <p>As the sun sets, Bodrum transforms into one of Turkey's premier nightlife destinations. From sophisticated rooftop bars to beach clubs and legendary nightclubs, the city offers entertainment for every taste. The Bodrum Marina area is particularly popular for evening strolls, dining, and socializing.</p>
                `,
                highlights: [
                    'Ancient Bodrum Castle',
                    'Pristine Aegean Beaches',
                    'Vibrant Nightlife',
                    'Water Sports Paradise',
                    'Traditional Turkish Cuisine',
                    'Historic Sites'
                ],
                climate: 'Mediterranean climate with hot, dry summers and mild winters',
            },
            'istanbul': {
                id: 2,
                slug: 'istanbul',
                name: 'Istanbul',
                country: 'Turkey',
                tagline: 'Where East Meets West',
                description: 'Experience the magic of Istanbul, a city that bridges two continents and countless cultures.',
                image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop',
                gallery: [
                    'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=800&auto=format&fit=crop',
                ],
                availableTours: 15,
                bestTimeToVisit: 'April to June, September to November',
                averageTemp: '15°C - 28°C',
                content: `
                    <p>Istanbul, the city where continents meet, is a mesmerizing blend of ancient history and modern dynamism. Straddling both Europe and Asia across the Bosphorus Strait, this magnificent metropolis has served as the capital of three great empires: Roman, Byzantine, and Ottoman.</p>
                    
                    <h2>Iconic Landmarks</h2>
                    <p>Istanbul's skyline is adorned with architectural marvels that tell stories of its rich past. The Hagia Sophia, once a church, then a mosque, and now a mosque again, stands as a testament to the city's diverse history. The Blue Mosque with its six minarets and stunning İznik tiles, and Topkapı Palace with its opulent courtyards, are must-visit landmarks.</p>
                    
                    <h2>The Bosphorus Experience</h2>
                    <p>A cruise along the Bosphorus Strait offers breathtaking views of palaces, fortresses, and waterfront mansions. Watch the sunset paint the city in golden hues as you sail between two continents, passing under the iconic bridges that connect Europe and Asia.</p>
                    
                    <ul>
                        <li>Explore the magnificent Hagia Sophia</li>
                        <li>Visit the stunning Blue Mosque</li>
                        <li>Shop at the historic Grand Bazaar</li>
                        <li>Cruise the Bosphorus Strait</li>
                        <li>Discover Topkapı Palace treasures</li>
                        <li>Experience Turkish bath (Hammam)</li>
                    </ul>
                    
                    <h2>Culinary Paradise</h2>
                    <p>Istanbul is a food lover's dream, offering everything from street food to fine dining. Sample traditional Turkish breakfast spreads, savor aromatic kebabs, indulge in sweet baklava, and sip Turkish tea or coffee while watching the world go by.</p>
                    
                    <blockquote>
                        "Istanbul is not just a city; it's a feeling, an emotion, a journey through time where every corner tells a thousand stories."
                    </blockquote>
                `,
                highlights: [
                    'Hagia Sophia',
                    'Blue Mosque',
                    'Grand Bazaar',
                    'Bosphorus Cruise',
                    'Topkapı Palace',
                    'Turkish Cuisine'
                ],
                climate: 'Transitional between oceanic and Mediterranean climate',
            },
            'cappadocia': {
                id: 3,
                slug: 'cappadocia',
                name: 'Cappadocia',
                country: 'Turkey',
                tagline: 'Land of Fairy Chimneys',
                description: 'Witness the otherworldly landscapes and hot air balloon spectacles of magical Cappadocia.',
                image: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2070&auto=format&fit=crop',
                gallery: [
                    'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1608120939099-b48c22fea952?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=800&auto=format&fit=crop',
                ],
                availableTours: 10,
                bestTimeToVisit: 'April to June, September to November',
                averageTemp: '10°C - 30°C',
                content: `
                    <p>Cappadocia is a geological wonderland that seems plucked from the pages of a fairy tale. This UNESCO World Heritage site features an extraordinary landscape of cone-shaped rock formations called "fairy chimneys," ancient underground cities, and cave churches adorned with Byzantine frescoes.</p>
                    
                    <h2>Hot Air Balloon Experience</h2>
                    <p>Cappadocia is world-famous for its hot air balloon rides at sunrise. Float above the surreal landscape as hundreds of colorful balloons dot the sky, offering unforgettable views of the valleys, rock formations, and cave dwellings below. It's a bucket-list experience that combines adventure with breathtaking beauty.</p>
                    
                    <h2>Underground Cities</h2>
                    <p>Explore the mysterious underground cities of Derinkuyu and Kaymaklı, carved deep into the soft volcanic rock. These multi-level subterranean complexes once housed thousands of people and include living quarters, churches, wine cellars, and ventilation shafts - engineering marvels of ancient times.</p>
                    
                    <ul>
                        <li>Hot air balloon ride at sunrise</li>
                        <li>Explore underground cities</li>
                        <li>Visit Göreme Open-Air Museum</li>
                        <li>Stay in cave hotels</li>
                        <li>Hike through valleys and canyons</li>
                        <li>Watch traditional Turkish pottery making</li>
                    </ul>
                    
                    <h2>Cave Hotels and Unique Accommodation</h2>
                    <p>Experience luxury cave hotels carved into the ancient rock formations. These unique accommodations blend modern comfort with historical ambiance, offering a one-of-a-kind stay in rooms that have been inhabited for centuries.</p>
                    
                    <blockquote>
                        "Cappadocia is proof that nature is the greatest artist. Its surreal beauty challenges reality and touches the soul."
                    </blockquote>
                `,
                highlights: [
                    'Hot Air Balloon Rides',
                    'Underground Cities',
                    'Fairy Chimneys',
                    'Cave Hotels',
                    'Göreme Open-Air Museum',
                    'Valley Hiking'
                ],
                climate: 'Continental climate with cold winters and warm summers',
            },
        };

        return destinations[slug] || destinations['bodrum'];
    };

    const destinationData = getDestinationData(slug);

    return (
        <div className="bg-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Back Navigation */}
                <a
                    href={`/${locale}/tours`}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-8 font-cabinet font-medium"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Tours
                </a>

                <DestinationHeader
                    name={destinationData.name}
                    country={destinationData.country}
                    tagline={destinationData.tagline}
                    description={destinationData.description}
                    image={destinationData.image}
                    availableTours={destinationData.availableTours}
                    bestTimeToVisit={destinationData.bestTimeToVisit}
                    averageTemp={destinationData.averageTemp}
                />

                <DestinationGallery images={destinationData.gallery} />

                <div className="grid lg:grid-cols-12 gap-12 mt-12">
                    <div className="lg:col-span-8">
                        <DestinationContent
                            content={destinationData.content}
                            highlights={destinationData.highlights}
                            climate={destinationData.climate}
                        />
                    </div>

                    <div className="lg:col-span-4">
                        {/* Sidebar - Quick Info */}
                        <div className="bg-gray-50 rounded-2xl p-6 sticky top-8">
                            <h3 className="text-xl font-bold font-cabinet text-primary mb-4">Quick Info</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600 font-satoshi mb-1">Available Tours</p>
                                    <p className="font-bold font-cabinet text-primary">{destinationData.availableTours} Tours</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-satoshi mb-1">Best Time to Visit</p>
                                    <p className="font-bold font-cabinet text-primary">{destinationData.bestTimeToVisit}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-satoshi mb-1">Average Temperature</p>
                                    <p className="font-bold font-cabinet text-primary">{destinationData.averageTemp}</p>
                                </div>
                                <button className="w-full bg-primary hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-cabinet font-bold transition-colors mt-6">
                                    View Available Tours
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <RelatedDestinations currentDestinationId={destinationData.id} />
            </main>

            <Footer />
        </div>
    );
}
