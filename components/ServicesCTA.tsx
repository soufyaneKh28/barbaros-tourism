'use client';

import { motion } from 'motion/react';
import { type Locale } from "@/i18n";
import CtaButton from './ui/CtaButton';

interface ServicesCTAProps {
    locale: Locale;
}

export default function ServicesCTA({ locale }: ServicesCTAProps) {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Background with Gradient and Blur */}
            <div className="absolute inset-0 bg-primary z-0" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 z-10" />

            <div className="max-w-4xl mx-auto text-center relative z-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-cabinet mb-8 text-white leading-tight"
                >
                    Ready to Start Your <br />
                    <span className="text-secondary text-glow">Perfect Journey?</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-xl text-white/80 font-satoshi mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    Contact us today to discuss your travel plans and let us create a personalized package that meets all your expectations.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                    <CtaButton href={`/${locale}/contact-us`}>
                        Schedule a Consultation
                    </CtaButton>
                    <CtaButton href={`/${locale}/tours`} variant="outline">
                        Explore Our Tours
                    </CtaButton>
                </motion.div>
            </div>
        </section>
    );
}
