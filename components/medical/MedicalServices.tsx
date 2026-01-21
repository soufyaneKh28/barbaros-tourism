'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { type Locale, getMessages } from '@/i18n';

interface MedicalServicesProps {
    locale: Locale;
}

export default function MedicalServices({ locale }: MedicalServicesProps) {
    const t = getMessages(locale);

    const services = [
        {
            id: 1,
            title: t.medical.services.types.hair.title,
            image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
            procedures: ["FUE Method", "DHI Technique", "Sapphire FUE", "Beard Transplant"],
            price: t.medical.services.types.hair.price,
            description: t.medical.services.types.hair.description,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
        },
        {
            id: 2,
            title: t.medical.services.types.dental.title,
            image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
            procedures: ["Dental Implants", "Porcelain Veneers", "Hollywood Smile", "Teeth Whitening"],
            price: t.medical.services.types.dental.price,
            description: t.medical.services.types.dental.description,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            id: 3,
            title: t.medical.services.types.cosmetic.title,
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
            procedures: ["Rhinoplasty", "Liposuction", "Breast Augmentation", "Tummy Tuck"],
            price: t.medical.services.types.cosmetic.price,
            description: t.medical.services.types.cosmetic.description,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
        },
        {
            id: 4,
            title: t.medical.services.types.eye.title,
            image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
            procedures: ["LASIK Surgery", "Cataract Surgery", "Lens Replacement", "Eye Lift"],
            price: t.medical.services.types.eye.price,
            description: t.medical.services.types.eye.description,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ),
        },
        {
            id: 5,
            title: t.medical.services.types.bariatric.title,
            image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop",
            procedures: ["Gastric Sleeve", "Gastric Bypass", "Gastric Balloon", "Mini Gastric"],
            price: t.medical.services.types.bariatric.price,
            description: t.medical.services.types.bariatric.description,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
        },
        {
            id: 6,
            title: t.medical.services.types.orthopedics.title,
            image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800&auto=format&fit=crop",
            procedures: ["Hip Replacement", "Knee Surgery", "Spine Surgery", "Sports Medicine"],
            price: t.medical.services.types.orthopedics.price,
            description: t.medical.services.types.orthopedics.description,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
        },
    ];
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <span className="border border-secondary/20 rounded-full px-6 py-2 text-secondary font-bold font-cabinet text-sm">
                            {t.medical.services.badge}
                        </span>
                    </div>
                    <h2 className="text-[32px] lg:text-[42px] leading-tight font-cabinet font-extrabold text-primary mb-4">
                        {t.medical.services.heading}
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600 font-satoshi text-lg leading-relaxed">
                        {t.medical.services.description}
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                {/* Icon */}
                                <div className="absolute top-4 right-4 w-12 h-12 bg-secondary/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                                    {service.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold font-cabinet mb-2 text-primary group-hover:text-secondary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 font-satoshi text-sm mb-4">
                                    {service.description}
                                </p>

                                {/* Procedures */}
                                <ul className="space-y-2 mb-5">
                                    {service.procedures.map((procedure, idx) => (
                                        <li key={idx} className="flex items-center text-gray-700 font-satoshi text-sm">
                                            <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 flex-shrink-0" />
                                            {procedure}
                                        </li>
                                    ))}
                                </ul>

                                {/* Price & CTA */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="text-primary font-bold font-cabinet text-lg">
                                        {service.price}
                                    </span>
                                    <Link href={`/${locale}/contact-us`}>
                                        <button className="text-secondary font-cabinet font-medium flex items-center gap-1 hover:gap-2 transition-all">
                                            {t.medical.services.learnMore}
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </button>
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
