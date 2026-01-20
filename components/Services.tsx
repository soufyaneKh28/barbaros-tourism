'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { type Locale, getMessages } from "@/i18n";

interface ServicesProps {
    locale?: Locale;
}

export default function Services({ locale = 'en' }: ServicesProps) {
    const t = getMessages(locale);
    const [activeId, setActiveId] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const services = [
        {
            id: 0,
            title: t.home.services.items.integrated.title,
            description: t.home.services.items.integrated.description,
            image: '/images/generated/services_section_image.png',
            icon: (active: boolean) => (
                <svg className={`w-6 h-6 ${active ? 'text-white' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
            )
        },
        {
            id: 1,
            title: t.home.services.items.medical.title,
            description: t.home.services.items.medical.description,
            image: '/images/generated/services_medical.png',
            icon: (active: boolean) => (
                <svg className={`w-6 h-6 ${active ? 'text-white' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            )
        },
        {
            id: 2,
            title: t.home.services.items.tours.title,
            description: t.home.services.items.tours.description,
            image: '/images/generated/services_tours.png',
            icon: (active: boolean) => (
                <svg className={`w-6 h-6 ${active ? 'text-white' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
            )
        }
    ];

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setActiveId((current) => (current + 1) % services.length);
        }, 4000); // Switch every 4 seconds

        return () => clearInterval(interval);
    }, [isPaused, services.length]);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column */}
                    <div>
                        <div className="inline-block mb-6">
                            <span className="border border-secondary/20 rounded-full px-6 py-2 text-secondary font-bold font-cabinet text-sm">
                                {t.home.services.badge}
                            </span>
                        </div>

                        <h2 className="text-[36px] lg:text-[48px] leading-[1.1] font-cabinet font-bold text-primary mb-10">
                            {t.home.services.heading}
                        </h2>

                        <div className="relative aspect-[4/3] w-full rounded-[32px] overflow-hidden shadow-lg">
                            {services.map((service) => (
                                <Image
                                    key={service.id}
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className={`object-cover transition-opacity duration-500 ease-in-out ${activeId === service.id ? 'opacity-100' : 'opacity-0'}`}
                                    priority={service.id === 0}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:pt-20">
                        <p className="text-lg text-gray-600 mb-12 font-satoshi leading-relaxed">
                            {t.home.services.description}
                        </p>

                        {/* Accordion */}
                        <div
                            className="flex flex-col gap-6"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {services.map((service) => {
                                const isActive = activeId === service.id;

                                return (
                                    <div
                                        key={service.id}
                                        onClick={() => setActiveId(service.id)}
                                        className={`cursor-pointer transition-all duration-300 rounded-2xl overflow-hidden ${isActive ? 'bg-[#E5F4FC]' : 'bg-transparent'
                                            }`}
                                    >
                                        <div className="flex items-start gap-6 p-6">
                                            {/* Icon Box */}
                                            <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300
                        ${isActive ? 'bg-secondary' : 'bg-primary'}
                      `}>
                                                {service.icon(isActive)}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 pt-2">
                                                <h3 className={`text-xl font-bold font-cabinet mb-2 ${isActive ? 'text-primary' : 'text-primary'}`}>
                                                    {service.title}
                                                </h3>

                                                <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                                    <div className="overflow-hidden">
                                                        <p className="text-gray-600 text-base leading-relaxed">
                                                            {service.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
