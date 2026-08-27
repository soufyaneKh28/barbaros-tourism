'use client';

import React from 'react';
import Image from 'next/image';

import { useSiteContent } from '@/contexts/SiteContentContext';

export default function Partners() {
    const { generic } = useSiteContent();
    const content = generic.home_partners;
    const baseItems = content.items as { name: string; logo: string }[];

    // Ensure the track is wide enough that the seamless loop never shows a gap.
    const repeated = baseItems.length > 0 && baseItems.length < 6
        ? Array.from({ length: Math.ceil(6 / baseItems.length) }, () => baseItems).flat()
        : baseItems;
    const marqueeItems = [...repeated, ...repeated];

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center text-center mb-16">
                    {/* Pill Label */}
                    <div className="inline-block mb-6">
                        <span className="border border-secondary/20 rounded-full px-6 py-2 text-secondary font-bold font-cabinet text-sm">
                            {content.badge}
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-[28px] lg:text-[35px] leading-[36px] lg:leading-[40px] font-cabinet font-extrabold text-primary max-w-3xl">
                        {content.heading}
                    </h2>
                </div>
            </div>

            {/* Partners Marquee */}
            <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent lg:w-32" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent lg:w-32" />

                <div className="group overflow-hidden">
                    <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
                        {marqueeItems.map((partner, index) => (
                            <div
                                key={index}
                                className="mx-8 flex h-12 w-[140px] shrink-0 items-center justify-center opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                            >
                                {partner.logo ? (
                                    <Image src={partner.logo} alt={partner.name} width={120} height={48} className="h-12 w-auto object-contain" />
                                ) : (
                                    <span className="text-center font-cabinet font-bold text-lg text-gray-400">{partner.name}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
