'use client';

import { motion } from 'motion/react';
import { type Locale, getMessages } from '@/i18n';

interface MedicalProcessProps {
    locale: Locale;
}

export default function MedicalProcess({ locale }: MedicalProcessProps) {
    const t = getMessages(locale);

    const steps = [
        {
            number: "01",
            title: t.process.steps.consultation.title,
            description: t.process.steps.consultation.description,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            ),
        },
        {
            number: "02",
            title: t.process.steps.plan.title,
            description: t.process.steps.plan.description,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
        {
            number: "03",
            title: t.process.steps.travel.title,
            description: t.process.steps.travel.description,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            number: "04",
            title: t.process.steps.arrival.title,
            description: t.process.steps.arrival.description,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
        },
        {
            number: "05",
            title: t.process.steps.procedure.title,
            description: t.process.steps.procedure.description,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        {
            number: "06",
            title: t.process.steps.recovery.title,
            description: t.process.steps.recovery.description,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
        },
    ];
    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <span className="border border-secondary/20 rounded-full px-6 py-2 text-secondary font-bold font-cabinet text-sm">
                            {t.process.badge}
                        </span>
                    </div>
                    <h2 className="text-[32px] lg:text-[42px] leading-tight font-cabinet font-extrabold text-primary mb-4">
                        {t.process.heading}
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600 font-satoshi text-lg leading-relaxed">
                        {t.process.description}
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Connecting Line */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary/20 via-secondary/40 to-secondary/20 transform -translate-x-1/2" />

                    {/* Steps */}
                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                            >
                                {/* Content */}
                                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                                        <div className="flex items-center gap-3 mb-3">
                                            {index % 2 === 0 && <div className="lg:flex-1" />}
                                            <span className="text-4xl font-bold font-cabinet text-secondary/20">
                                                {step.number}
                                            </span>
                                            {index % 2 !== 0 && <div className="lg:flex-1" />}
                                        </div>
                                        <h3 className="text-2xl font-bold font-cabinet text-primary mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 font-satoshi">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Icon Circle */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center text-white shadow-lg z-10 relative">
                                        {step.icon}
                                    </div>
                                    <div className="absolute inset-0 bg-secondary/20 rounded-full animate-ping" />
                                </div>

                                {/* Spacer for alternating layout */}
                                <div className="flex-1 hidden lg:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
