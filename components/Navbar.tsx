'use client';

import { type Locale } from '@/i18n';
import { getMessages } from '@/i18n';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "motion/react";
import { useState } from 'react';

interface NavbarProps {
    locale: Locale;
    transparent?: boolean;
}

export default function Navbar({ locale, transparent = false }: NavbarProps) {
    const t = getMessages(locale);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: `/${locale}`, label: t.nav.home },
        { href: `/${locale}/about-us`, label: t.nav.about },
        { href: `/${locale}/our-services`, label: t.nav.services },
        { href: `/${locale}/tours`, label: t.nav.tours },
        { href: `/${locale}/medical-tourism`, label: t.nav.medical },
        { href: `/${locale}/blogs`, label: t.nav.blogs },
        { href: `/${locale}/contact-us`, label: t.nav.contact },
    ];

    return (
        <header className={`w-full px-6 py-6 lg:px-12 relative z-50 ${transparent ? '' : 'bg-white shadow-sm'}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href={`/${locale}`} className="block transition-all duration-300">
                        <Image
                            src="/images/logo.png"
                            alt="Barbaros Tourism Logo"
                            width={120}
                            height={40}
                            className={`h-10 w-auto transition-all duration-300 ${transparent ? 'filter brightness-0 invert hover:brightness-100 hover:invert-0' : ''}`}
                            priority
                        />
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <nav className={`hidden lg:flex items-center gap-6 font-cabinet ${transparent ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'} rounded-full px-8 py-3`}>
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 + (index * 0.05) }}
                        >
                            <Link
                                href={link.href}
                                className={`${transparent ? 'text-white hover:text-secondary' : 'text-gray-700 hover:text-primary'} transition-colors text-sm`}
                            >
                                {link.label}
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                {/* Language Selector & Mobile Menu Button */}
                <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <LanguageSelector locale={locale} transparent={transparent} />

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`lg:hidden p-2 rounded-lg ${transparent ? 'text-white' : 'text-gray-700'}`}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </motion.div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.nav
                    className="lg:hidden mt-4 bg-white rounded-lg shadow-lg p-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </motion.nav>
            )}
        </header>
    );
}

function LanguageSelector({ locale, transparent }: { locale: Locale; transparent: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const languages = [
        { code: 'en' as const, label: 'EN' },
        { code: 'ar' as const, label: 'AR' },
        { code: 'fr' as const, label: 'FR' },
        { code: 'tr' as const, label: 'TR' },
    ];

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 font-cabinet backdrop-blur-sm ${transparent
                    ? 'border-white/30 text-white hover:border-white/50'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
            >
                <span className="text-sm font-medium lowercase">{locale}</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 top-full pt-2 z-50">
                    <div className="w-32 bg-white rounded-lg shadow-lg">
                        {languages.map((lang) => (
                            <Link
                                key={lang.code}
                                href={`/${lang.code}`}
                                className={`block px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${locale === lang.code ? 'bg-secondary/10 text-secondary font-medium' : 'text-gray-700'
                                    }`}
                            >
                                {lang.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
