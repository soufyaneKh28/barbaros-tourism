'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const deals = [
    {
        id: 1,
        title: 'Kyoto Cultural Escape',
        description: "Explore Kyoto's iconic landmarks with a complete, well-planned city tour experience.",
        image: '/images/generated/services_section_image.png', // Placeholder
        tags: ['Cultural Tours', 'Guided Experiences'],
    },
    {
        id: 2,
        title: 'Istanbul City Experience',
        description: "Discover the magic of Istanbul, where history meets modern life, with a complete and well-organized city tour.",
        image: '/images/generated/destinations_turkey_istanbul.png',
        tags: ['Guided Tours', 'Comfortable Transfers'],
    },
    {
        id: 3,
        title: 'Paris Romantic Getaway',
        description: "Enjoy the charm of Paris with a carefully designed trip covering iconic attractions and unforgettable moments.",
        image: '/images/generated/destinations_france.png',
        tags: ['City Tours', 'Cultural Experiences'],
    },
    {
        id: 4,
        title: 'Bali Tropical Paradise',
        description: "Relax in the stunning landscapes of Bali with our exclusive tour package including best spots.",
        image: '/images/generated/services_tours.png', // Placeholder
        tags: ['Nature', 'Relaxation'],
    },
    {
        id: 5,
        title: 'Cappadocia Adventure',
        description: "Experience the magic of hot air balloons and fairy chimneys in this unique adventure.",
        image: '/images/generated/destinations_turkey_cappadocia.png',
        tags: ['Adventure', 'Scenic Views'],
    }
];

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

export default function HotDeals() {
    const carouselRef = useRef<any>(null);

    return (
        <section className="py-20 bg-primary text-white relative overflow-hidden">
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
                                Hot Deals
                            </span>
                        </div>

                        <h2 className="text-[32px] lg:text-[42px] leading-tight font-cabinet font-extrabold text-white mb-6">
                            Limited-Time Offers on <span className="text-secondary">Selected Trips</span>
                        </h2>

                        <p className="text-white/70 font-satoshi text-lg leading-relaxed max-w-xl">
                            Explore our best travel packages with exclusive discounts.
                            Don't miss the chance to book your dream vacation at an unbeatable price.
                        </p>
                    </div>

                    {/* Custom Arrows */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => carouselRef.current?.previous()}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300 group"
                            aria-label="Previous deal"
                        >
                            <svg className="w-5 h-5 text-white group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => carouselRef.current?.next()}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300 group"
                            aria-label="Next deal"
                        >
                            <svg className="w-5 h-5 text-white group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <div className="-mx-4 px-4 pb-8">
                    <Carousel
                        ref={carouselRef}
                        responsive={responsive}
                        infinite={true}
                        autoPlay={false}
                        keyBoardControl={true}
                        customTransition="transform 500ms ease-in-out"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        itemClass="px-3"
                        arrows={false}
                        partialVisible={true}
                    >
                        {deals.map((deal) => (
                            <div
                                key={deal.id}
                                className="h-[400px] md:h-[480px] relative rounded-3xl overflow-hidden group select-none"
                            >
                                <Image
                                    src={deal.image}
                                    alt={deal.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 p-8 flex flex-col justify-between">

                                    {/* Top Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {deal.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Bottom Content */}
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-2xl font-cabinet font-bold text-white mb-3">
                                            {deal.title}
                                        </h3>
                                        <p className="text-white/80 font-satoshi text-sm mb-6 line-clamp-2">
                                            {deal.description}
                                        </p>

                                        <button className="px-6 py-2.5 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white hover:text-primary transition-all duration-300 backdrop-blur-sm">
                                            View Deal
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>

            </div>
        </section>
    );
}
