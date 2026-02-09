import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { getSpecialPackageBySlug } from "@/lib/services/specialPackages";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getMessages } from "@/i18n";
import { notFound } from "next/navigation";
import SpecialPackageDetailClient from "./SpecialPackageDetailClient";
import { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale: localeParam, slug } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;

    const packageData = await getSpecialPackageBySlug(slug, locale);

    if (!packageData) {
        return {
            title: "Package Not Found",
            description: "The package you are looking for does not exist.",
        };
    }

    return {
        title: packageData.package_name,
        description: packageData.target_categories || `Details about ${packageData.package_name}`,
    };
}


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
