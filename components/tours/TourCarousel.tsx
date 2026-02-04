'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { motion } from "motion/react";
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';

interface TourItem {
    id: number | string;
    title: string;
    description: string;
    image: string;
    price?: string;
    tags?: string[];
    link?: string;
    ctaText?: string;
}

interface TourCarouselProps {
    title: string;
    badge: string;
    description?: string;
    items: TourItem[];
    dark?: boolean;
}

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

export default function TourCarousel({ title, badge, description, items, dark = false }: TourCarouselProps) {
    const { locale, t } = useLanguage();
    const carouselRef = useRef<any>(null);
    const isRtl = locale === 'ar';

    return (
        <section className={`py-20 ${dark ? 'bg-primary text-white' : 'bg-white text-gray-900'} relative overflow-hidden`}>
            {/* Background Pattern for dark mode */}
            {dark && (
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-10"></div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="inline-block mb-4"
                        >
                            <span className={`px-6 py-2 rounded-full font-bold font-cabinet text-sm backdrop-blur-sm border ${dark ? 'border-white/20 text-white/80 bg-white/5' : 'border-secondary/20 text-secondary bg-secondary/5'}`}>
                                {badge}
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className={`text-[32px] lg:text-[42px] leading-tight font-cabinet font-extrabold mb-6 ${dark ? 'text-white' : 'text-primary'}`}
                        >
                            {title}
                        </motion.h2>

                        {description && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                                className={`text-lg font-satoshi leading-relaxed max-w-xl ${dark ? 'text-white/70' : 'text-gray-500'}`}
                            >
                                {description}
                            </motion.p>
                        )}
                    </div>


                </div>

                {/* Carousel */}
                <div className="-mx-4 px-4 pb-8 relative group">
                    {/* Navigation Buttons */}
                    <button
                        onClick={() => carouselRef.current?.previous()}
                        className={`absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 shadow-lg ${dark ? 'bg-primary/80 border-white/20 text-white hover:bg-white hover:text-primary' : 'bg-white/80 border-primary/20 text-primary hover:bg-primary hover:text-white'} backdrop-blur-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 disabled:opacity-0`}
                        aria-label="Previous"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => carouselRef.current?.next()}
                        className={`absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 shadow-lg ${dark ? 'bg-primary/80 border-white/20 text-white hover:bg-white hover:text-primary' : 'bg-white/80 border-primary/20 text-primary hover:bg-primary hover:text-white'} backdrop-blur-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 disabled:opacity-0`}
                        aria-label="Next"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <Carousel
                        ref={carouselRef}
                        responsive={responsive}
                        infinite={true}
                        rtl={isRtl}
                        autoPlay={false}
                        keyBoardControl={true}
                        customTransition="transform 600ms cubic-bezier(0.4, 0, 0.2, 1)"
                        transitionDuration={600}
                        containerClass="carousel-container overflow-visible"
                        itemClass="px-3"
                        arrows={false}
                    >
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="h-[420px] md:h-[500px] relative rounded-[32px] overflow-hidden group select-none shadow-lg hover:shadow-2xl transition-all duration-500"
                                dir={isRtl ? 'rtl' : 'ltr'}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-between ${isRtl ? 'text-right' : 'text-left'}`}>
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-wrap gap-2">
                                            {item.tags?.map((tag, idx) => (
                                                <span key={idx} className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        {item.price && (
                                            <div className="bg-secondary text-primary font-bold px-4 py-1.5 rounded-full text-sm shadow-lg">
                                                {item.price}
                                            </div>
                                        )}
                                    </div>

                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        <h3 className="text-2xl font-cabinet font-bold text-white mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="text-white/80 font-satoshi text-sm mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            {item.description}
                                        </p>

                                        <Link
                                            href={`${item.link || `/${locale}/contact-us`}`}
                                            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-primary font-bold text-sm hover:bg-secondary transition-all duration-300 ${isRtl ? 'flex-row-reverse' : ''}`}
                                        >
                                            {item.ctaText || (t as any).common?.viewDetails || 'View Details'}
                                            <svg className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
