'use client';

import { type Locale } from '@/i18n';
import { getMessages } from '@/i18n';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from 'react';

interface HeroProps {
  locale: Locale;
}

const heroImages = [
  "/images/heroBg.png",
  "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop", // Istanbul
  "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2070&auto=format&fit=crop", // Cappadocia
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1794&auto=format&fit=crop", // Tokyo/General Travel
];

export default function Hero({ locale }: HeroProps) {
  const t = getMessages(locale);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative m-2 rounded-[20px] overflow-hidden flex flex-col min-h-[calc(100vh-20px)]">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Image
              src={heroImages[currentIndex]}
              alt="Hero background"
              fill
              className="object-cover object-center"
              priority
              quality={100}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/30 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent z-10" />
      </div>

      {/* Header */}
      <header className="relative z-20 w-full px-6 py-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a href="/" className="block transition-all duration-300">
              <Image
                src="/images/logo.png"
                alt="Barbaros Tourism Logo"
                width={120}
                height={40}
                className="h-10 w-auto filter brightness-0 invert transition-all duration-300 hover:brightness-100 hover:invert-0"
                priority
              />
            </a>
          </motion.div>

          {/* Navigation - Hidden on mobile, shown on desktop */}
          <nav className="hidden lg:flex items-center gap-6 font-cabinet bg-white/10 backdrop-blur-sm rounded-full px-8 py-3">
            {[
              { href: `/${locale}`, label: t.nav.home },
              { href: `/${locale}/about-us`, label: t.nav.about },
              { href: `/${locale}/our-services`, label: t.nav.services },
              { href: `/${locale}/tours`, label: t.nav.tours },
              { href: `/${locale}/medical-tourism`, label: t.nav.medical },
              { href: `/${locale}/blogs`, label: t.nav.blogs },
              { href: `/${locale}/contact-us`, label: t.nav.contact },
            ].map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + (index * 0.05) }}
              >
                <Link
                  href={link.href}
                  className={`text-white hover:text-secondary transition-colors text-sm`}
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
            <LanguageSelector locale={locale} />
            <button className="hidden md:flex bg-primary hover:bg-primary-700 text-white px-6 py-3 rounded-full font-bold transition-colors font-cabinet text-[13px]">
              {t.hero.bookTrip}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
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
            className="lg:hidden mt-4 bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {[
              { href: `/${locale}`, label: t.nav.home },
              { href: `/${locale}/about-us`, label: t.nav.about },
              { href: `/${locale}/our-services`, label: t.nav.services },
              { href: `/${locale}/tours`, label: t.nav.tours },
              { href: `/${locale}/medical-tourism`, label: t.nav.medical },
              { href: `/${locale}/blogs`, label: t.nav.blogs },
              { href: `/${locale}/contact-us`, label: t.nav.contact },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="block py-3 px-4 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors font-cabinet"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full bg-primary hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-bold transition-colors font-cabinet text-sm">
                {t.hero.bookTrip}
              </button>
            </div>
          </motion.nav>
        )}
      </header>

      {/* Main Content */}
      <div className="relative z-20 flex-1 flex items-center px-6 py-12 lg:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            {/* Tagline Badge */}
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="bg-[#835874]/90 backdrop-blur-sm rounded-full text-white px-4 py-2 text-sm font-medium font-cabinet border border-white/10">
                {t.hero.tagline}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-[28px] leading-[32px] lg:text-[48px] font-extrabold text-white mb-3 md:leading-[45px] max-w-[500px] font-cabinet drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t.hero.heading}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-[18px] max-w-[400px] leading-[28px] text-white/95 mb-8 font-satoshi drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t.hero.description}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <button className="bg-primary-700 hover:bg-primary-600 text-white px-8 py-3 rounded-lg text-base font-medium transition-colors font-cabinet shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                {t.hero.exploreTours}
              </button>
              <button className="hover:bg-white/10 border border-white text-white px-8 py-3 rounded-lg text-base font-medium transition-colors font-cabinet backdrop-blur-sm">
                {t.hero.medicalTourism}
              </button>
            </motion.div>

            {/* Social Media Icons - Mobile Only */}
            <motion.div
              className="flex lg:hidden gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors border border-white/10"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors border border-white/10"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors border border-white/10"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.18 6.18 0 0 0-1-.05A6.27 6.27 0 0 0 5 20.1a6.27 6.27 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="relative z-20 fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4">
          <motion.a
            href="#"
            className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors border border-white/10"
            aria-label="Facebook"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </motion.a>
          <motion.a
            href="#"
            className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors border border-white/10"
            aria-label="Instagram"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </motion.a>
          <motion.a
            href="#"
            className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors border border-white/10"
            aria-label="TikTok"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.18 6.18 0 0 0-1-.05A6.27 6.27 0 0 0 5 20.1a6.27 6.27 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </motion.a>
        </div>
      </div>
    </section >
  );
}

function LanguageSelector({ locale }: { locale: Locale }) {
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
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 text-white hover:border-white/50 transition-all duration-200 font-cabinet backdrop-blur-sm"
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
              <a
                key={lang.code}
                href={`/${lang.code}`}
                className={`block px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${locale === lang.code ? 'bg-secondary/10 text-secondary font-medium' : 'text-gray-700'
                  }`}
              >
                {lang.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
