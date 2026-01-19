'use client';

export default function TourPolicies() {
    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold font-cabinet text-gray-900 mb-6">Policies</h2>
            <div className="bg-gray-50 rounded-2xl p-6 font-satoshi text-gray-600 space-y-4">
                <div>
                    <h3 className="font-bold text-gray-900 mb-1">Cancellation Policy</h3>
                    <p>Free cancellation up to 48 hours before the tour start date. 50% refund for cancellations within 24 hours.</p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-1">Child Policy</h3>
                    <p>Children under 5 years old join for free. Ages 6-12 receive a 50% discount.</p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-1">Important Information</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Please arrive 15 minutes before the scheduled pickup time.</li>
                        <li>Comfortable walking shoes are recommended.</li>
                        <li>Passport or ID card is required.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
