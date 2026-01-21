'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import CtaButton from '../ui/CtaButton';
import { type Locale, getMessages } from '@/i18n';


export default function MedicalHero({ locale }: { locale: Locale }) {
    const t = getMessages(locale);
    return (
        <section className="relative m-2 rounded-[20px] overflow-hidden min-h-[600px] flex items-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2070&auto=format&fit=crop"
                    alt="Medical Tourism"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-primary/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 w-full">
                <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                    {/* Badge */}
                    <motion.div
                        className="inline-block mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="bg-secondary/90 backdrop-blur-sm rounded-full text-white px-4 py-2 text-sm font-medium font-cabinet border border-white/10">
                            {t.medical.hero.tagline}
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        className="text-[38px] leading-[42px] lg:text-5xl lg:leading-[56px] font-bold text-white mb-4 font-cabinet drop-shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {t.medical.hero.heading}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        className="text-[18px] leading-[28px] text-white/95 mb-8 font-satoshi drop-shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {t.medical.hero.description}
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        className="grid grid-cols-3 gap-6 mb-8 w-full max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <div>
                            <div className="text-3xl font-bold text-secondary font-cabinet">50+</div>
                            <div className="text-sm text-white/80 font-satoshi">{t.medical.whyChoose.stats.hospitals}</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-secondary font-cabinet">70%</div>
                            <div className="text-sm text-white/80 font-satoshi">{t.medical.whyChoose.stats.savings}</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-secondary font-cabinet">500K+</div>
                            <div className="text-sm text-white/80 font-satoshi">{t.medical.whyChoose.stats.patients}</div>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <CtaButton href={`/${locale}/contact-us`}>
                            {t.contact.form.submit}
                        </CtaButton>
                        <CtaButton variant="outline">
                            {t.medical.services.learnMore}
                        </CtaButton>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
