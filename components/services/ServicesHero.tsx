'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import CtaButton from '../ui/CtaButton';
import Navbar from '../common/Navbar';
import { type Locale, getMessages } from "@/i18n";

interface ServicesHeroProps {
    locale: Locale;
}

export default function ServicesHero({ locale }: ServicesHeroProps) {
    const t = getMessages(locale);

    return (
        <section className="relative m-2 rounded-[32px] overflow-hidden flex flex-col min-h-[600px] lg:min-h-[600px]">
            {/* Navbar integrated into Hero */}
            {/* <div className="absolute top-0 left-0 right-0 z-50">
                <Navbar locale={locale} transparent={true} />
            </div> */}

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
                    alt="Our Services"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />

                {/* Modern Overlays */}
                <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-transparent to-primary/80 z-10" />
            </div>

            {/* Content Container */}
            <div className="relative z-20 flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto px-6 py-24 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block mb-8"
                >
                    <span className="bg-secondary/90 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 text-white font-bold font-cabinet text-xs tracking-widest uppercase">
                        {t.servicesPage.hero.badge}
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-2xl md:text-2xl lg:text-5xl font-extrabold font-cabinet text-white mb-3 leading-[1] drop-shadow-2xl"
                >
                    {t.servicesPage.hero.heading}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl md:text-lg text-white/95 font-satoshi leading-relaxed mb-12 max-w-3xl mx-auto drop-shadow-lg"
                >
                    {t.servicesPage.hero.description}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex justify-center"
                >
                    <CtaButton href={`/${locale}/contact-us`}>
                        {t.servicesPage.hero.cta}
                    </CtaButton>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block"
            >
                <div className="w-[30px] h-[50px] border-2 border-white/30 rounded-full flex justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 bg-secondary rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}
