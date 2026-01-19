'use client';

import Image from "next/image";

interface TourLocationProps {
    address: string;
}

export default function TourLocation({ address }: TourLocationProps) {
    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold font-cabinet text-gray-900 mb-6">Location</h2>
            <div className="h-[400px] w-full relative rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                <Image
                    src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop"
                    alt="Map Background"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />

                {/* Overlay Pin for visual effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                        <div className="w-16 h-16 bg-primary/20 rounded-full animate-ping absolute inset-0"></div>
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-xl relative z-10 border-4 border-white">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-white py-3 px-5 rounded-xl shadow-lg">
                    <p className="font-bold font-cabinet text-gray-900">{address}</p>
                </div>
            </div>
        </div>
    );
}
