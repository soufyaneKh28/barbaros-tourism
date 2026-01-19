'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
    {
        question: "Do I need a visa to travel to Turkey?",
        answer: "Visa requirements depend on your nationality. Many countries can obtain an e-visa online before travel. We recommend checking the official Turkish Ministry of Foreign Affairs website or contacting our team for assistance."
    },
    {
        question: "How do I book a medical consultation?",
        answer: "You can start by filling out our contact form or messaging us directly. Our medical coordinators will request your medical history and photos for a preliminary assessment by our specialized doctors."
    },
    {
        question: "Does the tour price include flights?",
        answer: "Our standard tour packages typically include accommodation, domestic transfers, and guided tours. International flights are usually not included to give you flexibility, but we can assist with flight bookings upon request."
    },
    {
        question: "Is it safe to travel to Turkey?",
        answer: "Yes, Turkey is a popular and safe tourist destination. Like any country, it's recommended to follow standard travel advice. Our team monitors all destinations to ensure your safety and comfort."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept major credit cards, bank transfers, and in some cases, cash payments upon arrival. Secure payment links are provided for deposit payments to confirm your booking."
    }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-secondary font-bold font-cabinet text-sm uppercase tracking-wider mb-2 block">
                        GOT QUESTIONS?
                    </span>
                    <h2 className="text-4xl font-bold font-cabinet text-gray-900">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                            >
                                <span className="font-bold font-cabinet text-lg text-gray-900 pr-8">{faq.question}</span>
                                <span className={`flex-shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300 ${activeIndex === index ? 'bg-primary text-white border-primary rotate-45' : 'text-gray-400 bg-gray-50'}`}>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </span>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-8 pb-8 pt-0">
                                            <p className="text-gray-600 font-satoshi leading-relaxed border-t border-gray-50 pt-4">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
