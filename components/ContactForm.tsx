'use client';

import { motion } from "motion/react";
import { useState } from "react";

export default function ContactForm() {
    const [focusedField, setFocusedField] = useState<string | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>

            <div className="relative z-10">
                <h2 className="text-3xl font-bold font-cabinet mb-2 text-gray-900">Send us a Message</h2>
                <p className="text-gray-500 font-satoshi mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>

                <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative">
                            <label
                                htmlFor="firstName"
                                className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'firstName' ? '-top-2.5 text-xs bg-white px-2 text-primary font-bold' : 'top-3.5 text-gray-400'
                                    }`}
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                onFocus={() => setFocusedField('firstName')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-satoshi"
                            />
                        </div>
                        <div className="relative">
                            <label
                                htmlFor="lastName"
                                className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'lastName' ? '-top-2.5 text-xs bg-white px-2 text-primary font-bold' : 'top-3.5 text-gray-400'
                                    }`}
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                onFocus={() => setFocusedField('lastName')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-satoshi"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label
                            htmlFor="email"
                            className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'email' ? '-top-2.5 text-xs bg-white px-2 text-primary font-bold' : 'top-3.5 text-gray-400'
                                }`}
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-satoshi"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative">
                            <label
                                htmlFor="phone"
                                className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'phone' ? '-top-2.5 text-xs bg-white px-2 text-primary font-bold' : 'top-3.5 text-gray-400'
                                    }`}
                            >
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                onFocus={() => setFocusedField('phone')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-satoshi"
                            />
                        </div>
                        <div className="relative">
                            <select
                                id="service"
                                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-satoshi appearance-none text-gray-700"
                            >
                                <option value="" disabled selected>Select Interest</option>
                                <option>Cultural Tours</option>
                                <option>Adventure Tours</option>
                                <option>Medical Tourism - Hair Transplant</option>
                                <option>Medical Tourism - Dental</option>
                                <option>Medical Tourism - Cosmetic Surgery</option>
                                <option>Custom Package</option>
                                <option>Other</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <label
                            htmlFor="message"
                            className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'message' ? '-top-2.5 text-xs bg-white px-2 text-primary font-bold' : 'top-3.5 text-gray-400'
                                }`}
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows={5}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-satoshi resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-bold font-cabinet transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group"
                    >
                        Send Message
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </form>
            </div>
        </motion.div>
    );
}
