'use client';

import { getLocalized } from '@/lib/utils';

interface TourProgramProps {
    itinerary: any;
    locale?: string;
}

export default function TourProgram({ itinerary, locale = 'en' }: TourProgramProps) {
    // Get localized itinerary text
    const itineraryText = typeof itinerary === 'object' && itinerary !== null
        ? getLocalized(itinerary, locale)
        : itinerary;

    if (!itineraryText || (typeof itineraryText === 'string' && itineraryText.trim() === '')) {
        return <div className="text-gray-500 italic">No program details available.</div>;
    }

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold font-cabinet text-gray-900 mb-6">Trip Program</h2>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="prose prose-gray max-w-none font-satoshi">
                    <pre className="whitespace-pre-wrap font-satoshi text-gray-700 leading-relaxed">
                        {itineraryText}
                    </pre>
                </div>
            </div>
        </div>
    );
}
