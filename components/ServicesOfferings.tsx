'use client';

import { motion } from 'motion/react';
import { type Locale, getMessages } from "@/i18n";

interface ServicesOfferingsProps {
    locale?: Locale;
}

export default function ServicesOfferings({ locale = 'en' }: ServicesOfferingsProps) {
    const t = getMessages(locale);

    const offerings = [
        {
            title: t.servicesOfferings.items.cultural.title,
            description: t.servicesOfferings.items.cultural.description,
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
            ),
            features: t.servicesOfferings.items.cultural.features
        },
        {
            title: t.servicesOfferings.items.adventure.title,
            description: t.servicesOfferings.items.adventure.description,
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
            ),
            features: t.servicesOfferings.items.adventure.features
        },
        {
            title: t.servicesOfferings.items.medical.title,
            description: t.servicesOfferings.items.medical.description,
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            ),
            features: t.servicesOfferings.items.medical.features
        },
        {
            title: t.servicesOfferings.items.accommodation.title,
            description: t.servicesOfferings.items.accommodation.description,
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21V5a2 2 0 00-2-2H5a2 2 0 00-2 2v16m14-2h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            features: t.servicesOfferings.items.accommodation.features
        },
        {
            title: t.servicesOfferings.items.transportation.title,
            description: t.servicesOfferings.items.transportation.description,
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.833-13.2a1.125 1.125 0 00-1.124-1.076H11.562a1.125 1.125 0 00-1.125 1.125v12.21c0 .26-.134.498-.354.636l-1.63.1.258-4.22c.026-.425-.21-.82-.601-1l-2.03-1.22c-.22-.132-.486-.164-.728-.088l-1.03.32c-.524.162-.806.716-.621 1.232l.833 2.323c.123.344.436.58.804.605l2.64.18c.205.014.398.11.536.266l.794.9" />
                </svg>
            ),
            features: t.servicesOfferings.items.transportation.features
        },
        {
            title: t.servicesOfferings.items.custom.title,
            description: t.servicesOfferings.items.custom.description,
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.035-.259a3.375 3.375 0 002.456-2.455L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.455zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
            ),
            features: t.servicesOfferings.items.custom.features
        },
    ];

    return (
        <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-secondary font-bold font-cabinet text-sm tracking-[0.2em] uppercase block mb-4"
                    >
                        {t.servicesOfferings.badge}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold font-cabinet text-primary mb-6"
                    >
                        {t.servicesOfferings.heading}
                    </motion.h2>
                    <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {offerings.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 group relative overflow-hidden"
                        >
                            {/* Card Background Decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-[100px] transition-all duration-300 group-hover:scale-150 group-hover:bg-secondary/10" />

                            <div className="relative z-10">
                                {/* Icon Container */}
                                <div className="w-16 h-16 bg-[#F3F4F6] rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl font-bold font-cabinet mb-4 text-primary group-hover:text-secondary transition-colors duration-300">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 font-satoshi mb-8 leading-relaxed">
                                    {service.description}
                                </p>

                                <ul className="space-y-4">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-700 font-satoshi font-medium">
                                            <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center mr-3 group-hover:bg-secondary/20 transition-colors">
                                                <svg className="w-3.5 h-3.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
