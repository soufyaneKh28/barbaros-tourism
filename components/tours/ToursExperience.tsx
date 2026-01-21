'use client';

import { motion } from "motion/react";

const experienceItems = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        title: "Expert Local Guides",
        description: "Passionate professionals who bring history and culture to life with deep local knowledge."
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        title: "Handpicked Stays",
        description: "From boutique cave hotels in Cappadocia to luxury beach resorts in Antalya."
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
        ),
        title: "Seamless Logistics",
        description: "Stress-free travel with private VIP transfers and coordinated schedules."
    },
];

export default function ToursExperience() {
    return (
        <section className="py-20 px-6 bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold font-cabinet text-center mb-16 text-primary">The Barbaros Experience</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {experienceItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-primary-100/50 rounded-2xl flex items-center justify-center text-primary-700 mb-6">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold font-cabinet mb-3 text-primary">{item.title}</h3>
                            <p className="text-gray-600 font-satoshi leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
