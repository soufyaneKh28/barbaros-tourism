import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaButton from "@/components/ui/CtaButton";
import MedicalHero from "@/components/MedicalHero";
import MedicalWhyChoose from "@/components/MedicalWhyChoose";
import MedicalServices from "@/components/MedicalServices";
import MedicalProcess from "@/components/MedicalProcess";
import Testimonials from "@/components/Testimonials";
import { type Locale, locales, defaultLocale, getMessages } from "@/i18n";
import Image from "next/image";

export default async function MedicalTourism({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    return (
        <div className="bg-white">
            <Navbar locale={locale} />

            {/* Hero Section */}
            <MedicalHero locale={locale} />

            {/* Why Choose Turkey */}
            <MedicalWhyChoose locale={locale} />

            {/* Medical Services */}
            <MedicalServices locale={locale} />

            {/* Process/Journey */}
            <MedicalProcess locale={locale} />

            {/* Testimonials */}
            <Testimonials locale={locale} />

            {/* Final CTA */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
                        alt="Medical Tourism CTA"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
                    <h2 className="text-4xl md:text-5xl font-bold font-cabinet mb-6">
                        {t.medical.cta.heading}
                    </h2>
                    <p className="text-xl font-satoshi mb-12 text-white/90">
                        {t.medical.cta.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <CtaButton href={`/${locale}/contact-us`}>
                            {t.medical.cta.start}
                        </CtaButton>
                        <CtaButton variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-primary">
                            {t.medical.cta.caseStudies}
                        </CtaButton>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-12 pt-12 border-t border-white/20">
                        <p className="text-sm text-white/80 font-satoshi mb-4">Trusted by patients worldwide</p>
                        <div className="flex flex-wrap items-center justify-center gap-8">
                            <div className="text-center">
                                <div className="text-2xl font-bold font-cabinet">JCI</div>
                                <div className="text-xs text-white/70">Accredited</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold font-cabinet">ISO</div>
                                <div className="text-xs text-white/70">Certified</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold font-cabinet">24/7</div>
                                <div className="text-xs text-white/70">Support</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold font-cabinet">100%</div>
                                <div className="text-xs text-white/70">Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer locale={locale} />
        </div>
    );
}
