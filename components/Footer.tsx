'use client';

import React from 'react';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-secondary text-white pt-20 pb-10 rounded-t-[40px] mt-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Column 1: Logo & About */}
                    <div className="flex flex-col gap-6">
                        <a href="/" className="inline-block">
                            <Image
                                src="/images/logo.png"
                                alt="Barbaros Tourism Logo"
                                width={140}
                                height={50}
                                className="h-12 w-auto brightness-0 invert"
                            />
                        </a>
                        <p className="text-white/80 font-satoshi text-sm leading-relaxed max-w-xs">
                            Exceptional travel experiences and top-tier medical tourism services in Türkiye. We connect your journey with purpose.
                        </p>
                        {/* Social Icons */}
                        <div className="flex items-center gap-4">
                            <SocialIcon icon="facebook" />
                            <SocialIcon icon="instagram" />
                            <SocialIcon icon="tiktok" />
                            <SocialIcon icon="linkedin" />
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-cabinet font-bold text-xl mb-6">Quick Links</h4>
                        <ul className="flex flex-col gap-4 font-satoshi text-white/80">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Our Services</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Tour Packages</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Medical Tourism</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Services */}
                    <div>
                        <h4 className="font-cabinet font-bold text-xl mb-6">Our Services</h4>
                        <ul className="flex flex-col gap-4 font-satoshi text-white/80">
                            <li><a href="#" className="hover:text-white transition-colors">Hotel Booking</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Flight Reservations</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">VIP Transfers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Guided Tours</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Health Packages</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="font-cabinet font-bold text-xl mb-6">Contact Us</h4>
                        <ul className="flex flex-col gap-5 font-satoshi text-white/80">
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Istanbul, Türkiye</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href="tel:+905551234567" className="hover:text-white transition-colors">+90 555 123 45 67</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:info@barbarostourism.com" className="hover:text-white transition-colors">info@barbarostourism.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Separator */}
                <div className="h-px bg-white/20 w-full mb-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-satoshi text-sm text-white/60">
                    <p>© {new Date().getFullYear()} Barbaros Tourism. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon }: { icon: string }) {
    // Simple switch for icons or a mapping could be used. 
    // For brevity, using general SVGs or placeholder logic.
    let path = "";
    if (icon === 'facebook') path = "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z";
    if (icon === 'instagram') path = "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 21h9a4.5 4.5 0 004.5-4.5v-9A4.5 4.5 0 0016.5 3h-9A4.5 4.5 0 003 7.5v9A4.5 4.5 0 007.5 21z";
    if (icon === 'tiktok') path = "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.18 6.18 0 0 0-1-.05A6.27 6.27 0 0 0 5 20.1a6.27 6.27 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"; // Using same path as hero for simplicity
    if (icon === 'linkedin') path = "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 2a2 2 0 11-2 2 2 2 0 012-2z";

    return (
        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-white group" aria-label={icon}>
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" stroke="none">
                <path d={path} />
            </svg>
        </a>
    )
}
