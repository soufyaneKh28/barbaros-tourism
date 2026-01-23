
'use client';

import { useLanguage } from '@/hooks/use-language';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "motion/react";
import { useState } from 'react';
import { Plane, Calendar, Ship, Building2 } from 'lucide-react';

interface NavbarProps {
    transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
    const { t, locale } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [groupMenuOpen, setGroupMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useState(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        // Add event listener
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    });

    // Effective transparent state: true only if transparent prop is true AND not scrolled
    const isTransparent = transparent && !isScrolled;

    const navLinks = [
        { href: `/${locale}`, label: t.nav.home },
        { href: `/${locale}/about-us`, label: t.nav.about },
        { href: `/${locale}/tours`, label: t.nav.tours },
        { href: `/${locale}/our-services`, label: t.nav.services },
        { href: `/${locale}/medical-tourism`, label: t.nav.medical },
        { href: `/${locale}/blogs`, label: t.nav.blogs },
        { href: `/${locale}/contact-us`, label: t.nav.contact },
    ];

    return (
        <header className={`w-full px-6 py-4 lg:py-6 lg:px-12 sticky top-0 z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-sm'}`}>
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
                            className={`h-10 w-auto transition-all duration-300 ${isTransparent ? 'filter brightness-0 invert' : ''}`}
                            priority
                        />
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <nav className={`hidden lg:flex items-center gap-6 font-cabinet ${isTransparent ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'} rounded-full px-8 py-3 transition-colors duration-300`}>
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 + (index * 0.05) }}
                        >
                            <Link
                                href={link.href}
                                className={`${isTransparent ? 'text-white hover:text-secondary' : 'text-gray-700 hover:text-primary'} transition-colors text-sm`}
                            >
                                {link.label}
                            </Link>
                        </motion.div>
                    ))}

                    {/* Barbaros Group Mega Menu */}
                    <div
                        className="relative"
                        onMouseEnter={() => setGroupMenuOpen(true)}
                        onMouseLeave={() => setGroupMenuOpen(false)}
                    >
                        <button
                            className={`${isTransparent ? 'text-white hover:text-secondary' : 'text-gray-700 hover:text-primary'} transition-colors text-sm flex items-center gap-1`}
                            type="button"
                        >
                            Barbaros Group
                            <svg
                                className={`w-4 h-4 transition-transform duration-200 ${groupMenuOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {groupMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.2 }}
                                className="absolute left-1/2 top-1 z-50 mt-4 -translate-x-1/2"
                            >
                                <div className="flex flex-col gap-3 w-[420px] rounded-2xl bg-white shadow-2xl border border-gray-100 p-4">

                                    <CompanyCard
                                        href="https://barbarosevents.com"
                                        title="Barbaros Events"
                                        description="Corporate & private event planning and management."
                                        iconColor="bg-purple-50 text-purple-600"
                                        imageSrc="/images/eventIcon.png"
                                    />
                                    <CompanyCard
                                        href="https://barbarostrade.com"
                                        title="Barbaros Trade"
                                        description="International trade, logistics and import/export."
                                        iconColor="bg-emerald-50 text-emerald-600"
                                        imageSrc="/images/tradeIcon.png"
                                    />
                                    <CompanyCard
                                        href="https://barbarosgroup.com"
                                        title="Barbaros Group"
                                        description="Holding company and shared group services."
                                        iconColor="bg-amber-50 text-amber-600"
                                        imageSrc="/images/tourismIcon.png"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </nav>

                {/* Language Selector & Mobile Menu Button */}
                <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <LanguageSelector transparent={isTransparent} />

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`lg:hidden p-2 rounded-lg ${isTransparent ? 'text-white' : 'text-gray-700'}`}
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

                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Barbaros Group Companies
                        </p>
                        <div className="space-y-1">
                            <Link
                                href="https://barbarostourism.com"
                                className="flex items-center gap-3 py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Plane className="w-4 h-4 text-gray-400" />
                                Barbaros Tourism
                            </Link>
                            <Link
                                href="https://barbarosevents.com"
                                className="flex items-center gap-3 py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Calendar className="w-4 h-4 text-gray-400" />
                                Barbaros Events
                            </Link>
                            <Link
                                href="https://barbarostrade.com"
                                className="flex items-center gap-3 py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Ship className="w-4 h-4 text-gray-400" />
                                Barbaros Trade
                            </Link>
                            <Link
                                href="https://barbarosgroup.com"
                                className="flex items-center gap-3 py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Building2 className="w-4 h-4 text-gray-400" />
                                Barbaros Group
                            </Link>
                        </div>
                    </div>
                </motion.nav>
            )}
        </header>
    );
}

interface CompanyCardProps {
    href: string;
    title: string;
    description: string;
    iconColor: string;
    Icon?: React.ElementType;
    imageSrc?: string;
}

function CompanyCard({ href, title, description, iconColor, Icon, imageSrc }: CompanyCardProps) {
    return (
        <Link
            href={href}
            className="flex gap-3 rounded-xl p-3 hover:bg-gray-50 transition-colors group"
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconColor} shadow-sm overflow-hidden p-2`}>
                {imageSrc ? (
                    <Image src={imageSrc} alt={title} width={24} height={24} className="w-full h-full object-contain" />
                ) : Icon ? (
                    <Icon className="w-5 h-5" />
                ) : null}
            </div>
            <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-primary">
                    {title}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                    {description}
                </p>
            </div>
        </Link>
    );
}



function LanguageSelector({ transparent }: { transparent: boolean }) {
    const { locale } = useLanguage();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const languages = [
        { code: 'en' as const, label: 'EN' },
        { code: 'ar' as const, label: 'AR' },
        { code: 'fr' as const, label: 'FR' },
        { code: 'tr' as const, label: 'TR' },
    ];

    const redirectedPathName = (locale: string) => {
        if (!pathname) return '/';
        const segments = pathname.split('/');
        segments[1] = locale;
        return segments.join('/');
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
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
                <motion.div
                    className="absolute right-0 top-full pt-2 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="w-32 bg-white rounded-lg shadow-lg overflow-hidden">
                        {languages.map((lang) => (
                            <Link
                                key={lang.code}
                                href={redirectedPathName(lang.code)}
                                className={`block px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors ${locale === lang.code ? 'bg-secondary/10 text-secondary font-medium' : 'text-gray-700'
                                    }`}
                            >
                                {lang.label}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
