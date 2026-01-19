'use client';

export default function TourReviews() {
    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold font-cabinet text-gray-900 mb-6">Guest Reviews</h2>
            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                                {String.fromCharCode(64 + i)}
                            </div>
                            <div>
                                <h4 className="font-bold font-cabinet text-gray-900">Guest Reviewer {i}</h4>
                                <div className="flex text-secondary text-sm">★★★★★</div>
                            </div>
                            <span className="ml-auto text-sm text-gray-400 font-satoshi">2 days ago</span>
                        </div>
                        <p className="text-gray-600 font-satoshi">
                            Absolutely amazing experience! The guide was knowledgeable and friendly. The views were breathtaking. Highly recommended!
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
