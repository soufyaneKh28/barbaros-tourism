import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Services from "@/components/home/Services";
import ServicesGrid from "@/components/services/ServicesGrid";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesOfferings from "@/components/services/ServicesOfferings";
import ServicesCTA from "@/components/services/ServicesCTA";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getServices } from "@/lib/services/services";

export default async function OurServices({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;

    // Fetch services from backend
    let services: any[] = [];
    try {
        services = await getServices(locale);
    } catch (error) {
        console.error('Error fetching services:', error);
    }

    return (
        <div className="bg-white">
            <Navbar />

            {/* Hero Section */}
            <ServicesHero locale={locale} />

            {/* What We Offer - Granular details */}
            <ServicesOfferings locale={locale} services={services} />

            {/* Modern Services Grid - Main Categories */}
            {/* <ServicesGrid /> */}

            {/* Services Component - Interactive Accordion */}
            <Services />

            {/* Final CTA Section */}
            <ServicesCTA locale={locale} />

            <Footer />
        </div>
    );
}
