'use client';

interface TourOverviewProps {
    description: string;
}

export default function TourOverview({ description }: TourOverviewProps) {
    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold font-cabinet text-gray-900 mb-4">About The Destination</h2>
            <div className="prose prose-lg text-gray-600 font-satoshi max-w-none">
                <p className="leading-relaxed">
                    {description}
                </p>
                <button className="text-gray-900 font-bold underline mt-2 hover:text-primary transition-colors">
                    Read More
                </button>
            </div>
        </div>
    );
}
