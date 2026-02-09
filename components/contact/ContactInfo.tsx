'use client';

import { motion } from "motion/react";
import { type Locale, getMessages } from "@/i18n";

interface ContactInfoProps {
    locale?: Locale;
}

export default function ContactInfo({ locale = 'en' }: ContactInfoProps) {
    const t = getMessages(locale);

    const contactDetails = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: t.contact.info.phone,
            info: ["+90 505 368 88 56"],
            color: "bg-blue-50 text-blue-600"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: t.contact.info.email,
            info: ["barbaros.grp@gmail.com"],
            color: "bg-purple-50 text-purple-600"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: t.contact.info.office.title,
            info: [t.contact.info.office.name, t.contact.info.office.address, t.contact.info.office.city],
            color: "bg-emerald-50 text-emerald-600"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: t.contact.info.hours.title,
            info: [t.contact.info.hours.monFri, t.contact.info.hours.sat, t.contact.info.hours.sun],
            color: "bg-orange-50 text-orange-600"
        }
    ];
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

                <h3 className="font-bold font-cabinet text-xl mb-4 relative z-10">{t.contact.info.connect}</h3>
                <div className="flex gap-4 relative z-10">
                    <a
                        href="https://www.facebook.com/barbaros.grp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm"
                    >
                        <span className="sr-only">Facebook</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                        </svg>
                    </a>
                    <a
                        href="https://www.instagram.com/barbaros.grp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm"
                    >
                        <span className="sr-only">Instagram</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 21h9a4.5 4.5 0 004.5-4.5v-9A4.5 4.5 0 0016.5 3h-9A4.5 4.5 0 003 7.5v9A4.5 4.5 0 007.5 21z" />
                        </svg>
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
