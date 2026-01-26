'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { useLanguage } from '@/hooks/use-language';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1536 },
        items: 4,
        partialVisibilityGutter: 40
    },
    desktop: {
        breakpoint: { max: 1536, min: 1024 },
        items: 3,
        partialVisibilityGutter: 30
    },
    tablet: {
        breakpoint: { max: 1024, min: 640 },
        items: 2,
        partialVisibilityGutter: 20
    },
    mobile: {
        breakpoint: { max: 640, min: 0 },
        items: 1,
        partialVisibilityGutter: 10
    }
};

interface HotDealsProps {
    deals: any[]
    locale: string
}

export default function HotDeals({ deals, locale }: HotDealsProps) {
    const carouselRef = useRef<any>(null);
    const { t } = useLanguage();

    if (!deals || deals.length === 0) {
        return null
    }

    return (
        <section className="py-20 bg-primary text-white relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

                {/* Header & Navigation Wrapper */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8 relative">
                    <div className="max-w-2xl">
                        <div className="inline-block mb-6">
                            <span className="border border-white/20 rounded-full px-6 py-2 text-white/80 font-bold font-cabinet text-sm backdrop-blur-sm bg-white/5">
                                {t.home.hotDeals.badge}
                            </span>
                        </div>

                        <h2 className="text-[28px] lg:text-[35px] leading-tight font-cabinet font-extrabold text-white mb-6">
                            {t.home.hotDeals.heading}
                        </h2>

                        <p className="text-white/70 font-satoshi text-lg leading-relaxed max-w-xl">
                            {t.home.hotDeals.description}
                        </p>
                    </div>


                </div>

                {/* Carousel */}
                <div className="-mx-4 px-4 pb-8 relative group">
                    {/* Navigation Buttons */}
                    <button
                        onClick={() => carouselRef.current?.previous()}
                        className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-primary/80 backdrop-blur-sm shadow-lg text-white hover:bg-white hover:text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0"
                        aria-label="Previous deal"
                    >
                        <svg className="w-5 h-5 text-current transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => carouselRef.current?.next()}
                        className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-primary/80 backdrop-blur-sm shadow-lg text-white hover:bg-white hover:text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0"
                        aria-label="Next deal"
                    >
                        <svg className="w-5 h-5 text-current transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <Carousel
                        ref={carouselRef}
                        responsive={responsive}
                        infinite={true}
                        autoPlay={false}
                        keyBoardControl={true}
                        customTransition="transform 500ms ease-in-out"
                        transitionDuration={500}
                        containerClass="carousel-container overflow-visible"
                        itemClass="px-3"
                        arrows={false}
                        partialVisible={true}
                    >
                        {deals.map((deal) => {
                            const isTrip = deal.type === 'trip'
                            const href = isTrip
                                ? `/${locale}/tours/${deal.slug}`
                                : `/${locale}/our-services/${deal.slug}`
                            const imageUrl = deal.main_image || deal.cover_image || '/images/placeholder.jpg'

                            return (
                                <Link
                                    key={deal.id}
                                    href={href}
                                    className="block h-[400px] md:h-[480px] relative rounded-3xl overflow-hidden group select-none"
                                >
                                    <Image
                                        src={imageUrl}
                                        alt={deal.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 p-8 flex flex-col justify-between">

                                        {/* Top Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {/* Type Badge */}
                                            <span className={`${isTrip ? 'bg-blue-500/80' : 'bg-emerald-500/80'} backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10`}>
                                                {isTrip ? 'Trip' : 'Service'}
                                            </span>
                                            {deal.category?.name && (
                                                <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10">
                                                    {deal.category.name}
                                                </span>
                                            )}
                                            {deal.trip_type && (
                                                <span className="bg-secondary/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10">
                                                    {deal.trip_type}
                                                </span>
                                            )}
                                        </div>

                                        {/* Bottom Content */}
                                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="text-2xl font-cabinet font-bold text-white mb-3">
                                                {deal.title}
                                            </h3>
                                            <p className="text-white/80 font-satoshi text-sm mb-6 line-clamp-2">
                                                {deal.description}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <div className="px-6 py-2.5 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white hover:text-primary transition-all duration-300 backdrop-blur-sm">
                                                    View Deal
                                                </div>
                                                {deal.price && (
                                                    <div className="text-white font-bold text-xl">
                                                        ${deal.price}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </Carousel>
                </div>

            </div>
        </section>
    );
}
