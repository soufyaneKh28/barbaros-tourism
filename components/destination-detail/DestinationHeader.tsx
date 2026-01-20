'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

interface DestinationHeaderProps {
    name: string;
    country: string;
    tagline: string;
    description: string;
    image: string;
    availableTours: number;
    bestTimeToVisit: string;
    averageTemp: string;
}

export default function DestinationHeader({
    name,
    country,
    tagline,
    description,
    image,
    availableTours,
    bestTimeToVisit,
    averageTemp
}: DestinationHeaderProps) {
    return (
        <div className="space-y-8">
            {/* Location Badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2"
            >
                <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-bold font-cabinet">
                    <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {country}
                </span>
            </motion.div>

            {/* Title & Tagline */}
            <div>
                <motion.h1
                    className="text-5xl lg:text-6xl font-extrabold text-primary font-cabinet leading-tight mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {name}
                </motion.h1>
                <motion.p
                    className="text-2xl text-secondary font-cabinet font-medium italic"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {tagline}
                </motion.p>
            </div>

            {/* Description */}
            <motion.p
                className="text-lg text-gray-700 font-satoshi leading-relaxed max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                {description}
            </motion.p>

            {/* Quick Stats */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 font-satoshi">Available Tours</p>
                        <p className="font-bold text-primary font-cabinet text-lg">{availableTours} Tours</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 font-satoshi">Best Time to Visit</p>
                        <p className="font-bold text-primary font-cabinet text-sm">{bestTimeToVisit}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 font-satoshi">Avg. Temperature</p>
                        <p className="font-bold text-primary font-cabinet text-lg">{averageTemp}</p>
                    </div>
                </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
                className="relative w-full h-[400px] lg:h-[550px] rounded-3xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
            >
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
        </div>
    );
}
