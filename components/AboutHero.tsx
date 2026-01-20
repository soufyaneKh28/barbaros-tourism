'use client';

import { motion } from "motion/react";
import Image from "next/image";

interface AboutHeroProps {
    locale: string;
}

export default function AboutHero({ locale }: AboutHeroProps) {
    return (
        <section className="relative m-2 rounded-[20px] overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-[500px]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop"
                    alt="About Us Hero"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
                <div className="absolute inset-0 bg-black/40 z-10" />
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block mb-4"
                >
                    <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-6 py-2 rounded-full text-sm font-cabinet tracking-widest">
                        WHO WE ARE
                    </span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold font-cabinet mb-3"
                >
                    About Us
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg font-satoshi max-w-2xl mx-auto text-white/90"
                >
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </motion.p>
            </div>
        </section>
    );
}
