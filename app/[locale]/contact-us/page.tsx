import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getMessages } from "@/i18n";

export default async function ContactUs({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    return (
        <>
            <Navbar locale={locale} />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary-700 to-primary-900 text-white py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl font-bold font-cabinet mb-6">Contact Us</h1>
                    <p className="text-xl font-satoshi max-w-3xl">
                        We're here to help you plan your perfect journey. Reach out to us and let's start creating
                        unforgettable experiences together.
                    </p>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <h2 className="text-3xl font-bold font-cabinet mb-6 text-gray-900">Send us a Message</h2>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2 font-cabinet">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-satoshi"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2 font-cabinet">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-satoshi"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-cabinet">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-satoshi"
                                    placeholder="john.doe@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 font-cabinet">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-satoshi"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            <div>
                                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2 font-cabinet">
                                    Service Interest
                                </label>
                                <select
                                    id="service"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-satoshi"
                                >
                                    <option>Select a service</option>
                                    <option>Cultural Tours</option>
                                    <option>Adventure Tours</option>
                                    <option>Medical Tourism - Hair Transplant</option>
                                    <option>Medical Tourism - Dental</option>
                                    <option>Medical Tourism - Cosmetic Surgery</option>
                                    <option>Custom Package</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 font-cabinet">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-satoshi resize-none"
                                    placeholder="Tell us about your travel plans or medical needs..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary-700 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-bold font-cabinet transition-colors shadow-lg hover:shadow-xl"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <h2 className="text-3xl font-bold font-cabinet mb-6 text-gray-900">Get in Touch</h2>

                            <div className="space-y-6">
                                {/* Phone */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold font-cabinet text-gray-900 mb-1">Phone</h3>
                                        <p className="text-gray-600 font-satoshi">+90 555 123 4567</p>
                                        <p className="text-gray-600 font-satoshi">+90 555 987 6543</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold font-cabinet text-gray-900 mb-1">Email</h3>
                                        <p className="text-gray-600 font-satoshi">info@barbarostourism.com</p>
                                        <p className="text-gray-600 font-satoshi">medical@barbarostourism.com</p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold font-cabinet text-gray-900 mb-1">Office Address</h3>
                                        <p className="text-gray-600 font-satoshi">
                                            Barbaros Tourism Agency<br />
                                            Taksim Square, Beyoğlu<br />
                                            Istanbul, Türkiye 34437
                                        </p>
                                    </div>
                                </div>

                                {/* Working Hours */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold font-cabinet text-gray-900 mb-1">Working Hours</h3>
                                        <p className="text-gray-600 font-satoshi">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                        <p className="text-gray-600 font-satoshi">Saturday: 10:00 AM - 4:00 PM</p>
                                        <p className="text-gray-600 font-satoshi">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <h3 className="text-2xl font-bold font-cabinet mb-4 text-gray-900">Follow Us</h3>
                            <div className="flex gap-4">
                                <a href="#" className="w-12 h-12 bg-primary-100 hover:bg-primary-200 rounded-full flex items-center justify-center text-primary-700 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-12 h-12 bg-primary-100 hover:bg-primary-200 rounded-full flex items-center justify-center text-primary-700 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-12 h-12 bg-primary-100 hover:bg-primary-200 rounded-full flex items-center justify-center text-primary-700 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.18 6.18 0 0 0-1-.05A6.27 6.27 0 0 0 5 20.1a6.27 6.27 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-12 h-12 bg-primary-100 hover:bg-primary-200 rounded-full flex items-center justify-center text-primary-700 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Emergency Contact */}
                        <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                            <div className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <div>
                                    <h3 className="font-bold font-cabinet text-red-900 mb-1">24/7 Emergency Support</h3>
                                    <p className="text-red-800 font-satoshi text-sm mb-2">
                                        For urgent medical tourism inquiries or travel emergencies
                                    </p>
                                    <p className="text-red-900 font-bold font-cabinet">+90 555 000 0000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
