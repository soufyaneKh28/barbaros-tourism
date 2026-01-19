'use client';

import { motion } from "motion/react";

const contactDetails = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
        title: "Phone",
        info: ["+90 555 123 4567", "+90 555 987 6543"],
        color: "bg-blue-50 text-blue-600"
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        title: "Email",
        info: ["info@barbarostourism.com", "medical@barbarostourism.com"],
        color: "bg-purple-50 text-purple-600"
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        title: "Office",
        info: ["Barbaros Tourism Agency", "Taksim Square, Beyoğlu", "Istanbul, Türkiye 34437"],
        color: "bg-emerald-50 text-emerald-600"
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: "Hours",
        info: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM", "Sun: Closed"],
        color: "bg-orange-50 text-orange-600"
    }
];

export default function ContactInfo() {
    return (
        <div className="grid sm:grid-cols-2 gap-6">
            {contactDetails.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
                >
                    <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                    </div>
                    <h3 className="font-bold font-cabinet text-lg text-gray-900 mb-2">{item.title}</h3>
                    <div className="space-y-1">
                        {item.info.map((line, idx) => (
                            <p key={idx} className="text-gray-600 font-satoshi text-sm">{line}</p>
                        ))}
                    </div>
                </motion.div>
            ))}

            {/* Social Media Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary-900 to-primary-800 p-6 rounded-2xl shadow-lg border border-primary-700 sm:col-span-2 text-white relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-8 -mt-8"></div>

                <h3 className="font-bold font-cabinet text-xl mb-4 relative z-10">Connect With Us</h3>
                <div className="flex gap-4 relative z-10">
                    {['facebook', 'instagram', 'twitter', 'linkedin'].map((social, idx) => (
                        <a
                            key={idx}
                            href="#"
                            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm"
                        >
                            <span className="sr-only">{social}</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                        </a>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
