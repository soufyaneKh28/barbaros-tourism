'use client';

import ProgramBookingCard from "@/components/program-detail/ProgramBookingCard";
import Image from "next/image";
import { Check, X, Clock, Users } from "lucide-react";

interface Props {
    packageData: any;
    locale: string;
    translations: any;
}

export default function SpecialPackageDetailClient({ packageData, locale, translations }: Props) {
    const packageDetails = translations.packageDetails || {};

    // Parse includes and excludes (split by newlines)
    const includesList = packageData.includes ? packageData.includes.split('\n').filter((item: string) => item.trim()) : [];
    const excludesList = packageData.excludes ? packageData.excludes.split('\n').filter((item: string) => item.trim()) : [];

    return (
        <>
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px]">
                {packageData.main_image && (
                    <Image
                        src={packageData.main_image}
                        alt={packageData.package_name}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-7xl mx-auto px-6 text-center text-white">
                        <span className="inline-block py-2 px-6 rounded-full bg-secondary/90 text-white font-bold text-sm mb-6 uppercase tracking-wider">
                            SPECIAL PACKAGE
                        </span>
                        <h1 className="text-2xl md:text-4xl font-extrabold font-cabinet mb-6 leading-tight">
                            {packageData.package_name}
                        </h1>
                        {packageData.target_categories && (
                            <div className="flex items-center justify-center gap-2 text-lg">
                                <Users className="w-5 h-5 text-secondary" />
                                <span>{packageData.target_categories}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Quick Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {packageData.duration_nights && (
                            <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <Clock className="w-7 h-7 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-primary mb-1 text-lg">
                                        {packageDetails?.duration || 'Duration'}
                                    </h4>
                                    <p className="text-gray-600">{packageData.duration_nights}</p>
                                </div>
                            </div>
                        )}

                        {packageData.target_categories && (
                            <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <Users className="w-7 h-7 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-primary mb-1 text-lg">
                                        {packageDetails?.targetCategories || 'Target Categories'}
                                    </h4>
                                    <p className="text-gray-600">{packageData.target_categories}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Daily Itinerary */}
                    {packageData.daily_itinerary && (
                        <section>
                            <h2 className="text-2xl font-bold font-cabinet text-primary mb-4">
                                {packageDetails?.dailyItinerary || 'Daily Itinerary'}
                            </h2>
                            <div className="bg-gray-50 rounded-3xl p-6 whitespace-pre-line leading-relaxed text-gray-700 text-base">
                                {packageData.daily_itinerary}
                            </div>
                        </section>
                    )}

                    {/* Transportation */}
                    {packageData.transportation && (
                        <section>
                            <h2 className="text-2xl font-bold font-cabinet text-primary mb-4">
                                {packageDetails?.transportation || 'Transportation'}
                            </h2>
                            <div className="bg-gray-50 rounded-3xl p-6 whitespace-pre-line leading-relaxed text-gray-700 text-base">
                                {packageData.transportation}
                            </div>
                        </section>
                    )}

                    {/* Includes / Excludes */}
                    {(includesList.length > 0 || excludesList.length > 0) && (
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {includesList.length > 0 && (
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border-2 border-green-100 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-bold font-cabinet text-green-800 mb-6 flex items-center gap-2">
                                        <Check className="w-6 h-6" />
                                        {packageDetails?.included || "What's Included"}
                                    </h3>
                                    <ul className="space-y-4">
                                        {includesList.map((item: string, i: number) => (
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

                            {excludesList.length > 0 && (
                                <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-3xl border-2 border-red-100 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-bold font-cabinet text-red-800 mb-6 flex items-center gap-2">
                                        <X className="w-6 h-6" />
                                        {packageDetails?.excluded || "What's Not Included"}
                                    </h3>
                                    <ul className="space-y-4">
                                        {excludesList.map((item: string, i: number) => (
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
                </div>

                {/* Sidebar */}
                <aside className="space-y-6">
                    {/* Booking Card */}
                    <ProgramBookingCard programTitle={packageData.package_name} />
                </aside>
            </main>
        </>
    );
}
