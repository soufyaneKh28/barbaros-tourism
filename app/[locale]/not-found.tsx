"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMessages, locales, defaultLocale, type Locale } from "@/i18n";

export default function NotFound() {
    const pathname = usePathname();

    // Extract locale from pathname or use default
    const segments = pathname.split('/');
    const localeParam = segments[1];
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;

    const messages = getMessages(locale);
    const t = (messages as any).notFound;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="text-center space-y-6 max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                {/* 404 Icon/Illustration placeholder */}
                <div className="relative w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <span className="text-5xl font-bold text-primary">404</span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {t?.title || "Page Not Found"}
                </h1>

                <p className="text-gray-600 dark:text-gray-300 text-lg">
                    {t?.description || "Sorry, the page you are looking for does not exist."}
                </p>

                <Link
                    href={`/${locale}`}
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200"
                >
                    {t?.homeButton || "Back to Home"}
                </Link>
            </div>
        </div>
    );
}
