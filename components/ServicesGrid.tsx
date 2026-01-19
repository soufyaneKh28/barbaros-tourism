'use client';

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const services = [
    {
        title: "Medical Tourism",
        description: "Access world-class healthcare in Türkiye with our comprehensive medical tourism packages, combining treatment and recovery.",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
        link: "/medical-tourism"
    },
    {
        title: "Integrated Services",
        description: "Experience hassle-free travel with our VIP transportation, luxury accommodation, and 24/7 dedicated support services.",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
        link: "/our-services"
    },
    {
        title: "Travel Tours",
        description: "Discover the hidden gems of Türkiye with curated cultural tours, historical expeditions, and breathtaking adventure trips.",
        image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop",
        link: "/tours"
    }
];

export default function ServicesGrid() {
    const pathname = usePathname();
    const locale = pathname?.split('/')[1] || 'en';

    return (
        <section className="py-24 px-6 bg-[#F9FAFB]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-secondary font-bold font-cabinet text-sm tracking-[0.2em] uppercase block mb-4"
                    >
                        OUR SERVICES
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold font-cabinet text-primary mb-6"
                    >
                        What our company provides
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-gray-600 font-satoshi text-lg leading-relaxed"
                    >
                        We offer specialized solutions tailored to your unique travel and healthcare needs,
                        ensuring every detail of your journey in Türkiye is perfectly managed.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className="bg-[#F3F4F6] rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                        >
                            {/* Image */}
                            <div className="relative h-[280px] w-full p-4">
                                <div className="relative h-full w-full rounded-[24px] overflow-hidden">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-8 pb-8 pt-2 flex flex-col flex-1">
                                <h3 className="text-2xl font-bold font-cabinet text-primary mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 font-satoshi leading-relaxed mb-8 flex-1">
                                    {service.description}
                                </p>

                                {/* Minimal Button */}
                                <div className="mt-auto">
                                    <Link
                                        href={`/${locale}${service.link}`}
                                        className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
