import Footer from "@/components/common/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import FAQ from "@/components/common/FAQ";
import MapPlaceholder from "@/components/common/MapPlaceholder";
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
        <div className="bg-white">
            <ContactHero />

            <section className="py-20 px-6 relative z-20 mt-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
                        <div className="lg:col-span-7">
                            <ContactForm locale={locale} />
                        </div>
                        <div className="lg:col-span-5 space-y-12 pt-8 lg:pt-0">
                            <ContactInfo locale={locale} />
                        </div>
                    </div>
                </div>
            </section>

            <FAQ locale={locale} />

            <MapPlaceholder />

            <Footer />
        </div>
    );
}
