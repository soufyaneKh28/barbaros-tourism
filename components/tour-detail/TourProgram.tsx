'use client';

import { getLocalized } from '@/lib/utils';

interface TourProgramProps {
    itinerary: any;
    locale?: string;
}

export default function TourProgram({ itinerary, locale = 'en' }: TourProgramProps) {
    // Handle both old format (array of objects with title) and new format (multi-language arrays)
    let steps: string[] = [];

    if (Array.isArray(itinerary)) {
        // Old format: [{title: "..."}, ...]
        steps = itinerary.map((item: any) => item.title || item);
    } else if (itinerary && typeof itinerary === 'object') {
        // New format: {en: ["...", "..."], ar: [...], ...}
        const localizedItinerary = getLocalized(itinerary, locale);
        steps = Array.isArray(localizedItinerary) ? localizedItinerary : [];
    }

    if (!steps || steps.length === 0) {
        return <div className="text-gray-500 italic">No program details available.</div>;
    }

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold font-cabinet text-gray-900 mb-6">Trip Program</h2>
            <div className="space-y-6">
                {steps.map((step, index) => (
                    <div key={index} className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg font-cabinet border border-primary/20">
                            {index + 1}
                        </div>
                        <div className="pt-1">
                            <h3 className="font-bold text-lg mb-2 font-cabinet text-gray-900">Step {index + 1}</h3>
                            <p className="text-gray-600 font-satoshi leading-relaxed">{step}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
