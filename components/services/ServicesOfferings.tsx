'use client';

import { motion } from 'motion/react';
import { type Locale } from "@/i18n";
import Image from 'next/image';
import { useSiteContent } from '@/contexts/SiteContentContext';

interface ServicesOfferingsProps {
    locale?: Locale;
    services?: any[];
}

export default function ServicesOfferings({ locale = 'en', services: dynamicServices }: ServicesOfferingsProps) {
    const { generic } = useSiteContent();
    const t = generic.services_offerings;

    // Static fallback offerings with placeholder images
    const staticOfferings = t.items.map((item: any) => ({
        title: item.title,
        description: item.description,
        image: item.image,
        cta_text: undefined,
        cta_link: undefined,
        is_coming_soon: false,
    }));

    // Use dynamic services if available, otherwise use static
    const offerings = dynamicServices && dynamicServices.length > 0
        ? dynamicServices.map((service) => ({
            title: service.service_name,
            description: service.service_details,
            image: service.cover_image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2035&auto=format&fit=crop",
            cta_text: service.cta_text,
            cta_link: service.cta_link,
            is_coming_soon: service.is_coming_soon,
        }))
        : staticOfferings;

    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-secondary font-bold font-cabinet text-sm tracking-[0.2em] uppercase block mb-4"
                    >
                        {t.badge}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold font-cabinet text-primary mb-6"
                    >
                        {t.heading}
                    </motion.h2>
                    <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full" />
                </div>

                {/* Services Grid - Alternating Layout */}
                <div className="space-y-32">
                    {offerings.map((service: any, index: number) => {
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className={`flex flex-col ${isEven ? 'lg:flex-row justify-between' : 'lg:flex-row-reverse justify-between'} gap-12 items-center`}
                            >
                                {/* Image Section */}
                                <div className="w-full lg:w-2/5 relative">
                                    <div className={`relative rounded-[40px] shadow-2xl ${isEven ? 'lg:rounded-tr-[100px]' : 'lg:rounded-tl-[100px]'}`}>
                                        <div className={`absolute inset-0 translate-x-5 translate-y-5 border-[8px] bg-secondary border-secondary rounded-[40px] ${isEven ? 'lg:rounded-tr-[100px]' : 'lg:rounded-tl-[100px]'} pointer-events-none z-0`} />
                                        {/* Decorative border */}

                                        {/* Image */}
                                        <div className={`relative aspect-[4/3] overflow-hidden rounded-[40px] ${isEven ? 'lg:rounded-tr-[100px]' : 'lg:rounded-tl-[100px]'}`}>
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                className={`object-cover ${service.is_coming_soon ? 'grayscale' : ''}`}
                                            />
                                            {service.is_coming_soon && (
                                                <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10">
                                                    Coming Soon
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="w-full lg:w-2/5">
                                    <motion.h3
                                        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        viewport={{ once: true }}
                                        className="text-2xl md:text-4xl font-bold font-cabinet text-primary mb-3"
                                    >
                                        {service.title}
                                    </motion.h3>

                                    <motion.p
                                        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        viewport={{ once: true }}
                                        className="text-gray-600 font-satoshi text-lg leading-relaxed mb-8"
                                    >
                                        {service.description}
                                    </motion.p>

                                    {/* CTA Button */}
                                    <motion.a
                                        href={service.cta_link || "https://wa.me/905053688856"}
                                        target={service.cta_link?.startsWith('http') ? "_blank" : undefined}
                                        rel={service.cta_link?.startsWith('http') ? "noopener noreferrer" : undefined}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                        viewport={{ once: true }}
                                        className="inline-flex items-center gap-2 bg-secondary hover:bg-primary text-white font-bold font-cabinet px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                                    >
                                        {service.cta_text || t.ctaButtonLabel}
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </motion.a>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
