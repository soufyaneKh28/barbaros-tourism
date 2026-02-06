import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { getPrograms } from "@/lib/services/programs";
import { type Locale, locales, defaultLocale } from "@/i18n";
import { getMessages } from "@/i18n";
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    return {
        title: (t as any).tourTypes?.programs?.metadata?.title,
        description: (t as any).tourTypes?.programs?.metadata?.description,
    };
}

export default async function ProgramsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: localeParam } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;
    const t = getMessages(locale);

    let programs: any[] = [];
    try {
        programs = await getPrograms(locale);
    } catch (error) {
        console.error("Error fetching programs:", error);
    }

    return (
        <div className="bg-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Page Header */}
                <div className="mb-12 text-center">
                    <div className="inline-block mb-4">
                        <span className="border border-secondary/20 rounded-full px-6 py-2 text-secondary font-bold font-cabinet text-sm">
                            {(t as any).tourTypes?.programs?.badge || "Our Programs"}
                        </span>
                    </div>

                    <h1 className="text-[32px] lg:text-[48px] leading-tight font-cabinet font-extrabold text-primary mb-4">
                        {(t as any).tourTypes?.programs?.heading || "Explore Our Tourism Programs"}
                    </h1>

                    <p className="max-w-2xl mx-auto text-gray-600 font-satoshi text-lg leading-relaxed">
                        {(t as any).tourTypes?.programs?.description || "Discover our carefully curated programs designed to give you the best experience properly."}
                    </p>
                </div>

                {/* Programs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs.map((program) => (
                        <Link
                            href={`/${locale}/programs/${program.slug}`}
                            key={program.id}
                            className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                        >
                            <div className="relative h-64 overflow-hidden">
                                {program.main_image ? (
                                    <Image
                                        src={program.main_image}
                                        alt={program.title}
                                        fill
                                        className={`object-cover transition-transform duration-500 group-hover:scale-110 ${program.is_coming_soon ? 'grayscale' : ''}`}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}
                                {program.is_coming_soon && (
                                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white font-bold px-4 py-2 rounded-full text-xs uppercase tracking-wider z-10">
                                        Coming Soon
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-xl font-bold font-cabinet text-white mb-1 drop-shadow-md">
                                        {program.title}
                                    </h3>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-gray-600 font-satoshi mb-4 line-clamp-2 text-sm">
                                    {program.description}
                                </p>

                                <div className="flex items-center justify-between mt-4 text-sm font-medium text-gray-500 border-t pt-4">
                                    <span>{program.duration_text}</span>
                                    <span className="text-secondary group-hover:underline">{(t as any).common?.viewDetails || "View Details"} &rarr;</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {programs.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl">
                        <p className="text-gray-500 text-lg">No programs available at the moment.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
