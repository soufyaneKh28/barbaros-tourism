'use client';

import { motion } from "motion/react";
import Image from "next/image";
import { useSiteContent } from '@/contexts/SiteContentContext';

interface ToursHeroProps {
    locale: string;
}

export default function ToursHero({ locale }: ToursHeroProps) {
    const { toursHero } = useSiteContent();

    return (
        <section className="relative m-2 rounded-[20px] overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-[500px]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={toursHero.image}
                    alt="Tours Hero"
                    fill
                    className="object-cover"
                    priority
                    loading="eager"
                    fetchPriority="high"
                    quality={100}
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/50 to-slate-900/30 z-10" />
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block mb-4"
                >
                    <span className="bg-secondary text-primary font-bold px-6 py-2 rounded-full text-sm">
                        {toursHero.badge}
                    </span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold font-cabinet mb-6"
                >
                    {toursHero.heading}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg font-satoshi max-w-2xl mx-auto"
                >
                    {toursHero.description}
                </motion.p>
            </div>
        </section>
    );
}
