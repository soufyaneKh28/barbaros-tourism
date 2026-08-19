'use client';

import React from 'react';
import Image from 'next/image';

import { useSiteContent } from '@/contexts/SiteContentContext';

export default function Partners() {
    const { generic } = useSiteContent();
    const content = generic.home_partners;

    return (
        <section className="py-20 bg-white">
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

                {/* Partners Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12 items-center justify-items-center opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    {content.items.map((partner: { name: string; logo: string }, index: number) => (
                        <div key={index} className="h-12 relative w-full flex justify-center items-center">
                            {partner.logo ? (
                                <Image src={partner.logo} alt={partner.name} width={120} height={48} className="h-12 w-auto object-contain" />
                            ) : (
                                <span className="font-cabinet font-bold text-lg text-gray-400 text-center">{partner.name}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
