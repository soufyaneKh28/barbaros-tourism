'use client';

import { motion } from "motion/react";
import { useState } from "react";
import { type Locale, getMessages } from "@/i18n";
import { submitContactFormAction } from "@/app/actions/messages";

interface ContactFormProps {
    locale?: Locale;
}

export default function ContactForm({ locale = 'en' }: ContactFormProps) {
    const t = getMessages(locale);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        // Client-side validation
        const name = `${formData.firstName} ${formData.lastName}`.trim();

        if (name.length < 2) {
            setError('Please enter your full name');
            setLoading(false);
            return;
        }

        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        if (formData.message.trim().length < 10) {
            setError('Message must be at least 10 characters');
            setLoading(false);
            return;
        }

        // Submit to server
        const data = new FormData();
        data.append('name', name);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('subject', formData.subject);
        data.append('message', formData.message);

        const result = await submitContactFormAction(data);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            // Hide success message after 5 seconds
            setTimeout(() => setSuccess(false), 5000);
        }
    };

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
                <h2 className="text-3xl font-bold font-cabinet mb-2 text-gray-900">{t.contact.form.heading}</h2>
                <p className="text-gray-500 font-satoshi mb-8">{t.contact.form.subheading}</p>

                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-satoshi">
                        ✓ Thank you! Your message has been sent successfully.
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-satoshi">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative">
                            <label
                                htmlFor="firstName"
                                className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'firstName' || formData.firstName ? '-top-2.5 text-xs bg-white px-2 text-primary font-bold' : 'top-3.5 text-gray-400'
                                    }`}
                            >
                                {t.contact.form.firstName} *
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('firstName')}
                                onBlur={() => setFocusedField(null)}
                                required
                                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-satoshi"
                            />
                        </div>
                        <div className="relative">
                            <label
                                htmlFor="lastName"
                                className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'lastName' || formData.lastName ? '-top-2.5 text-xs bg-white px-2 text-primary font-bold' : 'top-3.5 text-gray-400'
                                    }`}
                            >
                                {t.contact.form.lastName} *
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('lastName')}
                                onBlur={() => setFocusedField(null)}
                                required
                                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-satoshi"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label
                            htmlFor="email"
                            className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'email' || formData.email ? '-top-2.5 text-xs bg-white px-2 text-primary font-bold' : 'top-3.5 text-gray-400'
                                }`}
                        >
                            {t.contact.form.email} *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-satoshi"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative">
                            <label
                                htmlFor="phone"
                                className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'phone' || formData.phone ? '-top-2.5 text-xs bg-white px-2 text-primary font-bold' : 'top-3.5 text-gray-400'
                                    }`}
                            >
                                {t.contact.form.phone}
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('phone')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-satoshi"
                            />
                        </div>
                        <div className="relative">
                            <select
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-satoshi appearance-none text-gray-700"
                            >
                                <option value="">{t.contact.form.interest}</option>
                                <option>{t.contact.form.options.cultural}</option>
                                <option>{t.contact.form.options.adventure}</option>
                                <option>{t.contact.form.options.hair}</option>
                                <option>{t.contact.form.options.dental}</option>
                                <option>{t.contact.form.options.cosmetic}</option>
                                <option>{t.contact.form.options.custom}</option>
                                <option>{t.contact.form.options.other}</option>
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
                            className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'message' || formData.message ? '-top-2.5 text-xs bg-white px-2 text-primary font-bold' : 'top-3.5 text-gray-400'
                                }`}
                        >
                            {t.contact.form.message} *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-satoshi resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-bold font-cabinet transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                        {loading ? 'Sending...' : t.contact.form.submit}
                        {!loading && (
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        )}
                    </button>
                </form>
            </div>
        </motion.div>
    );
}
