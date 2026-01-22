import Hero from "@/components/home/Hero";
import Partners from "@/components/common/Partners";
import Services from "@/components/home/Services";
import Destinations from "@/components/home/Destinations";
import HotDeals from "@/components/home/HotDeals";
import Testimonials from "@/components/common/Testimonials";
import VideoSection from "@/components/home/VideoSection";
import Blogs from "@/components/home/Blogs";
import Footer from "@/components/common/Footer";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getCombinedHotDeals } from "@/lib/services/deals";
import { getBlogs } from "@/lib/services/blogs";
import { getDestinations } from "@/lib/services/destinations";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;

  // Fetch hot deals (trips and services)
  let hotDeals: any[] = []
  try {
    hotDeals = await getCombinedHotDeals(locale)
  } catch (e) {
    console.error('Failed to fetch hot deals', e)
  }

  // Fetch latest blogs
  let latestBlogs: any[] = []
  try {
    latestBlogs = await getBlogs(true, locale, 3)
  } catch (e) {
    console.error('Failed to fetch blogs', e)
  }

  // Fetch destinations
  let destinations: any[] = []
  try {
    destinations = await getDestinations(locale, 5)
  } catch (e) {
    console.error('Failed to fetch destinations', e)
  }

  return (
    <>
      <Hero />
      <Services />
      <HotDeals deals={hotDeals} locale={locale} />
      <Destinations destinations={destinations} locale={locale} />
      <Testimonials />
      <VideoSection />
      <Partners />
      <Blogs blogs={latestBlogs} />
      <Footer />
    </>
  );
}

