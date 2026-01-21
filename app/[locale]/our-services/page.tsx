import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import ServicesGrid from "@/components/ServicesGrid";
import ServicesHero from "@/components/ServicesHero";
import ServicesOfferings from "@/components/ServicesOfferings";
import ServicesCTA from "@/components/ServicesCTA";
import { type Locale, locales, defaultLocale } from "@/i18n";

export default async function OurServices({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;

    return (
        <div className="bg-white">
            <Navbar />

            {/* Hero Section */}
            <ServicesHero locale={locale} />

            {/* What We Offer - Granular details */}
            <ServicesOfferings locale={locale} />

            {/* Modern Services Grid - Main Categories */}
            {/* <ServicesGrid /> */}

            {/* Services Component - Interactive Accordion */}
            <Services locale={locale} />

            {/* Final CTA Section */}
            <ServicesCTA locale={locale} />

            <Footer />
        </div>
    );
}
