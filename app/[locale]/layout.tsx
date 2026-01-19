import type { Metadata } from "next";
import "../globals.css";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Barbaros Tourism & Services",
  description: "Comprehensive tourism solutions in Türkiye - from unforgettable tours to world-class medical tourism services.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: localeParam } = await params;
  const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

