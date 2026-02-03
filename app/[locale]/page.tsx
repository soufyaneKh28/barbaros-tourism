import Hero from "@/components/home/Hero";
import Partners from "@/components/common/Partners";
import QuickActions from "@/components/home/QuickActions";
import FeaturedPrograms from "@/components/home/FeaturedPrograms";
import HotDeals from "@/components/home/HotDeals";
import Testimonials from "@/components/common/Testimonials";
import VideoSection from "@/components/home/VideoSection";
import Blogs from "@/components/home/Blogs";
import Footer from "@/components/common/Footer";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getCombinedHotDeals } from "@/lib/services/deals";
import { getBlogs } from "@/lib/services/blogs";
import { getPrograms } from "@/lib/services/programs";
import { getQuickActions } from "@/lib/services/home-quick-actions";

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

  // Fetch featured programs
  let featuredPrograms: any[] = []
  try {
    featuredPrograms = await getPrograms(locale, 5)
  } catch (e) {
    console.error('Failed to fetch featured programs', e)
  }

  // Fetch quick actions
  let quickActions: any[] = []
  try {
    quickActions = await getQuickActions(locale)
  } catch (e) {
    console.error('Failed to fetch quick actions', e)
  }

  return (
    <>
      <Hero />
      <QuickActions actions={quickActions} />
      <HotDeals deals={hotDeals} locale={locale} />
      <FeaturedPrograms programs={featuredPrograms} locale={locale} />
      <Testimonials />
      <VideoSection />
      <Partners />
      <Blogs blogs={latestBlogs} />
      <Footer />
    </>
  );
}

