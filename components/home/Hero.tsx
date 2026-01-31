'use client';

import { type Locale } from '@/i18n';
import { useLanguage } from '@/hooks/use-language';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from 'react';
import CtaButton from '../ui/CtaButton';
import { Plane, Calendar, Ship, Building2 } from 'lucide-react';
import Navbar from '../common/Navbar';



const heroImages = [
  "/images/heroBg.png",
  "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop", // Istanbul
  "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2070&auto=format&fit=crop", // Cappadocia
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1794&auto=format&fit=crop", // Tokyo/General Travel
];

export default function Hero() {
  const { t, locale } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [groupMenuOpen, setGroupMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Add event listener
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (

    <>



      <Navbar transparent={true} />
      <section className="rounded-[20px] overflow-hidden flex flex-col min-h-[calc(100vh-20px)]">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0 bg-slate-900 rounded-[20px] overflow-hidden m-2 ">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              className="absolute inset-0 rounded-[20px] overflow-hidden "
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


        {/* Main Content */}
        <div className="relative flex-1 flex items-center px-6 py-12 lg:px-12">
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
                <CtaButton href={`/${locale}/tours`} className="w-full sm:w-auto">
                  {t.hero.exploreTours}
                </CtaButton>
                <CtaButton href={`/${locale}/medical-tourism`} variant="outline" className="w-full sm:w-auto">
                  {t.hero.medicalTourism}
                </CtaButton>
              </motion.div>


            </div>
          </div>


        </div>
      </section >
    </>
  );
}

interface HeroCompanyCardProps {
  href: string;
  title: string;
  description: string;
  Icon?: React.ElementType;
  imageSrc?: string;
}

function HeroCompanyCard({ href, title, description, Icon, imageSrc }: HeroCompanyCardProps) {
  return (
    <Link
      href={href}
      className="flex gap-3 rounded-xl p-3 hover:bg-white/5 transition-colors group"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white shadow-sm overflow-hidden p-2">
        {imageSrc ? (
          <Image src={imageSrc} alt={title} width={24} height={24} className="w-full h-full object-contain" />
        ) : Icon ? (
          <Icon className="w-5 h-5" />
        ) : null}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-white group-hover:text-secondary">
          {title}
        </p>
        <p className="mt-1 text-xs text-white/70">
          {description}
        </p>
      </div>
    </Link>
  );
}

function LanguageSelector({ isScrolled = false }: { isScrolled?: boolean }) {
  const { locale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const languages = [
    { code: 'en' as const, label: 'EN' },
    { code: 'ar' as const, label: 'AR' },
    { code: 'fr' as const, label: 'FR' },
    { code: 'tr' as const, label: 'TR' },
  ];

  return (
    <div
      className="relative z-50"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 font-cabinet backdrop-blur-sm ${isScrolled
          ? 'border-gray-300 text-gray-700 hover:border-gray-400'
          : 'border-white/30 text-white hover:border-white/50'
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
          <div className="w-32 bg-white z-50 rounded-lg shadow-lg overflow-hidden">
            {languages.map((lang) => (
              <a
                key={lang.code}
                href={`/${lang.code}`}
                className={`block px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors ${locale === lang.code ? 'bg-secondary/10 text-secondary font-medium' : 'text-gray-700'
                  }`}
              >
                {lang.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </div>

  );
}
