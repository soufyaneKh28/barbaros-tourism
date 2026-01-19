import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Services from "@/components/Services";
import Destinations from "@/components/Destinations";
import HotDeals from "@/components/HotDeals";
import Testimonials from "@/components/Testimonials";
import VideoSection from "@/components/VideoSection";
import Blogs from "@/components/Blogs";
import Footer from "@/components/Footer";
import { type Locale, locales, defaultLocale } from "@/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
  return (
    <>
      <Hero locale={locale} />
      <Partners />
      <Services />
      <HotDeals />
      <Destinations />
      <Testimonials />
      <VideoSection />
      <Blogs />
      <Footer />
    </>
  );
}

