'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

interface RelatedDestinationsProps {
    currentDestinationId: number;
}

const allDestinations = [
    {
        id: 1,
        name: 'Bodrum',
        slug: 'bodrum',
        country: 'Turkey',
        tagline: 'The Pearl of the Aegean',
        image: 'https://images.unsplash.com/photo-1605815063836-7a6c2497c2b1?q=80&w=2070&auto=format&fit=crop',
        tours: '8 Tours',
    },
    {
        id: 2,
        name: 'Istanbul',
        slug: 'istanbul',
        country: 'Turkey',
        tagline: 'Where East Meets West',
        image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop',
        tours: '15 Tours',
    },
    {
        id: 3,
        name: 'Cappadocia',
        slug: 'cappadocia',
        country: 'Turkey',
        tagline: 'Land of Fairy Chimneys',
        image: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2070&auto=format&fit=crop',
        tours: '10 Tours',
    },
    {
        id: 4,
        name: 'Antalya',
        slug: 'antalya',
        country: 'Turkey',
        tagline: 'Turkish Riviera Paradise',
        image: 'https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?q=80&w=2070&auto=format&fit=crop',
        tours: '12 Tours',
    },
];

export default function RelatedDestinations({ currentDestinationId }: RelatedDestinationsProps) {
    const relatedDestinations = allDestinations
        .filter(dest => dest.id !== currentDestinationId)
        .slice(0, 3);

    return (
        <section className="mt-20 pt-12 border-t border-gray-200">
            <h2 className="text-3xl font-extrabold font-cabinet text-primary mb-8">
                Explore More Destinations
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
                {relatedDestinations.map((destination, index) => (
                    <motion.div
                        key={destination.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Link 
                            href={`/en/destinations/${destination.slug}`}
                            className="group block"
                        >
                            <div className="relative h-72 rounded-2xl overflow-hidden mb-4">
                                <Image
                                    src={destination.image}
                                    alt={destination.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <span className="inline-block bg-secondary/90 text-white px-3 py-1 rounded-full text-xs font-bold font-cabinet mb-3">
                                        {destination.country}
                                    </span>
                                    <h3 className="text-2xl font-bold font-cabinet text-white mb-1">
                                        {destination.name}
                                    </h3>
                                    <p className="text-white/90 font-satoshi text-sm italic mb-2">
                                        {destination.tagline}
                                    </p>
                                    <p className="text-white/80 font-satoshi text-sm">
                                        {destination.tours}
                                    </p>
                                </div>

                                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
