import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { getSpecialPackageBySlug } from "@/lib/services/specialPackages";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getMessages } from "@/i18n";
import { notFound } from "next/navigation";
import SpecialPackageDetailClient from "./SpecialPackageDetailClient";

export default async function SpecialPackageDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const resolvedParams = await params;
    const locale = (locales.includes(resolvedParams.locale as Locale) ? resolvedParams.locale : defaultLocale) as Locale;
    const t = getMessages(locale);

    const packageData = await getSpecialPackageBySlug(resolvedParams.slug, locale);

    if (!packageData) {
        notFound();
    }

    return (
        <div className="bg-white font-satoshi">
            <Navbar />
            <SpecialPackageDetailClient
                packageData={packageData}
                locale={locale}
                translations={t}
            />
            <Footer />
        </div>
    );
}
