'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';
import { Program } from '@/lib/types';
import { motion, useInView } from 'motion/react';

interface FeaturedProgramsProps {
    programs?: Program[]
    locale?: string
}

export default function FeaturedPrograms({ programs = [], locale = 'en' }: FeaturedProgramsProps) {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    if (!programs || programs.length === 0) return null;

    return (
        <section ref={ref} className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* Header */}
                <motion.div
                    className="flex flex-col items-center text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-block mb-6">
                        <span className="border border-secondary/20 rounded-full px-6 py-2 text-secondary font-bold font-cabinet text-sm">
                            {(t as any).home.featuredPrograms?.badge || "Our Programs"}
                        </span>
                    </div>

                    <h2 className="text-[28px] lg:text-[35px] leading-tight font-cabinet font-extrabold text-primary mb-6">
                        {(t as any).home.featuredPrograms?.heading || "Featured Tourism Programs"}
                    </h2>

                    <p className="max-w-2xl text-gray-600 font-satoshi text-lg leading-relaxed">
                        {(t as any).home.featuredPrograms?.description || "Explore our top-rated programs designed for unforgettable experiences."}
                    </p>
                </motion.div>

                {/* Grid Wrapper */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
                    {programs.map((program, index) => {
                        // Logic for layout: First item big, others small
                        const isFirst = index === 0;
                        const colSpanClass = isFirst ? 'md:col-span-2' : 'md:col-span-1';

                        return (
                            <motion.div
                                key={program.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={colSpanClass}
                            >
                                <Link
                                    href={`/${locale}/programs/${program.slug}`}
                                    className={`relative cursor-pointer rounded-3xl overflow-hidden group h-[300px] md:h-[400px] block border border-gray-100 shadow-sm`}
                                >
                                    <div className="absolute inset-0 bg-primary/5">
                                        {program.main_image ? (
                                            <Image
                                                src={program.main_image}
                                                alt={program.title as string}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                        <span className="inline-block bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">
                                            {program.duration_text as string}
                                        </span>
                                        <h3 className="text-white font-cabinet font-bold text-2xl md:text-3xl mb-2">{program.title as string}</h3>
                                        <p className="text-white/80 font-satoshi text-sm line-clamp-2">{program.description as string}</p>
                                    </div>

                                    {/* Arrow Icon */}
                                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <Link href={`/${locale}/programs`} className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors">
                        {(t as any).home.featuredPrograms?.viewAll || "View All Programs"}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
