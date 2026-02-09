import { type Locale, locales, defaultLocale } from "@/i18n";
import { getProgramBySlug } from "@/lib/services/programs";
import ProgramClient from "@/components/program-detail/ProgramClient";
import { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale: localeParam, slug } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;

    let program;
    try {
        program = await getProgramBySlug(slug, locale);
    } catch (error) {
        console.error("Error fetching program for metadata:", error);
    }

    if (!program) {
        return {
            title: "Program Not Found",
            description: "The program you are looking for does not exist.",
        };
    }

    return {
        title: program.title,
        description: program.description || `Details about ${program.title}`,
    };
}

export default async function ProgramDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale: localeParam, slug } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;

    let program = null;
    try {
        program = await getProgramBySlug(slug, locale);
    } catch (error) {
        console.error("Error fetching program:", error);
    }

    return <ProgramClient program={program} locale={locale} />;
}
