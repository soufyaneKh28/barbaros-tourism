'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { MedicalTourismSection } from '@/lib/types';
import { Locale, getMessages } from '@/i18n';

interface MedicalDynamicSectionsProps {
    locale: Locale;
    sections: MedicalTourismSection[];
}

export default function MedicalDynamicSections({ locale, sections }: MedicalDynamicSectionsProps) {
    const t = getMessages(locale);

    if (!sections || sections.length === 0) {
        return null; // Or some fallback
    }

    return (
        <section className="py-12 md:py-24 bg-white space-y-24 md:space-y-32">
            {sections.map((section, index) => {
                const isEven = index % 2 === 0;
                const title = typeof section.title === 'string' ? section.title : section.title?.[locale] || '';
                const description = typeof section.description === 'string' ? section.description : section.description?.[locale] || '';

                return (
                    <div key={section.id} className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className={`flex flex-col-reverse ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                            {/* Text Content */}
                            <motion.div
                                className="flex-1 text-center lg:text-left rtl:lg:text-right"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-cabinet text-primary mb-6 leading-tight">
                                    {title}
                                </h2>
                                <div className="text-gray-600 font-satoshi text-lg leading-relaxed mb-8 whitespace-pre-wrap">
                                    {description}
                                </div>
                                <Link
                                    href={`/${locale}/contact-us`}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-[#A30E44] text-white rounded-full font-cabinet font-medium text-lg hover:bg-[#8B0C3A] transition-colors shadow-lg shadow-[#A30E44]/20 group"
                                >
                                    <span>{t.medical.services.learnMore || 'Learn More'}</span>
                                    <svg className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </motion.div>

                            {/* Image */}
                            {section.image_url && (
                                <motion.div
                                    className="flex-1 w-full"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
                                        <Image
                                            src={section.image_url}
                                            alt={title}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                        {/* Decorative Element */}
                                        <div className={`absolute -bottom-12 ${isEven ? '-left-12' : '-right-12'} w-24 h-24 bg-secondary/10 rounded-full blur-xl z-0`} />
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
