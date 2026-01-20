'use client';

import { Check, X } from 'lucide-react';

interface TourAmenitiesProps {
    includes?: string[];
    excludes?: string[];
}

export default function TourAmenities({ includes = [], excludes = [] }: TourAmenitiesProps) {
    if (!includes?.length && !excludes?.length) {
        return <div className="text-gray-500 italic">No inclusion details available.</div>;
    }

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold font-cabinet text-gray-900 mb-6">Inclusions & Exclusions</h2>
            <div className="grid md:grid-cols-2 gap-8">
                {/* Includes */}
                <div>
                    <h3 className="text-lg font-bold font-cabinet text-green-700 mb-4 flex items-center gap-2">
                        <span className="bg-green-100 p-1 rounded-full"><Check className="w-4 h-4" /></span>
                        Included
                    </h3>
                    <ul className="space-y-3">
                        {includes.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-700 font-satoshi">
                                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Excludes */}
                <div>
                    <h3 className="text-lg font-bold font-cabinet text-red-700 mb-4 flex items-center gap-2">
                        <span className="bg-red-100 p-1 rounded-full"><X className="w-4 h-4" /></span>
                        Excluded
                    </h3>
                    <ul className="space-y-3">
                        {excludes.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-700 font-satoshi">
                                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
