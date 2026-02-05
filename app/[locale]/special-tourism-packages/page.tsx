import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { getSpecialPackages } from "@/lib/services/specialPackages";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getMessages } from "@/i18n";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function SpecialTourismPackages({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    // Fetch special tourism packages
    let packages: any[] = [];
    try {
        packages = await getSpecialPackages(locale);
    } catch (error) {
        console.error("Error fetching special tourism packages:", error);
    }

    return (
        <div className="bg-white">
            <Navbar transparent={false} />

            {/* Hero Section */}
            <section className="relative m-2 rounded-[20px] overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-[500px]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2071&auto=format&fit=crop"
                        alt="Special Tourism Packages Hero"
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/50 to-slate-900/30 z-10" />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-6 text-center text-white">
                    <div className="inline-block mb-4">
                        <span className="bg-secondary text-primary font-bold px-6 py-2 rounded-full text-sm">
                            {(t as any).tourTypes?.specialPackages?.badge || "Special Packages"}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-cabinet mb-6">
                        {(t as any).tourTypes?.specialPackages?.heading || "Exclusive Tourism Packages"}
                    </h1>
                    <p className="text-lg font-satoshi max-w-2xl mx-auto">
                        {(t as any).tourTypes?.specialPackages?.description || "Discover our specially curated tourism packages designed to give you unforgettable experiences in Turkey."}
                    </p>
                </div>
            </section>

            {/* Packages Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {packages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {packages.map((pkg) => (
                                <Link
                                    href={`/${locale}/special-tourism-packages/${pkg.slug}`}
                                    key={pkg.id}
                                    className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        {pkg.main_image ? (
                                            <Image
                                                src={pkg.main_image}
                                                alt={pkg.package_name}
                                                fill
                                                className={`object-cover transition-transform duration-500 group-hover:scale-110 ${pkg.is_coming_soon ? 'grayscale' : ''}`}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                                No Image
                                            </div>
                                        )}
                                        {pkg.is_coming_soon && (
                                            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white font-bold px-4 py-2 rounded-full text-xs uppercase tracking-wider z-10">
                                                Coming Soon
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-xl font-bold font-cabinet text-white mb-1 drop-shadow-md">
                                                {pkg.package_name}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        {pkg.target_categories && (
                                            <p className="text-sm text-primary font-medium mb-2">
                                                {pkg.target_categories}
                                            </p>
                                        )}

                                        <div className="flex items-center justify-between mt-4 text-sm font-medium text-gray-500 border-t pt-4">
                                            {pkg.duration_nights && (
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {pkg.duration_nights}
                                                </span>
                                            )}
                                            <span className="text-secondary group-hover:underline">{(t as any).common?.viewDetails || "View Details"} &rarr;</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-2xl">
                            <p className="text-gray-500 text-lg">No special tourism packages available at the moment. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
