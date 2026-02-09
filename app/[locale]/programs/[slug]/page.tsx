'use client';

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ProgramBookingCard from "@/components/program-detail/ProgramBookingCard";
import { getProgramBySlug } from "@/lib/services/programs";
import { type Locale, locales, defaultLocale } from "@/i18n";
import Image from "next/image";
import Link from "next/link";
import { Check, X, Clock, Building2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useEffect, useState } from "react";

export default function ProgramDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { t } = useLanguage();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const programDetails = (t as any).programDetails;

    const [program, setProgram] = useState<any>(null);
    const [locale, setLocale] = useState<Locale>(defaultLocale);
    const [slug, setSlug] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const resolvedParams = await params;
            const localeParam = resolvedParams.locale;
            const slugParam = resolvedParams.slug;

            setLocale((locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale);
            setSlug(slugParam);

            try {
                const programData = await getProgramBySlug(slugParam, localeParam as Locale);
                setProgram(programData);
            } catch (error) {
                console.error("Error fetching program:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [params]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-primary mx-auto"></div>
                    </div>
                </div>
                <Footer />
            </div>
        );
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
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-7xl mx-auto px-6 text-center text-white">
                        <span className="inline-block py-2 px-6 rounded-full bg-secondary/90 text-white font-bold text-sm mb-6 uppercase tracking-wider">
                            PROGRAM
                        </span>
                        <h1 className="text-2xl md:text-4xl font-extrabold font-cabinet mb-6 leading-tight">
                            {program.title}
                        </h1>
                        {program.duration_text && (
                            <div className="flex items-center justify-center gap-2 text-lg">
                                <Clock className="w-5 h-5 text-secondary" />
                                <span>{program.duration_text}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-20">

                    <div className=" mb-6 rounded-3xl gap-4 flex items-center justify-between">
                        {program.accommodation_type && (
                            <div className="flex flex-1 items-start gap-4  p-5 bg-white rounded-2xl shadow-sm border mb-0 ">
                                <Building2 className="w-7 h-7 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-primary mb-1 text-lg">
                                        {programDetails?.accommodation || 'Accommodation'}
                                    </h4>
                                    <p className="text-gray-600">{program.accommodation_type}</p>
                                </div>
                            </div>
                        )}

                        {program.duration_text && (
                            <div className="flex flex-1 items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <Clock className="w-7 h-7 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-primary mb-1 text-lg">
                                        {programDetails?.duration || 'Duration'}
                                    </h4>
                                    <p className="text-gray-600">{program.duration_text}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Overview */}
                    <section className="mb-6">
                        <h2 className="text-xl font-bold font-cabinet text-primary mb-3">
                            {programDetails?.overview || 'Overview'}
                        </h2>
                        <div className="prose prose-lg text-gray-700 max-w-none whitespace-pre-line leading-relaxed">
                            {program.description}
                        </div>
                    </section>

                    {/* Itinerary */}
                    {program.itinerary && (
                        <section className="mb-6">
                            <h2 className="text-xl font-bold font-cabinet text-primary mb-3">
                                {programDetails?.programItinerary || 'Program Itinerary'}
                            </h2>
                            <div className=" rounded-3xl whitespace-pre-line leading-relaxed text-gray-700 text-lg">
                                {program.itinerary}
                            </div>
                        </section>
                    )}

                    {/* Includes / Excludes */}
                    {((program.includes && program.includes.length > 0) || (program.excludes && program.excludes.length > 0)) && (
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                            {program.includes && program.includes.length > 0 && (
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border-2 border-green-100 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-bold font-cabinet text-green-800 mb-6 flex items-center gap-2">
                                        <Check className="w-6 h-6" />
                                        {programDetails?.included || 'Included'}
                                    </h3>
                                    <ul className="space-y-4">
                                        {program.includes.map((item: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-700">
                                                <div className="mt-1 min-w-5">
                                                    <Check className="w-5 h-5 text-green-600" />
                                                </div>
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {program.excludes && program.excludes.length > 0 && (
                                <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-3xl border-2 border-red-100 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-bold font-cabinet text-red-800 mb-6 flex items-center gap-2">
                                        <X className="w-6 h-6" />
                                        {programDetails?.excluded || 'Excluded'}
                                    </h3>
                                    <ul className="space-y-4">
                                        {program.excludes.map((item: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-700">
                                                <div className="mt-1 min-w-5">
                                                    <X className="w-5 h-5 text-red-500" />
                                                </div>
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </section>
                    )}



                    {/* Gallery */}
                    {program.images && program.images.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold font-cabinet text-primary mb-6 border-primary/20 pb-3">
                                {programDetails?.gallery || 'Gallery'}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {program.images.map((img: string, i: number) => (
                                    <div key={i} className="relative aspect-video rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
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
                <aside className="space-y-6">
                    {/* Accommodation & Duration Info Card */}


                    {/* Booking Card */}
                    <ProgramBookingCard programTitle={program.title} />
                </aside>

            </main>

            <Footer />
        </div>
    );
}
