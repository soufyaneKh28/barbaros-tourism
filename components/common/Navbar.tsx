
'use client';

import { useLanguage } from '@/hooks/use-language';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from 'react';
import { Plane, Calendar, Ship, Building2, Sun, Star, Crown, Globe, Home, X } from 'lucide-react';

interface NavbarProps {
    transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
    const { t, locale } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [groupMenuOpen, setGroupMenuOpen] = useState(false);
    const [tourismMenuOpen, setTourismMenuOpen] = useState(false);
    const [immigrationMenuOpen, setImmigrationMenuOpen] = useState(false);
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

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const navLinks = [
        { href: `/${locale}`, label: t.nav.home },
        { href: `/${locale}/about-us`, label: t.nav.about },
        { href: `/${locale}/tours`, label: t.nav.tourism },
        { href: `/${locale}/our-services`, label: t.nav.services },
        { href: `/${locale}/medical-tourism`, label: t.nav.medical },
        { href: `/${locale}/blogs`, label: t.nav.blogs },
        { href: `/${locale}/contact-us`, label: t.nav.contact },
    ];

    return (
        <>
            <header className={`w-full px-6 py-2 lg:py-6 lg:px-12 sticky  top-0 z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent ' : 'bg-white/95 backdrop-blur-md shadow-sm '}`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href={`/${locale}`} className="inline-block transition-all duration-300">
                            <Image
                                src="/images/logo.png"
                                alt="Barbaros Tourism Logo"
                                width={`200`}
                                height={`100`}
                                quality={100}
                                className={`h-auto w-[200px] transition-all duration-300 ${isTransparent ? 'filter brightness-0 invert' : ''}`}
                                priority
                            />
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className={`hidden lg:flex items-center gap-6 font-cabinet ${isTransparent ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-50'} rounded-full px-8 py-3 transition-colors duration-300`}>
                        {/* Normal Links (Before Tourism) */}
                        <Link href={`/${locale}`} className={`${isTransparent ? 'text-white hover:text-secondary' : 'text-gray-700 hover:text-primary'} transition-colors text-sm`}>
                            {t.nav.home}
                        </Link>
                        <Link href={`/${locale}/about-us`} className={`${isTransparent ? 'text-white hover:text-secondary' : 'text-gray-700 hover:text-primary'} transition-colors text-sm`}>
                            {t.nav.about}
                        </Link>

                        {/* Tourism Mega Menu */}
                        <div
                            className="relative"
                            onMouseEnter={() => setTourismMenuOpen(true)}
                            onMouseLeave={() => setTourismMenuOpen(false)}
                        >
                            <button
                                className={`${isTransparent ? 'text-white hover:text-secondary' : 'text-gray-700 hover:text-primary'} transition-colors text-sm flex items-center gap-1`}
                                type="button"
                                onClick={() => window.location.href = `/${locale}/tours`}
                            >
                                {(t.nav as any).tourism}
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${tourismMenuOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {tourismMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-1/2 top-1 z-50 mt-4 -translate-x-1/2"
                                >
                                    <div className="flex flex-col gap-2 w-[320px] rounded-2xl bg-white shadow-2xl border border-gray-100 p-3">
                                        <MegaMenuItem
                                            href={`/${locale}/daily-tours`}
                                            title={(t as any).tourTypes?.dailyTours?.badge || "DAILY TOURS"}
                                            description={(t as any).tourTypes?.dailyTours?.navDescription || "Short adventures for limited time"}
                                            iconColor="bg-blue-50 text-blue-600"
                                            Icon={Sun}
                                        />
                                        <MegaMenuItem
                                            href={`/${locale}/special-tourism-packages`}
                                            title={(t as any).tourTypes?.specialPackages?.badge || "SPECIAL PACKAGES"}
                                            description={(t as any).tourTypes?.specialPackages?.navDescription || "Tailored specific interest tours"}
                                            iconColor="bg-purple-50 text-purple-600"
                                            Icon={Star}
                                        />
                                        <MegaMenuItem
                                            href={`/${locale}/vip-tourism-services`}
                                            title={(t as any).tourTypes?.vipPrograms?.badge || "VIP PROGRAMS"}
                                            description={(t as any).tourTypes?.vipPrograms?.navDescription || "Premium luxury experiences"}
                                            iconColor="bg-amber-50 text-amber-600"
                                            Icon={Crown}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <Link href={`/${locale}/medical-tourism`} className={`${isTransparent ? 'text-white hover:text-secondary' : 'text-gray-700 hover:text-primary'} transition-colors text-sm`}>
                            {t.nav.medical}
                        </Link>

                        {/* Immigration Mega Menu */}
                        <div
                            className="relative"
                            onMouseEnter={() => setImmigrationMenuOpen(true)}
                            onMouseLeave={() => setImmigrationMenuOpen(false)}
                        >
                            <button
                                className={`${isTransparent ? 'text-white hover:text-secondary' : 'text-gray-700 hover:text-primary'} transition-colors text-sm flex items-center gap-1`}
                                type="button"
                                onClick={() => window.location.href = `/${locale}/immigration`}
                            >
                                {(t.nav as any).immigration}
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${immigrationMenuOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {immigrationMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-1/2 top-1 z-50 mt-4 -translate-x-1/2"
                                >
                                    <div className="flex flex-col gap-2 w-[320px] rounded-2xl bg-white shadow-2xl border border-gray-100 p-3">
                                        <MegaMenuItem
                                            href={`/${locale}/immigration/citizenship`}
                                            title={(t as any).immigration?.citizenship?.badge || "Citizenship Services"}
                                            description={(t as any).immigration?.citizenship?.navDescription || "Citizenship application services"}
                                            iconColor="bg-blue-50 text-blue-600"
                                            Icon={Globe}
                                        />
                                        <MegaMenuItem
                                            href={`/${locale}/immigration/residence`}
                                            title={(t as any).immigration?.residence?.badge || "Residence Services"}
                                            description={(t as any).immigration?.residence?.navDescription || "Residence permit solutions"}
                                            iconColor="bg-emerald-50 text-emerald-600"
                                            Icon={Home}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <Link href={`/${locale}/our-services`} className={`${isTransparent ? 'text-white hover:text-secondary' : 'text-gray-700 hover:text-primary'} transition-colors text-sm`}>
                            {t.nav.services}
                        </Link>
                        <Link href={`/${locale}/blogs`} className={`${isTransparent ? 'text-white hover:text-secondary' : 'text-gray-700 hover:text-primary'} transition-colors text-sm`}>
                            {t.nav.blogs}
                        </Link>
                        <Link href={`/${locale}/contact-us`} className={`${isTransparent ? 'text-white hover:text-secondary' : 'text-gray-700 hover:text-primary'} transition-colors text-sm`}>
                            {t.nav.contact}
                        </Link>


                        {/* Barbaros Group Mega Menu */}
                        <div
                            className="relative"
                            onMouseEnter={() => setGroupMenuOpen(true)}
                            onMouseLeave={() => setGroupMenuOpen(false)}
                        >
                            {/* ... existing group menu code ... */}
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
            </header>

            {/* Mobile Menu */}
            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.nav
                            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] overflow-y-auto lg:hidden shadow-2xl"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        >
                            <div className="p-5 flex flex-col min-h-full">
                                {/* Drawer Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <Link href={`/${locale}`} onClick={() => setMobileMenuOpen(false)}>
                                        <Image
                                            src="/images/logo.png"
                                            alt="Barbaros Tourism"
                                            width={140}
                                            height={70}
                                            className="h-auto w-[140px]"
                                        />
                                    </Link>
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Links Container */}
                                <div className="space-y-1 flex-1">
                                    <Link href={`/${locale}`} className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.home}</Link>
                                    <Link href={`/${locale}/about-us`} className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.about}</Link>

                                    {/* Mobile Tourism Links */}
                                    <div className="py-2">
                                        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{(t.nav as any).tourism}</p>
                                        <div className="space-y-1">
                                            <Link href={`/${locale}/daily-tours`} className="flex items-center gap-3 py-3 px-4 text-sm text-gray-600 hover:text-primary hover:bg-blue-50/50 rounded-xl transition-all" onClick={() => setMobileMenuOpen(false)}>
                                                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                                    <Sun className="w-4 h-4" />
                                                </div>
                                                {(t as any).tourTypes?.dailyTours?.badge || "Daily Tours"}
                                            </Link>
                                            <Link href={`/${locale}/special-tourism-packages`} className="flex items-center gap-3 py-3 px-4 text-sm text-gray-600 hover:text-primary hover:bg-purple-50/50 rounded-xl transition-all" onClick={() => setMobileMenuOpen(false)}>
                                                <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                                                    <Star className="w-4 h-4" />
                                                </div>
                                                {(t as any).tourTypes?.specialPackages?.badge || "Special Packages"}
                                            </Link>
                                            <Link href={`/${locale}/vip-tourism-services`} className="flex items-center gap-3 py-3 px-4 text-sm text-gray-600 hover:text-primary hover:bg-amber-50/50 rounded-xl transition-all" onClick={() => setMobileMenuOpen(false)}>
                                                <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                                                    <Crown className="w-4 h-4" />
                                                </div>
                                                {(t as any).tourTypes?.vipPrograms?.badge || "VIP Programs"}
                                            </Link>
                                        </div>
                                    </div>

                                    <Link href={`/${locale}/medical-tourism`} className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.medical}</Link>

                                    {/* Mobile Immigration Links */}
                                    <div className="py-2">
                                        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{(t.nav as any).immigration}</p>
                                        <div className="space-y-1">
                                            <Link href={`/${locale}/immigration/citizenship`} className="flex items-center gap-3 py-3 px-4 text-sm text-gray-600 hover:text-primary hover:bg-blue-50/50 rounded-xl transition-all" onClick={() => setMobileMenuOpen(false)}>
                                                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                                    <Globe className="w-4 h-4" />
                                                </div>
                                                {(t as any).immigration?.citizenship?.badge || "Citizenship Services"}
                                            </Link>
                                            <Link href={`/${locale}/immigration/residence`} className="flex items-center gap-3 py-3 px-4 text-sm text-gray-600 hover:text-primary hover:bg-emerald-50/50 rounded-xl transition-all" onClick={() => setMobileMenuOpen(false)}>
                                                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                                    <Home className="w-4 h-4" />
                                                </div>
                                                {(t as any).immigration?.residence?.badge || "Residence Services"}
                                            </Link>
                                        </div>
                                    </div>

                                    <Link href={`/${locale}/our-services`} className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.services}</Link>
                                    <Link href={`/${locale}/blogs`} className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.blogs}</Link>
                                    <Link href={`/${locale}/contact-us`} className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.contact}</Link>

                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                            Barbaros Group
                                        </p>
                                        <div className="gap-2 grid grid-cols-1 px-2">
                                            <Link href="https://barbarostourism.com" target="_blank" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-600">
                                                <Plane className="w-4 h-4 text-gray-400" /> Barbaros Tourism
                                            </Link>
                                            <Link href="https://barbarosevents.com" target="_blank" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-600">
                                                <Calendar className="w-4 h-4 text-gray-400" /> Barbaros Events
                                            </Link>
                                            <Link href="https://barbarostrade.com" target="_blank" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-600">
                                                <Ship className="w-4 h-4 text-gray-400" /> Barbaros Trade
                                            </Link>
                                            <Link href="https://barbarosgroup.com" target="_blank" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-600">
                                                <Building2 className="w-4 h-4 text-gray-400" /> Barbaros Group
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
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

interface MegaMenuItemProps {
    href: string;
    title: string;
    description: string;
    iconColor: string;
    Icon: React.ElementType;
}

function MegaMenuItem({ href, title, description, iconColor, Icon }: MegaMenuItemProps) {
    return (
        <Link
            href={href}
            className="flex gap-3 rounded-xl p-3 hover:bg-gray-50 transition-colors group"
        >
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconColor} shadow-sm shrink-0`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-primary">
                    {title}
                </p>
                <p className="mt-1 text-xs text-gray-500 line-clamp-1">
                    {description}
                </p>
            </div>
        </Link>
    );
}
