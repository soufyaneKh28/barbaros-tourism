'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { type Locale } from '@/i18n';

interface DestinationsGridProps {
    locale: Locale;
}

const destinations = [
    {
        id: 1,
        name: 'Bodrum',
        slug: 'bodrum',
        country: 'Turkey',
        tagline: 'The Pearl of the Aegean',
        tours: '8 Tours',
        image: 'https://images.unsplash.com/photo-1605815063836-7a6c2497c2b1?q=80&w=2070&auto=format&fit=crop',
        description: 'Discover pristine beaches, vibrant nightlife, and ancient history on the stunning Aegean coast.',
    },
    {
        id: 2,
        name: 'Istanbul',
        slug: 'istanbul',
        country: 'Turkey',
        tagline: 'Where East Meets West',
        tours: '15 Tours',
        image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop',
        description: 'Experience the magic of a city that bridges two continents and countless cultures.',
    },
    {
        id: 3,
        name: 'Cappadocia',
        slug: 'cappadocia',
        country: 'Turkey',
        tagline: 'Land of Fairy Chimneys',
        tours: '10 Tours',
        image: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2070&auto=format&fit=crop',
        description: 'Witness otherworldly landscapes and hot air balloon spectacles in this magical region.',
    },
    {
        id: 4,
        name: 'Antalya',
        slug: 'antalya',
        country: 'Turkey',
        tagline: 'Turkish Riviera Paradise',
        tours: '12 Tours',
        image: 'https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?q=80&w=2070&auto=format&fit=crop',
        description: 'Enjoy Mediterranean beaches, ancient ruins, and luxury resorts in this coastal gem.',
    },
    {
        id: 5,
        name: 'Pamukkale',
        slug: 'pamukkale',
        country: 'Turkey',
        tagline: 'Cotton Castle Terraces',
        tours: '6 Tours',
        image: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?q=80&w=2070&auto=format&fit=crop',
        description: 'Marvel at the stunning white travertine terraces and ancient thermal pools.',
    },
    {
        id: 6,
        name: 'Ephesus',
        slug: 'ephesus',
        country: 'Turkey',
        tagline: 'Ancient Wonder of the World',
        tours: '7 Tours',
        image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=2070&auto=format&fit=crop',
        description: 'Walk through one of the best-preserved ancient cities of the classical world.',
    },
];

export default function DestinationsGrid({ locale }: DestinationsGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
                <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                >
                    <Link href={`/${locale}/destinations/${destination.slug}`} className="block">
                        {/* Image */}
                        <div className="relative h-80 rounded-2xl overflow-hidden mb-4">
                            <Image
                                src={destination.image}
                                alt={destination.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            
                            {/* Overlay Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <span className="inline-block bg-secondary/90 text-white px-3 py-1 rounded-full text-xs font-bold font-cabinet mb-2">
                                    {destination.country}
                                </span>
                                <h3 className="text-2xl font-bold font-cabinet text-white mb-1">
                                    {destination.name}
                                </h3>
                                <p className="text-white/90 font-satoshi text-sm italic">
                                    {destination.tagline}
                                </p>
                            </div>

                            {/* Arrow Icon */}
                            <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>

                        {/* Content Below Image */}
                        <div>
                            <p className="text-gray-600 font-satoshi mb-3 line-clamp-2">
                                {destination.description}
                            </p>

                            <div className="flex items-center justify-between">
                                <span className="text-primary font-cabinet font-bold">{destination.tours}</span>
                                <span className="text-secondary font-cabinet font-medium group-hover:gap-2 flex items-center gap-1 transition-all">
                                    Explore
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
