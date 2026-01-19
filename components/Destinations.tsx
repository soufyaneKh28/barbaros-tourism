'use client';

import React from 'react';
import Image from 'next/image';

const destinations = [
    {
        id: 1,
        name: 'France',
        tours: '2 Tours',
        image: '/images/generated/destinations_france.png',
        large: true, // Takes 2 cols
    },
    {
        id: 2,
        name: 'Turkey',
        tours: '2 Tours',
        image: '/images/generated/destinations_turkey_istanbul.png',
        large: false, // Takes 1 col
    },
    {
        id: 3,
        name: 'Turkey', // Cappadocia
        tours: '2 Tours',
        image: '/images/generated/destinations_turkey_cappadocia.png',
        large: false,
    },
    {
        id: 4,
        name: 'Rome',
        tours: '2 Tours',
        image: '/images/generated/services_section_image.png', // Fallback/Placeholder
        large: false,
    },
    {
        id: 5,
        name: 'Bali',
        tours: '2 Tours',
        image: '/images/generated/services_tours.png', // Fallback/Placeholder
        large: false,
    },
];

export default function Destinations() {
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
                    {destinations.map((dest, index) => {
                        // Logic for spans:
                        // Index 0 (First Item): md:col-span-2
                        // Others: md:col-span-1
                        const isFirst = index === 0;
                        const colSpanClass = isFirst ? 'md:col-span-2' : 'md:col-span-1';

                        return (
                            <div
                                key={dest.id}
                                className={`relative cursor-pointer rounded-3xl overflow-hidden group h-[300px] md:h-[400px] ${colSpanClass}`}
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
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
