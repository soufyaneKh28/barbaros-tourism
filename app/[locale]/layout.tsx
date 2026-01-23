import type { Metadata } from "next";
import "../globals.css";
import { locales, defaultLocale, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n";
import { LanguageProvider } from "@/context/LanguageContext";
import WhatsAppButton from "@/components/common/WhatsAppButton";

import { IBM_Plex_Sans_Arabic } from "next/font/google";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex",
});

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
  const messages = getMessages(locale);

  return (
    <html lang={locale} dir={dir} className={ibmPlexSansArabic.variable}>
      <body className="antialiased">
        <LanguageProvider locale={locale} messages={messages}>
          {children}
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}

