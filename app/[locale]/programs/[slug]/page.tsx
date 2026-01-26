import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { getProgramBySlug } from "@/lib/services/programs";
import { type Locale, locales, defaultLocale } from "@/i18n";
import Image from "next/image";
import Link from "next/link";
import { Check, X, Calendar, Clock, MapPin, Building2 } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ProgramDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale: localeParam, slug } = await params;
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale;

    let program: any = null;
    try {
        program = await getProgramBySlug(slug, locale);
    } catch (error) {
        console.error("Error fetching program:", error);
    }

    if (!program) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Program Not Found</h1>
                        <Link href={`/${locale}/programs`} className="text-primary hover:underline">
                            Return to Programs
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-white font-satoshi">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px]">
                {program.main_image && (
                    <Image
                        src={program.main_image}
                        alt={program.title}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-7xl mx-auto px-6 text-center text-white">
                        <span className="inline-block py-1 px-4 rounded-full bg-secondary/90 text-white font-bold text-sm mb-4">
                            PROGRAM
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold font-cabinet mb-6">
                            {program.title}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center gap-6 text-lg">
                            {program.duration_text && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-secondary" />
                                    <span>{program.duration_text}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Description */}
                    <section>
                        <h2 className="text-2xl font-bold font-cabinet text-primary mb-4">Overview</h2>
                        <div className="prose prose-lg text-gray-600 max-w-none whitespace-pre-line">
                            {program.description}
                        </div>
                    </section>

                    {/* Includes / Excludes */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {program.includes && program.includes.length > 0 && (
                            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                                <h3 className="text-xl font-bold font-cabinet text-green-800 mb-4">Included</h3>
                                <ul className="space-y-3">
                                    {program.includes.map((item: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-700">
                                            <div className="mt-1 min-w-5">
                                                <Check className="w-5 h-5 text-green-600" />
                                            </div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {program.excludes && program.excludes.length > 0 && (
                            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                                <h3 className="text-xl font-bold font-cabinet text-red-800 mb-4">Excluded</h3>
                                <ul className="space-y-3">
                                    {program.excludes.map((item: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-700">
                                            <div className="mt-1 min-w-5">
                                                <X className="w-5 h-5 text-red-500" />
                                            </div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>

                    {/* Itinerary */}
                    {program.itinerary && (
                        <section>
                            <h2 className="text-2xl font-bold font-cabinet text-primary mb-6">Program Itinerary</h2>
                            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 whitespace-pre-line leading-relaxed text-gray-700 text-lg">
                                {program.itinerary}
                            </div>
                        </section>
                    )}

                    {/* Gallery */}
                    {program.images && program.images.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold font-cabinet text-primary mb-6">Gallery</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {program.images.map((img: string, i: number) => (
                                    <div key={i} className="relative aspect-video rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                                        <Image
                                            src={img}
                                            alt={`${program.title} - ${i + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="space-y-8">
                    {/* Info Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                        <div className="space-y-6">
                            {program.accommodation_type && (
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <Building2 className="w-6 h-6 text-primary mt-1" />
                                    <div>
                                        <h4 className="font-bold text-primary mb-1">Accommodation</h4>
                                        <p className="text-gray-600 text-sm">{program.accommodation_type}</p>
                                    </div>
                                </div>
                            )}

                            {program.duration_text && (
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <Clock className="w-6 h-6 text-primary mt-1" />
                                    <div>
                                        <h4 className="font-bold text-primary mb-1">Duration</h4>
                                        <p className="text-gray-600 text-sm">{program.duration_text}</p>
                                    </div>
                                </div>
                            )}

                            <Link
                                href={`/${locale}/contact-us?subject=Inquiry about ${encodeURIComponent(program.title)}`}
                                className="block w-full bg-secondary text-primary font-bold text-center py-4 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
                            >
                                Book This Program
                            </Link>

                        </div>
                    </div>
                </aside>

            </main>

            <Footer />
        </div>
    );
}
