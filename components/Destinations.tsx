'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface DestinationsProps {
    destinations?: any[]
    locale?: string
}

export default function Destinations({ destinations: initialDestinations, locale = 'en' }: DestinationsProps) {
    const staticDestinations = [
        {
            id: 1,
            name: 'Bodrum',
            slug: 'bodrum',
            tours_count: 8,
            image_url: 'https://images.unsplash.com/photo-1605815063836-7a6c2497c2b1?q=80&w=2070&auto=format&fit=crop',
        },
        // ... (keep structure for fallback)
    ];

    const displayDestinations = initialDestinations && initialDestinations.length > 0 ? initialDestinations : staticDestinations;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-block mb-6">
                        <span className="border border-secondary/20 rounded-full px-6 py-2 text-secondary font-bold font-cabinet text-sm">
                            Top Destinations
                        </span>
                    </div>

                    <h2 className="text-[32px] lg:text-[42px] leading-tight font-cabinet font-extrabold text-primary mb-6">
                        Explore Our Most Popular Travel Locations
                    </h2>

                    <p className="max-w-2xl text-gray-600 font-satoshi text-lg leading-relaxed">
                        Discover the most loved destinations chosen by our travelers.
                        From iconic cities to breathtaking landscapes, these destinations offer a wide range of trips
                        designed to match different travel styles and preferences.
                    </p>
                </div>

                {/* Grid Wrapper */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
                    {displayDestinations.map((dest, index) => {
                        // Logic for spans:
                        // Index 0 (First Item): md:col-span-2
                        // Others: md:col-span-1
                        const isFirst = index === 0;
                        const colSpanClass = isFirst ? 'md:col-span-2' : 'md:col-span-1';

                        return (
                            <Link
                                key={dest.id}
                                href={`/en/destinations/${dest.slug}`}
                                className={`relative cursor-pointer rounded-3xl overflow-hidden group h-[300px] md:h-[400px] ${colSpanClass} block`}
                            >
                                <Image
                                    src={dest.image}
                                    alt={dest.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
                                    <h3 className="text-white font-cabinet font-bold text-3xl mb-1">{dest.name}</h3>
                                    <p className="text-white/90 font-satoshi text-sm">{dest.tours}</p>
                                </div>

                                {/* Arrow Icon */}
                                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
