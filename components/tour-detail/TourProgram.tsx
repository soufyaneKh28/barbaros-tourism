'use client';

import { getLocalized } from '@/lib/utils';
import { useLanguage } from '@/hooks/use-language';

interface TourProgramProps {
    itinerary: any;
    locale?: string;
}

export default function TourProgram({ itinerary, locale = 'en' }: TourProgramProps) {
    const { t } = useLanguage();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tripDetails = (t as any).tripDetails;

    // Get localized itinerary text
    const itineraryText = typeof itinerary === 'object' && itinerary !== null
        ? getLocalized(itinerary, locale)
        : itinerary;

    if (!itineraryText || (typeof itineraryText === 'string' && itineraryText.trim() === '')) {
        return <div className="text-gray-500 italic">{tripDetails?.program?.noProgram || 'No program details available.'}</div>;
    }

    return (
        <div className="mb-12">
            <h2 className="text-lg font-bold font-cabinet text-gray-900 mb-3">{tripDetails?.program?.title || 'Trip Program'}</h2>
            <div className=" bg-white rounded-2xl ">
                <div className="prose prose-gray max-w-none font-satoshi">
                    <pre className="whitespace-pre-wrap font-satoshi text-gray-700 leading-relaxed">
                        {itineraryText}
                    </pre>
                </div>
            </div>
        </div>
    );
}
