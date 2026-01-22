'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useLanguage } from '@/hooks/use-language';

export default function VideoSection() {
    const { t } = useLanguage();

    return (
        <section className="py-12 px-2 lg:px-6">
            <div className="max-w-7xl mx-auto relative h-[500px] rounded-[32px] overflow-hidden group cursor-pointer">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070&auto=format&fit=crop" // Bali temple/nature
                        alt="Video background"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-black/60 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-16 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-white/90 font-cabinet font-medium tracking-widest text-sm mb-4 uppercase">
                            {t.home.videoSection.subtitle}
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-cabinet font-bold text-white mb-8 leading-tight">
                            {t.home.videoSection.title}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <button className="flex items-center gap-3 bg-white hover:bg-white/90 text-primary px-6 py-3 rounded-xl transition-all font-cabinet font-bold group/btn">
                            <span className="flex items-center justify-center w-8 h-8 bg-primary rounded-full text-white">
                                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </span>
                            {t.home.videoSection.cta}
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
