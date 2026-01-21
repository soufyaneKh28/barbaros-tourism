'use client';

import { motion } from "motion/react";
import Image from "next/image";

export default function MapPlaceholder() {
    return (
        <section className="h-[400px] w-full relative bg-gray-100 overflow-hidden">
            <Image
                src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop"
                alt="Map Background"
                fill
                className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-primary-900/10" />

            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm mx-4 text-center relative z-10"
                >
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold font-cabinet text-gray-900 mb-2">Visit Our Office</h3>
                    <p className="text-gray-600 font-satoshi mb-6">
                        Taksim Square, Beyoğlu<br />
                        Istanbul, Türkiye
                    </p>
                    <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold font-cabinet hover:bg-primary-600 transition-colors w-full justify-center"
                    >
                        Get Directions
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
