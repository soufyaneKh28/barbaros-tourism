'use client';

import Link from "next/link";
import { motion } from "motion/react";

interface TourHeaderProps {
    title: string;
    location: string;
    rating: number;
    reviews: number;
    timeText?: string;
    timeIcon?: 'hour' | 'calendar';
}

export default function TourHeader({ title, location, rating, reviews, timeText, timeIcon = 'calendar' }: TourHeaderProps) {
    return (
        <div className="mb-8">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-2 text-sm font-satoshi text-gray-500 mb-3">
                    <Link href="/">Home</Link>
                    <span>/</span>
                    <Link href="/tours">Tours</Link>
                    <span>/</span>
                    <span className="text-primary font-medium">{title}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold font-cabinet text-gray-900 mb-4">
                    {title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 font-satoshi">
                    {/* <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <span className="font-bold text-gray-900">{rating}</span>
                        </div>
                        <span className="text-gray-500">({reviews} Reviews)</span>
                    </div> */}

                    <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{location}</span>
                    </div>

                    {timeText && (
                        <div className="flex items-center gap-2 text-gray-600">
                            {timeIcon === 'hour' ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            )}
                            <span>{timeText}</span>
                        </div>
                    )}

                    {/* <div className="flex items-center gap-3 ml-auto">
                        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </button>
                        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div> */}
                </div>
            </motion.div>
        </div>
    );
}
