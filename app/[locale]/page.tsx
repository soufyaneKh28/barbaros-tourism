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
import { getHotDeals } from "@/lib/services/trips";
import { getBlogs } from "@/lib/services/blogs";
import { getDestinations } from "@/lib/services/destinations";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;

  // Fetch hot deals
  let hotDeals = []
  try {
    hotDeals = await getHotDeals(locale)
  } catch (e) {
    console.error('Failed to fetch hot deals', e)
  }

  // Fetch latest blogs
  let latestBlogs = []
  try {
    latestBlogs = await getBlogs(true, locale, 3)
  } catch (e) {
    console.error('Failed to fetch blogs', e)
  }

  // Fetch destinations
  let destinations = []
  try {
    destinations = await getDestinations(locale, 5)
  } catch (e) {
    console.error('Failed to fetch destinations', e)
  }

  return (
    <>
      <Hero />
      <Partners />
      <Services />
      <HotDeals deals={hotDeals} locale={locale} />
      <Destinations destinations={destinations} locale={locale} />
      <Testimonials />
      <VideoSection />
      <Blogs blogs={latestBlogs} />
      <Footer />
    </>
  );
}

