'use client';

import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { type Locale } from "@/i18n";

interface ContactHeroProps {
    locale: Locale;
}

export default function ContactHero({ locale }: ContactHeroProps) {
    return (
        <section className="relative min-h-[50vh] flex flex-col">
            <Navbar locale={locale} transparent={true} />

            {/* Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop"
                    alt="Contact Us Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/80 to-primary-900/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-6 py-20 ">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <span className="inline-block px-6 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 font-bold font-cabinet text-sm mb-6">
                        GET IN TOUCH
                    </span>
                    <h1 className="text-5xl md:text-5xl font-bold font-cabinet text-white mb-6 leading-[40px]">
                        Let's Start Your <br />
                        <span className="text-secondary">Journey</span>
                    </h1>
                    <p className="text-lg font-satoshi text-white/80 leading-relaxed max-w-2xl mx-auto">
                        Whether you're planning a dream vacation or seeking world-class medical care,
                        our team of experts is here to guide you every step of the way.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
