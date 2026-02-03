'use client';

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/hooks/use-language";

interface Trip {
    id: string | number;
    title: string;
    description: string;
    image: string;
    price?: string;
    tags?: string[];
    link: string;
}

interface TripGridProps {
    trips: Trip[];
    emptyMessage?: string;
}

export default function TripGrid({ trips, emptyMessage = "No trips available at the moment." }: TripGridProps) {
    const { t } = useLanguage();
    if (trips.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg font-satoshi">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip, index) => (
                <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <Link href={trip.link} className="group block">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={trip.image}
                                    alt={trip.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {trip.price && (
                                    <div className="absolute top-4 right-4 bg-secondary text-primary font-bold px-4 py-2 rounded-full text-sm">
                                        {trip.price}
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                {/* Tags */}
                                {trip.tags && trip.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {trip.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs font-satoshi text-primary/60 bg-primary/5 px-3 py-1 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Title */}
                                <h3 className="text-xl font-bold font-cabinet text-primary mb-3 group-hover:text-secondary transition-colors">
                                    {trip.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 font-satoshi text-sm line-clamp-3 flex-1">
                                    {trip.description}
                                </p>

                                {/* CTA */}
                                <div className="mt-4 flex items-center text-secondary font-bold text-sm group-hover:gap-2 transition-all">
                                    <span>{(t as any).common?.viewDetails || "View Details"}</span>
                                    <svg
                                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
